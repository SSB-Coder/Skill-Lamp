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
import {
  MOCK_STUDENTS,
  MOCK_STUDENT_PRIYA,
  mockMatchJD,
  mockGenieQuery,
  simulateWhatIf as mockSimulateWhatIf
} from './mockData';

const BASE_URL = '';

let failsafeMode = false;

// Check sessionStorage on initialization
try {
  const saved = sessionStorage.getItem('skill_lamp_failsafe');
  if (saved !== null) {
    failsafeMode = saved === 'true';
  }
} catch {
  // Ignore sessionStorage errors
}

export function isFailsafeActive(): boolean {
  return failsafeMode;
}

export function setFailsafeActive(active: boolean): void {
  failsafeMode = active;
  try {
    sessionStorage.setItem('skill_lamp_failsafe', String(active));
  } catch {
    // Ignore sessionStorage errors
  }
  window.dispatchEvent(new CustomEvent('failsafe-mode-changed', { detail: { active } }));
}

export function toggleFailsafeMode(): boolean {
  setFailsafeActive(!failsafeMode);
  return failsafeMode;
}

// Helper to get auth header
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
  if (!failsafeMode) {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch {
      // Backend unreachable; auto-activate failsafe
      setFailsafeActive(true);
    }
  }

  // Failsafe fallback
  if (email.toLowerCase().includes('tpo') || email.toLowerCase().includes('admin')) {
    return {
      role: 'TPO',
      name: 'TPO Placement Office',
      email: 'tpo@rvce.edu.in',
      token: 'demo-token-tpo-98421'
    };
  } else {
    return {
      role: 'STUDENT',
      name: MOCK_STUDENT_PRIYA.name,
      email: MOCK_STUDENT_PRIYA.email,
      token: 'demo-token-student-042',
      student_id: MOCK_STUDENT_PRIYA.usn,
      usn: MOCK_STUDENT_PRIYA.usn,
      branch: MOCK_STUDENT_PRIYA.branch,
      cgpa: MOCK_STUDENT_PRIYA.cgpa,
      active_backlogs: MOCK_STUDENT_PRIYA.active_backlogs,
      readiness_score: MOCK_STUDENT_PRIYA.readiness_score
    };
  }
}

// 2. GET /api/auth/me
export async function getAuthMe(): Promise<UserSession> {
  if (!failsafeMode) {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      setFailsafeActive(true);
    }
  }

  const raw = sessionStorage.getItem('skill_lamp_session');
  if (raw) {
    return JSON.parse(raw);
  }
  throw new Error('Not authenticated');
}

// 3. POST /api/match-jd
export async function matchJD(jdText: string): Promise<JDMatchResponse> {
  if (!failsafeMode) {
    try {
      const res = await fetch(`${BASE_URL}/api/match-jd`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ raw_jd_text: jdText }) // backend field is raw_jd_text, not jd_text
      });
      if (res.ok) {
        const data = await res.json();
        let matchedStudents: typeof MOCK_STUDENTS = [];
        try {
          const sheet = await getStudentsSpreadsheet();
          matchedStudents = sheet.students.filter(s => data.matched_student_ids.includes(s.usn));
        } catch {
          // non-fatal — leave empty if hydration fails
        }
        return {
          extracted_criteria: {
            min_cgpa: data.extracted_criteria.min_cgpa,
            max_backlogs: data.extracted_criteria.max_backlogs,
            allowed_branches: data.extracted_criteria.allowed_branches,
            required_skills: data.extracted_criteria.required_skills,
            // TODO(backend): MatchJDResponse has no target_role/ctc_lpa fields today
            target_role: 'Extracted Role',
            ctc_lpa: 0
          },
          matched_students: matchedStudents,
          matched_student_ids: data.matched_student_ids,
          sql_query: data.sql_query,
          latency_ms: data.execution_time_ms,
          row_count: data.match_count,
          // TODO(backend): no lineage object returned — hardcoded placeholder
          lineage: DEFAULT_LINEAGE
        };
      }
    } catch {
      setFailsafeActive(true);
    }
  }
  return mockMatchJD(jdText);
}

