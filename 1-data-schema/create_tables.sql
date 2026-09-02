-- ═══════════════════════════════════════════════════════════════════════════════
-- SKILL LAMP — PLACEMENT INTELLIGENCE ASSISTANT
-- Unity Catalog Gold Layer DDL & Semantic Catalog Definition
-- Catalog/Schema: campus_intelligence_gold
--
-- This script creates the 4 Gold tables with rich semantic comments for Databricks
-- AI/BI Genie Space semantic indexing, followed by array-parsing ingestion DDL
-- and governed analytics views for instant natural language Q&A.
-- ═══════════════════════════════════════════════════════════════════════════════

-- Step 1: Create Schema
CREATE SCHEMA IF NOT EXISTS campus_intelligence_gold
COMMENT 'Gold layer governed schema for Skill Lamp placement intelligence assistant, hosting student demographics, recruiter criteria, student skill proficiencies, and 6-year historical placement audit records.';

USE SCHEMA campus_intelligence_gold;

-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE 1: gold_dim_students
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campus_intelligence_gold.gold_dim_students (
  student_id STRING NOT NULL COMMENT 'Unique alphanumeric identifier for student (e.g., USN_2025_042). Primary key for student dimension.',
  full_name STRING NOT NULL COMMENT 'Full legal name of the student (e.g., Priya Nair, Rahul Verma, Dr. S. K. Murthy).',
  email STRING NOT NULL COMMENT 'Official institutional college email address (e.g., priya.ise21@rvce.edu.in). Used for role-based scoping and authentication.',
  branch STRING NOT NULL COMMENT 'Academic department / engineering branch: CSE (Computer Science & Eng), ISE (Information Science & Eng), ECE (Electronics & Comm Eng), AI/DS (Artificial Intelligence & Data Science).',
  cgpa DOUBLE NOT NULL COMMENT 'Cumulative Grade Point Average on a 10.0 scale (range 5.50 to 9.90, cohort mean 7.65). Primary academic cutoff metric for company eligibility filtering.',
  graduation_year INT NOT NULL COMMENT 'Year of college graduation and placement drive batch (e.g., 2025).',
  active_backlogs INT NOT NULL COMMENT 'Current count of standing / active uncleared backlogs (0, 1, 2+). Recruiter cutoff criteria for drive screening.',
  gender STRING COMMENT 'Student gender identity (Male, Female).'
)
COMMENT 'Gold dimension table representing candidate student cohorts for campus placements. Contains verified demographic, academic, and backlog attributes.'
TBLPROPERTIES (
  'quality' = 'gold',
  'delta.enableChangeDataFeed' = 'true',
  'delta.minReaderVersion' = '1',
  'delta.minWriterVersion' = '2'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE 2: gold_dim_company_criteria
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campus_intelligence_gold.gold_dim_company_criteria (
  company_id STRING NOT NULL COMMENT 'Unique identifier for the recruiting enterprise (e.g., COMP_001). Primary key for company dimension.',
  company_name STRING NOT NULL COMMENT 'Official enterprise recruiting company name (e.g., Databricks, Google, Microsoft, NVIDIA, Amazon, Adobe, Goldman Sachs).',
  tier STRING NOT NULL COMMENT 'Placement compensation tier classification: Super Dream (>=38 LPA), Dream (18-37 LPA), Core Tech (<18 LPA).',
  ctc_lpa DOUBLE NOT NULL COMMENT 'Annual Cost to Company compensation package offered in Lakhs Per Annum (LPA) (e.g., 48.0, 32.0, 8.5).',
  min_cgpa DOUBLE NOT NULL COMMENT 'Minimum academic CGPA cutoff threshold required by company for drive eligibility (e.g., 8.50, 7.50, 6.00).',
  max_backlogs_allowed INT NOT NULL COMMENT 'Maximum number of active/standing backlogs permitted by the recruiter (0, 1, or 2).',
  eligible_branches ARRAY<STRING> NOT NULL COMMENT 'Array of eligible academic branch codes allowed to apply (e.g., [\"CSE\", \"ISE\", \"AI/DS\"]).',
  mandatory_skills ARRAY<STRING> NOT NULL COMMENT 'Array of mandatory technical skills required in candidate profile to pass recruitment screening.',
  preferred_skills ARRAY<STRING> COMMENT 'Array of preferred / bonus technical skills that enhance selection probability during evaluation.'
)
COMMENT 'Gold dimension table defining recruiter eligibility criteria, compensation tiers, CGPA cutoffs, branch filters, and required technical skill sets.'
TBLPROPERTIES (
  'quality' = 'gold',
  'delta.enableChangeDataFeed' = 'true',
  'delta.minReaderVersion' = '1',
  'delta.minWriterVersion' = '2'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE 3: gold_fact_student_skills
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campus_intelligence_gold.gold_fact_student_skills (
  skill_id STRING NOT NULL COMMENT 'Unique surrogate identifier for the student skill record (e.g., SSK_00001). Primary key.',
  student_id STRING NOT NULL COMMENT 'Foreign key referencing gold_dim_students.student_id.',
  skill_name STRING NOT NULL COMMENT 'Standardized taxonomy skill name from the 16 approved technical skills (e.g., DATABRICKS_DE, PYSPARK, GENAI_LLMS, PYTHON, SQL, REACT).',
  skill_category STRING NOT NULL COMMENT 'Skill domain category: AI / GenAI, Data Engineering & Cloud, Core Engineering.',
  proficiency_level STRING NOT NULL COMMENT 'Demonstrated skill competency level: Beginner, Intermediate, Advanced.',
  certified_flag BOOLEAN NOT NULL COMMENT 'Boolean flag indicating whether the student holds an industry-recognized certification for this skill (true/false).'
)
COMMENT 'Gold fact table capturing verified technical skill profiles, proficiency levels, and certification statuses for all registered students.'
TBLPROPERTIES (
  'quality' = 'gold',
  'delta.enableChangeDataFeed' = 'true',
  'delta.minReaderVersion' = '1',
  'delta.minWriterVersion' = '2'
);

-- ─────────────────────────────────────────────────────────────────────────────
-- TABLE 4: gold_fact_placement_history
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS campus_intelligence_gold.gold_fact_placement_history (
  placement_id STRING NOT NULL COMMENT 'Unique identifier for the historical placement record (e.g., PLACE_00001). Primary key.',
  academic_year INT NOT NULL COMMENT 'Academic graduation year of the historical cohort (2020, 2021, 2022, 2023, 2024, 2025).',
  student_id STRING NOT NULL COMMENT 'Foreign key referencing gold_dim_students.student_id.',
  company_id STRING COMMENT 'Foreign key referencing gold_dim_company_criteria.company_id. NULL or empty if unplaced.',
  offer_status STRING NOT NULL COMMENT 'Final placement outcome status: Placed or Not Placed.',
  offered_ctc_lpa DOUBLE NOT NULL COMMENT 'Final accepted CTC compensation in Lakhs Per Annum (LPA). 0.00 if unplaced.',
  primary_skill_at_hire STRING NOT NULL COMMENT 'Primary technical skill or specialization attributed to candidate hire or drive outcome.',
  had_ai_data_skill INT NOT NULL COMMENT 'Binary indicator (1 or 0) whether the student possessed high-value AI/GenAI or Data Engineering skills at placement drive.'
)
COMMENT 'Gold fact table containing 6 years of historical campus placement records (2020-2025) used for trend analysis, ROI benchmarking, and what-if simulation modeling.'
TBLPROPERTIES (
  'quality' = 'gold',
  'delta.enableChangeDataFeed' = 'true',
  'delta.minReaderVersion' = '1',
  'delta.minWriterVersion' = '2'
);


-- ═══════════════════════════════════════════════════════════════════════════════
-- SAFE CSV-TO-TABLE INGESTION PATTERNS (Run after uploading CSVs via Add Data)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Pattern 1: Load Students
-- CREATE OR REPLACE TABLE campus_intelligence_gold.gold_dim_students AS
-- SELECT 
--   student_id,
--   full_name,
--   email,
--   branch,
--   CAST(cgpa AS DOUBLE) AS cgpa,
--   CAST(graduation_year AS INT) AS graduation_year,
--   CAST(active_backlogs AS INT) AS active_backlogs,
--   gender
-- FROM raw_students_csv;

-- Pattern 2: Load Companies with Array Parsing
-- CREATE OR REPLACE TABLE campus_intelligence_gold.gold_dim_company_criteria AS
-- SELECT 
--   company_id,
--   company_name,
--   tier,
--   CAST(ctc_lpa AS DOUBLE) AS ctc_lpa,
--   CAST(min_cgpa AS DOUBLE) AS min_cgpa,
--   CAST(max_backlogs_allowed AS INT) AS max_backlogs_allowed,
--   split(regexp_replace(eligible_branches, '[\\[\\]\'\"]', ''), ',\\s*') AS eligible_branches,
--   split(regexp_replace(mandatory_skills, '[\\[\\]\'\"]', ''), ',\\s*') AS mandatory_skills,
--   split(regexp_replace(preferred_skills, '[\\[\\]\'\"]', ''), ',\\s*') AS preferred_skills
-- FROM raw_companies_csv;

-- Pattern 3: Load Student Skills
-- CREATE OR REPLACE TABLE campus_intelligence_gold.gold_fact_student_skills AS
-- SELECT 
--   skill_id,
--   student_id,
--   skill_name,
--   skill_category,
--   proficiency_level,
--   CAST(certified_flag AS BOOLEAN) AS certified_flag
-- FROM raw_skills_csv;

-- Pattern 4: Load Placement History
-- CREATE OR REPLACE TABLE campus_intelligence_gold.gold_fact_placement_history AS
-- SELECT 
--   placement_id,
--   CAST(academic_year AS INT) AS academic_year,
--   student_id,
--   NULLIF(company_id, '') AS company_id,
--   offer_status,
--   CAST(offered_ctc_lpa AS DOUBLE) AS offered_ctc_lpa,
--   primary_skill_at_hire,
--   CAST(had_ai_data_skill AS INT) AS had_ai_data_skill
-- FROM raw_placement_history_csv;


-- ═══════════════════════════════════════════════════════════════════════════════
-- GOVERNED SEMANTIC VIEWS FOR DATABRICKS GENIE SPACE & FASTAPI BACKEND
-- ═══════════════════════════════════════════════════════════════════════════════

-- View 1: Student Skill Summary (Aggregates skills per student into array and count)
CREATE OR REPLACE VIEW campus_intelligence_gold.v_student_skill_profiles AS
SELECT 
  s.student_id,
  s.full_name,
  s.email,
  s.branch,
  s.cgpa,
  s.active_backlogs,
  collect_set(k.skill_name) AS skill_list,
  count(k.skill_id) AS total_skills_count,
  count(CASE WHEN k.certified_flag = true THEN 1 END) AS certified_skills_count,
  max(CASE WHEN k.skill_name = 'DATABRICKS_DE' THEN 1 ELSE 0 END) AS has_databricks_de,
  max(CASE WHEN k.skill_name = 'PYSPARK' THEN 1 ELSE 0 END) AS has_pyspark,
  max(CASE WHEN k.skill_category = 'AI / GenAI' THEN 1 ELSE 0 END) AS has_ai_skill
FROM campus_intelligence_gold.gold_dim_students s
LEFT JOIN campus_intelligence_gold.gold_fact_student_skills k ON s.student_id = k.student_id
GROUP BY s.student_id, s.full_name, s.email, s.branch, s.cgpa, s.active_backlogs;

-- View 2: Placement ROI & Uplift Benchmarks by Skill
CREATE OR REPLACE VIEW campus_intelligence_gold.v_skill_placement_roi AS
SELECT 
  primary_skill_at_hire,
  count(*) AS total_placements,
  count(CASE WHEN offer_status = 'Placed' THEN 1 END) AS placed_count,
  round((count(CASE WHEN offer_status = 'Placed' THEN 1 END) * 100.0 / count(*)), 2) AS placement_rate_pct,
  round(avg(CASE WHEN offer_status = 'Placed' THEN offered_ctc_lpa END), 2) AS avg_ctc_lpa,
  round(max(offered_ctc_lpa), 2) AS max_ctc_lpa
FROM campus_intelligence_gold.gold_fact_placement_history
GROUP BY primary_skill_at_hire;

-- View 3: Hero Cohort Validation View (ISE, CGPA 7.77-8.47 benchmark)
CREATE OR REPLACE VIEW campus_intelligence_gold.v_hero_cohort_benchmarks AS
SELECT 
  CASE 
    WHEN primary_skill_at_hire = 'DATABRICKS_DE' THEN 'With Databricks DE'
    WHEN primary_skill_at_hire = 'PYSPARK' THEN 'With PySpark Synergy'
    ELSE 'Baseline Core Engineering'
  END AS cohort_segment,
  count(*) AS cohort_size,
  count(CASE WHEN offer_status = 'Placed' THEN 1 END) AS placed_students,
  round((count(CASE WHEN offer_status = 'Placed' THEN 1 END) * 100.0 / count(*)), 2) AS placement_probability_pct,
  round(avg(CASE WHEN offer_status = 'Placed' THEN offered_ctc_lpa END), 2) AS avg_offered_ctc_lpa
FROM campus_intelligence_gold.gold_fact_placement_history h
JOIN campus_intelligence_gold.gold_dim_students s ON h.student_id = s.student_id
WHERE s.branch = 'ISE' AND s.cgpa BETWEEN 7.77 AND 8.47
GROUP BY 1;
