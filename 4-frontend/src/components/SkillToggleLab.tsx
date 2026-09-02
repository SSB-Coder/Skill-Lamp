import React from 'react';
import { ALL_SKILLS } from '../api/mockData';
import { Cpu, Zap, RotateCcw, Check, Plus } from 'lucide-react';

interface SkillToggleLabProps {
  selectedSkills: string[];
  currentStudentSkills: string[];
  synergyAlert: string | null;
  onToggleSkill: (skillId: string) => void;
  onReset: () => void;
}

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

      {/* 16 Standardized Skills Grid (Clean Minimal Buttons) */}
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

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => onToggleSkill(skill.id)}
                    className={`flex items-center justify-between p-2.5 rounded text-xs font-mono transition-colors duration-150 border text-left ${
                      isToggled
                        ? 'bg-[#0284C7] text-white border-[#0284C7] font-medium shadow-sm'
                        : isExisting
                        ? 'bg-[#0B0F19] border-[#1E293B] text-[#64748B]'
                        : 'bg-[#0B0F19] border-[#1E293B] text-[#94A3B8] hover:border-[#334155] hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-1 font-medium">{skill.label}</span>
                    {isToggled ? (
                      <Check className="w-3.5 h-3.5 shrink-0 text-white" />
                    ) : isExisting ? (
                      <span className="text-[9px] text-[#64748B] px-1 py-0.2 rounded bg-[#151D2C] border border-[#1E293B]">
                        Acquired
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#38BDF8] flex items-center space-x-0.5">
                        <Plus className="w-3 h-3" />
                        <span>ADD</span>
                      </span>
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
