import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { queryGenie } from '../api/client';
import { GenieQueryResponse } from '../api/types';
import {
  Send,
  Sparkles,
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
          <strong key={idx} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded bg-[#0B0F19] border border-[#334155] font-mono text-[11px] text-[#38BDF8]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (/^\[\d+\]$/.test(part)) {
        return (
          <span
            key={idx}
            className="inline-flex items-center justify-center px-1.5 py-0.2 mx-1 rounded bg-[#0284C7]/20 text-[#38BDF8] font-mono text-[10px] font-bold border border-[#0284C7]/40 cursor-pointer hover:bg-[#0284C7]/30"
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
          <div key={`table-${i}`} className="my-3 overflow-x-auto border border-[#1E293B] rounded-lg bg-[#151D2C]">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#1E293B]/80 text-[#94A3B8] font-semibold border-b border-[#334155]">
                <tr>
                  {headerRow.map((h, hIdx) => (
                    <th key={hIdx} className="py-2 px-3 font-medium whitespace-nowrap">
                      {formatInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#1E293B]/40 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2 px-3 whitespace-nowrap text-[#F1F5F9]">
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
        <h4 key={`h3-${i}`} className="text-sm font-bold text-white mt-4 mb-2 tracking-tight">
          {formatInline(line.slice(4))}
        </h4>
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h2-${i}`} className="text-base font-bold text-white mt-5 mb-2.5 tracking-tight">
          {formatInline(line.slice(3))}
        </h3>
      );
      i++;
      continue;
    }

    // Divider
    if (line.trim() === '---') {
      elements.push(<hr key={`hr-${i}`} className="border-[#1E293B] my-3" />);
      i++;
      continue;
    }

    // Bullet items
    if (line.trim().startsWith('• ') || line.trim().startsWith('- ')) {
      const content = line.trim().slice(2);
      elements.push(
        <div key={`bullet-${i}`} className="flex items-start space-x-2 my-1 text-xs text-[#CBD5E1] pl-1 leading-relaxed">
          <span className="text-[#A855F7] leading-none mt-1">◦</span>
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
        <div key={`num-${i}`} className="flex items-start space-x-2 my-1 text-xs text-[#CBD5E1] pl-1 leading-relaxed">
          <span className="text-[#38BDF8] font-mono text-[11px] font-semibold leading-none mt-0.5">
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
        <p key={`p-${i}`} className="my-1.5 text-xs text-[#CBD5E1] leading-relaxed">
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
    <div className="flex-1 flex flex-row h-[calc(100vh-4rem)] bg-[#0B0F19] overflow-hidden">
      {/* Left / Main Chat Feed Area */}
      <div className="flex-1 flex flex-col h-full border-r border-[#1E293B] overflow-hidden">
        {/* Space Subtitle Bar */}
        <div className="px-6 py-2.5 bg-[#151D2C]/60 border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
            <span className="font-semibold text-xs text-white">
              Databricks AI/BI Genie Space
            </span>
            <span className="text-[#64748B] text-xs">•</span>
            <span className="text-xs text-[#94A3B8]">
              workspace.campus_intelligence_gold
            </span>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-[#64748B]">
            <span>Photon Serverless Engine</span>
            <span>•</span>
            <span className="text-[#16A34A] font-medium">Live Connected</span>
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
              {/* User Prompt (Purple Bubble matching Databricks) */}
              {msg.sender === 'user' ? (
                <div className="bg-[#482868] text-white px-4 py-2.5 rounded-2xl max-w-xl text-sm leading-relaxed shadow-sm font-normal">
                  {msg.text}
                </div>
              ) : (
                /* Genie Answer Body */
                <div className="w-full max-w-3xl space-y-3.5">
                  {/* Thinking Process Dropdown */}
                  {msg.thinkingSteps && msg.thinkingSteps.length > 0 && (
                    <div className="rounded-lg bg-[#151D2C]/80 border border-[#1E293B] p-3 text-xs">
                      <button
                        onClick={() =>
                          setExpandedThinking((prev) => ({
                            ...prev,
                            [msg.id]: !prev[msg.id]
                          }))
                        }
                        className="flex items-center space-x-2 text-[#94A3B8] hover:text-white transition-colors w-full font-medium"
                      >
                        {expandedThinking[msg.id] ? (
                          <ChevronDown className="w-4 h-4 text-[#A855F7]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#A855F7]" />
                        )}
                        <span className="font-semibold text-white">
                          Thinking complete
                        </span>
                      </button>

                      {expandedThinking[msg.id] && (
                        <div className="mt-2.5 pl-6 space-y-1.5 border-l-2 border-[#334155] text-xs text-[#94A3B8]">
                          {msg.thinkingSteps.map((step, idx) => (
                            <div
                              key={idx}
                              className="flex items-start space-x-2 py-0.5"
                            >
                              <span className="text-[#A855F7] mt-0.5">•</span>
                              <div className="flex items-center space-x-1.5 text-[#CBD5E1]">
                                {idx > 0 && (
                                  <Table className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
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
                        className="flex items-center space-x-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors"
                      >
                        {expandedSources[msg.id] ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                        <span>Sources ({msg.citations.length})</span>
                      </button>

                      {expandedSources[msg.id] && (
                        <div className="mt-2 space-y-1 pl-4 text-xs font-mono text-[#64748B]">
                          {msg.citations.map((c) => (
                            <div key={c.id} className="flex items-center space-x-2">
                              <span className="text-[#38BDF8]">[{c.id}]</span>
                              <span className="text-[#CBD5E1]">{c.source}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feedback & Actions Footer */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#1E293B]/60 text-xs text-[#64748B]">
                    <div className="flex items-center space-x-2">
                      <span>Is this useful?</span>
                      <button className="p-1 rounded hover:text-white transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded hover:text-white transition-colors">
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSendMessage(messages[messages.length - 2]?.text)}
                        className="p-1 rounded hover:text-white transition-colors"
                        title="Regenerate"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-white transition-colors">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-white transition-colors">
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
            <div className="flex items-center space-x-3 text-xs text-[#94A3B8]">
              <div className="flex items-center space-x-2 p-3 rounded-lg bg-[#151D2C] border border-[#1E293B]">
                <Sparkles className="w-4 h-4 text-[#A855F7] animate-spin" />
                <span className="font-mono text-white">
                  Genie querying Databricks Unity Catalog...
                </span>
                <div className="flex items-center space-x-1 pl-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse [animation-delay:200ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse [animation-delay:400ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2 bg-[#0B0F19] border-t border-[#1E293B]/40 flex items-center space-x-2 overflow-x-auto">
          <span className="text-[10px] uppercase font-semibold text-[#64748B] shrink-0">
            Suggested:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={isThinking}
              className="text-xs px-3 py-1 rounded-full bg-[#151D2C] border border-[#1E293B] hover:border-[#A855F7] hover:text-[#D8B4FE] text-[#94A3B8] transition-colors whitespace-nowrap"
            >
              {p.length > 45 ? p.slice(0, 45) + '...' : p}
            </button>
          ))}
        </div>

        {/* Databricks Input Bar */}
        <div className="p-5 bg-[#0B0F19] border-t border-[#1E293B]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center bg-[#151D2C] border border-[#334155] rounded-xl px-4 py-2.5 focus-within:border-[#A855F7] shadow-lg"
          >
            <button
              type="button"
              className="p-1 rounded text-[#64748B] hover:text-white transition-colors mr-2"
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
              className="flex-1 bg-transparent text-sm text-white placeholder-[#64748B] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking}
              className="p-1.5 rounded-lg bg-[#482868] hover:bg-[#5C3284] disabled:opacity-40 text-white transition-all ml-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 text-center text-[10px] text-[#64748B]">
            Always review the accuracy of responses. Powered by Databricks Serverless Photon.
          </div>
        </div>
      </div>

      {/* Right: Databricks Interactive Result Data Table & SQL Viewer */}
      <div className="w-[450px] lg:w-[520px] shrink-0 h-full bg-[#151D2C] flex flex-col overflow-hidden">
        {selectedResult && (selectedResult.columns || selectedResult.sqlQuery) ? (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Tab Header */}
            <div className="p-3.5 bg-[#1E293B]/70 border-b border-[#334155] flex items-center justify-between">
              <div className="flex items-center space-x-2 truncate">
                <Table className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span className="font-semibold text-xs text-white truncate">
                  {selectedResult.tableTitle || 'Query Result Set'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    copySqlToClipboard(selectedResult.sqlQuery || '')
                  }
                  className="p-1.5 rounded text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-colors"
                  title="Copy SQL Query"
                >
                  {copiedSql ? (
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Databricks Grid Table */}
            {selectedResult.columns && selectedResult.rows && selectedResult.rows.length > 0 ? (
              <div className="flex-1 overflow-auto bg-[#0B0F19]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#151D2C] text-[#94A3B8] font-medium sticky top-0 border-b border-[#334155] select-none">
                    <tr>
                      <th className="py-2 px-3 w-10 text-center font-mono text-[10px] text-[#64748B]">
                        #
                      </th>
                      {selectedResult.columns.map((col, cIdx) => (
                        <th
                          key={cIdx}
                          className="py-2 px-3.5 whitespace-nowrap font-medium text-[11.5px]"
                        >
                          <div className="flex items-center space-x-1.5">
                            <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-[#1E293B] text-[#38BDF8]">
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
                  <tbody className="divide-y divide-[#1E293B]/80 font-mono text-xs">
                    {selectedResult.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-[#151D2C]/80 transition-colors"
                      >
                        <td className="py-2 px-3 text-center text-[#64748B] text-[10.5px]">
                          {rIdx + 1}
                        </td>
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className="py-2 px-3.5 whitespace-nowrap text-[#F1F5F9]"
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
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-xs text-[#64748B] bg-[#0B0F19]">
                <Database className="w-8 h-8 text-[#334155] mb-2" />
                <span className="text-[#94A3B8] font-medium">Aggregated Analytical Query</span>
                <span className="text-[11px] mt-1">This query produced a direct executive summary and metrics.</span>
              </div>
            )}

            {/* Hide/Show Code Dropdown */}
            <div className="border-t border-[#334155] bg-[#151D2C]">
              <button
                onClick={() => setIsSqlVisible(!isSqlVisible)}
                className="w-full p-2.5 flex items-center justify-between text-xs text-[#94A3B8] hover:text-white transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-[#38BDF8]" />
                  <span className="font-semibold">
                    {isSqlVisible ? 'Hide code' : 'Show code'}
                  </span>
                </div>
                {isSqlVisible ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>

              {isSqlVisible && selectedResult.sqlQuery && (
                <div className="p-3 bg-[#0B0F19] border-t border-[#1E293B] overflow-x-auto max-h-56">
                  <pre className="font-mono text-[11px] text-[#38BDF8] leading-relaxed">
                    {selectedResult.sqlQuery}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-xs text-[#64748B]">
            <Database className="w-10 h-10 text-[#334155] mb-3" />
            <div className="font-semibold text-[#94A3B8] mb-1">
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
