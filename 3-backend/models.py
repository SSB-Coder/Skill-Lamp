from typing import List, Optional, Literal, Union, Dict, Any
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# 1. Authentication Models
# ---------------------------------------------------------------------------

class LoginRequest(BaseModel):
    email: str = Field(..., json_schema_extra={"example": "tpo@rvce.edu.in"})
    password: str = Field(..., min_length=4)


class UserSession(BaseModel):
    token: str
    role: Literal["TPO", "STUDENT"]
    email: str
    name: str
    student_id: Optional[str] = None


# ---------------------------------------------------------------------------
# 2. Recruiter Job Description Matcher Models
# ---------------------------------------------------------------------------

class MatchJDRequest(BaseModel):
    raw_jd_text: str = Field(..., min_length=10, max_length=2000)


class MatchJDResponse(BaseModel):
    extracted_criteria: Dict[str, Any]
    matched_student_ids: List[str]
    match_count: int
    sql_query: str
    execution_time_ms: int


# ---------------------------------------------------------------------------
# 3. TPO Candidate Spreadsheet Models
# ---------------------------------------------------------------------------

class CandidateRow(BaseModel):
    student_id: str = Field(..., pattern=r"^USN_\d{4}_\d{3}$")
    full_name: str
    branch: Literal["CSE", "ISE", "ECE", "AI/DS"]
    cgpa: float = Field(..., ge=0.0, le=10.0)
    active_backlogs: int = Field(..., ge=0)
    skills: List[str]
    eligible_companies_count: int
    top_unlocked_company: Optional[str]


# ---------------------------------------------------------------------------
# 4. Student Isolated Profile & Target Roadmap Models
# ---------------------------------------------------------------------------

class TargetCompanyOption(BaseModel):
    company_id: str
    company_name: str
    tier: str
    ctc_lpa: float
    missing_skills: List[str]
    is_eligible: bool


class CompanyItem(BaseModel):
    company_id: str
    company_name: str
    tier: Literal["Super Dream", "Dream", "Core Tech"]
    ctc_lpa: float
    missing_mandatory_skills: List[str] = []
    missing_preferred_skills: List[str] = []
    blocker_reason: Optional[
        Literal[
            "ELIGIBLE",
            "CGPA_BELOW_CUTOFF",
            "MISSING_MANDATORY_SKILLS",
            "BRANCH_INELIGIBLE",
            "ACTIVE_BACKLOGS",
        ]
    ] = None


class StudentProfileResponse(BaseModel):
    student_id: str
    full_name: str
    branch: str
    cgpa: float
    active_backlogs: int
    current_skills: List[str]
    readiness_score: float
    eligible_companies: List[CompanyItem]
    blocked_companies: List[CompanyItem]
    top_roi_recommendation: str
    target_company_options: List[TargetCompanyOption]


# ---------------------------------------------------------------------------
# 5. TPO Genie Natural Language Query Models
# ---------------------------------------------------------------------------

class QueryRequest(BaseModel):
    prompt: str = Field(..., min_length=3, max_length=500, description="Natural language question")
    conversation_id: Optional[str] = Field(None, description="Existing Genie conversation ID")


class QueryResponse(BaseModel):
    conversation_id: str
    status: Literal["SUCCESS", "ERROR"]
    sql_query: str
    columns: List[str]
    rows: List[List[Union[str, int, float, bool, None]]]
    row_count: int
    execution_time_ms: int
    filter_student_ids: List[str]
    error_message: Optional[str] = None


# ---------------------------------------------------------------------------
# 6. What-If Simulation Engine Models
# ---------------------------------------------------------------------------

class WhatIfRequest(BaseModel):
    student_id: str = Field(..., pattern=r"^USN_\d{4}_\d{3}$")
    added_skills: List[str] = Field(..., min_length=1, max_length=10)


class MetricSnapshot(BaseModel):
    placement_probability_pct: float
    expected_ctc_lpa: float
    eligible_company_count: int


class DeltaSummary(BaseModel):
    delta_probability_pct: float
    delta_ctc_lpa: float
    newly_eligible_companies: List[CompanyItem]


class TierDistribution(BaseModel):
    core_tech: int
    dream: int
    super_dream: int


class CohortStatistics(BaseModel):
    placed_with_skill: int
    total_with_skill: int
    placed_without_skill: int
    total_without_skill: int
    avg_ctc_with_skill: float
    avg_ctc_without_skill: float


class WhatIfResponse(BaseModel):
    student_id: str
    added_skills: List[str]
    baseline: MetricSnapshot
    simulated: MetricSnapshot
    delta: DeltaSummary
    tier_distribution: TierDistribution
    synergy_alert: Optional[str] = None
    cohort_stats: CohortStatistics
    sql_trace: str
    governance_metadata: Dict[str, Any]
