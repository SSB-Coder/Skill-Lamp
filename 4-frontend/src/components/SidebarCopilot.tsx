import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { queryGenie, matchJD } from '../api/client';
import { GenieQueryResponse, JDMatchResponse } from '../api/types';
import { LampIcon } from './Header';
import { SQLTraceDrawer } from './SQLTraceDrawer';
import {
  Send,
  FileText,
  Sparkles,
  X
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
}

interface SidebarCopilotProps {
  onFilterSync?: (matchedIds: string[] | null) => void;
  activeStudentId?: string;
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial greeting per persona
  useEffect(() => {
    if (role === 'TPO') {
      setMessages([
        {
          id: 'welcome-tpo',
          sender: 'genie',
          text: 'Welcome to the TPO Placement Intelligence Console. I have direct query access to all governed gold Delta tables in Unity Catalog. Ask natural language candidate cohort questions or paste a recruiter JD to filter the grid.',
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

      const genieMsg: ChatMessage = {
        id: 'genie-' + Date.now(),
        sender: 'genie',
        text: resp.answer,
        sqlTrace: {
          sqlQuery: resp.sql_query,
          latencyMs: resp.latency_ms,
          rowCount: resp.row_count,
          lineage: resp.lineage
        },
        matchedStudentIds: resp.matched_student_ids,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, genieMsg]);

      // Dual-Sync filter update
      if (resp.matched_student_ids && onFilterSync) {
        onFilterSync(resp.matched_student_ids);
      }
    } catch {
      setMessages(prev => [
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
        text: `**Recruiter JD Parsed & Cohort Shortlisted**\n\n• **Target Role:** ${resp.extracted_criteria.target_role} (${resp.extracted_criteria.ctc_lpa} LPA)\n• **Extracted Constraints:** CGPA ≥ ${resp.extracted_criteria.min_cgpa}, 0 Backlogs\n• **Required Skills:** ${resp.extracted_criteria.required_skills.join(', ')}\n• **Matched Candidates:** ${resp.matched_students.length} students found in Unity Catalog.`,
        sqlTrace: {
          sqlQuery: resp.sql_query,
          latencyMs: resp.latency_ms,
          rowCount: resp.row_count,
          lineage: resp.lineage
        },
        jdMatch: resp.extracted_criteria,
        matchedStudentIds: resp.matched_student_ids,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, jdMsg]);
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
    'Top Unplaced AI/DS Students',
    'ISE Candidates with SQL & Python',
    'Super Dream Shortlist (0 Backlogs)'
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
            className="flex items-center space-x-1 px-2 py-1 rounded bg-app-action hover:bg-app-actionHover text-white text-[11px] font-medium transition-colors duration-150"
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
              className={`max-w-[95%] p-3 rounded text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-app-action/20 border border-app-action/40 text-app-text'
                  : 'bg-app-bg border border-app-border text-app-text'
              }`}
            >
              {msg.sender === 'genie' && (
                <div className="flex items-center space-x-1.5 mb-1.5 pb-1 border-b border-app-border/40 text-[10px] font-medium text-app-muted">
                  <LampIcon size={12} color="#0284C7" />
                  <span>Genie Assistant</span>
                  {msg.matchedStudentIds && (
                    <span className="ml-auto text-[10px] text-app-action font-mono">
                      {msg.matchedStudentIds.length} candidate(s) synced
                    </span>
                  )}
                </div>
              )}

              <div className="whitespace-pre-wrap text-[11.5px]">{msg.text}</div>

              {/* Embedded SQL Trace Drawer */}
              {msg.sqlTrace && (
                <div className="mt-2.5">
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
          <div className="flex flex-col items-start">
            <div className="p-2.5 rounded bg-app-bg border border-app-border flex items-center space-x-2">
              <LampIcon size={14} color="#0284C7" />
              <span className="font-mono text-[11px] text-app-muted">
                Genie querying Unity Catalog...
              </span>
              <div className="flex items-center space-x-1 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-pulse [animation-delay:200ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-pulse [animation-delay:400ms]" />
              </div>
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
                ? 'Ask Genie (e.g. ISE CGPA > 8.0 eligible for Databricks)...'
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
