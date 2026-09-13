# Skill Lamp: Institutional Placement Intelligence Platform

Skill Lamp is an enterprise-grade campus placement intelligence platform engineered for higher education institutions. The platform combines a high-performance FastAPI backend, a responsive React and TypeScript frontend, Databricks AI/BI Genie Space, and Unity Catalog Delta Lake architecture to deliver real-time career analytics, governed natural language data querying, and predictive skill-return simulation.

---

## 1. Executive Summary and Value Proposition

Traditional campus placement operations rely on fragmented spreadsheets, delayed batch reporting, and static student profile tracking. Students lack transparency into prerequisite gaps for dream companies, while Training and Placement Officers (TPOs) struggle to rapidly filter hundreds of candidate records against incoming recruiter job descriptions.

Skill Lamp solves both sides of this equation through strict persona isolation:

1. **For Training and Placement Officers (TPOs)**: An institutional command center featuring an interactive candidate catalog, rapid recruiter job description (JD) constraint extraction, and a natural language copilot backed by Databricks Genie over governed Unity Catalog Delta tables.
2. **For Students**: A career analytics portal featuring a "What-If" simulation engine, target company reverse roadmaps, skill return on investment (ROI) calculations, and personalized Genie career advising based on six years of historical cohort data.

---

## 2. System Architecture

Skill Lamp follows a decoupled client-server architecture with governed enterprise data warehousing.

```
       +-------------------------------------------------------------+
       |                     Skill Lamp Client                       |
       |             React 18 + Vite + TypeScript + Tailwind         |
       +------------------------------+------------------------------+
                                      |
                      HTTPS / REST (JSON) with Bearer JWT
                                      |
       +------------------------------v------------------------------+
       |                    FastAPI Backend Engine                   |
       |           Uvicorn + Pydantic v2 + SHA-256 Auth              |
       +--------------+------------------------------+---------------+
                      |                              |
            Local File System                 Databricks Cloud
            Normalized CSV Storage           Dual Genie Spaces (REST API)
                      |                              |
       +--------------v---------------+ +------------v---------------+
       |    Raw Medallion Schemas     | | Unity Catalog Delta Tables  |
       |  students.csv, skills.csv    | | workspace.campus_           |
       |  companies.csv,              | | intelligence_gold           |
       |  placement_history.csv       | | (TPO & Student Spaces)      |
       +------------------------------+ +-----------------------------+
```

### Component Breakdown

- **`1-data-schema/`**: Medallion data architecture definitions, DDL scripts (`create_tables.sql`), schema documentation (`dataschema.md`), synthetic data generators (`generate_data.py`), and historical placement datasets (6 years, 2020-2025, 500 student profiles in `students.csv`, 2,400 historical cohort records in `placement_history.csv`, 16-skill canonical taxonomy in `skills_taxonomy.csv`, and 13 enterprise recruiters in `companies.csv`).
- **`2-genie-space/`**: Databricks AI/BI Genie Space instructions for both personas (`instructions.md` for TPO space, `instructions_calc_space.md` for Student calculation space), trusted parameterized SQL views (`trusted_view.sql`), SQL functions (`trusted_function.sql`), semantic architecture guide (`geniespace.md`), and 50+ benchmark validation queries (`benchmark_questions.md`).
- **`3-backend/`**: FastAPI REST service implementing role-based endpoints, SHA-256 authentication, job description text parsing, frequentist cohort probability estimation with Bayesian Laplace smoothing, dual-space Genie query routing, and Databricks API bridges.
- **`4-frontend/`**: Single-page application built on React 18, Vite, TypeScript, and Tailwind CSS, utilizing the Gray Obsidian and Tealish Cyan design system with live SQL trace drawers, 22 interactive toggle skills, and zero external UI bloat.
- **`5-pitch-docs/`**: Institutional pitch documentation, executive summaries, and presentation walkthroughs.

---

## 3. Data Schema and Unity Catalog Architecture

The platform's analytical foundation resides in Databricks Unity Catalog under the `workspace.campus_intelligence_gold` schema namespace.

### Core Relational Entities (Gold Layer)

1. **`gold_dim_students`**:
   - Primary Key: `student_id` (Format: `USN_YYYY_NNN`, e.g., `USN_2025_042`)
   - Attributes: Full name, institutional email (`@rvce.edu.in`), branch (`CSE`, `ISE`, `ECE`, `AI/DS`), CGPA (5.50 - 9.90), graduation year (2025), active backlogs (0, 1, 2+), gender.
