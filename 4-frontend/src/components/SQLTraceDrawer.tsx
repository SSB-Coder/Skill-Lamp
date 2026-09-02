import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check, Terminal, ShieldCheck, Cpu } from 'lucide-react';
import { LineageInfo } from '../api/types';

interface SQLTraceDrawerProps {
  sqlQuery: string;
  latencyMs?: number;
  rowCount?: number;
  lineage?: LineageInfo;
  defaultExpanded?: boolean;
  title?: string;
}

export const SQLTraceDrawer: React.FC<SQLTraceDrawerProps> = ({
  sqlQuery,
  latencyMs = 1240,
  rowCount = 12,
  lineage = {
    catalog: 'campus_intelligence.gold',
    pii_masked: true,
    engine: 'Serverless Photon'
  },
  defaultExpanded = false,
  title = 'Underlying SQL & Unity Catalog Lineage'
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const latencyFormatted = (latencyMs / 1000).toFixed(2) + 's';

  return (
    <div className="border border-app-border rounded-lg bg-app-bg text-xs font-mono overflow-hidden">
      {/* Drawer Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2.5 bg-app-surface hover:bg-app-surfaceRaised transition-colors duration-150 text-left border-b border-app-borderSubtle"
      >
        <div className="flex items-center space-x-2">
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-app-muted shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-app-muted shrink-0" />
          )}
          <Terminal className="w-3.5 h-3.5 text-app-accent shrink-0" />
          <span className="font-sans font-medium text-app-text text-[11px]">{title}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-app-bg border border-app-border text-app-muted">
            {latencyFormatted}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-app-bg border border-app-border text-app-muted">
            {rowCount} {rowCount === 1 ? 'row' : 'rows'}
          </span>
        </div>
      </button>

      {/* Drawer Body */}
      {isExpanded && (
        <div className="p-3 space-y-2.5">
          {/* Governance Lineage Strip */}
          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-app-borderSubtle text-[10px]">
            <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded-md bg-app-surface border border-app-border text-app-muted">
              <span className="text-app-subtle">Catalog:</span>
              <span className="text-app-text font-mono font-medium">{lineage.catalog}</span>
            </div>

            <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded-md bg-app-surface border border-app-border text-app-success">
              <ShieldCheck className="w-3 h-3 text-app-success" />
              <span>PII_MASKED</span>
            </div>

            <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded-md bg-app-surface border border-app-border text-app-muted">
              <Cpu className="w-3 h-3 text-app-muted" />
              <span>{lineage.engine}</span>
            </div>

            <button
              onClick={handleCopy}
              className="ml-auto flex items-center space-x-1 px-2 py-0.5 rounded-md bg-app-surface border border-app-border hover:border-app-accent transition-colors duration-150 text-app-muted hover:text-app-text"
              title="Copy Raw SQL Query"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-app-success" />
                  <span className="text-app-success">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-app-muted" />
                  <span>Copy SQL</span>
                </>
              )}
            </button>
          </div>

          {/* Raw SQL Query Monospace Block */}
          <div className="bg-app-bg p-2.5 rounded-lg border border-app-border overflow-x-auto max-h-48">
            <pre className="text-[11px] leading-relaxed text-app-text font-mono whitespace-pre-wrap">
              {sqlQuery}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
