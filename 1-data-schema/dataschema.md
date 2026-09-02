# Skill Lamp — Placement Intelligence Assistant
## Data & Schema Layer Architecture (`1-data-schema/`)

### 1. Overview & Purpose
The **Data & Schema Layer** serves as the deterministic, governed ground truth for Skill Lamp. It powers:
1. **TPO Command Portal**: Candidate cohort querying, company drive eligibility filtering, and batch placement analytics.
2. **Student Placement Time Machine**: Single-student profile locking, what-if skill acquisition simulations, and historical ROI uplift modeling.
3. **Databricks AI/BI Genie Space**: Governed natural language translation to SQL without LLM arithmetic errors.

---

### 2. File Catalog & Deliverables

| File | Type | Description |
|---|---|---|
| [`generate_data.py`](file:///C:/Thought/Projects/Skill-Lamp/1-data-schema/generate_data.py) | Python Script | Deterministic generator using **Faker** & **NumPy** (`seed=42`) with automated verification assertions |
| [`students.csv`](file:///C:/Thought/Projects/Skill-Lamp/1-data-schema/students.csv) | Dataset | 500 candidate student records with exact branch, CGPA, backlog, and pre-seeded demo accounts |
| [`companies.csv`](file:///C:/Thought/Projects/Skill-Lamp/1-data-schema/companies.csv) | Dataset | 13 visiting recruiting companies across 3 tiers with eligibility criteria & skill requirements |
| [`skills.csv`](file:///C:/Thought/Projects/Skill-Lamp/1-data-schema/skills.csv) | Dataset | 2,222 student-skill fact rows mapping students to the 16-skill taxonomy with proficiencies & certifications |
| [`skills_taxonomy.csv`](file:///C:/Thought/Projects/Skill-Lamp/1-data-schema/skills_taxonomy.csv) | Reference | Standardized 16-skill taxonomy across AI/GenAI, Data Engineering, and Core Engineering |
| [`placement_history.csv`](file:///C:/Thought/Projects/Skill-Lamp/1-data-schema/placement_history.csv) | Dataset | 2,400 historical placement records across 6 academic years (2020–2025) generated via Sigmoid model with exact hero cohort pre-seeding |
| [`create_tables.sql`](file:///C:/Thought/Projects/Skill-Lamp/1-data-schema/create_tables.sql) | SQL DDL | Unity Catalog Gold table schemas, column comments, array-parsing ETL queries, and analytical views |

---

### 3. Student Cohort Demographics (500 Students)

- **Total Cohort Size**: 500 candidate students (Graduation Batch 2025)
- **Branch Breakdown**:
  - **CSE** (Computer Science & Eng): 40% → 200 students
  - **ISE** (Information Science & Eng): 25% → 125 students
  - **ECE** (Electronics & Comm Eng): 20% → 100 students
  - **AI/DS** (Artificial Intelligence & Data Science): 15% → 75 students
- **CGPA Distribution**:
  - Gaussian distribution ($\mu = 7.67, \sigma = 1.01$, clamped to $[5.50, 9.90]$)
  - **Tier A** (CGPA $\ge 8.50$): 20.0% (100 students)
  - **Tier B** (CGPA $7.00 - 8.49$): 55.4% (277 students)
  - **Tier C** (CGPA $6.00 - 6.99$): 19.8% (99 students)
  - **Tier D** (CGPA $< 6.00$): 4.8% (24 students)
- **Backlog Distribution**:
  - **0 Backlogs**: 82.0% (410 students)
  - **1 Backlog**: 12.0% (60 students)
  - **2+ Backlogs**: 6.0% (30 students)

---

### 4. Pre-Seeded Institutional Demo Accounts

| Role | Name | Email | USN / ID | Branch | CGPA | Backlogs | Scope / Persona |
|---|---|---|---|---|---|---|---|
| **TPO Officer** | Dr. S. K. Murthy (TPO) | `tpo@rvce.edu.in` | `USN_2025_001` | CSE | 9.85 | 0 | Full access to all 500 candidate rows & TPO Genie queries |
| **Student (Hero)** | Priya Nair | `priya.ise21@rvce.edu.in` | `USN_2025_042` | ISE | 8.12 | 0 | Locked strictly to USN_2025_042; What-if simulator user |
| **Student (Alt)** | Rahul Verma | `rahul.cse21@rvce.edu.in` | `USN_2025_108` | CSE | 7.65 | 0 | Locked strictly to USN_2025_108; Alternative student persona |

---

### 5. Company Eligibility Roster (13 Companies, 3 Tiers)

| ID | Company Name | Tier | CTC (LPA) | Min CGPA | Max Backlogs | Eligible Branches | Mandatory Skills | Preferred Skills |
|---|---|---|---|---|---|---|---|---|
| `COMP_001` | Databricks | Super Dream | 48.00 | 8.50 | 0 | `[CSE, ISE, AI/DS]` | `[PYSPARK, SQL, PYTHON]` | `[DATABRICKS_DE, VECTOR_DATABASES]` |
| `COMP_002` | Google | Super Dream | 45.00 | 8.50 | 0 | `[CSE, ISE, ECE, AI/DS]` | `[PYTHON, CPP]` | `[MACHINE_LEARNING, DEEP_LEARNING]` |
| `COMP_003` | Microsoft | Super Dream | 42.00 | 8.00 | 0 | `[CSE, ISE, ECE, AI/DS]` | `[CPP, PYTHON, SQL]` | `[GENAI_LLMS, AWS_CLOUD]` |
| `COMP_004` | NVIDIA | Super Dream | 38.00 | 8.00 | 0 | `[CSE, ISE, ECE, AI/DS]` | `[CPP, PYTHON]` | `[DEEP_LEARNING, COMPUTER_VISION]` |
| `COMP_005` | Amazon | Dream | 32.00 | 7.50 | 0 | `[CSE, ISE, ECE, AI/DS]` | `[JAVA_BACKEND, SQL]` | `[AWS_CLOUD]` |
| `COMP_006` | Goldman Sachs | Dream | 28.00 | 7.75 | 0 | `[CSE, ISE, AI/DS]` | `[PYTHON, SQL, CPP]` | `[MACHINE_LEARNING]` |
| `COMP_007` | Adobe | Dream | 26.00 | 7.50 | 0 | `[CSE, ISE, AI/DS]` | `[PYTHON, REACT, CPP]` | `[COMPUTER_VISION, GENAI_LLMS]` |
| `COMP_008` | Atlassian | Dream | 24.00 | 7.50 | 0 | `[CSE, ISE]` | `[JAVA_BACKEND, REACT]` | `[AWS_CLOUD]` |
| `COMP_009` | Morgan Stanley | Dream | 20.00 | 7.25 | 0 | `[CSE, ISE, ECE, AI/DS]` | `[JAVA_BACKEND, SQL]` | `[PYTHON]` |
| `COMP_010` | Cisco | Dream | 18.00 | 7.00 | 1 | `[CSE, ISE, ECE]` | `[PYTHON]` | `[AWS_CLOUD]` |
| `COMP_011` | TCS Digital | Core Tech | 9.00 | 6.50 | 1 | `[CSE, ISE, ECE, AI/DS]` | `[PYTHON, SQL]` | `[MACHINE_LEARNING, REACT]` |
| `COMP_012` | Accenture Adv | Core Tech | 8.50 | 6.25 | 1 | `[CSE, ISE, ECE, AI/DS]` | `[JAVA_BACKEND, SQL]` | `[AWS_CLOUD]` |
| `COMP_013` | Infosys DSE | Core Tech | 7.00 | 6.00 | 2 | `[CSE, ISE, ECE, AI/DS]` | `[PYTHON, SQL]` | `[PYSPARK]` |

---

### 6. Standardized Coding & AI Skill Taxonomy (16 Skills)

- **AI / GenAI (8)**: `GENAI_LLMS`, `MACHINE_LEARNING`, `DEEP_LEARNING`, `LANGCHAIN`, `PROMPT_ENGINEERING`, `COMPUTER_VISION`, `NLP`, `VECTOR_DATABASES`
- **Data Engineering & Cloud (4)**: `DATABRICKS_DE`, `PYSPARK`, `SQL`, `AWS_CLOUD`
- **Core Engineering (4)**: `PYTHON`, `CPP`, `JAVA_BACKEND`, `REACT`

---

### 7. Historical Placement Dataset & Hero Cohort Pre-seeding

#### Probabilistic Placement Model (Sigmoid with Skill Uplift)
$$P(\text{Placed}) = \frac{1}{1 + e^{-(0.85 \cdot \text{CGPA} + 1.60 \cdot I_{\text{skill}} + 0.50 \cdot I_{\text{certified}} - 1.20 \cdot \text{Backlogs} - 4.50)}}$$

#### Exact Hero Cohort Metrics (ISE, CGPA Bracket [7.77, 8.47])
- **Cohort WITHOUT `DATABRICKS_DE`** (25 alumni records):
  - Placed: 10 / 25
  - **Baseline Placement Probability**: **40.0%**
  - **Average CTC of Placed**: **8.20 LPA**
- **Cohort WITH `DATABRICKS_DE`** (25 alumni records):
  - Placed: 20 / 25
  - **Simulated Placement Probability**: **80.0%**
  - **Average CTC of Placed**: **18.50 LPA**
- **Synergy Cohort (WITH `DATABRICKS_DE` + `PYSPARK`)** (25 alumni records):
  - Placed: 23 / 25
  - **Synergy Placement Probability**: **92.0%**
  - **Average CTC of Placed**: **22.80 LPA**
- **Deterministic Deltas**:
  - $\Delta P = 80.0\% - 40.0\% = \mathbf{+40.0\text{ pts}}$ (Synergy version = $\mathbf{+52.0\text{ pts}}$)
  - $\Delta\text{CTC} = 18.50 - 8.20 = \mathbf{+10.30\text{ LPA}}$ (Synergy version = $\mathbf{+14.60\text{ LPA}}$)
- **Newly Unlocked Companies**:
  - **Databricks** (48.0 LPA)
  - **Adobe** (26.0 LPA)
  - **Infosys DSE** (7.0 LPA)

---

### 8. Unity Catalog DDL & Gold Tables Architecture

Schema: `campus_intelligence_gold`

```
campus_intelligence_gold
 ├── gold_dim_students             (student_id PK, full_name, email, branch, cgpa, graduation_year, active_backlogs, gender)
 ├── gold_dim_company_criteria     (company_id PK, company_name, tier, ctc_lpa, min_cgpa, max_backlogs_allowed, eligible_branches ARRAY, mandatory_skills ARRAY, preferred_skills ARRAY)
 ├── gold_fact_student_skills      (skill_id PK, student_id FK, skill_name, skill_category, proficiency_level, certified_flag)
 ├── gold_fact_placement_history   (placement_id PK, academic_year, student_id FK, company_id FK, offer_status, offered_ctc_lpa, primary_skill_at_hire, had_ai_data_skill)
 ├── v_student_skill_profiles      (Governed view aggregating student skills array and AI flags)
 ├── v_skill_placement_roi         (Governed view aggregating salary and placement rate ROI by skill)
 └── v_hero_cohort_benchmarks      (Governed view validating the 40% -> 80% -> 92% hero cohort metrics)
```

---

### 9. Step-by-Step Databricks Setup Instructions
1. Open your Databricks Free Edition / Community workspace.
2. In the SQL Editor, create the schema:
   ```sql
   CREATE SCHEMA IF NOT EXISTS campus_intelligence_gold;
   ```
3. Upload the 4 CSV files via **Catalog → Add Data → Upload to Volume / Upload files**:
   - `students.csv`
   - `companies.csv`
   - `skills.csv`
   - `placement_history.csv`
4. Execute [`create_tables.sql`](file:///C:/Thought/Projects/Skill-Lamp/1-data-schema/create_tables.sql) to create the tables with array parsing and rich semantic comments.
5. In **AI/BI Genie Spaces**, create a new Genie Space targeting `campus_intelligence_gold`. Genie will automatically index table definitions, column comments, and sample data for zero-shot text-to-SQL execution.
