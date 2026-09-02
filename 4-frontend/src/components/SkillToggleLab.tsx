import React, { useMemo } from 'react';
import { ALL_SKILLS, normalizeSkill } from '../api/constants';
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

  const normalizedCurrent = useMemo(() => {
    return new Set(currentStudentSkills.map(s => normalizeSkill(s)));
  }, [currentStudentSkills]);

  const normalizedSelected = useMemo(() => {
    return new Set(selectedSkills.map(s => normalizeSkill(s)));
  }, [selectedSkills]);

  return (
    <div className="bg-app-surface border border-app-border rounded-lg p-4 select-none space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-app-border">
        <div className="flex items-center space-x-2.5">
          <Cpu className="w-4 h-4 text-app-muted shrink-0" />
          <div>
            <h3 className="text-xs font-semibold text-app-text">
              Verified Skill ROI & Genie Live Calculator
            </h3>
            <p className="text-[10px] text-app-subtle font-mono">
              Live ROI calculations computed against 6 years of historical placement data
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-app-bg border border-app-border hover:border-app-borderSubtle text-xs text-app-muted hover:text-app-text transition-colors duration-150"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Skills</span>
        </button>
      </div>

      {/* Synergy Alert Callout */}
      {synergyAlert && (
        <div className="p-3 rounded-md bg-app-bg border border-app-warning/40 flex items-start space-x-2.5">
          <Zap className="w-4 h-4 text-app-warning shrink-0 mt-0.5" />
          <div className="text-xs font-mono text-app-text">
            <span className="font-semibold text-app-warning">{synergyAlert.split(':')[0]}:</span>
            <span>{synergyAlert.split(':').slice(1).join(':')}</span>
          </div>
        </div>
      )}

      {/* Standardized Skills Grid (Clean Minimal Buttons) */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category}>
            <div className="text-[10px] uppercase font-mono tracking-wider text-app-subtle mb-1.5">
              {category}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ALL_SKILLS.filter(s => s.category === category).map((skill) => {
                const normId = normalizeSkill(skill.id);
                const isExisting = normalizedCurrent.has(normId);
                const isToggled = normalizedSelected.has(normId);

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => onToggleSkill(skill.id)}
                    disabled={isExisting}
                    className={`flex items-center justify-between p-2.5 rounded-md text-xs font-mono transition-colors duration-150 border text-left ${
                      isToggled
                        ? 'bg-app-accent text-app-bg border-app-accent font-semibold'
                        : isExisting
                        ? 'bg-app-bg border-app-border text-app-subtle cursor-default'
                        : 'bg-app-bg border-app-border text-app-muted hover:border-app-borderSubtle hover:text-app-text'
                    }`}
                  >
                    <span className="truncate pr-1 font-medium">{skill.label}</span>
                    {isToggled ? (
                      <Check className="w-3.5 h-3.5 shrink-0 text-app-bg" />
                    ) : isExisting ? (
                      <span className="text-[9px] text-app-subtle px-1.5 py-0.5 rounded-md bg-app-surface border border-app-border">
                        Acquired
                      </span>
                    ) : (
                      <span className="text-[10px] text-app-accent flex items-center space-x-0.5">
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
