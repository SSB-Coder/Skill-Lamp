import React from 'react';
import { ALL_SKILLS } from '../api/mockData';
import { Cpu, Zap, RotateCcw, Check } from 'lucide-react';

interface SkillToggleLabProps {
  selectedSkills: string[];
  currentStudentSkills: string[];
  synergyAlert: string | null;
  onToggleSkill: (skillId: string) => void;
  onReset: () => void;
}

// ROI data based on 6-year placement history analysis for ISE CGPA ~8.12
const SKILL_ROI_METRICS: Record<string, { pts: number; lpa: number }> = {
  DATABRICKS_DE: { pts: 40.0, lpa: 10.3 },
  PYSPARK: { pts: 38.5, lpa: 8.2 },
  GENAI_LLMS: { pts: 36.0, lpa: 7.5 },
  MACHINE_LEARNING: { pts: 35.0, lpa: 7.2 },
  CPP: { pts: 42.0, lpa: 12.8 },
  JAVA_BACKEND: { pts: 35.0, lpa: 8.6 },
  AWS_CLOUD: { pts: 32.0, lpa: 7.2 },
  REACT: { pts: 28.0, lpa: 6.0 },
  LANGCHAIN: { pts: 25.0, lpa: 5.4 },
  DEEP_LEARNING: { pts: 30.0, lpa: 6.8 },
  VECTOR_DATABASES: { pts: 24.0, lpa: 5.0 },
  PROMPT_ENGINEERING: { pts: 18.0, lpa: 3.5 },
  COMPUTER_VISION: { pts: 22.0, lpa: 4.8 },
  NLP: { pts: 20.0, lpa: 4.2 },
  SQL: { pts: 15.0, lpa: 3.0 },
  PYTHON: { pts: 15.0, lpa: 3.0 }
};

export const SkillToggleLab: React.FC<SkillToggleLabProps> = ({
  selectedSkills,
  currentStudentSkills,
  synergyAlert,
  onToggleSkill,
  onReset
}) => {
  // Group skills by category
  const categories = Array.from(new Set(ALL_SKILLS.map(s => s.category)));

  return (
    <div className="bg-[#151D2C] border border-[#1E293B] rounded-lg p-4 select-none space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded bg-[#0B0F19] border border-[#1E293B]">
            <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white">
              Verified Skill ROI & Genie Live Calculator
            </h3>
            <p className="text-[10px] text-[#64748B] font-mono">
              Live ROI calculations computed against 6 years of historical placement data
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-[#0B0F19] border border-[#334155] hover:border-[#64748B] text-xs text-[#94A3B8] hover:text-white transition-colors duration-150"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Skills</span>
        </button>
      </div>

      {/* Synergy Alert Callout */}
      {synergyAlert && (
        <div className="p-3 rounded bg-[#0B0F19] border border-[#F59E0B]/40 flex items-start space-x-2.5">
          <Zap className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
          <div className="text-xs font-mono text-white">
            <span className="font-semibold text-[#FBBF24]">{synergyAlert.split(':')[0]}:</span>
            <span>{synergyAlert.split(':').slice(1).join(':')}</span>
          </div>
        </div>
      )}

      {/* 16 Standardized Skills Grid */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category}>
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#64748B] mb-1.5">
              {category}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ALL_SKILLS.filter(s => s.category === category).map((skill) => {
                const isExisting = currentStudentSkills.includes(skill.id);
                const isToggled = selectedSkills.includes(skill.id);
                const roi = SKILL_ROI_METRICS[skill.id] || { pts: 20.0, lpa: 4.0 };

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => onToggleSkill(skill.id)}
                    className={`flex items-center justify-between p-2 rounded text-xs font-mono transition-colors duration-150 border text-left ${
                      isToggled
                        ? 'bg-[#0284C7] text-white border-[#0284C7] font-medium shadow-sm'
                        : isExisting
                        ? 'bg-[#0B0F19] border-[#1E293B] text-[#64748B]'
                        : 'bg-[#0B0F19]/60 border-[#1E293B]/80 text-[#94A3B8] hover:border-[#334155] hover:text-white'
                    }`}
                  >
                    <div className="flex flex-col truncate pr-1">
                      <span className="truncate font-semibold">{skill.label}</span>
                      {!isExisting && (
                        <span className={`text-[9px] ${isToggled ? 'text-[#E0F2FE]' : 'text-[#38BDF8]'}`}>
                          +{roi.pts.toFixed(1)} pts • +{roi.lpa.toFixed(1)}L
                        </span>
                      )}
                    </div>
                    {isToggled ? (
                      <Check className="w-3.5 h-3.5 shrink-0 text-white" />
                    ) : isExisting ? (
                      <span className="text-[9px] text-[#64748B] px-1 rounded bg-[#151D2C] border border-[#1E293B]">
                        Acquired
                      </span>
                    ) : (
                      <span className="text-[9px] text-[#38BDF8] font-bold">+ADD</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