2. **`gold_dim_company_criteria`**:
   - Registered campus recruitment partners categorized across three distinct institutional compensation tiers:
     - **Core Tech** (< 18.0 LPA, e.g., Infosys DSE 7.0 LPA, Accenture Adv 8.5 LPA, TCS Digital 9.0 LPA)
     - **Dream** (18.0 - 37.0 LPA, e.g., Cisco 18.0 LPA, Morgan Stanley 20.0 LPA, Atlassian 24.0 LPA, Adobe 26.0 LPA, Goldman Sachs 28.0 LPA, Amazon 32.0 LPA)
     - **Super Dream** (>= 38.0 LPA, e.g., NVIDIA 38.0 LPA, Microsoft 42.0 LPA, Google 45.0 LPA, Databricks 48.0 LPA)
   - Attributes: Company ID, enterprise name, tier classification, package offer (CTC in LPA), minimum CGPA cutoff, max backlogs allowed, allowed branches array, mandatory skills array, preferred skills array.
3. **`gold_fact_student_skills`**:
   - Verified student skill competencies and certifications.
   - Attributes: Skill ID, student ID, standardized skill name, domain category (`AI / GenAI`, `Data Engineering & Cloud`, `Core Engineering`), proficiency level (`Beginner`, `Intermediate`, `Advanced`), certified flag (`BOOLEAN`).
4. **`gold_fact_placement_history`**:
   - 6-year longitudinal placement records (2020-2025) tracking 2,400 historical graduate outcomes.
   - Attributes: Placement ID, academic graduation year, student ID, company ID, offer status (`Placed` / `Not Placed`), offered CTC in LPA (0.00 if unplaced), primary skill at hire, AI/Data high-value skill flag (`had_ai_data_skill`).

### Trusted Semantic Views and SQL Functions

- **`v_student_company_eligibility`**: Pre-computes candidate eligibility across all student-recruiter Cartesian pairings with canonical blocker classifications (`ELIGIBLE`, `CGPA_BELOW_CUTOFF`, `MISSING_MANDATORY_SKILLS`, `BRANCH_INELIGIBLE`, `ACTIVE_BACKLOGS`).
- **`fn_readiness_score`**: Deterministic 0-100 student readiness scoring formula evaluating academic GPA, core skill coverage, advanced certifications, and standing backlog status.

### Standardized Skill Taxonomy

- **Canonical Gold Taxonomy (16 Skills)**:
  - **AI / GenAI (8)**: `GENAI_LLMS`, `MACHINE_LEARNING`, `DEEP_LEARNING`, `LANGCHAIN`, `PROMPT_ENGINEERING`, `COMPUTER_VISION`, `NLP`, `VECTOR_DATABASES`
  - **Data Engineering & Cloud (4)**: `DATABRICKS_DE`, `PYSPARK`, `SQL`, `AWS_CLOUD`
  - **Core Engineering (4)**: `PYTHON`, `CPP`, `JAVA_BACKEND`, `REACT`
- **Frontend Interactive Skill Toggle Matrix (22 Skills)**:
  - Expands the taxonomy in the UI to include `DOCKER`, `KUBERNETES`, `CICD`, `DATA_STRUCTURES`, `SYSTEM_DESIGN`, and `FASTAPI` for granular what-if career simulation.

### Data Privacy and Masking

All queries generated by Databricks Genie apply automated column-level masking to protect personally identifiable information (PII). Student phone numbers, personal email addresses, and residential data are excluded from the Gold analytical layer.

---

## 4. Persona Isolation and Role-Based Access Control (RBAC)

Skill Lamp enforces cryptographic role isolation. Neither persona can navigate to or inspect data restricted to the other.

### Training and Placement Officer (TPO)

- **Primary Interface**: Candidate Spreadsheet (`TPOSpreadsheet.tsx`).
- **Data Access Scope**: Institution-wide aggregate cohort records.
- **Tools**:
  - Multi-dimensional filtering (branch selection, dynamic CGPA threshold slider, zero-backlog toggle).
  - Recruiter JD Quick-Matcher: Natural language parser extracting CGPA, branch, and required skill constraints into SQL filter predicates.
  - TPO Genie Copilot: Natural language SQL workspace connected directly to Unity Catalog for ad-hoc institutional reporting.
  - CSV Shortlist Export: One-click formatted candidate list generation for visiting recruiter panels.
- **Security Boundary**: The TPO view cannot cross-navigate into an individual student's private career planner or modify individual target company preferences.

