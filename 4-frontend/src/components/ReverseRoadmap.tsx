import React from 'react';
import { TargetCompany } from '../api/types';
import { Compass, Sparkles, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface ReverseRoadmapProps {
  companies: TargetCompany[];
  selectedCompany: TargetCompany | null;
  onSelectCompany: (company: TargetCompany) => void;
  onApplySkillBridge: (missingSkills: string[]) => void;
  studentCgpa: number;
}

export const ReverseRoadmap: React.FC<ReverseRoadmapProps> = ({
  companies,
  selectedCompany,
  onSelectCompany,
  onApplySkillBridge,
  studentCgpa
}) => {
  if (!companies || companies.length === 0) return null;

  const current = selectedCompany || companies[0];
  const meetsCgpa = studentCgpa >= current.min_cgpa;
  const hasMissingSkills = current.missing_skills && current.missing_skills.length > 0;

  return (
    <div className="bg-[#151D2C] border border-[#1E293B] rounded-lg p-4 select-none space-y-3.5 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1E293B]">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded bg-[#0B0F19] border border-[#1E293B]">
            <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white">
              Target Company &quot;Reverse Roadmap&quot;
            </h3>
            <p className="text-[10px] text-[#64748B] font-mono">
              Goal-driven prerequisite gap analysis and 1-click real-time Genie return calculation
            </p>
          </div>
        </div>

        {/* Company Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#94A3B8]">Target Dream Company:</span>
          <select
            value={current.name}
            onChange={(e) => {
              const target = companies.find((c) => c.name === e.target.value);
              if (target) onSelectCompany(target);
            }}
            className="bg-[#0B0F19] border border-[#334155] rounded px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#A855F7]"
          >
            {companies.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.ctc_lpa.toFixed(1)} LPA • {c.tier})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prerequisite & Gap Diagnostic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded bg-[#0B0F19] border border-[#1E293B] text-xs font-mono">
        {/* Academic Threshold */}
        <div>
          <div className="text-[10px] uppercase text-[#64748B] mb-1">CGPA Requirement</div>
          <div className="flex items-center space-x-1.5">
            {meetsCgpa ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
            )}
            <span className="font-semibold text-white">
              {current.min_cgpa.toFixed(1)} Min Required
            </span>
          </div>
          <div className="text-[10px] text-[#64748B] mt-0.5">
            Your CGPA: {studentCgpa.toFixed(2)} ({meetsCgpa ? 'Eligible' : 'Locked Block'})
          </div>
        </div>

        {/* Required Skills vs Gaps */}
        <div className="md:col-span-2">
          <div className="text-[10px] uppercase text-[#64748B] mb-1">Prerequisite Stack</div>
          <div className="flex flex-wrap gap-1">
            {current.required_skills.map((skill) => {
              const isMissing = current.missing_skills.includes(skill);
              return (
                <span
                  key={skill}
                  className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    isMissing
                      ? 'bg-[#EF4444]/15 border-[#EF4444]/40 text-[#FCA5A5] font-semibold'
                      : 'bg-[#151D2C] border-[#1E293B] text-[#86EFAC]'
                  }`}
                >
                  {isMissing ? `✕ ${skill}` : `✓ ${skill}`}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* 1-Click Skill Bridge Action Callout */}
      {hasMissingSkills && (
        <div className="p-3 rounded bg-[#151D2C] border border-[#38BDF8]/40 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-white">
            <span className="font-medium text-[#38BDF8]">Missing {current.missing_skills.length} prerequisite skill(s): </span>
            <span className="font-mono text-[#94A3B8]">{current.missing_skills.join(', ')}</span>
          </div>

          <button
            type="button"
            onClick={() => onApplySkillBridge(current.missing_skills)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold transition-colors duration-150 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>Calculate Skill Returns with Genie</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
