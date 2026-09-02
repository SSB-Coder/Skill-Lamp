import React from 'react';
import { TierDistribution } from '../api/types';
import { Layers } from 'lucide-react';

interface TierShiftBarProps {
  baseDistribution: TierDistribution;
  simulatedDistribution: TierDistribution;
}

export const TierShiftBar: React.FC<TierShiftBarProps> = ({
  baseDistribution,
  simulatedDistribution
}) => {
  const totalSim =
    simulatedDistribution.core_tech +
    simulatedDistribution.dream +
    simulatedDistribution.super_dream;

  const corePercent = totalSim > 0 ? (simulatedDistribution.core_tech / totalSim) * 100 : 33.3;
  const dreamPercent = totalSim > 0 ? (simulatedDistribution.dream / totalSim) * 100 : 33.3;
  const superDreamPercent = totalSim > 0 ? (simulatedDistribution.super_dream / totalSim) * 100 : 33.3;

  return (
    <div className="bg-app-panel border border-app-border rounded-lg p-3.5 select-none space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded bg-app-bg border border-app-border">
            <Layers className="w-3.5 h-3.5 text-app-action" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-app-text">Tier Migration Visualizer</h4>
            <p className="text-[10px] text-app-muted font-mono">
              Recruitment Tier Migration across 6-Yr Placement Distribution
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-[11px] font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-app-muted inline-block" />
            <span className="text-app-muted">Core Tech: {simulatedDistribution.core_tech}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-app-action inline-block" />
            <span className="text-app-action">Dream: {simulatedDistribution.dream}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-app-amber inline-block" />
            <span className="text-app-amber font-semibold">
              Super Dream: {simulatedDistribution.super_dream}
            </span>
          </div>
        </div>
      </div>

      {/* Stacked Segment Bar */}
      <div className="w-full h-4 rounded bg-app-bg border border-app-border flex overflow-hidden">
        {simulatedDistribution.core_tech > 0 && (
          <div
            style={{ width: `${corePercent}%` }}
            className="bg-app-muted/60 border-r border-app-border flex items-center justify-center text-[9px] font-mono text-white"
            title={`Core Tech (${simulatedDistribution.core_tech})`}
          >
            {corePercent > 15 && `Core: ${simulatedDistribution.core_tech}`}
          </div>
        )}
        {simulatedDistribution.dream > 0 && (
          <div
            style={{ width: `${dreamPercent}%` }}
            className="bg-app-action border-r border-app-border flex items-center justify-center text-[9px] font-mono text-white"
            title={`Dream (${simulatedDistribution.dream})`}
          >
            {dreamPercent > 15 && `Dream: ${simulatedDistribution.dream}`}
          </div>
        )}
        {simulatedDistribution.super_dream > 0 && (
          <div
            style={{ width: `${superDreamPercent}%` }}
            className="bg-app-amber flex items-center justify-center text-[9px] font-mono text-white font-bold"
            title={`Super Dream (${simulatedDistribution.super_dream})`}
          >
            {superDreamPercent > 15 && `Super Dream: ${simulatedDistribution.super_dream}`}
          </div>
        )}
      </div>

      {/* Baseline vs Current Pill Strip */}
      <div className="flex items-center justify-between text-[11px] font-mono text-app-muted pt-1 border-t border-app-border/40">
        <div>
          Baseline Cohort:{' '}
          <span className="text-app-text">
            Core: {baseDistribution.core_tech} | Dream: {baseDistribution.dream} | Super Dream:{' '}
            {baseDistribution.super_dream}
          </span>
        </div>
        <div className="text-app-action font-medium">
          {simulatedDistribution.super_dream > baseDistribution.super_dream &&
            `+${simulatedDistribution.super_dream - baseDistribution.super_dream} Super Dream Tier Unlocked`}
        </div>
      </div>
    </div>
  );
};