### Student Portal

- **Primary Interface**: Time Machine Simulation Dashboard (`StudentDashboard.tsx`).
- **Data Access Scope**: Strictly scoped to the authenticated student's unique USN.
- **Tools**:
  - Target Company Reverse Roadmap: Prerequisite diagnostic identifying missing mandatory skills and academic eligibility blockers.
  - What-If Career Simulation Engine: Interactive 22-skill selection matrix recalculating marginal placement probability and expected compensation in real time.
  - Tier Shift Visualizer: Graphical breakdown showing how skill acquisition shifts likelihood between Core Tech, Dream, and Super Dream tiers.
  - Student Genie Career Advisor: Copilot grounded in the individual student's profile context.
- **Security Boundary**: A student token cannot execute cohort-wide queries or inspect peer records.

---

## 5. Institutional Access Credentials

All user credentials are authenticated via SHA-256 password hashing against institutional records in `1-data-schema/students.csv`.

### Training and Placement Officer (TPO)

| Role | Officer Name | Institutional Email | Plain Password | SHA-256 Password Hash |
| :--- | :--- | :--- | :--- | :--- |
| Head TPO | Dr. S. K. Murthy | `tpo@rvce.edu.in` | `TpoPlacement@2025` | `08549d643924cdd171ff52ffc3c8995277d51253c78fcfd0cb945f647ef1f759` |

### Verified Student Accounts (Sample Cohort)

| USN | Student Name | Branch | CGPA | Institutional Email | Plain Password |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `USN_2025_042` | Priya Nair (Hero Candidate) | ISE | 8.12 | `priya.ise21@rvce.edu.in` | `Priya@RVCE2025` |
| `USN_2025_001` | Aarav Sharma (Top Tier) | CSE | 9.85 | `aarav.cse21_1@rvce.edu.in` | `Aarav@RVCE2025` |
| `USN_2025_003` | Bhavna Pillai | CSE | 8.11 | `bhavna.cse21_3@rvce.edu.in` | `Bhavna@RVCE2025` |
| `USN_2025_202` | Divya Kulkarni | ISE | 7.94 | `divya.ise21_202@rvce.edu.in` | `Divya@RVCE2025` |
| `USN_2025_339` | Meera Menon | ECE | 9.80 | `meera.ece21_339@rvce.edu.in` | `Meera@RVCE2025` |
| `USN_2025_211` | Tanvi Hegde | ISE | 8.15 | `tanvi.ise21_211@rvce.edu.in` | `Tanvi@RVCE2025` |

Student password convention across all 500 records in `students.csv`: `<FirstName>@RVCE2025` (e.g., `Ankit@RVCE2025` for Ankit Verma).

---

## 6. Analytical Methodology and Simulation Engine

The What-If calculation engine models outcomes using longitudinal placement statistics from 6 years of cohort records rather than arbitrary heuristics.

### 1. Individualized Academic & Demographic Baseline Curve

A candidate's baseline probability ($P_{\text{base}}$) and baseline compensation ($E[\text{CTC}]_{\text{base}}$) without target skills are dynamically calibrated from their individual academic profile (CGPA) and engineering branch:

```python
# Normalized CGPA curve (range 5.5 to 9.85)
norm = max(0.0, min(1.0, (cgpa - 5.5) / (9.85 - 5.5)))
base_rate = 18.0 + (norm ** 1.6) * (95.5 - 18.0)

# Departmental competitiveness calibration
if student_branch in ("CSE", "AI/DS"):
    base_rate += 2.0
elif student_branch == "ECE":
    base_rate -= 1.0

base_rate = round(min(95.5, max(14.0, base_rate)), 1)
base_avg_ctc = round(min(20.0, max(5.5, 5.5 + (norm ** 1.5) * 14.43)), 2)
```

### 2. Empirical Frequentist Probability with Bayesian Laplace Smoothing

When evaluating placement likelihood for candidates with or without candidate skills, the engine applies Bayesian Laplace smoothing whenever the historical cohort sample size is small ($N < 5$), preventing small-sample distortion:

```
P(Placement | N < 5)  = ((Placed + 2) / (Total + 5)) * 100%
P(Placement | N >= 5) = (Placed / Total) * 100%
```

A Bayesian ceiling of 98.0% is enforced across all simulations to maintain probabilistic realism.

### 3. Expected Value of Compensation Uplift (Delta CTC)

Expected annual compensation ($E[\text{CTC}]$ in LPA) is estimated as the probability-weighted package across the cohort:

