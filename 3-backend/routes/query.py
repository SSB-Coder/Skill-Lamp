from fastapi import APIRouter, Request, Depends
from models import QueryRequest, QueryResponse, UserSession
from genie_client import genie_client
import fallback_data
from routes.auth import get_current_user

from config import settings

router = APIRouter(prefix="/api", tags=["Genie Copilot Query"])


@router.post("/query", response_model=QueryResponse)
async def query_genie(req: QueryRequest, request: Request, current_user: UserSession = Depends(get_current_user)):
    """
    Executes natural language queries via Databricks Genie Space.
    Routes TPO queries to the Main Genie Space (GENIE_SPACE_ID) and Student queries
    to the dedicated Student/Calc Genie Space (GENIE_CALC_SPACE_ID).
    """
    prompt = req.prompt.strip()
    # Route Student persona to Student/Calc Genie Space, TPO to Main Institutional Space
    if current_user.role == "STUDENT":
        target_space_id = settings.GENIE_CALC_SPACE_ID or settings.GENIE_SPACE_ID
    else:
        target_space_id = settings.GENIE_SPACE_ID
    
    # Detect if the query specifically asks for percentage increase, probability, or skill ROI calculation
    p_lower = prompt.lower()
    is_calc_query = any(k in p_lower for k in [
        "probability", "percent", "%", "increase", "what if", "learn", "roi", "chance", "boost", "uplift", "calculate"
    ]) and not any(k in p_lower for k in ["cgpa > 10", "10.0", "batch-wise", "overall placement rate"])

    student = None
    if current_user.role == "STUDENT" and current_user.student_id:
        student = next((s for s in fallback_data.STUDENTS_DB if s["student_id"] == current_user.student_id), None)
        if student:
            skills_str = ", ".join(student.get("skills", []))
            prompt_context = (
                f"Context: Student ID {student['student_id']}, Branch {student['branch']}, "
                f"CGPA {student['cgpa']}, Active Backlogs {student.get('active_backlogs', 0)}, "
                f"Acquired Skills: [{skills_str}].\n"
                f"Student Question: {req.prompt}"
            )
            prompt = prompt_context

    use_fallback = fallback_data.is_mock_fallback(request)
    response = await genie_client.ask_genie(
        prompt=prompt,
        conversation_id=req.conversation_id,
        force_fallback=use_fallback,
        space_id_override=target_space_id
    )

    # If the user asked for a calculation and Genie returned a canned refusal
    # ("cannot calculate", "unable to calculate", "raw counts only", etc.) or an empty result,
    # resolve the exact percentage gain and CTC gain from the 6-year historical placement cohort engine
    refusal_cues = [
        "cannot calculate", "can't calculate", "unable to calculate",
        "do not compute", "raw counts only", "not my job", "performed by the platform"
    ]
    if is_calc_query:
        ans_lower = (response.answer or "").lower()
        if any(cue in ans_lower for cue in refusal_cues) or response.row_count == 0:
            student_branch = student["branch"] if student else "ISE"
            student_cgpa = student["cgpa"] if student else 8.12
            return fallback_data.calculate_skill_roi_from_history(
                req.prompt,
                branch=student_branch,
                cgpa=student_cgpa
            )

    return response
