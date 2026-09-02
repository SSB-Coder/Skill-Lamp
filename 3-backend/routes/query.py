from fastapi import APIRouter, Request, Depends
from models import QueryRequest, QueryResponse, UserSession
from genie_client import genie_client
import fallback_data
from routes.auth import require_tpo

router = APIRouter(prefix="/api", tags=["Genie Copilot Query"])


@router.post("/query", response_model=QueryResponse)
async def query_genie(req: QueryRequest, request: Request, current_user: UserSession = Depends(require_tpo)):
    """
    Executes natural language queries via Databricks Genie Space with a strict
    6-second timeout guard. Returns governed SQL, tabular data rows, and candidate IDs.
    """
    force_fallback = fallback_data.is_mock_fallback(request)
    
    response = await genie_client.ask_genie(
        prompt=req.prompt,
        conversation_id=req.conversation_id,
        force_fallback=force_fallback
    )
    return response