```
E[CTC] = (P(Placement) / 100) * Avg_CTC_of_placed_candidates
Delta P = P_simulated - P_baseline
Delta CTC = E[CTC]_simulated - E[CTC]_baseline
```

Adding high-tier skills unlocks Dream and Super Dream drives, producing step-function jumps in expected package and eligible company count.

### 4. Skill Synergy Detection

Complementary skill pairings unlock non-linear compounding returns:
- **PySpark + Databricks Data Engineering (`PYSPARK` + `DATABRICKS_DE`)**:
  - Automatically triggers a synergy alert: unlocks the Databricks Super Dream drive (48.0 LPA) and elevates placement probability to 92.0% (and up to 98.0% for high-CGPA candidates).
  - Toggling either skill without the other provides a contextual synergy hint encouraging the complementary skill.

---

## 7. Databricks AI/BI Genie Space Integration

Skill Lamp operates a **Dual Genie Space Architecture** to serve distinct persona governance requirements.

### Dual Genie Space Configuration

1. **Institutional / TPO Space (`GENIE_SPACE_ID`)**:
   - Instructions: `2-genie-space/instructions.md`
   - Purpose: Cohort-wide ad-hoc SQL querying, branch placement ratios, and recruiter JD criteria filtering across all 500 candidates.
2. **Student Career Intelligence & Calculation Space (`GENIE_CALC_SPACE_ID`)**:
   - Instructions: `2-genie-space/instructions_calc_space.md`
   - Purpose: Individualized career advising, blocker reason diagnosis (`v_student_company_eligibility`), and raw 6-column cohort counts extraction (`placed_with_skill`, `total_with_skill`, `placed_without_skill`, `total_without_skill`, `avg_ctc_with_skill`, `avg_ctc_without_skill`).
   - Strict Anti-Clarification Directive: Never prompts the student with counter-questions; returns immediate empirical figures or maps to closest governed competencies.

### Governed Query & Resilience Workflow

1. User enters a natural language query in the chat copilot.
2. The FastAPI backend inspects user role:
   - If **TPO**: dispatches to `GENIE_SPACE_ID`.
   - If **STUDENT**: automatically enriches prompt with candidate academic context (USN, branch, CGPA, backlogs, current skills) and dispatches to `GENIE_CALC_SPACE_ID`.
3. Databricks Genie generates ANSI SQL and executes on the Serverless Photon SQL Warehouse.
4. **Automatic Calculation Fallback**: If Genie returns a canned clarification request or refusal ("cannot calculate"), the backend intercepts the response and resolves exact historical placement deltas via `calculate_skill_roi_from_history()`.
5. Frontend renders the response, masking raw space IDs, and embeds full execution metadata inside `SQLTraceDrawer`.

---

## 8. API Specifications

All endpoints are prefixed with `/api` and require an HTTP Authorization header formatted as `Bearer <token>` (except public authentication routes).

### Endpoint Directory

| Method | Path | Role | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | Authenticates credentials and issues signed session token. |
| `GET` | `/api/auth/me` | Authenticated | Validates session token and returns active user identity. |
| `POST` | `/api/match-jd` | TPO | Extracts recruiter JD criteria and matches candidate USNs. |
| `GET` | `/api/students/spreadsheet` | TPO | Fetches candidate records with branch, CGPA, and backlog filters. |
| `GET` | `/api/student/me` | Student | Fetches isolated student profile, blocker diagnostics, and target companies. |
| `POST` | `/api/query` | TPO / Student | Dispatches natural language question to Genie Space with persona routing and context enrichment. |
| `POST` | `/api/whatif` | Student | Executes What-If calculation with live delta metrics and synergy detection. |

### Stage-Safe Mock Fallback Mode

To guarantee operational stability during institutional live demonstrations where cloud network connectivity may fluctuate, the backend supports instantaneous offline fallback mode:
- Environment Variable: Set `USE_MOCK_FALLBACK=true` in `3-backend/.env`.
- Request Header: Supply `X-Mock-Fallback: true` with any API call.

When active, the backend returns deterministic, schema-compliant analytical payloads generated directly from the local dataset in `1-data-schema/`.

---

## 9. Frontend Design System

The frontend interface follows the **Gray Obsidian + Tealish Cyan** design specification. The design emphasizes informational density, high contrast, and flat visual hierarchy suitable for professional enterprise software.

