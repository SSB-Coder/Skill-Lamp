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
      <div className="bg-[#151D2C] border border-[#1E293B] rounded-lg p-3.5 flex flex-col justify-between select-none shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded bg-[#0B0F19] border border-[#1E293B]">
              <TrendingUp className="w-3.5 h-3.5 text-[#38BDF8]" />
            </div>
            <span className="text-xs font-semibold text-white">Placement Probability</span>
          </div>
          {deltaProb > 0 ? (
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#FBBF24]">
              +{deltaProb.toFixed(1)} pts
            </span>
          ) : (
            <span className="text-[10px] font-mono text-[#64748B] px-2 py-0.5 rounded bg-[#0B0F19] border border-[#1E293B]">
              Select Skills to Simulate
            </span>
          )}
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono text-[#64748B]">Current</div>
            <div className="text-base font-mono font-semibold text-[#94A3B8]">{baseProb.toFixed(1)}%</div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#64748B] mx-2" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-[#38BDF8] font-semibold">
              {deltaProb > 0 ? 'Genie Calculated' : 'Baseline'}
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {deltaProb > 0 ? `${simulatedProb.toFixed(1)}%` : `${baseProb.toFixed(1)}%`}
            </div>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-[#64748B] font-mono">
          {deltaProb > 0 ? 'Calculated from 6-yr historical placement cohorts' : 'Toggle skills in the matrix or ask Genie'}
        </div>
      </div>

      {/* Card 2: Expected Compensation Delta (ΔCTC) */}
      <div className="bg-[#151D2C] border border-[#1E293B] rounded-lg p-3.5 flex flex-col justify-between select-none shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded bg-[#0B0F19] border border-[#1E293B]">
              <Award className="w-3.5 h-3.5 text-[#38BDF8]" />
            </div>
            <span className="text-xs font-semibold text-white">Expected Package (CTC)</span>
          </div>
          {deltaCtc > 0 ? (
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#FBBF24]">
              +{deltaCtc.toFixed(2)} LPA
            </span>
          ) : (
            <span className="text-[10px] font-mono text-[#64748B] px-2 py-0.5 rounded bg-[#0B0F19] border border-[#1E293B]">
              Select Skills to Simulate
            </span>
          )}
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono text-[#64748B]">Current</div>
            <div className="text-base font-mono font-semibold text-[#94A3B8]">{baseCtc.toFixed(2)} LPA</div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#64748B] mx-2" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-[#38BDF8] font-semibold">
              {deltaCtc > 0 ? 'Genie Calculated' : 'Baseline'}
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {deltaCtc > 0 ? `${simulatedCtc.toFixed(2)} LPA` : `${baseCtc.toFixed(2)} LPA`}
            </div>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-[#64748B] font-mono">
          {deltaCtc > 0 ? 'Real-time marginal expected annual compensation' : 'Toggle skills in the matrix or ask Genie'}
        </div>
      </div>

      {/* Card 3: Newly Unlocked Target Companies */}
      <div className="bg-[#151D2C] border border-[#1E293B] rounded-lg p-3.5 flex flex-col justify-between select-none shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded bg-[#0B0F19] border border-[#1E293B]">
              <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            </div>
            <span className="text-xs font-semibold text-white">Unlocked Drive Cohorts</span>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0B0F19] border border-[#1E293B] text-[#94A3B8]">
            {unlockedCompanies.length} Drives
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
          {unlockedCompanies.length === 0 ? (
            <div className="text-xs text-[#64748B] font-mono py-1">
              No new drives unlocked. Select skills below to qualify for more companies.
            </div>
          ) : (
            unlockedCompanies.map((c, idx) => (
              <div
                key={idx}
                className={`flex items-center space-x-1.5 px-2 py-1 rounded text-[11px] font-mono border ${
                  c.is_new
                    ? 'bg-[#16A34A]/20 border-[#16A34A]/40 text-white'
                    : 'bg-[#0B0F19] border-[#1E293B] text-[#94A3B8]'
                }`}
              >
                {c.is_new && (
                  <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-[#16A34A] text-white">
                    NEW
                  </span>
                )}
                <span className="font-medium text-white">{c.name}</span>
                <span className="text-[#94A3B8]">({c.ctc_lpa.toFixed(1)} LPA)</span>
              </div>
            ))
          )}
        </div>

        <div className="mt-2 text-[10px] text-[#64748B] font-mono">
          Direct campus recruitment shortlisting
        </div>
      </div>
    </div>
  );
};
