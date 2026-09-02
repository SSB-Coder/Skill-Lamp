@echo off
TITLE Skill Lamp — Placement Intelligence Assistant Launcher
echo ==============================================================================
echo             SKILL LAMP — PLACEMENT INTELLIGENCE ASSISTANT
echo ==============================================================================
echo.
echo [1/3] Starting FastAPI Backend Server on port 8000...
start "Skill Lamp Backend (Port 8000)" cmd /k "cd /d "%~dp03-backend" && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

echo [2/3] Starting React + Vite Frontend on port 5173...
start "Skill Lamp Frontend (Port 5173)" cmd /k "cd /d "%~dp04-frontend" && npm run dev -- --port 5173"

echo [3/3] Waiting for servers to initialize...
timeout /t 3 /nobreak >nul

echo.
echo ==============================================================================
echo Application successfully launched!
echo - Frontend: http://localhost:5173/
echo - Backend:  http://localhost:8000/
echo - API Docs: http://localhost:8000/docs
echo ==============================================================================
echo.
echo Opening default web browser...
start http://localhost:5173/
