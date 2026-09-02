# Skill Lamp — Hackathon Portal Submission

> **Project Name:** Skill Lamp — Governed Placement Intelligence Assistant  
> **Tagline:** Governed, zero-hallucination placement answers for TPOs and students — built on Databricks Unity Catalog and Genie Spaces.

---

## 1. Project Overview & Pitch

### One-Sentence Summary
Skill Lamp is an enterprise-governed placement intelligence platform built on Databricks Unity Catalog and Genie Spaces that eliminates operational chaos for Training & Placement Officers (TPOs) and provides students with deterministic, ROI-backed career roadmaps.

### The Double Crisis in University Placements

Every placement season, higher education institutions face two chronic, compounding bottlenecks:

1. **The TPO Data Maze (Institutional Inefficiency):**
   * Placement cells drown in hundreds of unstructured recruiter emails, siloed spreadsheets, and ad-hoc eligibility requests.
   * Matching a single recruiter job description (JD) against thousands of student profiles takes hours of manual filtering and error-prone lookups.
   * TPOs lack a unified, governed source of truth to derive instant cohorts across branches, CGPA thresholds, backlogs, and verified skill histories.

2. **The Student Guidance Void (Unquantified Advice):**
   * Students receive vague, non-actionable advice such as *"learn more skills"* or *"build projects"* with zero transparency into actual return on investment (ROI).
   * Students cannot quantify how mastering a specific technology (e.g., Databricks Data Engineering vs. Web Development) will shift their placement odds or expected compensation (CTC).
   * Advice fails to account for historical, branch-specific, and CGPA-stratified cohort outcomes.

---

## 2. The Solution: Dual-Persona Placement Intelligence

Skill Lamp solves this crisis by pairing a single, governed data platform with two purpose-built persona experiences:

### Persona A: TPO Command Portal (For Placement Officers)
* **Genie Copilot Sidebar:** Translates natural language placement queries (e.g., *"Find ISE students with CGPA > 8.0 knowing Python and Cloud"*) directly into governed SQL.
* **Instant JD Matcher:** Placement officers can paste a raw recruiter job description, and Genie immediately extracts requirements and returns an eligible candidate roster.
* **Governed Candidate Spreadsheet:** An interactive roster equipped with instant CSV exports and a live **SQL Trace Drawer** and **Lineage Strip** verifying Unity Catalog column-level PII masking.

### Persona B: Student Placement Time Machine (For Students)
* **Privacy-Isolated Profile:** Students log in to a privacy-locked view restricted strictly to their own data via row-level security.
* **"What If I Learn This Skill?" Simulator:** A dynamic simulation engine that queries 6 years of historical placement cohort data to calculate real-world ROI for acquiring new skills.
* **Reverse Roadmap & Synergy Engine:** Students select their dream employer (e.g., Databricks @ 48.0 LPA), detect exact skill gaps, simulate skill bridge outcomes, and explore synergistic skill pairings (e.g., Data Engineering + PySpark) that maximize their offer probability.

---

## 3. Technical Architecture & Data Flow

Skill Lamp enforces a 4-tier governed pipeline where no layer is bypassed:

```
┌────────────────────────────────────────────────────────┐
│                   React + Tailwind UI                  │
│       (TPO Command Portal & Student Time Machine)      │
└───────────────────────────┬────────────────────────────┘
                            │ REST / JSON
┌───────────────────────────▼────────────────────────────┐
│                  FastAPI Backend Engine                │
│    (Authentication, Orchestration & Deterministic Math)│
└───────────────────────────┬────────────────────────────┘
                            │ API / Governed SQL Call
┌───────────────────────────▼────────────────────────────┐
│                 Databricks Genie Space                 │
│      (Semantic Layer, Domain Context & Trusted Views)  │
└───────────────────────────┬────────────────────────────┘
                            │ Governed Storage Access
┌───────────────────────────▼────────────────────────────┐
│             Databricks Unity Catalog                   │
│   (4 Gold Delta Tables, Column Masking & Row Filters)  │
└────────────────────────────────────────────────────────┘
```

1. **Storage & Governance (Databricks Unity Catalog):**
   * Houses 4 Gold Delta Tables (`students`, `placements`, `companies`, `skills`) acting as the immutable source of truth across 6 years of historical cohort data.
   * Enforces role-based access control (RBAC), row-level filtering (students see only their records), and column-level PII masking (masking student phone numbers, emails, and sensitive identifiers before queries execute).

