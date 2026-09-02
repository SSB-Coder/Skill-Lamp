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
  GraduationCap
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
      await runCalculation(p.usn, []);
    } catch (err) {
      console.error('Error loading student profile:', err);
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

  if (isLoadingProfile || !profile || !calculationResult) {
    return (
      <div className="flex-1 h-[calc(100vh-4rem)] flex items-center justify-center bg-app-bg text-app-muted font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-app-muted animate-pulse" />
          <span>Loading placement intelligence...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-row h-[calc(100vh-4rem)] bg-app-bg overflow-hidden">
      {/* Left/Main: Student Career Analytics & Real-Time Return Calculator */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 space-y-4">
        {/* 1. Student Profile Header Card */}
        <div className="bg-app-surface border border-app-border rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
          {/* Student Info */}
          <div className="flex items-center space-x-3.5">
            <GraduationCap className="w-6 h-6 text-app-muted shrink-0" />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-app-text tracking-tight">{profile.name}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-app-bg border border-app-border text-app-muted flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-app-subtle" />
                  <span>Student Profile: {profile.usn}</span>
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-app-muted font-mono mt-0.5">
                <span>Branch: <strong className="text-app-text">{profile.branch}</strong></span>
                <span>•</span>
                <span>CGPA: <strong className="text-app-text">{profile.cgpa.toFixed(2)}</strong></span>
                <span>•</span>
                <span>Backlogs: <strong className="text-app-success">{profile.active_backlogs}</strong></span>
              </div>
            </div>
          </div>

          {/* Placement Readiness Badge */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono text-app-subtle">Placement Readiness Index</div>
              <div className="text-lg font-mono font-bold text-app-accent">
                {profile.readiness_score.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>



        {/* 3. Hero Placement & Compensation Calculation Cards */}
        <HeroDeltaCards
          baseProb={calculationResult.base_prob}
          simulatedProb={calculationResult.simulated_prob}
          deltaProb={calculationResult.delta_prob}
          baseCtc={calculationResult.base_ctc}
          simulatedCtc={calculationResult.simulated_ctc}
          deltaCtc={calculationResult.delta_ctc}
          unlockedCompanies={
            calculationResult.newly_unlocked_companies && calculationResult.newly_unlocked_companies.length > 0
              ? calculationResult.newly_unlocked_companies
              : (profile.target_companies_available || [])
                  .filter((c) => c.is_currently_eligible)
                  .map((c) => ({
                    name: c.name,
                    ctc_lpa: c.ctc_lpa,
                    tier: c.tier,
                    is_new: false
                  }))
          }
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

      {/* Right: Dedicated Genie Career Advisor Copilot */}
      <div className="w-[360px] lg:w-[410px] shrink-0 h-full border-l border-app-border bg-app-surface flex flex-col">
        <SidebarCopilot
          onFilterSync={() => {}}
          activeStudentId={profile.usn}
          activeStudentProfile={profile}
        />
      </div>
    </div>
  );
};
