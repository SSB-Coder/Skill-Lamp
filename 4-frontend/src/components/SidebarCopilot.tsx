import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { queryGenie, matchJD } from '../api/client';
import {
  StudentProfileResponse,
  JDMatchResponse,
  GenieQueryResponse
} from '../api/types';
import { LampIcon } from './Header';
import { SQLTraceDrawer } from './SQLTraceDrawer';
import {
  Send,
  FileText,
  Sparkles,
  X,
  ChevronDown,
  ChevronRight,
  Database,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'genie';
  text: string;
  sqlTrace?: {
    sqlQuery: string;
    latencyMs: number;
    rowCount: number;
    lineage: {
      catalog: string;
      pii_masked: boolean;
      engine: string;
    };
  };
  jdMatch?: JDMatchResponse['extracted_criteria'];
  matchedStudentIds?: string[];
  timestamp: string;
  thinkingSteps?: string[];
  citations?: Array<{ id: string; source: string }>;
}

interface SidebarCopilotProps {
  onFilterSync?: (matchedIds: string[] | null) => void;
  activeStudentId?: string;
  activeStudentProfile?: StudentProfileResponse | null;
}

// ---------------------------------------------------------------------------
// Rich Markdown & Databricks Genie Formatter Component
// ---------------------------------------------------------------------------

