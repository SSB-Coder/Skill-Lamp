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
        body: JSON.stringify({ jd_text: jdText })
      });
      if (res.ok) {
        return await res.json();
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
      if (params?.max_backlogs !== undefined) queryParams.append('max_backlogs', String(params.max_backlogs));
      if (params?.search) queryParams.append('search', params.search);

      const res = await fetch(`${BASE_URL}/api/students/spreadsheet?${queryParams.toString()}`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        return await res.json();
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
export async function getStudentMe(studentId?: string): Promise<StudentProfileResponse> {
  if (!failsafeMode) {
    try {
      const query = studentId ? `?student_id=${encodeURIComponent(studentId)}` : '';
      const res = await fetch(`${BASE_URL}/api/student/me${query}`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        return await res.json();
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
        body: JSON.stringify(request)
      });
      if (res.ok) {
        return await res.json();
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
        body: JSON.stringify(request)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      setFailsafeActive(true);
    }
  }

  return mockSimulateWhatIf(request.student_id, request.added_skills, request.target_company);
}
