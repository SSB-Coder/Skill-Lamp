import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getStudentMe, simulateWhatIf } from '../api/client';
import {
  StudentProfileResponse,
  WhatIfResponse,
  TargetCompany
} from '../api/types';
import { ReverseRoadmap } from './ReverseRoadmap';
import { SkillToggleLab } from './SkillToggleLab';
import { HeroDeltaCards } from './HeroDeltaCards';
import { TierShiftBar } from './TierShiftBar';
import { SQLTraceDrawer } from './SQLTraceDrawer';
import { SidebarCopilot } from './SidebarCopilot';
import {
  Lock,
  GraduationCap,
  Sparkles,
  Zap
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfileResponse | null>(null);
  const [selectedTargetCompany, setSelectedTargetCompany] = useState<TargetCompany | null>(null);
  const [addedSkills, setAddedSkills] = useState<string[]>([]);
  const [calculationResult, setCalculationResult] = useState<WhatIfResponse | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Load student profile strictly isolated to authenticated user
  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const p = await getStudentMe(user?.student_id || 'USN_2025_042');
      setProfile(p);
      if (p.target_companies_available && p.target_companies_available.length > 0) {
        setSelectedTargetCompany(p.target_companies_available[0]);
      }
      // Run initial baseline calculation
      runCalculation(p.usn, []);
    } catch {
      // Fallback handled in client
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const runCalculation = async (
    studentId: string,
    skills: string[],
    targetComp?: string
  ) => {
    try {
      const res = await simulateWhatIf({
        student_id: studentId,
        added_skills: skills,
        target_company: targetComp
      });
      setCalculationResult(res);
    } finally {
      // Completed calculation
    }
  };

  const handleToggleSkill = (skillId: string) => {
    if (!profile) return;
    const isCurrentlyAdded = addedSkills.includes(skillId);
    let nextAdded: string[];
    if (isCurrentlyAdded) {
      nextAdded = addedSkills.filter((s) => s !== skillId);
    } else {
      nextAdded = [...addedSkills, skillId];
    }
    setAddedSkills(nextAdded);
    runCalculation(profile.usn, nextAdded, selectedTargetCompany?.name);
  };

  const handleApplySkillBridge = (missingSkills: string[]) => {
    if (!profile) return;
    const combined = Array.from(new Set([...addedSkills, ...missingSkills]));
    setAddedSkills(combined);
    runCalculation(profile.usn, combined, selectedTargetCompany?.name);
  };

  const handleReset = () => {
    if (!profile) return;
    setAddedSkills([]);
    runCalculation(profile.usn, [], selectedTargetCompany?.name);
  };

  const handleQuickAddTopROI = () => {
    if (!profile) return;
    const topSkill = profile.top_roi_recommendation.skill;
    if (!addedSkills.includes(topSkill)) {
      const nextAdded = [...addedSkills, topSkill];
      setAddedSkills(nextAdded);
      runCalculation(profile.usn, nextAdded, selectedTargetCompany?.name);
    }
  };

  if (isLoadingProfile || !profile || !calculationResult) {
    return (
      <div className="flex-1 h-[calc(100vh-4rem)] flex items-center justify-center bg-[#0B0F19] text-[#94A3B8] font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-ping" />
          <span>Connecting to Databricks Placement Intelligence...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-row h-[calc(100vh-4rem)] bg-[#0B0F19] overflow-hidden">
      {/* Left/Main: Student Career Analytics & Real-Time Return Calculator */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 space-y-4">
        {/* 1. Student Profile Header Card */}
        <div className="bg-[#151D2C] border border-[#1E293B] rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          {/* Student Info */}
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded bg-[#0B0F19] border border-[#1E293B]">
              <GraduationCap className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white tracking-tight">{profile.name}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B0F19] border border-[#1E293B] text-[#94A3B8] flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-[#38BDF8]" />
                  <span>Student Profile: {profile.usn}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-[#94A3B8] font-mono mt-0.5">
                <span>Branch: <strong className="text-white">{profile.branch}</strong></span>
                <span>•</span>
                <span>CGPA: <strong className="text-white">{profile.cgpa.toFixed(2)}</strong></span>
                <span>•</span>
                <span>Backlogs: <strong className="text-[#16A34A]">{profile.active_backlogs}</strong></span>
              </div>
            </div>
          </div>

          {/* Placement Readiness Badge */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono text-[#64748B]">Placement Readiness Index</div>
              <div className="text-lg font-mono font-bold text-[#38BDF8]">
                {profile.readiness_score.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* 2. Top ROI Hero Recommendation Banner */}
        <div className="p-3.5 rounded-lg bg-[#151D2C] border border-[#38BDF8]/30 flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded bg-[#0B0F19] border border-[#38BDF8]/40 text-[#38BDF8]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#38BDF8] tracking-wide uppercase font-mono">
                  Top ROI Recommendation
                </span>
                <span className="text-xs font-mono font-bold text-[#FBBF24]">
                  +{profile.top_roi_recommendation.marginal_ctc_lpa.toFixed(2)} LPA Expected Gain
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1] mt-0.5">
                {profile.top_roi_recommendation.rationale}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAddTopROI}
            disabled={addedSkills.includes(profile.top_roi_recommendation.skill)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded text-xs font-semibold transition-colors shadow-sm ${
              addedSkills.includes(profile.top_roi_recommendation.skill)
                ? 'bg-[#0B0F19] border border-[#1E293B] text-[#64748B] cursor-not-allowed'
                : 'bg-[#0284C7] hover:bg-[#0369A1] text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>
              {addedSkills.includes(profile.top_roi_recommendation.skill)
                ? `Calculated (${profile.top_roi_recommendation.skill})`
                : `Calculate ${profile.top_roi_recommendation.skill} Gain`}
            </span>
          </button>
        </div>

        {/* 3. Hero Placement & Compensation Calculation Cards */}
        <HeroDeltaCards
          baseProb={calculationResult.base_prob}
          simulatedProb={calculationResult.simulated_prob}
          deltaProb={calculationResult.delta_prob}
          baseCtc={calculationResult.base_ctc}
          simulatedCtc={calculationResult.simulated_ctc}
          deltaCtc={calculationResult.delta_ctc}
          unlockedCompanies={calculationResult.newly_unlocked_companies}
        />

        {/* 4. Target Company Reverse Roadmap */}
        <ReverseRoadmap
          companies={profile.target_companies_available}
          selectedCompany={selectedTargetCompany}
          onSelectCompany={(c) => {
            setSelectedTargetCompany(c);
            runCalculation(profile.usn, addedSkills, c.name);
          }}
          onApplySkillBridge={handleApplySkillBridge}
          studentCgpa={profile.cgpa}
        />

        {/* 5. Verified Skills & Real-Time Return Calculator Grid */}
        <SkillToggleLab
          selectedSkills={addedSkills}
          currentStudentSkills={profile.current_skills}
          synergyAlert={calculationResult.synergy_alert}
          onToggleSkill={handleToggleSkill}
          onReset={handleReset}
        />

        {/* 6. Tier Shift Distribution Bar */}
        <TierShiftBar
          baseDistribution={calculationResult.base_tier_distribution}
          simulatedDistribution={calculationResult.tier_distribution}
        />

        {/* 7. Historical SQL Trace & Unity Catalog Lineage */}
        <SQLTraceDrawer
          sqlQuery={calculationResult.sql_query}
          rowCount={calculationResult.cohort_size_analyzed}
        />
      </div>

      {/* Right: Dedicated Genie Career Advisor Chatbot */}
      <div className="w-[360px] lg:w-[410px] shrink-0 h-full border-l border-[#1E293B] bg-[#151D2C] flex flex-col">
        <SidebarCopilot
          onFilterSync={() => {}}
          activeStudentId={profile.usn}
          activeStudentProfile={profile}
        />
      </div>
    </div>
  );
};
