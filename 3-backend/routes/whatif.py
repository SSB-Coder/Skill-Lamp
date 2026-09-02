from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException, Request, status, Depends
from models import (
    WhatIfRequest,
    WhatIfResponse,
    CompanyItem,
    TierDistribution,
    UserSession,
)
from genie_client import genie_client
from probability import calculate_simulation
import fallback_data
from routes.auth import require_student

router = APIRouter(prefix="/api", tags=["Time Machine What-If Simulator"])


@router.post("/whatif", response_model=WhatIfResponse)
async def simulate_whatif(req: WhatIfRequest, request: Request,current_user: UserSession = Depends(require_student)):
    """
    Simulates career trajectory when adding 1 to 10 skills.
    Fetches raw cohort counts from Genie/Unity Catalog, executes exact probability
    and expected compensation math via Python engine, checks synergy multiplier,
    and returns delta analytics with SQL lineage trace.
    """
    if req.student_id != current_user.student_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only simulate your own profile."
        )
    student = next((s for s in fallback_data.STUDENTS_DB if s["student_id"] == req.student_id), None)
    if not student:
        # Fallback to demo student if USN not in default 50
        student = {
            "student_id": req.student_id,
            "full_name": "Student Candidate",
            "branch": "CSE",
            "cgpa": 8.4,
            "active_backlogs": 0,
            "skills": ["Python", "SQL", "Data Structures", "FastAPI"],
        }

    # 1. Evaluate baseline eligible companies
    baseline_eligible: List[Dict[str, Any]] = []
    for c in fallback_data.COMPANIES_CATALOG:
        is_elig, _, _, _ = fallback_data.check_student_eligibility(
            student["branch"], student["cgpa"], student["active_backlogs"], student["skills"], c
        )
        if is_elig:
            baseline_eligible.append(c)

    # 2. Evaluate simulated eligible companies with added skills
    combined_skills = list(set(student["skills"] + req.added_skills))
    simulated_eligible: List[Dict[str, Any]] = []
    newly_eligible_items: List[CompanyItem] = []

    for c in fallback_data.COMPANIES_CATALOG:
        is_elig, blocker, missing_mand, missing_pref = fallback_data.check_student_eligibility(
            student["branch"], student["cgpa"], student["active_backlogs"], combined_skills, c
        )
        if is_elig:
            simulated_eligible.append(c)
            # Check if this company is newly unlocked
            was_in_baseline = any(bc["company_id"] == c["company_id"] for bc in baseline_eligible)
            if not was_in_baseline:
                newly_eligible_items.append(
                    CompanyItem(
                        company_id=c["company_id"],
                        company_name=c["company_name"],
                        tier=c["tier"],
                        ctc_lpa=c["ctc_lpa"],
                        missing_mandatory_skills=missing_mand,
                        missing_preferred_skills=missing_pref,
                        blocker_reason=blocker,
                    )
                )

    # 3. Calculate simulated Tier Distribution
    core_tech_count = sum(1 for c in simulated_eligible if c["tier"] == "Core Tech")
    dream_count = sum(1 for c in simulated_eligible if c["tier"] == "Dream")
    super_dream_count = sum(1 for c in simulated_eligible if c["tier"] == "Super Dream")

    tier_distribution = TierDistribution(
        core_tech=core_tech_count,
        dream=dream_count,
        super_dream=super_dream_count,
    )

    # 4. Fetch raw cohort statistics from Genie / Unity Catalog
    cohort_stats, sql_trace, governance_metadata = await genie_client.get_cohort_stats(
        student_branch=student["branch"],
        student_cgpa=student["cgpa"],
        added_skills=req.added_skills,
        force_fallback=False,
    )

    # 5. Deterministic Python Mathematical Calculation (Zero LLM Arithmetic)
    baseline, simulated, delta, synergy_alert = calculate_simulation(
        cohort=cohort_stats,
        base_eligible_count=len(baseline_eligible),
        simulated_eligible_count=len(simulated_eligible),
        new_companies=newly_eligible_items,
        added_skills=req.added_skills,
    )

    return WhatIfResponse(
        student_id=student["student_id"],
        added_skills=req.added_skills,
        baseline=baseline,
        simulated=simulated,
        delta=delta,
        tier_distribution=tier_distribution,
        synergy_alert=synergy_alert,
        cohort_stats=cohort_stats,
        sql_trace=sql_trace,
        governance_metadata=governance_metadata,
    )
