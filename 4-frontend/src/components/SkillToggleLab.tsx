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
    <div className="bg-app-panel border border-app-border rounded-lg p-4 select-none space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-app-border">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded bg-app-bg border border-app-border">
            <Cpu className="w-3.5 h-3.5 text-app-action" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-app-text">
              Interactive 16-Skill Toggle Laboratory
            </h3>
            <p className="text-[10px] text-app-muted font-mono">
              Live ROI What-If simulator against 6 years of historical cohort placements
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center space-x-1 px-2.5 py-1 rounded bg-app-bg border border-app-border hover:border-app-borderLight text-xs text-app-muted hover:text-app-text transition-colors duration-150"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Toggles</span>
        </button>
      </div>

      {/* Synergy Alert Callout */}
      {synergyAlert && (
        <div className="p-3 rounded bg-app-bg border border-app-amber/40 flex items-start space-x-2.5">
          <Zap className="w-4 h-4 text-app-amber shrink-0 mt-0.5" />
          <div className="text-xs font-mono text-app-text">
            <span className="font-semibold text-app-amber">{synergyAlert.split(':')[0]}:</span>
            <span>{synergyAlert.split(':').slice(1).join(':')}</span>
          </div>
        </div>
      )}

      {/* 16 Standardized Skills Grid */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category}>
            <div className="text-[10px] uppercase font-mono tracking-wider text-app-muted mb-1.5">
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
                    className={`flex items-center justify-between p-2 rounded text-xs font-mono transition-colors duration-150 border text-left ${
                      isToggled
                        ? 'bg-app-action text-white border-app-action font-medium'
                        : isExisting
                        ? 'bg-app-bg border-app-border text-app-muted'
                        : 'bg-app-bg/60 border-app-border/80 text-app-muted hover:border-app-borderLight hover:text-app-text'
                    }`}
                  >
                    <span className="truncate pr-1">{skill.label}</span>
                    {isToggled ? (
                      <Check className="w-3.5 h-3.5 shrink-0 text-white" />
                    ) : isExisting ? (
                      <span className="text-[9px] text-app-muted px-1 rounded bg-app-panel border border-app-border">
                        Locked
                      </span>
                    ) : (
                      <span className="text-[9px] text-app-muted/60">+ Add</span>
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
