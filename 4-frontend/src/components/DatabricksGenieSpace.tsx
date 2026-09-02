import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { queryGenie } from '../api/client';
import { GenieQueryResponse } from '../api/types';
import {
  Send,
  ChevronDown,
  ChevronRight,
  Database,
  Table,
  Copy,
  Check,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  RotateCw,
  Share2,
  Download,
  Code2
} from 'lucide-react';

interface GenieChatMessage {
  id: string;
  sender: 'user' | 'genie';
  text: string;
  timestamp: string;
  thinkingSteps?: string[];
  citations?: Array<{ id: string; source: string }>;
  columns?: string[];
  rows?: Array<Array<string | number | boolean | null>>;
  tableTitle?: string;
  sqlQuery?: string;
  latencyMs?: number;
  rowCount?: number;
}

interface DatabricksGenieSpaceProps {
  initialQuery?: string;
  onFilterSync?: (matchedIds: string[] | null) => void;
}

// ---------------------------------------------------------------------------
// Rich Markdown Formatter for Databricks Genie
// ---------------------------------------------------------------------------

export const GenieSpaceMarkdown: React.FC<{ text: string }> = ({ text }) => {
  const formatInline = (str: string) => {
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
            className="px-1.5 py-0.5 rounded-md bg-app-bg border border-app-border font-mono text-[11px] text-app-accent"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (/^\[\d+\]$/.test(part)) {
        return (
          <span
            key={idx}
            className="inline-flex items-center justify-center px-1.5 py-0.2 mx-1 rounded-md bg-app-accentWash text-app-accent font-mono text-[10px] font-semibold border border-app-accent/30 cursor-pointer hover:bg-app-accent/20"
            title="Unity Catalog Verified Source Citation"
          >
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  };

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Markdown Table block
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
          <div key={`table-${i}`} className="my-3 overflow-x-auto border border-app-border rounded-lg bg-app-surface">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-app-surfaceRaised text-app-muted font-medium border-b border-app-border">
                <tr>
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="py-2 px-3 font-medium whitespace-nowrap">
                      {formatInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-app-borderSubtle">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-app-surfaceRaised/40 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2 px-3 whitespace-nowrap text-app-text">
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

    // Headers
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h3-${i}`} className="text-sm font-bold text-app-text mt-4 mb-2 tracking-tight">
          {formatInline(line.slice(4))}
        </h4>
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h2-${i}`} className="text-base font-bold text-app-text mt-5 mb-2.5 tracking-tight">
          {formatInline(line.slice(3))}
        </h3>
      );
      i++;
      continue;
    }

    // Divider
    if (line.trim() === '---') {
      elements.push(<hr key={`hr-${i}`} className="border-app-border my-3" />);
      i++;
      continue;
    }

    // Bullet items
    if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
      const content = line.trim().slice(2);
      elements.push(
        <div key={`bullet-${i}`} className="flex items-start space-x-2 my-1 text-xs text-app-muted pl-1 leading-relaxed">
          <span className="text-app-muted leading-none mt-1">◦</span>
          <span className="flex-1">{formatInline(content)}</span>
        </div>
      );
      i++;
      continue;
    }

    // Numbered items
    const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
    if (numberedMatch) {
      elements.push(
        <div key={`num-${i}`} className="flex items-start space-x-2 my-1 text-xs text-app-text pl-1 leading-relaxed">
          <span className="text-app-accent font-mono text-[11px] font-semibold leading-none mt-0.5">
            {numberedMatch[1]}.
          </span>
          <span className="flex-1">{formatInline(numberedMatch[2])}</span>
        </div>
      );
      i++;
      continue;
    }

    // Paragraph
    if (line.trim().length > 0) {
      elements.push(
        <p key={`p-${i}`} className="my-1.5 text-xs text-app-text leading-relaxed">
          {formatInline(line)}
        </p>
      );
    }

    i++;
  }

  return <div className="space-y-1">{elements}</div>;
};

// ---------------------------------------------------------------------------
// Main DatabricksGenieSpace Component
// ---------------------------------------------------------------------------

