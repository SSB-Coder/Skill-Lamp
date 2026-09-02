# Skill Lamp — Placement Intelligence Assistant: Backend Architecture & API Guide

## 1. System Overview
The backend service sits between the Databricks AI/BI Genie Space / Unity Catalog semantic layer and the React frontend. It provides governed data retrieval, deterministic mathematical simulations, recruiter JD matching, and session-based student isolation.

```
React UI ──fetch()──▶ FastAPI Backend (Port 8000) ──ask_genie()──▶ Databricks Genie ──SQL──▶ Unity Catalog / Delta Lake
React UI ◀──JSON───── FastAPI Backend (Auth + Math) ◀──Raw Counts── Databricks Genie ◀────── (4 Gold Tables)
```

---

## 2. Core Modules

| File | Purpose |
| :--- | :--- |
| [`main.py`](file:///Users/pandurangnayak/desktop/Skill-Lamp/3-backend/main.py) | FastAPI app entry point, CORS middleware, API route registration, SPA static fallback. |
| [`models.py`](file:///Users/pandurangnayak/desktop/Skill-Lamp/3-backend/models.py) | Pydantic V2 schema definitions for all request/response contracts with strict field validation. |
| [`config.py`](file:///Users/pandurangnayak/desktop/Skill-Lamp/3-backend/config.py) | Environment configuration loader (`pydantic-settings`). |
| [`probability.py`](file:///Users/pandurangnayak/desktop/Skill-Lamp/3-backend/probability.py) | Deterministic Python mathematical engine (Frequentist probability, Bayesian Laplace smoothing, Expected CTC, Exact deltas, Synergy multipliers). |
| [`genie_client.py`](file:///Users/pandurangnayak/desktop/Skill-Lamp/3-backend/genie_client.py) | Async Databricks Genie SDK wrapper with 400ms polling cadence, 6s timeout guard, and graceful fallback. |
| [`fallback_data.py`](file:///Users/pandurangnayak/desktop/Skill-Lamp/3-backend/fallback_data.py) | Stage-safe mock data repository (top 50 student records, 15 companies catalog, hero cohort numbers, NLP JD parser). |
| [`app.yaml`](file:///Users/pandurangnayak/desktop/Skill-Lamp/3-backend/app.yaml) | Databricks App packaging configuration. |
| [`requirements.txt`](file:///Users/pandurangnayak/desktop/Skill-Lamp/3-backend/requirements.txt) | Python dependencies. |

---

## 3. Endpoints Implemented

### 1. `POST /api/auth/login` & `GET /api/auth/me`
- **TPO Login**: `tpo@rvce.edu.in` -> Role: `TPO`, full candidate access.
- **Student Login**: `USN_2024_001@rvce.edu.in` -> Role: `STUDENT`, locked to `USN_2024_001`.
- Returns tamper-proof bearer session token.

### 2. `POST /api/match-jd`
- Instant recruiter job description matcher.
- Parses CGPA cutoffs, mandatory/preferred skills, and branch constraints.
- Returns matched student IDs, SQL query, and execution duration.

### 3. `GET /api/students/spreadsheet`
- TPO candidate data grid with filters (`branch`, `min_cgpa`, `search`, `status`).
- Pre-populated with top 50 student records and dynamic company unlock counters.
- Strictly protected by `require_tpo` dependency.

### 4. `GET /api/student/me`
- Student isolated profile & Reverse Roadmap baseline.
- Returns current readiness score, eligible companies, blocked companies with explicit `blocker_reason`, and target company roadmap options.
- Strictly isolated to the authenticated student's session.

### 5. `POST /api/query`
- TPO Genie Copilot natural language interface.
- Executes queries against Databricks Genie Space with a 6-second timeout guard.
- Returns governed columns, rows, execution SQL, and filtered candidate IDs.

### 6. `POST /api/whatif`
- Time Machine simulator with live recalculation.
- Fetches governed cohort statistics and passes raw integer counts to [`probability.py`](file:///Users/pandurangnayak/desktop/Skill-Lamp/3-backend/probability.py).
- Evaluates newly unlocked companies, tier distribution shift, and synergy bonuses (e.g. Databricks DE + PySpark -> 92.0% probability).

---

## 4. Anti-Hallucination & Failover Architecture

1. **Zero LLM Math Hallucination**:
   - Genie only supplies raw integer aggregations (`placed_count`, `total_count`, `sum_ctc`).
   - All arithmetic ($\Delta P$, $\Delta \text{CTC}$, expected value, Bayesian Laplace smoothing) is calculated deterministically in Python.

2. **6-Second Timeout Guard**:
   - `genie_client.py` monitors polling duration. If Databricks compute cold-starts (> 6.0s), it transparently falls back to pre-computed cohort numbers so the UI never blocks.

3. **Stage-Safe Demo Fallback**:
   - Triggerable via header `X-Mock-Fallback: true` (e.g., `Ctrl+Shift+F` on frontend) or environment variable `USE_MOCK_FALLBACK=true`.

---

## 5. Running Locally & Verification

### Run unit tests:
```bash
python3 test_backend.py
```

### Start Development Server:
```bash
uvicorn main:app --reload --port 8000
```

### Unified Single-Port Hosting:
Build the React SPA from `4-frontend/` into `3-backend/static/`. Run Uvicorn on port 8000; the API and frontend SPA will both be served seamlessly from `http://localhost:8000`.
