export type UserRole = 'TPO' | 'STUDENT';

export interface UserSession {
  role: UserRole;
  name: string;
  email: string;
  token: string;
  student_id?: string;
  usn?: string;
  branch?: string;
  cgpa?: number;
  active_backlogs?: number;
  readiness_score?: number;
}

export interface StudentCandidate {
  usn: string;
  name: string;
  branch: 'CSE' | 'ISE' | 'ECE' | 'AI/DS' | string;
  cgpa: number;
  active_backlogs: number;
  skills: string[];
  eligible_company_count: number;
  dream_eligible_count: number;
  super_dream_eligible_count: number;
  placement_readiness_score: number;
  email?: string;
  phone_masked?: string;
}

export interface SpreadsheetResponse {
  students: StudentCandidate[];
  total_count: number;
}

export interface JDExtractedCriteria {
  min_cgpa: number;
  max_backlogs: number;
  allowed_branches: string[];
  required_skills: string[];
  target_role: string;
  ctc_lpa: number;
  company_name?: string;
}

export interface LineageInfo {
  catalog: string;
  pii_masked: boolean;
  engine: string;
}

export interface JDMatchRequest {
  jd_text: string;
}

export interface JDMatchResponse {
  extracted_criteria: JDExtractedCriteria;
  matched_students: StudentCandidate[];
  matched_student_ids: string[];
  sql_query: string;
  latency_ms: number;
  row_count: number;
  lineage: LineageInfo;
}

export interface TargetCompany {
  name: string;
  tier: 'Core Tech' | 'Dream' | 'Super Dream';
  ctc_lpa: number;
  required_skills: string[];
  min_cgpa: number;
  is_currently_eligible: boolean;
  missing_skills: string[];
}

export interface TopROIRecommendation {
  skill: string;
  marginal_ctc_lpa: number;
  unlocked_super_dream_count: number;
  rationale: string;
}

export interface StudentProfileResponse {
  usn: string;
  name: string;
  email: string;
  branch: string;
  cgpa: number;
  active_backlogs: number;
  readiness_score: number;
  current_skills: string[];
  target_companies_available: TargetCompany[];
  top_roi_recommendation: TopROIRecommendation;
}

export interface GenieQueryRequest {
  query: string;
  persona: UserRole;
  student_id?: string;
}

export interface GenieQueryResponse {
  answer: string;
  sql_query: string;
  latency_ms: number;
  row_count: number;
  lineage: LineageInfo;
  matched_student_ids?: string[];
  thinking_steps?: string[];
  citations?: Array<{ id: string; source: string }>;
}

export interface WhatIfRequest {
  student_id: string;
  added_skills: string[];
  target_company?: string;
}

export interface UnlockedCompany {
  name: string;
  ctc_lpa: number;
  tier: string;
  is_new?: boolean;
}

export interface TierDistribution {
  core_tech: number;
  dream: number;
  super_dream: number;
}

export interface WhatIfResponse {
  base_prob: number;
  simulated_prob: number;
  delta_prob: number;
  base_ctc: number;
  simulated_ctc: number;
  delta_ctc: number;
  tier_distribution: TierDistribution;
  base_tier_distribution: TierDistribution;
  synergy_alert: string | null;
  newly_unlocked_companies: UnlockedCompany[];
  sql_query: string;
  cohort_size_analyzed: number;
}
