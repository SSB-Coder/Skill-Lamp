# Skill Lamp — Placement Intelligence Assistant: Semantic / Genie Layer

## Executive Overview
The **Semantic / Genie Layer** (`2-genie-space/`) bridges natural language interactions from the TPO Command Portal and Student Placement Time Machine to the underlying Databricks Unity Catalog Delta tables. It encapsulates domain logic, pre-computed eligibility rules, recruiter JD parsing directives, and strict cohort aggregation protocols.

---

## File Deliverables Inventory

| File | Purpose | Target Databricks Component |
| :--- | :--- | :--- |
| `trusted_view.sql` | Pre-computes student-company cartesian eligibility and canonical blocker reasons. | Unity Catalog View (`workspace.campus_intelligence_gold.v_student_company_eligibility`) |
| `trusted_function.sql` | Implements deterministic 0-100 placement readiness scoring formula. | Unity Catalog UDF (`workspace.campus_intelligence_gold.fn_readiness_score`) |
| `instructions.md` | Domain instructions and SQL generation governance rules. | Databricks Genie Space Domain Instructions field |
| `benchmark_questions.md` | 15-question benchmark test suite across 4 operational tiers with exact SQL traces. | Databricks Genie Space Benchmark Queries & Quality Testing |
| `geniespace.md` | Semantic layer architecture, deployment manual, and teammate handoff contract. | Documentation / Repository Master Index |

---

## Architecture & Data Flow

```
+-------------------------------------------------------------------------+
|                              USER INTERACTION                           |
|       [TPO Officer: Ad-hoc Queries / JDs]    [Student: What-If / Blockers]       |
+------------------------------------+------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                     FastAPI Backend (Port 8000)                         |
|   - Authentication & Session Context                                    |
|   - Databricks SDK Client (Genie Conversation API)                      |
|   - Deterministic Math Engine (probability.py from Raw Counts)          |
+------------------------------------+------------------------------------+
                                     | (Passes natural prompt)
                                     v
+-------------------------------------------------------------------------+
|                  DATABRICKS AI/BI GENIE SPACE                           |
|   - Space Instructions (instructions.md)                                |
|   - Governed SQL Translation Engine                                     |
+------------------------------------+------------------------------------+
                                     | (Executes governed queries)
                                     v
+-------------------------------------------------------------------------+
|              UNITY CATALOG / DELTA LAKE (workspace.campus_intelligence_gold)       |
|                                                                         |
|   Gold Dimension & Fact Tables:                                         |
|     1. gold_dim_students                                                |
|     2. gold_dim_company_criteria                                        |
|     3. gold_fact_student_skills                                         |
|     4. gold_fact_placement_history                                      |
|                                                                         |
|   Semantic Layer Assets (Created by 2-genie-space/):                    |
|     5. v_student_company_eligibility (Trusted View)                     |
|     6. fn_readiness_score (Trusted SQL Function)                        |
+-------------------------------------------------------------------------+
```

---

## Databricks Deployment Guide (Zero-Error Step-by-Step)

### Step 1: SQL Warehouse & Schema Verification
1. Log in to your Databricks workspace.
2. Ensure your target SQL Warehouse (Serverless or Pro) is active and running.
3. Verify that the catalog `workspace` and schema `campus_intelligence_gold` exist and that Person 1 has populated the 4 Gold tables:
   ```sql
   USE CATALOG workspace;
   USE SCHEMA campus_intelligence_gold;
   SHOW TABLES;
   ```

### Step 2: Deploy Trusted SQL Assets
1. Open the Databricks **SQL Editor**.
2. Open and execute [`trusted_view.sql`](./trusted_view.sql):
   - Creates `workspace.campus_intelligence_gold.v_student_company_eligibility`.
   - Verify creation with:
     ```sql
     SELECT COUNT(*) FROM workspace.campus_intelligence_gold.v_student_company_eligibility;
     ```
3. Open and execute [`trusted_function.sql`](./trusted_function.sql):
   - Creates `workspace.campus_intelligence_gold.fn_readiness_score`.
   - Verify function execution with:
     ```sql
     SELECT workspace.campus_intelligence_gold.fn_readiness_score(8.5, 100.0, 50.0, 2, 0) AS test_score;
     ```

### Step 3: Create and Configure the Databricks Genie Space
1. In the Databricks left-hand navigation menu, click **Genie** (under **AI/BI**).
2. Click **New Genie Space** (top right).
3. Name the Space: `Skill Lamp Placement Intelligence Assistant`.
4. Description: `Semantic intelligence space powering student eligibility, recruiter JD parsing, and placement analytics for TPO.`
5. Select the SQL Warehouse to execute queries.

### Step 4: Attach Tables & Views to Genie Space
1. In the Genie Space configuration sidebar under **Data**, click **Add tables**.
2. Select the following 5 assets from `workspace.campus_intelligence_gold`:
   - `gold_dim_students`
   - `gold_dim_company_criteria`
   - `gold_fact_student_skills`
   - `gold_fact_placement_history`
   - `v_student_company_eligibility`
3. Click **Save Data Assets**.

### Step 5: Configure Space Domain Instructions
1. In the Genie Space settings, open the **Instructions** tab.
2. Copy and paste the complete contents of [`instructions.md`](./instructions.md) into the Instructions text box.
3. Click **Save Instructions**.

### Step 6: Record `GENIE_SPACE_ID` for Backend Integration
1. Observe the browser URL when inside the Genie Space:
   `https://<databricks-instance>/genie/spaces/<GENIE_SPACE_ID>`
2. Copy the `<GENIE_SPACE_ID>` (a 32-character hexadecimal string or alphanumeric ID).
3. Provide this ID to Person 3 (Backend) to configure in `.env` / FastAPI settings:
   ```env
   DATABRICKS_GENIE_SPACE_ID=<GENIE_SPACE_ID>
   ```

### Step 7: Benchmark Verification
1. Run the Tier 1 queries from [`benchmark_questions.md`](./benchmark_questions.md) inside the Genie chat interface.
2. Confirm that Genie produces exact SQL queries conforming to the domain instructions and returns clean, emoji-free results.

---

## Teammate Handoff & Interface Contracts

### Person 1 (Data Engineer):
- Ensure catalog and schema names match `workspace.campus_intelligence_gold`.
- Table column names must match the joins and array parsing in `trusted_view.sql`.

### Person 3 (Backend Engineer):
- Use `DATABRICKS_GENIE_SPACE_ID` in the Databricks SDK `GenieClient` / `WorkspaceClient.genie.start_conversation_and_wait()`.
- For cohort comparison questions, receive raw counts from Genie:
  `placed_with_skill`, `total_with_skill`, `placed_without_skill`, `total_without_skill`, `avg_ctc_with_skill`, `avg_ctc_without_skill`.
- Compute percentages and Bayesian priors deterministically in `probability.py`.

### Person 5 (Pitch & Documentation):
- Tier 1 SQL traces and schema outputs in [`benchmark_questions.md`](./benchmark_questions.md) provide screenshots and data lineage diagrams for pitch slides.
