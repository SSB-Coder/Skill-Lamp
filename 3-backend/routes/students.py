from typing import List, Optional
from fastapi import APIRouter, Depends, Query, Request
from models import CandidateRow, UserSession
from routes.auth import require_tpo
import fallback_data

router = APIRouter(prefix="/api/students", tags=["TPO Candidate Spreadsheet"])


@router.get("/spreadsheet", response_model=List[CandidateRow])
async def get_students_spreadsheet(
    branch: Optional[str] = Query(None, description="Filter by branch (CSE, ISE, ECE, AI/DS)"),
    min_cgpa: Optional[float] = Query(None, ge=0.0, le=10.0, description="Minimum CGPA cutoff"),
    search: Optional[str] = Query(None, description="Search by name or USN"),
    status: Optional[str] = Query(None, description="Filter by placement or eligibility status"),
    current_user: UserSession = Depends(require_tpo),
):
    """
    Returns the governed candidate spreadsheet grid for TPO officers.
    Pre-populates top 50 candidate records with live company eligibility counters.
    Requires TPO authorization role.
    """
    rows = fallback_data.get_candidate_rows()

    # Apply branch filter
    if branch:
        b_upper = branch.strip().upper()
        rows = [r for r in rows if r.branch.upper() == b_upper]

    # Apply min_cgpa filter
    if min_cgpa is not None:
        rows = [r for r in rows if r.cgpa >= min_cgpa]

    # Apply text search filter
    if search:
        s_lower = search.strip().lower()
        rows = [
            r for r in rows
            if s_lower in r.full_name.lower() or s_lower in r.student_id.lower()
        ]

    # Apply status filter
    if status:
        st_lower = status.strip().lower()
        if st_lower in ("eligible", "unlocked"):
            rows = [r for r in rows if r.eligible_companies_count > 0]

    return rows
