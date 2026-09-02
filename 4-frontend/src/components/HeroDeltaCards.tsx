import React from 'react';
import { UnlockedCompany } from '../api/types';
import { TrendingUp, Award, Building2, ArrowRight } from 'lucide-react';

interface HeroDeltaCardsProps {
  baseProb: number;
  simulatedProb: number;
  deltaProb: number;
  baseCtc: number;
  simulatedCtc: number;
  deltaCtc: number;
  unlockedCompanies: UnlockedCompany[];
}

export const HeroDeltaCards: React.FC<HeroDeltaCardsProps> = ({
  baseProb,
  simulatedProb,
  deltaProb,
  baseCtc,
  simulatedCtc,
  deltaCtc,
  unlockedCompanies
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Card 1: Placement Probability Delta (ΔP) */}
      <div className="bg-app-surface border border-app-border rounded-lg p-3.5 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between pb-2 border-b border-app-border">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-3.5 h-3.5 text-app-muted" />
            <span className="text-xs font-semibold text-app-text">Placement Probability</span>
          </div>
          {deltaProb > 0 ? (
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-app-warning/20 border border-app-warning/40 text-app-warning">
              +{deltaProb.toFixed(1)} pts
            </span>
          ) : (
            <span className="text-[10px] font-mono text-app-subtle px-2 py-0.5 rounded-md bg-app-bg border border-app-border">
              Select Skills to Simulate
            </span>
          )}
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono text-app-subtle">Current</div>
            <div className="text-base font-mono font-semibold text-app-muted">{baseProb.toFixed(1)}%</div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-app-subtle mx-2" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-app-accent font-semibold">
              {deltaProb > 0 ? 'Genie Calculated' : 'Baseline'}
            </div>
            <div className="text-2xl font-mono font-bold text-app-text">
              {deltaProb > 0 ? `${simulatedProb.toFixed(1)}%` : `${baseProb.toFixed(1)}%`}
            </div>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-app-subtle font-mono">
          {deltaProb > 0 ? 'Calculated from 6-yr historical placement cohorts' : 'Toggle skills in the matrix or ask Genie'}
        </div>
      </div>

      {/* Card 2: Expected Compensation Delta (ΔCTC) */}
      <div className="bg-app-surface border border-app-border rounded-lg p-3.5 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between pb-2 border-b border-app-border">
          <div className="flex items-center space-x-2">
            <Award className="w-3.5 h-3.5 text-app-muted" />
            <span className="text-xs font-semibold text-app-text">Expected Package (CTC)</span>
          </div>
          {deltaCtc > 0 ? (
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-app-warning/20 border border-app-warning/40 text-app-warning">
              +{deltaCtc.toFixed(2)} LPA
            </span>
          ) : (
            <span className="text-[10px] font-mono text-app-subtle px-2 py-0.5 rounded-md bg-app-bg border border-app-border">
              Select Skills to Simulate
            </span>
          )}
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono text-app-subtle">Current</div>
            <div className="text-base font-mono font-semibold text-app-muted">{baseCtc.toFixed(2)} LPA</div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-app-subtle mx-2" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-app-accent font-semibold">
              {deltaCtc > 0 ? 'Genie Calculated' : 'Baseline'}
            </div>
            <div className="text-2xl font-mono font-bold text-app-text">
              {deltaCtc > 0 ? `${simulatedCtc.toFixed(2)} LPA` : `${baseCtc.toFixed(2)} LPA`}
            </div>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-app-subtle font-mono">
          {deltaCtc > 0 ? 'Real-time marginal expected annual compensation' : 'Toggle skills in the matrix or ask Genie'}
        </div>
      </div>

      {/* Card 3: Newly Unlocked Target Companies */}
      <div className="bg-app-surface border border-app-border rounded-lg p-3.5 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between pb-2 border-b border-app-border">
          <div className="flex items-center space-x-2">
            <Building2 className="w-3.5 h-3.5 text-app-muted" />
            <span className="text-xs font-semibold text-app-text">Unlocked Drive Cohorts</span>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-app-bg border border-app-border text-app-muted">
            {unlockedCompanies.length} Drives
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
          {unlockedCompanies.length === 0 ? (
            <div className="text-xs text-app-subtle font-mono py-1">
              No new drives unlocked. Select skills below to qualify for more companies.
            </div>
          ) : (
            unlockedCompanies.map((c, idx) => (
              <div
                key={idx}
                className={`flex items-center space-x-1.5 px-2 py-1 rounded-md text-[11px] font-mono border ${
                  c.is_new
                    ? 'bg-app-surfaceRaised border-app-success/40 text-app-text'
                    : 'bg-app-bg border-app-border text-app-muted'
                }`}
              >
                {c.is_new && (
                  <span className="text-[9px] font-bold px-1 py-0.2 rounded-md bg-app-success text-app-bg">
                    NEW
                  </span>
                )}
                <span className="font-medium text-app-text">{c.name}</span>
                <span className="text-app-muted">({c.ctc_lpa.toFixed(1)} LPA)</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-2 text-[10px] text-app-subtle font-mono">
          Direct campus recruitment shortlisting
        </div>
      </div>
    </div>
  );
};
