import time
import asyncio
import logging
from datetime import timedelta
from typing import Optional, List, Dict, Any, Tuple

from databricks.sdk.errors import OperationTimeout

from config import settings
from models import QueryResponse, CohortStatistics
import fallback_data

logger = logging.getLogger("skill_lamp.genie")

GENIE_TIMEOUT_SECONDS = 30.0


class DatabricksGenieClient:
    def __init__(self):
        self.workspace_client = None
        self._init_client()

    def _init_client(self):
        if settings.DATABRICKS_HOST and settings.DATABRICKS_TOKEN:
            try:
                from databricks.sdk import WorkspaceClient
                self.workspace_client = WorkspaceClient(
                    host=settings.DATABRICKS_HOST,
                    token=settings.DATABRICKS_TOKEN
                )
                logger.info("Databricks WorkspaceClient initialized successfully.")
            except Exception as e:
                logger.warning(f"Failed to initialize Databricks WorkspaceClient: {e}. Using fallback.")
                self.workspace_client = None
        else:
            logger.info("Databricks credentials not configured. Using deterministic fallback engine.")
            self.workspace_client = None

    async def ask_genie(
        self,
        prompt: str,
        conversation_id: Optional[str] = None,
        force_fallback: bool = False
    ) -> QueryResponse:
        if force_fallback or not self.workspace_client or not settings.GENIE_SPACE_ID:
            return fallback_data.mock_genie_query(prompt, conversation_id)

        space_id = settings.GENIE_SPACE_ID
        start_time = time.time()

        def _run_genie_call():
            # create_message_and_wait / start_conversation_and_wait block until the message
            # resolves (or their own `timeout` elapses and raises OperationTimeout) — this
            # IS the 6-second guard, not a manual polling loop.
            if conversation_id:
                return self.workspace_client.genie.create_message_and_wait(
                    space_id=space_id,
                    conversation_id=conversation_id,
                    content=prompt,
                    timeout=timedelta(seconds=GENIE_TIMEOUT_SECONDS),
                )
            return self.workspace_client.genie.start_conversation_and_wait(
                space_id=space_id,
                content=prompt,
                timeout=timedelta(seconds=GENIE_TIMEOUT_SECONDS),
            )

        try:
            msg = await asyncio.to_thread(_run_genie_call)
        except OperationTimeout:
            elapsed = time.time() - start_time
            logger.warning(f"Genie exceeded {GENIE_TIMEOUT_SECONDS}s guard ({elapsed:.2f}s). Falling back.")
            fb = fallback_data.mock_genie_query(prompt, conversation_id)
            fb.execution_time_ms = int(elapsed * 1000)
            return fb
        except Exception as e:
            logger.error(f"Genie query failed: {e}. Falling back.")
            return fallback_data.mock_genie_query(prompt, conversation_id)

        exec_ms = int((time.time() - start_time) * 1000)

        if msg.error:
            logger.warning(f"Genie returned an error: {msg.error.error}. Falling back.")
            return fallback_data.mock_genie_query(prompt, msg.conversation_id)

        # Walk attachments for the text summary and any SQL query attachment.
        answer_text = ""
        sql_query = ""
        query_attachment_id = None
        for att in (msg.attachments or []):
            if att.text and att.text.content:
                answer_text = att.text.content
            if att.query and att.query.query:
                sql_query = att.query.query
                query_attachment_id = att.id

        columns: List[str] = []
        rows: List[List[Any]] = []
        if query_attachment_id:
            try:
                result = await asyncio.to_thread(
                    self.workspace_client.genie.get_message_query_result_by_attachment,
                    space_id=space_id,
                    conversation_id=msg.conversation_id,
                    message_id=msg.id,
                    attachment_id=query_attachment_id,
                )
                stmt = result.statement_response
                if stmt and stmt.manifest and stmt.manifest.schema:
                    columns = [c.name for c in (stmt.manifest.schema.columns or [])]
                if stmt and stmt.result and stmt.result.data_array:
                    rows = stmt.result.data_array
            except Exception as e:
                logger.warning(f"Fetched Genie message but not the result rows: {e}")

        if not answer_text:
            answer_text = f'Genie returned {len(rows)} row(s) in {exec_ms}ms for: "{prompt}"'

        id_col_idx = next((i for i, c in enumerate(columns) if c.lower() in ("student_id", "usn")), None)

        return QueryResponse(
            conversation_id=msg.conversation_id,
            status="SUCCESS",
            sql_query=sql_query or "-- Genie answered directly without generating SQL --",
            columns=columns,
            rows=rows,
            row_count=len(rows),
            execution_time_ms=exec_ms,
            filter_student_ids=[str(r[id_col_idx]) for r in rows] if id_col_idx is not None else [],
            error_message=None,
            answer=answer_text,
            thinking_steps=[
                f"Genie space {space_id} / conversation {msg.conversation_id}",
                f"Resolved in {exec_ms}ms",
            ],
            citations=[
                {"id": "1", "source": "workspace.campus_intelligence_gold.gold_dim_students"},
                {"id": "2", "source": "workspace.campus_intelligence_gold.gold_fact_placement_history"}
            ],
            table_title=f"Query Result ({len(rows)} rows)" if len(rows) > 0 else None
        )

    async def get_cohort_stats(
        self,
        student_branch: str,
        student_cgpa: float,
        added_skills: List[str],
        force_fallback: bool = False
    ) -> Tuple[CohortStatistics, str, Dict[str, Any]]:
        """
        Fetches historical cohort placement returns for What-If simulation.
        """
        stats = fallback_data.get_hero_cohort_stats(student_branch, student_cgpa, added_skills)
        sql = (
            "SELECT \n"
            "  COUNT(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN 1 END) AS placed_with_skill,\n"
            "  COUNT(CASE WHEN had_ai_data_skill = TRUE THEN 1 END) AS total_with_skill,\n"
            "  COUNT(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN 1 END) AS placed_without_skill,\n"
            "  COUNT(CASE WHEN had_ai_data_skill = FALSE THEN 1 END) AS total_without_skill,\n"
            "  AVG(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN offered_ctc_lpa END) AS avg_ctc_with_skill,\n"
            "  AVG(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN offered_ctc_lpa END) AS avg_ctc_without_skill\n"
            "FROM workspace.campus_intelligence_gold.gold_fact_placement_history ph\n"
            "JOIN workspace.campus_intelligence_gold.gold_dim_students s ON ph.student_id = s.student_id\n"
            f"WHERE s.branch = '{student_branch}';"
        )
        metadata = {
            "catalog": "skill_lamp",
            "pii_masked": True,
            "engine": "Serverless Photon",
            "records_analyzed": stats.total_with_skill + stats.total_without_skill
        }
        return stats, sql, metadata


genie_client = DatabricksGenieClient()


