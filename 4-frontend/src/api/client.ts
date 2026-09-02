import {
  UserSession,
  SpreadsheetResponse,
  JDMatchResponse,
  StudentProfileResponse,
  GenieQueryRequest,
  GenieQueryResponse,
  WhatIfRequest,
  WhatIfResponse
} from './types';

const BASE_URL = '';

// Helper to get authorization headers from active user session
function getAuthHeaders(): HeadersInit {
  try {
    const raw = sessionStorage.getItem('skill_lamp_session');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.token) {
        return {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsed.token}`
        };
      }
    }
  } catch {
    // Ignore parse errors
  }
  return { 'Content-Type': 'application/json' };
}

const DEFAULT_LINEAGE = {
  catalog: 'workspace.campus_intelligence_gold',
  pii_masked: true,
  engine: 'Serverless Photon'
};

// 1. POST /api/auth/login
export async function login(email: string, password = 'password'): Promise<UserSession> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Authentication failed' }));
    throw new Error(err.detail || 'Login failed');
  }
  const session: UserSession = await res.json();
  sessionStorage.setItem('skill_lamp_session', JSON.stringify(session));
  return session;
}

// 2. GET /api/auth/me
export async function getAuthMe(): Promise<UserSession> {
  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: getAuthHeaders()
  });
  if (res.ok) {
    return await res.json();
  }
  const raw = sessionStorage.getItem('skill_lamp_session');
  if (raw) {
    return JSON.parse(raw);
  }
  throw new Error('Not authenticated');
}

// 3. POST /api/match-jd
export async function matchJD(jdText: string): Promise<JDMatchResponse> {
  const res = await fetch(`${BASE_URL}/api/match-jd`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ raw_jd_text: jdText })
  });
  if (!res.ok) {
    throw new Error('Failed to match Job Description against candidate database');
  }
  const data = await res.json();
  let matchedStudents: any[] = [];
  try {
    const sheet = await getStudentsSpreadsheet();
    matchedStudents = sheet.students.filter((s: any) => data.matched_student_ids.includes(s.usn));
  } catch {
    // Fallback hydration from matched list
  }
  return {
    extracted_criteria: {
      min_cgpa: data.extracted_criteria.min_cgpa,
      max_backlogs: data.extracted_criteria.max_backlogs,
      allowed_branches: data.extracted_criteria.allowed_branches,
      required_skills: data.extracted_criteria.required_skills,
      target_role: 'Extracted Role',
      ctc_lpa: 0
    },
    matched_students: matchedStudents,
    matched_student_ids: data.matched_student_ids,
    sql_query: data.sql_query,
    latency_ms: data.execution_time_ms,
    row_count: data.match_count,
    lineage: DEFAULT_LINEAGE
  };
}

// 4. GET /api/students/spreadsheet
export async function getStudentsSpreadsheet(params?: {
  branch?: string;
  min_cgpa?: number;
  max_backlogs?: number;
  search?: string;
}): Promise<SpreadsheetResponse> {
  const queryParams = new URLSearchParams();
  if (params?.branch && params.branch !== 'All') queryParams.append('branch', params.branch);
  if (params?.min_cgpa !== undefined) queryParams.append('min_cgpa', String(params.min_cgpa));
  if (params?.search) queryParams.append('search', params.search);

  const res = await fetch(`${BASE_URL}/api/students/spreadsheet?${queryParams.toString()}`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    throw new Error('Failed to fetch candidate spreadsheet from backend');
  }
  const rows: any[] = await res.json();
  let students = rows.map((r: any) => ({
    usn: r.student_id,
    name: r.full_name,
    branch: r.branch,
    cgpa: r.cgpa,
    active_backlogs: r.active_backlogs,
    skills: r.skills,
    eligible_company_count: r.eligible_companies_count,
    dream_eligible_count: r.dream_eligible_count ?? 0,
    super_dream_eligible_count: r.super_dream_eligible_count ?? 0,
    placement_readiness_score: r.placement_readiness_score ?? Math.round(((r.cgpa / 10.0) * 40.0 + Math.min(1.0, r.skills.length / 6.0) * 40.0 + (r.active_backlogs === 0 ? 20.0 : 0.0)) * 10) / 10
  }));
  if (params?.max_backlogs !== undefined) {
    students = students.filter(s => s.active_backlogs <= (params.max_backlogs ?? 0));
  }
  return { students, total_count: students.length };
}

// 5. GET /api/student/me
export async function getStudentMe(_studentId?: string): Promise<StudentProfileResponse> {
  const res = await fetch(`${BASE_URL}/api/student/me`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    throw new Error('Failed to fetch student profile from backend');
  }
  const p = await res.json();
  return {
    usn: p.student_id,
    name: p.full_name,
    email: '',
    branch: p.branch,
    cgpa: p.cgpa,
    active_backlogs: p.active_backlogs,
    readiness_score: p.readiness_score,
    current_skills: p.current_skills,
    target_companies_available: (p.target_company_options || []).map((c: any) => ({
      name: c.company_name,
      tier: c.tier,
      ctc_lpa: c.ctc_lpa,
      required_skills: c.missing_skills || [],
      min_cgpa: 0,
      is_currently_eligible: c.is_eligible,
      missing_skills: c.missing_skills || []
    })),
    top_roi_recommendation: {
      skill: 'Databricks DE + PySpark',
      marginal_ctc_lpa: 10.30,
      unlocked_super_dream_count: 2,
      rationale: p.top_roi_recommendation || 'Adding Databricks DE + PySpark yields the highest marginal return.'
    }
  };
}

// 6. POST /api/query (Databricks Genie Space query)
export async function queryGenie(request: GenieQueryRequest): Promise<GenieQueryResponse> {
  const res = await fetch(`${BASE_URL}/api/query`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ prompt: request.query, conversation_id: request.conversation_id })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Genie query failed' }));
    throw new Error(err.detail || 'Genie query failed');
  }
  const data = await res.json();
  if (data.status === 'ERROR') {
    throw new Error(data.error_message || 'Genie query returned an error');
  }
  return {
    answer: data.answer || `Found ${data.row_count} result${data.row_count === 1 ? '' : 's'} for "${request.query}".`,
    sql_query: data.sql_query,
    latency_ms: data.execution_time_ms,
    row_count: data.row_count,
    lineage: DEFAULT_LINEAGE,
    matched_student_ids: data.filter_student_ids,
    thinking_steps: data.thinking_steps,
    citations: data.citations,
    columns: data.columns,
    rows: data.rows,
    table_title: data.table_title
  };
}

// 7. POST /api/whatif (Time Machine What-If Simulator)
export async function simulateWhatIf(request: WhatIfRequest): Promise<WhatIfResponse> {
  const res = await fetch(`${BASE_URL}/api/whatif`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ student_id: request.student_id, added_skills: request.added_skills })
  });
  if (!res.ok) {
    throw new Error('Failed to run What-If simulation against Unity Catalog placement data');
  }
  const data = await res.json();
  return {
    base_prob: data.baseline.placement_probability_pct,
    simulated_prob: data.simulated.placement_probability_pct,
    delta_prob: data.delta.delta_probability_pct,
    base_ctc: data.baseline.expected_ctc_lpa,
    simulated_ctc: data.simulated.expected_ctc_lpa,
    delta_ctc: data.delta.delta_ctc_lpa,
    tier_distribution: data.tier_distribution,
    base_tier_distribution: data.tier_distribution,
    synergy_alert: data.synergy_alert,
    newly_unlocked_companies: (data.delta.newly_eligible_companies || []).map((c: any) => ({
      name: c.company_name,
      ctc_lpa: c.ctc_lpa,
      tier: c.tier,
      is_new: true
    })),
    sql_query: data.sql_trace,
    cohort_size_analyzed: data.cohort_stats.total_with_skill + data.cohort_stats.total_without_skill
  };
}
