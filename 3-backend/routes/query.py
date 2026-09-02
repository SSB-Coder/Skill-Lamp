from fastapi import APIRouter, Request
from models import QueryRequest, QueryResponse
from genie_client import genie_client
import fallback_data

router = APIRouter(prefix="/api", tags=["Genie Copilot Query"])


@router.post("/query", response_model=QueryResponse)
async def query_genie(req: QueryRequest, request: Request):
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
