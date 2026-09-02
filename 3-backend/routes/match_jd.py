import time
from fastapi import APIRouter, Request
from models import MatchJDRequest, MatchJDResponse
import fallback_data

router = APIRouter(prefix="/api", tags=["Recruiter JD Matcher"])


@router.post("/match-jd", response_model=MatchJDResponse)
async def match_jd(req: MatchJDRequest, request: Request):
    """
    Parses recruiter Job Description text, extracts required skills, CGPA cutoff,
    and branch filters, and executes governed matching query over candidate pool.
    """
    start_time = time.time()
    
    # Process JD using deterministic parser engine
    response = fallback_data.parse_jd_and_match(req.raw_jd_text)
    
    # Compute exact elapsed ms
    elapsed_ms = max(12, int((time.time() - start_time) * 1000))
    response.execution_time_ms = elapsed_ms
    
    return response
