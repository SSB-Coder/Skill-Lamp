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
                f"Student Question: {req.prompt}\n"
                f"Instruction: Calculate directly from gold_fact_placement_history table."
            )
            prompt = prompt_context

    use_fallback = fallback_data.is_mock_fallback(request)
    response = await genie_client.ask_genie(
        prompt=prompt,
        conversation_id=req.conversation_id,
        force_fallback=use_fallback,
        space_id_override=target_space_id
    )

    return response

