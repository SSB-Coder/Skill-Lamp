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
    <div className="bg-app-panel border border-app-border rounded-lg p-4 select-none space-y-3.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-app-border">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded bg-app-bg border border-app-border">
            <Compass className="w-3.5 h-3.5 text-app-action" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-app-text">
              Target Company &quot;Reverse Roadmap&quot;
            </h3>
            <p className="text-[10px] text-app-muted font-mono">
              Goal-driven prerequisite gap analysis and 1-click bridge simulation
            </p>
          </div>
        </div>

        {/* Company Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-app-muted">Target Dream Company:</span>
          <select
            value={current.name}
            onChange={(e) => {
              const target = companies.find((c) => c.name === e.target.value);
              if (target) onSelectCompany(target);
            }}
            className="bg-app-bg border border-app-border rounded px-2.5 py-1 text-xs text-app-text font-mono focus:outline-none focus:border-app-action"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded bg-app-bg border border-app-border text-xs font-mono">
        {/* Academic Threshold */}
        <div>
          <div className="text-[10px] uppercase text-app-muted mb-1">CGPA Requirement</div>
          <div className="flex items-center space-x-1.5">
            {meetsCgpa ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-app-success shrink-0" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-app-danger shrink-0" />
            )}
            <span className="font-semibold text-app-text">
              {current.min_cgpa.toFixed(1)} Min Required
            </span>
          </div>
          <div className="text-[10px] text-app-muted mt-0.5">
            Your CGPA: {studentCgpa.toFixed(2)} ({meetsCgpa ? 'Eligible' : 'Locked Block'})
          </div>
        </div>

        {/* Required Skills vs Gaps */}
        <div className="md:col-span-2">
          <div className="text-[10px] uppercase text-app-muted mb-1">Prerequisite Stack</div>
          <div className="flex flex-wrap gap-1">
            {current.required_skills.map((skill) => {
              const isMissing = current.missing_skills.includes(skill);
              return (
                <span
                  key={skill}
                  className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    isMissing
                      ? 'bg-app-danger/10 border-app-danger/30 text-app-danger font-semibold'
                      : 'bg-app-panel border-app-border text-app-success'
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
        <div className="p-3 rounded bg-app-panel border border-app-action/40 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-app-text">
            <span className="font-medium text-app-action">Missing {current.missing_skills.length} prerequisite skill(s): </span>
            <span className="font-mono text-app-muted">{current.missing_skills.join(', ')}</span>
          </div>

          <button
            type="button"
            onClick={() => onApplySkillBridge(current.missing_skills)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-app-action hover:bg-app-actionHover text-white text-xs font-medium transition-colors duration-150"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Skill Bridge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