export const DatabricksGenieSpace: React.FC<DatabricksGenieSpaceProps> = ({
  initialQuery,
  onFilterSync
}) => {
  const { role, user } = useAuth();
  const [messages, setMessages] = useState<GenieChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [selectedResult, setSelectedResult] = useState<GenieChatMessage | null>(null);
  const [isSqlVisible, setIsSqlVisible] = useState(true);
  const [copiedSql, setCopiedSql] = useState(false);
  const [expandedThinking, setExpandedThinking] = useState<{ [key: string]: boolean }>({});
  const [expandedSources, setExpandedSources] = useState<{ [key: string]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const greetingText =
      role === 'TPO'
        ? "Welcome to the **Databricks AI/BI Genie Space**. I analyze placement intelligence, candidate cohorts, skill ROI, and recruiter queries with direct access to Unity Catalog Gold tables (`workspace.campus_intelligence_gold`). Ask natural-language questions or select a query below."
        : `Hello **${user?.name || 'Priya'}**. I am your **Genie Career Advisor** connected to your verified academic transcript (ISE, CGPA 8.12, 0 Backlogs). Ask me about company eligibility cutoffs, skill ROI, or blocker diagnostics.`;

    const initialMsg: GenieChatMessage = {
      id: 'welcome-01',
      sender: 'genie',
      text: greetingText,
      timestamp: 'Just now'
    };

    setMessages([initialMsg]);

    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [role, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = async (customQuery?: string) => {
    const queryText = (customQuery || inputValue).trim();
    if (!queryText || isThinking) return;

    const userMsgId = 'user-' + Date.now();
    const newMessages: GenieChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: queryText,
        timestamp: 'Just now'
      }
    ];

    setMessages(newMessages);
    if (!customQuery) setInputValue('');
    setIsThinking(true);

    try {
      const resp: GenieQueryResponse = await queryGenie({
        query: queryText,
        persona: role || 'TPO',
        student_id: role === 'STUDENT' ? (user?.student_id || 'USN_2025_042') : undefined
      });

      const genieMsgId = 'genie-' + Date.now();
      const genieMsg: GenieChatMessage = {
        id: genieMsgId,
        sender: 'genie',
        text: resp.answer,
        timestamp: 'Just now',
        thinkingSteps: resp.thinking_steps,
        citations: resp.citations,
        columns: resp.columns,
        rows: resp.rows,
        tableTitle: resp.table_title || (resp.row_count > 0 ? `Result Set (${resp.row_count} rows)` : 'Query Execution Trace'),
        sqlQuery: resp.sql_query,
        latencyMs: resp.latency_ms,
        rowCount: resp.row_count
      };

      setMessages((prev) => [...prev, genieMsg]);
      setExpandedThinking((prev) => ({ ...prev, [genieMsgId]: true }));
      setExpandedSources((prev) => ({ ...prev, [genieMsgId]: false }));

      // Set active in right data drawer
      setSelectedResult(genieMsg);

      if (resp.matched_student_ids && onFilterSync) {
        onFilterSync(resp.matched_student_ids);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'genie',
          text: 'Error communicating with Databricks Genie Space endpoint. Please retry.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const copySqlToClipboard = (sql: string) => {
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const quickPrompts =
    role === 'TPO'
      ? [
          'What is the overall placement percentage and average CTC per branch for the 2024 graduating batch?',
          'Cohort comparison for a non-existent CGPA band (e.g. CGPA > 10.0)',
          'Databricks eligible candidates with CGPA >= 8.0 and zero backlogs',
          'Top 5 campus hiring partners by offer volume and max CTC'
        ]
      : [
          'Why am I blocked from Google (45.0 LPA)?',
          'What are the top ROI skills for ISE branch?',
          'Readiness score breakdown and next milestone',
          'What skills unlock Super Dream tier companies?'
        ];

  return (
    <div className="flex-1 flex flex-row h-[calc(100vh-4rem)] bg-app-bg overflow-hidden">
      {/* Left / Main Chat Feed Area */}
      <div className="flex-1 flex flex-col h-full border-r border-app-border overflow-hidden">
        {/* Space Subtitle Bar */}
        <div className="px-6 py-2.5 bg-app-surface border-b border-app-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-app-accent" />
            <span className="font-semibold text-xs text-app-text">
              Databricks AI/BI Genie Space
            </span>
            <span className="text-app-subtle text-xs">•</span>
            <span className="text-xs text-app-muted">
              workspace.campus_intelligence_gold
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-app-subtle">
            <span>Photon Serverless Engine</span>
            <span>•</span>
            <span className="text-app-success font-medium">Live Connected</span>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {/* User Prompt (Obsidian Surface Raised Bubble) */}
              {msg.sender === 'user' ? (
                <div className="bg-app-surfaceRaised border border-app-border text-app-text px-4 py-2.5 rounded-lg max-w-xl text-sm leading-relaxed font-normal">
                  {msg.text}
                </div>
              ) : (
                /* Genie Answer Body */
                <div className="w-full max-w-3xl space-y-3.5">
                  {/* Thinking Process Dropdown */}
                  {msg.thinkingSteps && msg.thinkingSteps.length > 0 && (
                    <div className="rounded-lg bg-app-surface border border-app-border p-3 text-xs">
                      <button
                        onClick={() =>
                          setExpandedThinking((prev) => ({
                            ...prev,
                            [msg.id]: !prev[msg.id]
                          }))
                        }
                        className="flex items-center space-x-2 text-app-muted hover:text-app-text transition-colors w-full font-medium"
                      >
                        {expandedThinking[msg.id] ? (
                          <ChevronDown className="w-4 h-4 text-app-muted" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-app-muted" />
                        )}
                        <span className="font-semibold text-app-text">
                          Thinking complete
                        </span>
                      </button>

                      {expandedThinking[msg.id] && (
                        <div className="mt-2.5 pl-6 space-y-1.5 border-l-2 border-app-borderSubtle text-xs text-app-muted">
                          {msg.thinkingSteps.map((step, idx) => (
                            <div
                              key={idx}
                              className="flex items-start space-x-2 py-0.5"
                            >
                              <span className="text-app-muted mt-0.5">•</span>
                              <div className="flex items-center space-x-1.5 text-app-text">
                                {idx > 0 && (
                                  <Table className="w-3.5 h-3.5 text-app-muted shrink-0" />
                                )}
                                <span>{step}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Formatted Markdown Body */}
                  <GenieSpaceMarkdown text={msg.text} />

                  {/* Sources Collapsible */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-1">
                      <button
                        onClick={() =>
                          setExpandedSources((prev) => ({
                            ...prev,
                            [msg.id]: !prev[msg.id]
                          }))
                        }
                        className="flex items-center space-x-1.5 text-xs text-app-muted hover:text-app-text transition-colors"
                      >
                        {expandedSources[msg.id] ? (
                          <ChevronDown className="w-3.5 h-3.5 text-app-muted" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-app-muted" />
                        )}
                        <span>Sources ({msg.citations.length})</span>
                      </button>

                      {expandedSources[msg.id] && (
                        <div className="mt-2 space-y-1 pl-4 text-xs font-mono text-app-subtle">
                          {msg.citations.map((c) => (
                            <div key={c.id} className="flex items-center space-x-2">
                              <span className="text-app-accent">[{c.id}]</span>
                              <span className="text-app-muted">{c.source}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feedback & Actions Footer */}
                  <div className="pt-2 flex items-center justify-between border-t border-app-borderSubtle text-xs text-app-subtle">
                    <div className="flex items-center space-x-2">
                      <span>Is this useful?</span>
                      <button className="p-1 rounded-md hover:text-app-text transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded-md hover:text-app-text transition-colors">
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSendMessage(messages[messages.length - 2]?.text)}
                        className="p-1 rounded-md hover:text-app-text transition-colors"
                        title="Regenerate"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-app-text transition-colors">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-app-text transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Live Thinking Status */}
          {isThinking && (
            <div className="flex items-center space-x-3 text-xs text-app-muted">
              <div className="flex items-center space-x-2.5 p-3 rounded-lg bg-app-surface border border-app-border">
                <span className="w-2 h-2 rounded-full bg-app-muted animate-pulse" />
                <span className="font-mono text-xs text-app-muted">
                  Genie querying Databricks Unity Catalog...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2 bg-app-bg border-t border-app-border flex items-center space-x-2 overflow-x-auto">
          <span className="text-[10px] uppercase font-semibold text-app-subtle shrink-0">
            Suggested:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={isThinking}
              className="text-xs px-2.5 py-1 rounded-md bg-app-surface border border-app-border hover:border-app-borderSubtle hover:text-app-text text-app-muted transition-colors whitespace-nowrap"
            >
              {p.length > 45 ? p.slice(0, 45) + '...' : p}
            </button>
          ))}
        </div>

        {/* Databricks Input Bar */}
        <div className="p-4 bg-app-bg border-t border-app-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center bg-app-surface border border-app-border rounded-lg px-3.5 py-2 focus-within:border-app-accent"
          >
            <button
              type="button"
              className="p-1 rounded-md text-app-subtle hover:text-app-text transition-colors mr-2"
              title="Attach File / JD"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask your question..."
              disabled={isThinking}
              className="flex-1 bg-transparent text-xs text-app-text placeholder-app-subtle focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking}
              className="p-1.5 rounded-md bg-app-accent hover:bg-app-accentHover disabled:opacity-40 text-app-bg transition-colors ml-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-center text-[10px] text-app-subtle">
            Always review the accuracy of responses. Powered by Databricks Serverless Photon.
          </div>
        </div>
      </div>

      {/* Right: Databricks Interactive Result Data Table & SQL Viewer */}
      <div className="w-[450px] lg:w-[520px] shrink-0 h-full bg-app-surface border-l border-app-border flex flex-col overflow-hidden">
        {selectedResult && (selectedResult.columns || selectedResult.sqlQuery) ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Tab Header */}
            <div className="p-3 bg-app-surfaceRaised border-b border-app-border flex items-center justify-between">
              <div className="flex items-center space-x-2 truncate">
                <Table className="w-4 h-4 text-app-muted shrink-0" />
                <span className="font-semibold text-xs text-app-text truncate">
                  {selectedResult.tableTitle || 'Query Result Set'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    copySqlToClipboard(selectedResult.sqlQuery || '')
                  }
                  className="p-1.5 rounded-md text-app-muted hover:text-app-text hover:bg-app-surface transition-colors"
                  title="Copy SQL Query"
                >
                  {copiedSql ? (
                    <Check className="w-3.5 h-3.5 text-app-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Databricks Grid Table */}
            {selectedResult.columns && selectedResult.rows && selectedResult.rows.length > 0 ? (
              <div className="flex-1 overflow-auto bg-app-bg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-app-surface text-app-muted font-medium sticky top-0 border-b border-app-border select-none">
                    <tr>
                      <th className="py-2 px-3 w-10 text-center font-mono text-[10px] text-app-subtle">
                        #
                      </th>
                      {selectedResult.columns.map((col, cIdx) => (
                        <th
                          key={cIdx}
                          className="py-2 px-3.5 whitespace-nowrap font-medium text-[11.5px]"
                        >
                          <div className="flex items-center space-x-1.5">
                            <span className="font-mono text-[9px] px-1 py-0.2 rounded-md bg-app-surfaceRaised text-app-muted">
                              {col.includes('student') || col.includes('count') || col.includes('pct') || col.includes('ctc')
                                ? '123'
                                : 'Abc'}
                            </span>
                            <span>{col}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-app-borderSubtle font-mono text-xs">
                    {selectedResult.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-app-surface/60 transition-colors"
                      >
                        <td className="py-2 px-3 text-center text-app-subtle text-[10.5px]">
                          {rIdx + 1}
                        </td>
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className="py-2 px-3.5 whitespace-nowrap text-app-text"
                          >
                            {String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-xs text-app-subtle bg-app-bg">
                <Database className="w-8 h-8 text-app-subtle mb-2" />
                <span className="text-app-muted font-medium">Aggregated Analytical Query</span>
                <span className="text-[11px] mt-1">This query produced a direct executive summary and metrics.</span>
              </div>
            )}

            {/* Hide/Show Code Dropdown */}
            <div className="border-t border-app-border bg-app-surface">
              <button
                onClick={() => setIsSqlVisible(!isSqlVisible)}
                className="w-full p-2.5 flex items-center justify-between text-xs text-app-muted hover:text-app-text transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-app-muted" />
                  <span className="font-semibold">
                    {isSqlVisible ? 'Hide code' : 'Show code'}
                  </span>
                </div>
                {isSqlVisible ? (
                  <ChevronDown className="w-3.5 h-3.5 text-app-muted" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-app-muted" />
                )}
              </button>

              {isSqlVisible && selectedResult.sqlQuery && (
                <div className="p-3 bg-app-bg border-t border-app-border overflow-x-auto max-h-56">
                  <pre className="font-mono text-[11px] text-app-text leading-relaxed">
                    {selectedResult.sqlQuery}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-xs text-app-subtle">
            <Database className="w-10 h-10 text-app-subtle mb-3" />
            <div className="font-semibold text-app-muted mb-1">
              Databricks Result Data Viewer
            </div>
            <p className="max-w-xs leading-relaxed">
              When Genie executes SQL queries on Unity Catalog, the resulting table and Photon execution code will render here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