// 4. GET /api/students/spreadsheet
export async function getStudentsSpreadsheet(params?: {
  branch?: string;
  min_cgpa?: number;
  max_backlogs?: number;
  search?: string;
}): Promise<SpreadsheetResponse> {
  if (!failsafeMode) {
  try {
    const queryParams = new URLSearchParams();
    if (params?.branch && params.branch !== 'All') queryParams.append('branch', params.branch);
    if (params?.min_cgpa !== undefined) queryParams.append('min_cgpa', String(params.min_cgpa));
    // NOTE: backend has no max_backlogs query param — filtered client-side below instead
    if (params?.search) queryParams.append('search', params.search);

    const res = await fetch(`${BASE_URL}/api/students/spreadsheet?${queryParams.toString()}`, {
      headers: getAuthHeaders()
    });
    if (res.ok) {
      const rows: any[] = await res.json();
      let students = rows.map(r => ({
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
  } catch {
    setFailsafeActive(true);
  }
}

// Client-side filtering on mock data
let filtered = [...MOCK_STUDENTS];
if (params?.branch && params.branch !== 'All') {
  filtered = filtered.filter(s => s.branch === params.branch);
}
if (params?.min_cgpa !== undefined) {
  filtered = filtered.filter(s => s.cgpa >= (params.min_cgpa || 0));
}
if (params?.max_backlogs !== undefined) {
  filtered = filtered.filter(s => s.active_backlogs <= (params.max_backlogs ?? 0));
}
if (params?.search) {
  const q = params.search.toLowerCase();
  filtered = filtered.filter(
    s =>
      s.name.toLowerCase().includes(q) ||
      s.usn.toLowerCase().includes(q) ||
      s.skills.some(sk => sk.toLowerCase().includes(q))
  );
}

return {
  students: filtered,
  total_count: filtered.length
};
}

// 5. GET /api/student/me
export async function getStudentMe(_studentId?: string): Promise<StudentProfileResponse> {
  if (!failsafeMode) {
    try {
      // NOTE: backend derives the student from the bearer token, not a query param
      const res = await fetch(`${BASE_URL}/api/student/me`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
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
          target_companies_available: p.target_company_options.map((c: any) => ({
            name: c.company_name,
            tier: c.tier,
            ctc_lpa: c.ctc_lpa,
            required_skills: c.missing_skills,
            min_cgpa: 0,
            is_currently_eligible: c.is_eligible,
            missing_skills: c.missing_skills
          })),
          top_roi_recommendation: {
            skill: 'Databricks DE + PySpark',
            marginal_ctc_lpa: 10.30,
            unlocked_super_dream_count: 2,
            rationale: p.top_roi_recommendation
          }
        };
      }
    } catch {
      setFailsafeActive(true);
    }
  }
  return MOCK_STUDENT_PRIYA;
}
// 6. POST /api/query (Genie Copilot query)
export async function queryGenie(request: GenieQueryRequest): Promise<GenieQueryResponse> {
  if (!failsafeMode) {
    try {
      const res = await fetch(`${BASE_URL}/api/query`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ prompt: request.query })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'ERROR') throw new Error(data.error_message || 'Genie query failed');
        return {
          answer: data.answer || `Found ${data.row_count} result${data.row_count === 1 ? '' : 's'} for "${request.query}".`,
          sql_query: data.sql_query,
          latency_ms: data.execution_time_ms,
          row_count: data.row_count,
          lineage: DEFAULT_LINEAGE,
          matched_student_ids: data.filter_student_ids,
          thinking_steps: data.thinking_steps,
          citations: data.citations
        };
      }
    } catch {
      setFailsafeActive(true);
    }
  }
  return mockGenieQuery(request.query, request.persona, request.student_id);
}
// 7. POST /api/whatif (Personal What-If Simulator)
export async function simulateWhatIf(request: WhatIfRequest): Promise<WhatIfResponse> {
  if (!failsafeMode) {
    try {
      const res = await fetch(`${BASE_URL}/api/whatif`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ student_id: request.student_id, added_skills: request.added_skills })
      });
      if (res.ok) {
        const data = await res.json();
        return {
          base_prob: data.baseline.placement_probability_pct,
          simulated_prob: data.simulated.placement_probability_pct,
          delta_prob: data.delta.delta_probability_pct,
          base_ctc: data.baseline.expected_ctc_lpa,
          simulated_ctc: data.simulated.expected_ctc_lpa,
          delta_ctc: data.delta.delta_ctc_lpa,
          tier_distribution: data.tier_distribution,
          // TODO(backend): whatif.py only computes ONE tier_distribution (post-simulation);
          // there's no baseline split to return here — reusing simulated as a stand-in
          base_tier_distribution: data.tier_distribution,
          synergy_alert: data.synergy_alert,
          newly_unlocked_companies: data.delta.newly_eligible_companies.map((c: any) => ({
            name: c.company_name,
            ctc_lpa: c.ctc_lpa,
            tier: c.tier,
            is_new: true
          })),
          sql_query: data.sql_trace,
          cohort_size_analyzed: data.cohort_stats.total_with_skill + data.cohort_stats.total_without_skill
        };
      }
    } catch {
      setFailsafeActive(true);
    }
  }
  return mockSimulateWhatIf(request.student_id, request.added_skills, request.target_company);
}
