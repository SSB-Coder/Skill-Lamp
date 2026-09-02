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
    force_fallback = fallback_data.is_mock_fallback(request)
    
    prompt = req.prompt.strip()
    target_space_id = None
    
    # If student persona, enrich prompt with student context and route to Student/Calc Genie Space
    if current_user.role == "STUDENT":
        if settings.GENIE_CALC_SPACE_ID:
            target_space_id = settings.GENIE_CALC_SPACE_ID
            
        if current_user.student_id:
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
    else:
        # TPO persona uses the primary institutional Genie Space
        target_space_id = settings.GENIE_SPACE_ID
    
    response = await genie_client.ask_genie(
        prompt=prompt,
        conversation_id=req.conversation_id,
        force_fallback=force_fallback,
        space_id_override=target_space_id
    )
    return response
