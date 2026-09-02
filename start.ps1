# ==============================================================================
# Skill Lamp — Placement Intelligence Assistant PowerShell Launcher
# ==============================================================================

Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "            SKILL LAMP — PLACEMENT INTELLIGENCE ASSISTANT" -ForegroundColor Yellow
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host ""

$RootPath = $PSScriptRoot

Write-Host "[1/3] Starting FastAPI Backend Server on port 8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$RootPath\3-backend'; python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

Write-Host "[2/3] Starting React + Vite Frontend on port 5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$RootPath\4-frontend'; npm run dev -- --port 5173"

Write-Host "[3/3] Waiting for servers to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "Application successfully launched!" -ForegroundColor Green
Write-Host " - Frontend: http://localhost:5173/" -ForegroundColor White
Write-Host " - Backend:  http://localhost:8000/" -ForegroundColor White
Write-Host " - API Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host ""

Start-Process "http://localhost:5173/"
