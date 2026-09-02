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
            Normalized CSV Storage           REST API (Genie Space)
                      |                              |
       +--------------v---------------+ +------------v---------------+
       |    Raw Medallion Schemas     | | Unity Catalog Delta Tables  |
       |  students.csv, skills.csv    | | workspace.campus_           |
       |  companies.csv, history.csv  | | intelligence_gold           |
       +------------------------------+ +-----------------------------+
```

### Component Breakdown

- **`1-data-schema/`**: Medallion data architecture definitions, DDL scripts (`create_tables.sql`), schema documentation (`dataschema.md`), synthetic data generators (`generate_data.py`), and historical placement datasets (6 years, 500+ student profiles, 1,200+ historical cohort records).
- **`2-genie-space/`**: Databricks AI/BI Genie Space instructions (`instructions.md`), trusted parameterized SQL views (`trusted_view.sql`), SQL functions (`trusted_function.sql`), and 50+ benchmark validation queries (`benchmark_questions.md`).
- **`3-backend/`**: FastAPI REST service implementing role-based endpoints, SHA-256 authentication, job description text parsing, regression-based marginal probability estimation, and Databricks API bridges.
- **`4-frontend/`**: Single-page application built on React 18, Vite, TypeScript, and Tailwind CSS, utilizing the Gray Obsidian and Tealish Cyan design system with live SQL trace drawers and zero external UI bloat.
- **`5-pitch-docs/`**: Institutional pitch documentation, executive summaries, and presentation walkthroughs.

---

## 3. Data Schema and Unity Catalog Architecture

The platform's analytical foundation resides in Databricks Unity Catalog under the `workspace.campus_intelligence_gold` schema namespace.

### Core Relational Entities

1. **`students`**:
   - Primary Key: `usn` (Format: `USN_YYYY_NNN`, e.g., `USN_2025_042`)
   - Attributes: Full name, institutional email, branch (`CSE`, `ISE`, `ECE`, `AI/DS`), CGPA, active backlog count, verified skills array, current readiness index.
2. **`placement_history`**:
   - 6-year longitudinal placement records tracking past graduate outcomes.
   - Attributes: Historical student ID, graduation year, skill profile at time of drive, company hired, package offered (CTC in LPA), placement tier.
3. **`companies`**:
   - Registered campus recruitment partners categorized across three distinct institutional tiers:
     - **Core Tech** (3.5 - 7.0 LPA)
     - **Dream** (7.0 - 15.0 LPA)
     - **Super Dream** (15.0+ LPA, up to 45.0 LPA)
   - Attributes: Company identifier, company name, tier classification, package offer, minimum CGPA cutoff, allowed branches, mandatory and preferred skills.
4. **`skills_taxonomy`**:
   - 22 canonical skill competencies categorized across core domains:
     - Languages: Python, Java, C++, TypeScript, Go, Rust
     - Systems and Data: SQL, Docker, Kubernetes, Linux, Git, Apache Spark
     - Cloud and Web: React, Node.js, AWS, Azure, GCP, GraphQL
     - Machine Learning and AI: Machine Learning, Deep Learning, MLOps, NLP

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

The What-If calculation engine models outcomes using longitudinal placement statistics rather than arbitrary heuristics.

### Marginal Placement Probability Delta (Delta P)

Placement probability is modeled as a function of academic performance, branch competitiveness, and verified technical competencies:

```
P(Placement) = 1 / (1 + exp(-(beta_0 + beta_1 * CGPA - beta_2 * Backlogs + SUM(beta_k * Skill_k))))
```

When a student toggles skills in the Skill Toggle Lab, the engine computes:
- Baseline Probability: Probability evaluated using verified skills.
- Simulated Probability: Probability evaluated using verified skills plus candidate additions.
- Delta P: The marginal probability increase (in percentage points).

### Expected Compensation Uplift (Delta CTC)

Expected annual compensation (CTC in LPA) is estimated across eligible recruiting companies weighted by placement likelihood:

```
E[CTC] = SUM( P(Hire | Company_i) * CTC_i )
```

Adding high-tier skills (e.g., Docker, Kubernetes, AWS, Apache Spark) unlocks Super Dream drives, resulting in step-function jumps in expected package.

### Skill Synergy Detection

Certain skill combinations exhibit non-linear compounding returns. The engine inspects toggled skills for known high-value pairings:
- **Cloud Data Engineering**: Python + Apache Spark + AWS (+18% probability synergy bonus)
- **Modern Cloud Native**: Go + Docker + Kubernetes (+22% probability synergy bonus)
- **Full-Stack Systems**: TypeScript + React + Node.js + SQL (+15% probability synergy bonus)

When synergy is detected, the frontend highlights the pairing with a structured callout and applies the joint statistical weight to the calculation.

---

## 7. Databricks AI/BI Genie Space Integration

Databricks Genie serves as the natural language data querying layer.

### System Configuration

- **Space Name**: `Skill Lamp - Campus Placement Intelligence`
- **Warehouse Target**: Serverless Photon SQL Warehouse
- **Primary Schema**: `workspace.campus_intelligence_gold`

### Governed Query Process

1. User enters natural language prompt (e.g., "Show all CSE candidates with CGPA above 8.5 having Python and AWS").
2. Genie Space parses intent against the calibrated semantic model and generates compliant ANSI SQL.
3. Query executes on the Serverless Photon engine against governed Delta tables.
4. The system captures the full execution metadata:
   - Formatted ANSI SQL statement
   - Photon engine latency (milliseconds)
   - Affected row count
   - Unity Catalog lineage and governance status (`PII_MASKED`)
5. The frontend displays the formatted tabular result and embeds the execution trace inside the collapsible `SQLTraceDrawer` component.

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
| `GET` | `/api/student/me` | Student | Fetches isolated student profile and target company options. |
| `POST` | `/api/query` | TPO | Dispatches natural language question to Databricks Genie Space. |
| `POST` | `/api/whatif` | Student | Executes What-If calculation with live delta metrics. |

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

### Build Verification

```bash
cd 4-frontend
npm run build
```
Executes TypeScript type checking (`tsc`) followed by the Vite production asset bundle build.

### Static Code Analysis Checks

- **Zero Arbitrary Hex Classes**: Verified with ripgrep across all TSX files in `4-frontend/src`. All styling is bound to semantic Tailwind tokens.
- **Zero Heavy Elevation**: Verified with ripgrep; all legacy box shadows have been removed.
- **Zero Deprecated Icon and Animation References**: All `Sparkles`, `animate-ping`, and spinning elements have been purged and replaced with standard neutral pulse indicators.
- **Boundary Verification**: All production edits are restricted strictly to files under `4-frontend/`, leaving data schemas and backend contracts untouched.

---

## 12. License and Governance

Institutional deployment code developed for campus placement intelligence, student career readiness acceleration, and governed Databricks Lakehouse demonstration.

All rights reserved. Unauthorized duplication or redistribution of institutional student training datasets without anonymization is strictly prohibited.