2. **Semantic Query Layer (Databricks Genie Space):**
   * Configured with strict domain instructions, trusted views, and parameterized table functions.
   * Converts plain-English queries and unstructured recruiter JDs into strictly validated ANSI SQL.

3. **Computation & Arithmetic (FastAPI Backend Engine):**
   * Acts as the orchestration bridge between the front-end and Databricks.
   * Implements the **Zero-Hallucination Pipeline**: Genie is restricted to returning raw cohort counts and historical aggregates, while 100% of probability math, CTC projections, and synergy calculations are computed deterministically in Python.

4. **Presentation Layer (React + Vite + Tailwind CSS):**
   * Delivers an intuitive UI with zero-latency persona switching, interactive candidate rosters, dynamic ROI charts, and transparent SQL Trace Drawers.

---

## 4. Trust, Safety & The Zero-Hallucination Pipeline

A primary risk of applying generative AI to academic and placement operations is mathematical hallucination and data leakage. Skill Lamp is engineered specifically to eliminate these failure modes:

| Dimension | Generic LLM Text-to-SQL | Skill Lamp Governed Pipeline |
| :--- | :--- | :--- |
| **Query Accuracy** | Hallucinates table joins, schemas, and non-existent columns. | Constrained to Unity Catalog trusted views and predefined Genie Space domain semantics. |
| **Data Governance & Privacy** | Plaintext prompts risk leaking student PII to external models. | Unity Catalog natively enforces column-level PII masking and student-level row filtering. |
| **Calculation Accuracy** | LLMs approximate arithmetic and invent probabilities. | Deterministic Python engine computes 100% of probabilities, CTC deltas, and cohort percentages. |
| **Auditability & Explainability** | Black-box output with no reproducible logic. | Full transparency via the SQL Trace Drawer and lineage strip showing exact generated queries and runtime logs. |

---

## 5. Measured Impact & Live Demo Proof Points

In our live validation cohort featuring student Priya Nair (ISE Department), Skill Lamp demonstrated tangible, measurable transformation:

* **Placement Probability Jump:** From **40% → 80% (+40 pts)** upon bridging the *Databricks Data Engineering* skill gap.
* **Expected CTC Increase:** From **8.20 LPA → 18.50 LPA (+10.30 LPA net gain)**.
* **Synergy Boost:** Pairing *Databricks Data Engineering* with *PySpark* unlocks a **92.0%** placement probability via the Synergy Engine.
* **Opportunity Expansion:** Unlocks **3 new tier-1 companies** previously out of reach based on historical eligibility criteria.
* **TPO Efficiency Gain:** Reduces candidate shortlisting turnaround from hours of spreadsheet filtering down to **under 5 seconds** via instant JD ingestion.

---

## 6. Challenges Overcame

1. **Constraining LLM Outputs for High-Stakes Analytics:** Standard LLMs frequently generate plausible-sounding but erroneous mathematical estimates. We resolved this by decoupling semantic SQL generation (handled by Genie) from quantitative calculations (handled by deterministic Python functions).
2. **Multi-Tenant Privacy in Academic Environments:** Balancing broad aggregate analytics for TPOs with strict privacy boundaries for students was achieved using Unity Catalog row filters and column masking policies.
3. **Real-Time Unstructured JD Parsing:** Ensuring that messy, unstructured recruiter emails correctly map to canonical skills in the database was accomplished by grounding Genie Spaces with verified skill taxonomy schemas and trusted views.

---

## 7. Future Roadmap

* **Multi-Campus Enterprise Scale:** Expand the unified Unity Catalog architecture across multi-college university systems and state placement consortia.
* **Automated Resume & Portfolio Ingestion:** Direct PDF resume parsing to automatically construct and update student skill graphs without manual data entry.
* **Cryptographically Verified Credential Badges:** Issue verifiable, tamper-proof skill badges directly backed by institutional course completions and lab assessments for one-click recruiter verification.

---

## 8. Built With

* **Databricks:** Unity Catalog, Genie Spaces, Delta Lake, SQL Warehouse
* **Backend:** Python, FastAPI, Uvicorn, Pydantic, Databricks SDK
* **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons
* **Governance & Security:** Unity Catalog Row Filters, Column-Level PII Masking, ANSI SQL