### Palette Architecture

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `bg` | `#121214` | Neutral obsidian page background. |
| `surface` | `#1A1A1D` | Primary card, container, and panel background. |
| `surfaceRaised` | `#212124` | Dropdowns, hover states, and modal overlays. |
| `border` | `#2C2C30` | Default 1px structural borders. |
| `borderSubtle` | `#232326` | Internal table dividers and secondary separators. |
| `text` | `#EDEDEF` | Primary high-readability off-white typography. |
| `muted` | `#98989E` | Secondary typography, metadata, and column headers. |
| `subtle` | `#656569` | Tertiary labels, hints, and disabled text. |
| `accent` | `#22C3B6` | Canonical tealish cyan accent for primary actions and highlights. |
| `accentHover` | `#1AA396` | Pressed and hovered state for primary buttons. |
| `accentWash` | `rgba(34,195,182,0.12)` | Subtle tinted background for active rows and tags. |
| `success` | `#3FAE74` | Muted green indicating eligibility and completed prerequisites. |
| `warning` | `#C99A4A` | Muted amber indicating positive simulation metric deltas. |
| `danger` | `#D9534F` | Muted red indicating academic blockers and missing skills. |

### Implementation Constraints

- **Typography**: Inter / Outfit sans-serif hierarchy with JetBrains Mono font stacks for all USNs, CGPA values, currency metrics, and SQL code blocks.
- **Contrast**: Primary action buttons pair `#22C3B6` with dark background text (`#121214`), delivering an 8.5:1 contrast ratio that exceeds WCAG AAA standards.
- **Elevation**: Completely flat design. Drop shadows (`shadow-md`, `shadow-lg`, `shadow-2xl`) have been eliminated in favor of clean 1px border delineation.
- **Radii**: Standardized strictly on `rounded-lg` for structural cards and panels, and `rounded-md` for interactive buttons, chips, and input fields. Circular radius (`rounded-full`) is restricted exclusively to status indicator dots and avatar circles.

---

## 10. Local Installation and Execution

### Prerequisites

- Python 3.10 or higher
- Node.js 18.0 or higher
- npm 9.0 or higher

### Option A: Automated One-Click Launchers (Recommended)

From the repository root:

- **Windows PowerShell**:
  ```powershell
  .\start.ps1
  ```
- **Windows Command Prompt**:
  ```cmd
  start.bat
  ```

The launcher starts the FastAPI backend on port `8000`, the Vite frontend dev server on port `5173`, and opens the default web browser to `http://localhost:5173`.

---

### Option B: Manual Step-by-Step Launch

#### 1. Configure and Run Backend

```bash
cd 3-backend

# Create and activate Python virtual environment
python -m venv venv

# Windows activate:
.\venv\Scripts\activate
# Linux/macOS activate:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

- API Base URL: `http://localhost:8000`
- Interactive OpenAPI Documentation (Swagger): `http://localhost:8000/docs`
- ReDoc Documentation: `http://localhost:8000/redoc`

#### 2. Configure and Run Frontend

```bash
cd 4-frontend

# Install npm packages
npm install

# Start development server
npm run dev -- --port 5173
```

- Web Interface: `http://localhost:5173`

---

## 11. Verification and Quality Assurance

The codebase adheres to rigorous verification benchmarks:

### Build & Test Verification

#### Frontend Production Build
```bash
cd 4-frontend
npm run build
```
Executes TypeScript type checking (`tsc`) followed by the Vite production asset bundle build.

#### Backend Automated Test Suite
```bash
cd 3-backend
python test_backend.py
```
Executes 15 integration and unit tests validating SHA-256 auth, RBAC session scoping, JD NLP parsing, fallback Genie query processing, Bayesian Laplace smoothing, and What-If simulation mathematics.

### Static Code Analysis Checks

- **Zero Arbitrary Hex Classes**: Verified with ripgrep across all TSX files in `4-frontend/src`. All styling is bound to semantic Tailwind tokens.
- **Zero Heavy Elevation**: Verified with ripgrep; all legacy box shadows have been removed in favor of clean 1px borders.
- **Zero Deprecated Icon and Animation References**: All `Sparkles`, `animate-ping`, and spinning elements have been purged and replaced with standard neutral pulse indicators.
- **Boundary Verification**: All production edits maintain strict decoupled contracts across frontend components, backend services, and Unity Catalog schemas.

---

## 12. License and Governance

Institutional deployment code developed for campus placement intelligence, student career readiness acceleration, and governed Databricks Lakehouse demonstration.

All rights reserved. Unauthorized duplication or redistribution of institutional student training datasets without anonymization is strictly prohibited.