export const GenieMarkdown: React.FC<{ text: string }> = ({ text }) => {
  // Parse inline formatted text (bold, code, citations)
  const formatInline = (str: string) => {
    // Replace citation tags [1], [2], [3]
    const parts = str.split(/(\*\*.*?\*\*|`.*?`|\[\d+\])/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-semibold text-app-text">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1 py-0.5 rounded bg-app-bg border border-app-border font-mono text-[10.5px] text-app-action"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (/^\[\d+\]$/.test(part)) {
        return (
          <span
            key={idx}
            className="inline-flex items-center justify-center px-1 py-0.2 mx-0.5 rounded bg-app-action/20 text-app-action font-mono text-[9px] font-semibold border border-app-action/30"
            title="Unity Catalog Verified Data Lineage Reference"
          >
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  // Split into lines and group tables vs text blocks
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check for Markdown Table block
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const dataRows = tableLines.slice(2).map((r) =>
          r
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        elements.push(
          <div key={`table-${i}`} className="my-2.5 overflow-x-auto border border-app-border rounded">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead className="bg-app-bg text-app-muted font-medium border-b border-app-border">
                <tr>
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="py-1.5 px-2.5 font-medium whitespace-nowrap">
                      {formatInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-app-border/60 bg-app-panel/40">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-app-bg/60">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-1.5 px-2.5 whitespace-nowrap text-app-text">
                        {formatInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Headings (### or ##)
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h3-${i}`} className="text-[12px] font-semibold text-app-text mt-3 mb-1 tracking-tight">
          {formatInline(line.slice(4))}
        </h4>
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h2-${i}`} className="text-[13px] font-bold text-app-text mt-3.5 mb-1.5 tracking-tight">
          {formatInline(line.slice(3))}
        </h3>
      );
      i++;
      continue;
    }

    // Bullet list items (• or - or numbers)
    if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
      const content = line.trim().slice(2);
      elements.push(
        <div key={`bullet-${i}`} className="flex items-start space-x-1.5 my-1 text-[11.5px] leading-relaxed text-app-text pl-1">
          <span className="text-app-muted select-none leading-normal">•</span>
          <span className="flex-1">{formatInline(content)}</span>
        </div>
      );
      i++;
      continue;
    }

    // Numbered list items (e.g. 1. , 2. )
    const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      elements.push(
        <div key={`num-${i}`} className="flex items-start space-x-1.5 my-1 text-[11.5px] leading-relaxed text-app-text pl-1">
          <span className="text-app-action font-mono text-[10.5px] font-semibold select-none leading-normal">
            {numberedMatch[1]}.
          </span>
          <span className="flex-1">{formatInline(numberedMatch[2])}</span>
        </div>
      );
      i++;
      continue;
    }

    // Regular paragraph / blank line
    if (line.trim().length > 0) {
      elements.push(
        <p key={`p-${i}`} className="my-1.5 text-[11.5px] leading-relaxed text-app-text">
          {formatInline(line)}
        </p>
      );
    }

    i++;
  }

  return <div className="space-y-0.5">{elements}</div>;
};

// ---------------------------------------------------------------------------
// Main SidebarCopilot Component
// ---------------------------------------------------------------------------

export const SidebarCopilot: React.FC<SidebarCopilotProps> = ({
  onFilterSync,
  activeStudentId
}) => {
  const { role, user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isJDModalOpen, setIsJDModalOpen] = useState(false);
  const [jdText, setJdText] = useState('');
  const [isMatchingJD, setIsMatchingJD] = useState(false);
  const [expandedThinking, setExpandedThinking] = useState<{ [key: string]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial greeting per persona
  useEffect(() => {
    if (role === 'TPO') {
      setMessages([
        {
          id: 'welcome-tpo',
          sender: 'genie',
          text: 'Welcome to the TPO Placement Intelligence Console. I have direct query access to all governed gold Delta tables in Unity Catalog (`workspace.campus_intelligence_gold`). Ask natural language candidate cohort questions or paste a recruiter JD to filter the grid.',
          timestamp: 'Just now'
        }
      ]);
    } else {
      setMessages([
        {
          id: 'welcome-student',
          sender: 'genie',
          text: `Hello ${user?.name || 'Priya'}. I am your dedicated Genie Career Advisor with private access to your academic profile (${user?.branch || 'ISE'}, CGPA ${user?.cgpa || '8.12'}). Ask me about company eligibility, prerequisite skill gaps, or cohort ROI trends.`,
          timestamp: 'Just now'
        }
      ]);
    }
  }, [role, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const toggleThinking = (msgId: string) => {
    setExpandedThinking((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleSendMessage = async (customQuery?: string) => {
    const textToSend = (customQuery || inputValue).trim();
    if (!textToSend || isThinking) return;

    const userMsgId = 'msg-' + Date.now();
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: textToSend,
        timestamp: 'Just now'
      }
    ];

    setMessages(newMessages);
    if (!customQuery) setInputValue('');
    setIsThinking(true);

    try {
      const resp: GenieQueryResponse = await queryGenie({
        query: textToSend,
        persona: role || 'TPO',
        student_id: role === 'STUDENT' ? (activeStudentId || user?.student_id || 'USN_2025_042') : undefined
      });

      const genieMsgId = 'genie-' + Date.now();
      const genieMsg: ChatMessage = {
        id: genieMsgId,
        sender: 'genie',
        text: resp.answer,
        sqlTrace: {
          sqlQuery: resp.sql_query,
          latencyMs: resp.latency_ms,
          rowCount: resp.row_count,
          lineage: resp.lineage
        },
        matchedStudentIds: resp.matched_student_ids,
        timestamp: 'Just now',
        thinkingSteps: resp.thinking_steps,
        citations: resp.citations
      };

      setMessages((prev) => [...prev, genieMsg]);
      setExpandedThinking((prev) => ({ ...prev, [genieMsgId]: true }));

      // Dual-Sync filter update
      if (resp.matched_student_ids && onFilterSync) {
        onFilterSync(resp.matched_student_ids);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'genie-err-' + Date.now(),
          sender: 'genie',
          text: 'Error processing natural language query against Unity Catalog. Please retry.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleJDSubmit = async () => {
    if (!jdText.trim() || isMatchingJD) return;
    setIsMatchingJD(true);

    try {
      const resp: JDMatchResponse = await matchJD(jdText);

      const jdMsg: ChatMessage = {
        id: 'jd-' + Date.now(),
        sender: 'genie',
        text: `### Recruiter JD Parsed & Cohort Shortlisted\n\n• **Target Role:** ${resp.extracted_criteria.target_role} (${resp.extracted_criteria.ctc_lpa} LPA)\n• **Extracted Constraints:** CGPA ≥ ${resp.extracted_criteria.min_cgpa}, 0 Backlogs\n• **Required Skills:** ${resp.extracted_criteria.required_skills.join(', ')}\n• **Matched Candidates:** ${resp.matched_students.length} students found in Unity Catalog.`,
        sqlTrace: {
          sqlQuery: resp.sql_query,
          latencyMs: resp.latency_ms,
          rowCount: resp.row_count,
          lineage: resp.lineage
        },
        jdMatch: resp.extracted_criteria,
        matchedStudentIds: resp.matched_student_ids,
        timestamp: 'Just now',
        thinkingSteps: [
          'NLP Job Description entity extraction',
          `Parsed cutoffs: CGPA >= ${resp.extracted_criteria.min_cgpa}, Skills: [${resp.extracted_criteria.required_skills.join(', ')}]`,
          'Executing candidate pool filter query on Unity Catalog'
        ]
      };

      setMessages((prev) => [...prev, jdMsg]);
      setIsJDModalOpen(false);
      setJdText('');

      if (onFilterSync) {
        onFilterSync(resp.matched_student_ids);
      }
    } catch {
      alert('Failed to parse JD. Please check input.');
    } finally {
      setIsMatchingJD(false);
    }
  };

  const sampleJD = `Looking for 2025 batch graduates for Cloud Lakehouse Data Engineer role at Databricks Partner Network.
Requirements:
- Branch: ISE, CSE, AI/DS
- Minimum CGPA: 8.0, zero active backlogs
- Skills: DATABRICKS_DE, Apache PySpark, SQL, Python
- Package: 24.0 LPA`;

  const tpoChips = [
    'Databricks Eligible (CGPA > 8.0)',
    'Branch-Wise Placement Statistics',
    'Top Unplaced AI/DS Students',
    'Top 5 Hiring Partners by Volume'
  ];

  const studentChips = [
    'Why am I blocked from Google?',
    'Top ROI skills for ISE',
    'Readiness score breakdown',
    'What skills unlock Super Dream tier?'
  ];

  const activeChips = role === 'TPO' ? tpoChips : studentChips;

  return (
    <aside className="w-[380px] shrink-0 h-[calc(100vh-3.5rem)] bg-app-panel border-r border-app-border flex flex-col select-none overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-app-border bg-app-panel flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded bg-app-bg border border-app-border">
            <LampIcon size={16} color="#0284C7" />
          </div>
          <div>
            <div className="text-xs font-semibold text-app-text flex items-center space-x-1.5">
              <span>{role === 'TPO' ? 'Genie AI Copilot' : 'Genie Career Advisor'}</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-app-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-app-success inline-block"></span>
              <span>Unity Catalog Connected</span>
            </div>
          </div>
        </div>

        {/* TPO Action: Recruiter JD Quick Matcher */}
        {role === 'TPO' && (
          <button
            onClick={() => setIsJDModalOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-app-action hover:bg-app-actionHover text-white text-[11px] font-medium transition-colors duration-150"
            title="Paste raw recruiter job description to auto-extract criteria and filter candidates"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Paste JD</span>
          </button>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-2.5 bg-app-bg/60 border-b border-app-border overflow-x-auto">
        <div className="text-[10px] font-medium uppercase tracking-wider text-app-muted mb-1.5 flex items-center justify-between">
          <span>Quick Prompts</span>
          <span className="text-[9px] text-app-muted">1-Click Query</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activeChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              disabled={isThinking}
              className="text-[11px] px-2 py-1 rounded bg-app-panel border border-app-border hover:border-app-action hover:text-app-action transition-colors duration-150 text-app-muted text-left"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            {/* Message Bubble */}
            <div
              className={`max-w-[96%] p-3 rounded text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-app-action/20 border border-app-action/40 text-app-text'
                  : 'bg-app-bg border border-app-border text-app-text'
              }`}
            >
              {msg.sender === 'genie' && (
                <div className="flex items-center space-x-1.5 mb-2 pb-1.5 border-b border-app-border/40 text-[10px] font-medium text-app-muted">
                  <LampIcon size={12} color="#0284C7" />
                  <span className="font-semibold text-app-text">Genie Space</span>
                  {msg.matchedStudentIds && msg.matchedStudentIds.length > 0 && (
                    <span className="ml-auto text-[10px] text-app-action font-mono">
                      {msg.matchedStudentIds.length} candidate(s) synced
                    </span>
                  )}
                </div>
              )}

              {/* Databricks Genie Thinking Tree / Process */}
              {msg.thinkingSteps && msg.thinkingSteps.length > 0 && (
                <div className="mb-2.5 rounded bg-app-panel/70 border border-app-border p-2">
                  <button
                    onClick={() => toggleThinking(msg.id)}
                    className="w-full flex items-center justify-between text-[10.5px] font-mono text-app-muted hover:text-app-text transition-colors"
                  >
                    <div className="flex items-center space-x-1.5">
                      <Database className="w-3 h-3 text-app-action" />
                      <span>Thinking Process ({msg.thinkingSteps.length} steps)</span>
                    </div>
                    {expandedThinking[msg.id] ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>

                  {expandedThinking[msg.id] && (
                    <div className="mt-2 space-y-1 pl-1 border-l-2 border-app-borderLight text-[10.5px] font-mono text-app-muted">
                      {msg.thinkingSteps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-center space-x-1.5 py-0.5">
                          <Check className="w-3 h-3 text-app-success shrink-0" />
                          <span className="text-app-text/90">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Formatted Markdown Content */}
              <GenieMarkdown text={msg.text} />

              {/* Embedded SQL Trace Drawer */}
              {msg.sqlTrace && (
                <div className="mt-3">
                  <SQLTraceDrawer
                    sqlQuery={msg.sqlTrace.sqlQuery}
                    latencyMs={msg.sqlTrace.latencyMs}
                    rowCount={msg.sqlTrace.rowCount}
                    lineage={msg.sqlTrace.lineage}
                    defaultExpanded={false}
                  />
                </div>
              )}
            </div>
            <span className="text-[9px] text-app-muted/60 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {/* Live Thinking / Polling State */}
        {isThinking && (
          <div className="flex flex-col items-start space-y-1.5">
            <div className="p-2.5 rounded bg-app-bg border border-app-border flex items-center space-x-2">
              <LampIcon size={14} color="#0284C7" />
              <span className="font-mono text-[11px] text-app-muted">
                Genie querying Unity Catalog...
              </span>
              <div className="flex items-center space-x-1 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-app-action animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-app-action animate-pulse [animation-delay:200ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-app-action animate-pulse [animation-delay:400ms]" />
              </div>
            </div>
            <div className="pl-6 text-[10px] font-mono text-app-muted/70">
              • Evaluating governed SQL trace on Serverless Photon Engine...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Console */}
      <div className="p-3 bg-app-panel border-t border-app-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              role === 'TPO'
                ? 'Ask Genie (e.g. Branch-wise statistics 2024)...'
                : 'Ask Genie (e.g. Why am I blocked from Google?)...'
            }
            disabled={isThinking}
            className="flex-1 bg-app-bg border border-app-border rounded px-3 py-2 text-xs text-app-text placeholder-app-muted/60 focus:outline-none focus:border-app-action"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isThinking}
            className="p-2 rounded bg-app-action hover:bg-app-actionHover disabled:opacity-40 text-white transition-colors duration-150"
            title="Send Query to Genie Space"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Recruiter JD Quick-Matcher Modal */}
      {isJDModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-app-panel border border-app-border rounded-lg p-5 shadow-none space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-app-border">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-app-action" />
                <h3 className="text-sm font-semibold text-app-text">Recruiter JD Quick-Matcher</h3>
              </div>
              <button
                onClick={() => setIsJDModalOpen(false)}
                className="p-1 rounded text-app-muted hover:text-app-text hover:bg-app-bg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-app-muted">
              Paste raw recruiter text or job description. Genie will extract CGPA, backlogs, branch, and required skill constraints and filter candidate records with governed SQL.
            </p>

            <textarea
              rows={6}
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste raw recruiter JD here (e.g. Looking for 2025 grads with CGPA > 7.5, Python, SQL for Cloud Data role at 18 LPA)..."
              className="w-full bg-app-bg border border-app-border rounded p-3 text-xs text-app-text font-mono focus:outline-none focus:border-app-action"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setJdText(sampleJD)}
                className="text-xs text-app-action hover:underline"
              >
                Load Sample Recruiter JD
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsJDModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-app-bg border border-app-border text-xs text-app-muted hover:text-app-text"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleJDSubmit}
                  disabled={!jdText.trim() || isMatchingJD}
                  className="px-3 py-1.5 rounded bg-app-action hover:bg-app-actionHover text-white text-xs font-medium disabled:opacity-50 flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isMatchingJD ? 'Extracting Constraints...' : 'Extract & Match Cohort'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
