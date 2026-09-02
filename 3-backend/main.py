import os
import time
import logging
from pathlib import Path
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

from config import settings
from routes import auth, students, student_profile, match_jd, query, whatif
from genie_client import genie_client

# Configure logging without emojis
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("skill_lamp.main")

# Initialize FastAPI Application
app = FastAPI(
    title="Skill Lamp — Placement Intelligence Assistant API",
    version="1.0.0",
    description=(
        "Governed Databricks Genie and Unity Catalog Backend Integration Layer. "
        "Provides deterministic placement intelligence, Reverse Roadmap simulation, "
        "and recruiter JD instant matching."
    ),
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# Configure Cross-Origin Resource Sharing (CORS) for development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(auth.router)
app.include_router(students.router)
app.include_router(student_profile.router)
app.include_router(match_jd.router)
app.include_router(query.router)
app.include_router(whatif.router)


@app.get("/api/health", tags=["Health"])
@app.get("/healthz", tags=["Health"])
async def health_check():
    """
    Service health check endpoint.
    Returns backend runtime status and Databricks integration state.
    """
    databricks_configured = bool(settings.DATABRICKS_HOST and settings.DATABRICKS_TOKEN and settings.GENIE_SPACE_ID)
    return {
        "status": "HEALTHY",
        "service": "Skill Lamp Placement Intelligence Backend",
        "timestamp_unix": int(time.time()),
        "databricks_integration": "ACTIVE" if databricks_configured else "FALLBACK_MODE",
        "mock_fallback_enabled": settings.USE_MOCK_FALLBACK,
    }


# Static SPA Mount Configuration for Unified Local Hosting
static_dir_path = Path(__file__).resolve().parent / settings.STATIC_DIR

if static_dir_path.exists() and static_dir_path.is_dir():
    # Mount static files for assets (js, css, images)
    app.mount("/static", StaticFiles(directory=str(static_dir_path)), name="static")

    @app.middleware("http")
    async def spa_fallback_middleware(request: Request, call_next):
        response = await call_next(request)
        if response.status_code == 404:
            path = request.url.path
            # If request is not an API or doc endpoint, return index.html for SPA routing
            if not path.startswith("/api") and not path.startswith("/docs") and not path.startswith("/redoc") and not path.startswith("/openapi.json"):
                index_file = static_dir_path / "index.html"
                if index_file.exists():
                    return FileResponse(str(index_file))
        return response

    @app.get("/", include_in_schema=False)
    async def serve_spa_root():
        index_file = static_dir_path / "index.html"
        if index_file.exists():
            return FileResponse(str(index_file))
        return JSONResponse({"message": "Skill Lamp API Backend is running."})


if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting Skill Lamp Backend on {settings.HOST}:{settings.PORT}")
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
