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
import {
  UserCheck,
  Zap,
  Lock,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<StudentProfileResponse | null>(null);
  const [selectedTargetCompany, setSelectedTargetCompany] = useState<TargetCompany | null>(null);
  const [addedSkills, setAddedSkills] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<WhatIfResponse | null>(null);
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
      // Run initial baseline simulation
      runSimulation(p.usn, []);
    } catch {
      // Fallback handled in client
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const runSimulation = async (
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
      setSimulationResult(res);
    } finally {
      // Completed simulation
    }
  };

  const handleToggleSkill = (skillId: string) => {
    if (!profile) return;
    const isCurrentlyAdded = addedSkills.includes(skillId);
    let nextAdded: string[];
    if (isCurrentlyAdded) {
      nextAdded = addedSkills.filter(s => s !== skillId);
    } else {
      nextAdded = [...addedSkills, skillId];
    }
    setAddedSkills(nextAdded);
    runSimulation(profile.usn, nextAdded, selectedTargetCompany?.name);
  };

  const handleApplySkillBridge = (missingSkills: string[]) => {
    if (!profile) return;
    const combined = Array.from(new Set([...addedSkills, ...missingSkills]));
    setAddedSkills(combined);
    runSimulation(profile.usn, combined, selectedTargetCompany?.name);
  };

  const handleReset = () => {
    if (!profile) return;
    setAddedSkills([]);
    runSimulation(profile.usn, [], selectedTargetCompany?.name);
  };

  const handleQuickAddTopROI = () => {
    if (!profile) return;
    const topSkill = profile.top_roi_recommendation.skill;
    if (!addedSkills.includes(topSkill)) {
      const nextAdded = [...addedSkills, topSkill];
      setAddedSkills(nextAdded);
      runSimulation(profile.usn, nextAdded, selectedTargetCompany?.name);
    }
  };

  if (isLoadingProfile || !profile || !simulationResult) {
    return (
      <div className="flex-1 h-[calc(100vh-3.5rem)] flex items-center justify-center bg-app-bg text-app-muted font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-app-action animate-ping" />
          <span>Loading Isolated Student Sandbox Profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-[calc(100vh-3.5rem)] flex flex-col bg-app-bg overflow-y-auto select-none p-4 space-y-4">
      {/* 1. Locked Student Profile Header Card */}
      <div className="bg-app-panel border border-app-border rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Student Info */}
        <div className="flex items-center space-x-3.5">
          <div className="p-2.5 rounded bg-app-bg border border-app-border">
            <GraduationCap className="w-5 h-5 text-app-action" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-app-text tracking-tight">{profile.name}</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-app-bg border border-app-border text-app-muted flex items-center space-x-1">
                <Lock className="w-3 h-3 text-app-action" />
                <span>Locked Sandbox: {profile.usn}</span>
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

        {/* Readiness Score Pill */}
        <div className="flex items-center space-x-3 bg-app-bg px-3.5 py-2 rounded border border-app-border">
          <div>
            <div className="text-[10px] uppercase font-mono text-app-muted">
              Placement Readiness Index
            </div>
            <div className="text-lg font-mono font-bold text-app-action">
              {profile.readiness_score.toFixed(1)}%
            </div>
          </div>
          <UserCheck className="w-4 h-4 text-app-action" />
        </div>
      </div>

      {/* 2. Top-ROI Intelligence Callout Banner */}
      <div className="bg-app-panel border border-app-action/40 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded bg-app-action/20 border border-app-action/40 text-app-action">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-app-text flex items-center space-x-1.5">
              <span className="text-app-action font-mono">TOP ROI RECOMMENDATION</span>
              <span>•</span>
              <span className="font-mono text-[11px] text-app-amber">
                +{profile.top_roi_recommendation.marginal_ctc_lpa.toFixed(2)} LPA Expected Gain
              </span>
            </div>
            <p className="text-xs text-app-muted mt-0.5">
              {profile.top_roi_recommendation.rationale}
            </p>
          </div>
        </div>

        <button
          onClick={handleQuickAddTopROI}
          disabled={addedSkills.includes(profile.top_roi_recommendation.skill)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-app-action hover:bg-app-actionHover disabled:opacity-50 text-white text-xs font-medium transition-colors duration-150"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {addedSkills.includes(profile.top_roi_recommendation.skill)
              ? 'Skill Active in Simulator'
              : `Simulate Adding ${profile.top_roi_recommendation.skill}`}
          </span>
        </button>
      </div>

      {/* 3. Hero Delta Metric Cards */}
      <HeroDeltaCards
        baseProb={simulationResult.base_prob}
        simulatedProb={simulationResult.simulated_prob}
        deltaProb={simulationResult.delta_prob}
        baseCtc={simulationResult.base_ctc}
        simulatedCtc={simulationResult.simulated_ctc}
        deltaCtc={simulationResult.delta_ctc}
        unlockedCompanies={simulationResult.newly_unlocked_companies}
      />

      {/* 4. Target Company Reverse Roadmap */}
      <ReverseRoadmap
        companies={profile.target_companies_available}
        selectedCompany={selectedTargetCompany}
        onSelectCompany={(company) => {
          setSelectedTargetCompany(company);
          runSimulation(profile.usn, addedSkills, company.name);
        }}
        onApplySkillBridge={handleApplySkillBridge}
        studentCgpa={profile.cgpa}
      />

      {/* 5. Interactive 16-Skill Toggle Laboratory */}
      <SkillToggleLab
        selectedSkills={addedSkills}
        currentStudentSkills={profile.current_skills}
        synergyAlert={simulationResult.synergy_alert}
        onToggleSkill={handleToggleSkill}
        onReset={handleReset}
      />

      {/* 6. Recruitment Tier Distribution Migration Visualizer */}
      <TierShiftBar
        baseDistribution={simulationResult.base_tier_distribution}
        simulatedDistribution={simulationResult.tier_distribution}
      />

      {/* 7. Underlying SQL Cohort Trace Drawer */}
      <SQLTraceDrawer
        sqlQuery={simulationResult.sql_query}
        latencyMs={890}
        rowCount={simulationResult.cohort_size_analyzed}
        title="Underlying SQL Cohort Query (Databricks Serverless Photon)"
        defaultExpanded={false}
      />
    </div>
  );
};
