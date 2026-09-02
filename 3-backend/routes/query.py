from fastapi import APIRouter, Request, Depends
from models import QueryRequest, QueryResponse, UserSession
from genie_client import genie_client
import fallback_data
from routes.auth import get_current_user

router = APIRouter(prefix="/api", tags=["Genie Copilot Query"])


@router.post("/query", response_model=QueryResponse)
async def query_genie(req: QueryRequest, request: Request, current_user: UserSession = Depends(get_current_user)):
    """
    Executes natural language queries via Databricks Genie Space.
    Allows both TPO and Student personas to query Databricks Unity Catalog and Genie directly.
    """
    force_fallback = fallback_data.is_mock_fallback(request)
    
    prompt = req.prompt.strip()
    
    # If student persona, enrich prompt with student context for accurate personalized ROI analysis
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
    
    response = await genie_client.ask_genie(
        prompt=prompt,
        conversation_id=req.conversation_id,
        force_fallback=force_fallback
    )
    return response
