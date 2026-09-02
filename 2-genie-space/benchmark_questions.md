# Skill Lamp — Placement Intelligence Assistant: 15-Question Benchmark Suite

This benchmark suite validates the accuracy, schema adherence, and performance of the **Skill Lamp Genie Space**. Queries are partitioned into four operational tiers, ranging from demo-critical judge interactions to edge-case stress tests.

---

## Tier 1 — Stage Demo-Critical Queries
*These 5 queries form the core live-demo narrative on stage. They must execute with 100% deterministic schema compliance.*

### Query 1: TPO Candidate Shortlist
- **Target Persona**: TPO Placement Officer
- **Natural Language Question**: "Show all ISE and CSE students with CGPA ≥ 8.0 who are fully eligible for Databricks."
- **Semantic Intent**: Rapidly shortlist unblocked, drive-ready candidates for a visiting recruiter.
- **Governed SQL Trace**:
  ```sql
  SELECT 
    student_id,
    full_name,
    branch,
    cgpa,
    company_name,
    ctc_lpa,
    is_fully_eligible,
    blocker_reason
  FROM workspace.campus_intelligence_gold.v_student_company_eligibility
  WHERE company_name = 'Databricks'
    AND branch IN ('ISE', 'CSE')
    AND cgpa >= 8.0
    AND is_fully_eligible = TRUE
  ORDER BY cgpa DESC, student_id ASC;
  ```
- **Expected Output Schema**:
  | Column Name | Data Type | Sample Value |
  | :--- | :--- | :--- |
  | `student_id` | STRING | `USN_2025_001` |
  | `full_name` | STRING | `Aarav Sharma` |
  | `branch` | STRING | `CSE` |
  | `cgpa` | DOUBLE | `9.12` |
  | `company_name` | STRING | `Databricks` |
  | `ctc_lpa` | DOUBLE | `32.0` |
  | `is_fully_eligible` | BOOLEAN | `true` |
  | `blocker_reason` | STRING | `ELIGIBLE` |

---

### Query 2: Recruiter JD Extraction & Matching
- **Target Persona**: TPO Placement Officer
- **Natural Language Question**: "Parse this JD: 'Need ISE/CSE grads with CGPA > 7.5 and Python + SQL for Data Analyst at 14 LPA' and list matching candidates."
- **Semantic Intent**: Convert unstructured recruiter email/JD text into structured filters and return matched talent pool.
- **Governed SQL Trace**:
  ```sql
  WITH required_skills AS (
    SELECT student_id
    FROM workspace.campus_intelligence_gold.gold_fact_student_skills
    WHERE LOWER(TRIM(skill_name)) IN ('python', 'sql')
    GROUP BY student_id
    HAVING COUNT(DISTINCT LOWER(TRIM(skill_name))) = 2
  )
  SELECT 
    s.student_id,
    s.full_name,
    s.branch,
    s.cgpa,
    s.active_backlogs
  FROM workspace.campus_intelligence_gold.gold_dim_students s
  JOIN required_skills r ON s.student_id = r.student_id
  WHERE s.branch IN ('ISE', 'CSE')
    AND s.cgpa > 7.5
    AND s.active_backlogs = 0
  ORDER BY s.cgpa DESC, s.student_id ASC;
  ```
- **Expected Output Schema**:
  | Column Name | Data Type | Sample Value |
  | :--- | :--- | :--- |
  | `student_id` | STRING | `USN_2025_014` |
  | `full_name` | STRING | `Bhavana Rao` |
  | `branch` | STRING | `ISE` |
  | `cgpa` | DOUBLE | `8.45` |
  | `active_backlogs` | INT | `0` |

---

### Query 3: Student Eligibility & Blocker Diagnostic
- **Target Persona**: Student / Placement Advisor
- **Natural Language Question**: "List all companies student USN_2025_042 is currently eligible for and what skills are blocking them from Tier 1 companies."
- **Semantic Intent**: Provide instant visibility into current clearance and specific missing skills blocking top-tier roles.
- **Governed SQL Trace**:
  ```sql
  SELECT 
    company_name,
    tier,
    ctc_lpa,
    is_fully_eligible,
    blocker_reason,
    missing_mandatory_skills,
    missing_preferred_skills
  FROM workspace.campus_intelligence_gold.v_student_company_eligibility
  WHERE student_id = 'USN_2025_042'
    AND tier IN ('Super Dream', 'Dream')
  ORDER BY ctc_lpa DESC, company_name ASC;
  ```
- **Expected Output Schema**:
  | Column Name | Data Type | Sample Value |
  | :--- | :--- | :--- |
  | `company_name` | STRING | `Databricks` |
  | `tier` | STRING | `Super Dream` |
  | `ctc_lpa` | DOUBLE | `32.0` |
  | `is_fully_eligible` | BOOLEAN | `false` |
  | `blocker_reason` | STRING | `MISSING_MANDATORY_SKILLS` |
  | `missing_mandatory_skills` | STRING | `Databricks_DE` |
  | `missing_preferred_skills` | STRING | `MLflow, Spark` |

---

### Query 4: Cohort Comparison (Governed Raw Counts)
- **Target Persona**: Student ("Placement Time Machine" Simulator Backend)
- **Natural Language Question**: "For ISE students with CGPA between 7.7 and 8.5, return placed and total counts with and without Databricks_DE along with average CTCs."
- **Semantic Intent**: Deliver strict integer counts and average CTCs to FastAPI backend (`probability.py`) for deterministic Bayesian probability modeling.
- **Governed SQL Trace**:
  ```sql
  SELECT 
    COUNT(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN 1 END) AS placed_with_skill,
    COUNT(CASE WHEN had_ai_data_skill = TRUE THEN 1 END) AS total_with_skill,
    COUNT(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN 1 END) AS placed_without_skill,
    COUNT(CASE WHEN had_ai_data_skill = FALSE THEN 1 END) AS total_without_skill,
    ROUND(AVG(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2) AS avg_ctc_with_skill,
    ROUND(AVG(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2) AS avg_ctc_without_skill
  FROM workspace.campus_intelligence_gold.gold_fact_placement_history ph
  JOIN workspace.campus_intelligence_gold.gold_dim_students s ON ph.student_id = s.student_id
  WHERE s.branch = 'ISE' 
    AND s.cgpa BETWEEN 7.7 AND 8.5;
  ```
- **Expected Output Schema**:
  | Column Name | Data Type | Sample Value |
  | :--- | :--- | :--- |
  | `placed_with_skill` | INT | `48` |
  | `total_with_skill` | INT | `52` |
  | `placed_without_skill` | INT | `31` |
  | `total_without_skill` | INT | `60` |
  | `avg_ctc_with_skill` | DOUBLE | `18.40` |
  | `avg_ctc_without_skill` | DOUBLE | `9.20` |

---

### Query 5: What-If Skill Acquisition Simulator
- **Target Persona**: Student ("What-If" Simulator)
- **Natural Language Question**: "If student USN_2025_042 acquires Databricks_DE, which new companies become eligible?"
- **Semantic Intent**: Identify companies where the student is blocked *only* by the single missing skill `Databricks_DE`.
- **Governed SQL Trace**:
  ```sql
  SELECT 
    company_id,
    company_name,
    tier,
    ctc_lpa,
    min_cgpa,
    missing_mandatory_skills
  FROM workspace.campus_intelligence_gold.v_student_company_eligibility
  WHERE student_id = 'USN_2025_042'
    AND is_cgpa_eligible = TRUE
    AND is_branch_eligible = TRUE
    AND is_backlog_eligible = TRUE
    AND is_fully_eligible = FALSE
    AND LOWER(TRIM(missing_mandatory_skills)) = 'databricks_de'
  ORDER BY ctc_lpa DESC;
  ```
- **Expected Output Schema**:
  | Column Name | Data Type | Sample Value |
  | :--- | :--- | :--- |
  | `company_id` | STRING | `COMP_002` |
  | `company_name` | STRING | `Databricks` |
  | `tier` | STRING | `Super Dream` |
  | `ctc_lpa` | DOUBLE | `32.0` |
  | `min_cgpa` | DOUBLE | `8.0` |
  | `missing_mandatory_skills` | STRING | `Databricks_DE` |

---

## Tier 2 — TPO Placement Office Operational Analytics
*Operational metrics used by college administrators for annual accreditation, recruiter relations, and department benchmarking.*

### Query 6: Branch-Wise Placement Statistics
- **Target Persona**: TPO Placement Officer / Principal
- **Natural Language Question**: "What is the overall placement percentage and average CTC per branch for the 2024 graduating batch?"
- **Governed SQL Trace**:
  ```sql
  SELECT 
    s.branch,
    COUNT(s.student_id) AS total_students,
    COUNT(CASE WHEN ph.offer_status = 'Placed' THEN 1 END) AS placed_students,
    ROUND(AVG(CASE WHEN ph.offer_status = 'Placed' THEN ph.offered_ctc_lpa END), 2) AS avg_placed_ctc_lpa
  FROM workspace.campus_intelligence_gold.gold_dim_students s
  LEFT JOIN workspace.campus_intelligence_gold.gold_fact_placement_history ph ON s.student_id = ph.student_id
  WHERE s.graduating_year = 2024
  GROUP BY s.branch
  ORDER BY avg_placed_ctc_lpa DESC;
  ```

---

### Query 7: Top Hiring Partners by Offer Volume
- **Target Persona**: TPO Placement Officer
- **Natural Language Question**: "List the top 5 companies by total offers made over the last 3 years."
- **Governed SQL Trace**:
  ```sql
  SELECT 
    company_name,
    COUNT(placement_id) AS total_offers_extended,
    ROUND(AVG(offered_ctc_lpa), 2) AS avg_offered_ctc_lpa,
    MAX(offered_ctc_lpa) AS max_offered_ctc_lpa
  FROM workspace.campus_intelligence_gold.gold_fact_placement_history
  WHERE offer_status = 'Placed'
  GROUP BY company_name
  ORDER BY total_offers_extended DESC, avg_offered_ctc_lpa DESC
  LIMIT 5;
  ```

---

### Query 8: High-Demand Skillset in Super Dream Drives
- **Target Persona**: TPO Curriculum Advisor / Academic Dean
- **Natural Language Question**: "Which 3 skills have the highest hiring demand across Super Dream companies?"
- **Governed SQL Trace**:
  ```sql
  WITH exploded_skills AS (
    SELECT 
      TRIM(skill) AS skill_name
    FROM workspace.campus_intelligence_gold.gold_dim_company_criteria
    LATERAL VIEW EXPLODE(COALESCE(mandatory_skills, ARRAY())) t AS skill
    WHERE tier = 'Super Dream' AND TRIM(skill) != ''
  )
  SELECT 
    skill_name,
    COUNT(*) AS company_demand_count
  FROM exploded_skills
  GROUP BY skill_name
  ORDER BY company_demand_count DESC
  LIMIT 3;
  ```

---

### Query 9: High-Potential Unplaced Candidate Recovery
- **Target Persona**: TPO Placement Officer
- **Natural Language Question**: "Show all unplaced students in AI/DS branch with CGPA > 7.5 and their missing skills."
- **Governed SQL Trace**:
  ```sql
  SELECT 
    s.student_id,
    s.full_name,
    s.cgpa,
    s.active_backlogs,
    ARRAY_JOIN(COLLECT_SET(sk.skill_name), ', ') AS acquired_skills
  FROM workspace.campus_intelligence_gold.gold_dim_students s
  LEFT JOIN workspace.campus_intelligence_gold.gold_fact_placement_history ph ON s.student_id = ph.student_id
  LEFT JOIN workspace.campus_intelligence_gold.gold_fact_student_skills sk ON s.student_id = sk.student_id
  WHERE s.branch = 'AI/DS'
    AND s.cgpa > 7.5
    AND (ph.offer_status IS NULL OR ph.offer_status != 'Placed')
  GROUP BY s.student_id, s.full_name, s.cgpa, s.active_backlogs
  ORDER BY s.cgpa DESC;
  ```

---

## Tier 3 — Student Career & Skill Guidance
*Guidance queries answering student-centric career questions and skill ROI comparisons.*

### Query 10: Target Company Skill Roadmap
- **Target Persona**: Student
- **Natural Language Question**: "What are the top 3 recommended skills for an ECE student with 7.8 CGPA to qualify for Microsoft?"
- **Governed SQL Trace**:
  ```sql
  SELECT 
    company_name,
    tier,
    ctc_lpa,
    min_cgpa,
    missing_mandatory_skills,
    missing_preferred_skills,
    blocker_reason
  FROM workspace.campus_intelligence_gold.v_student_company_eligibility
  WHERE company_name = 'Microsoft'
    AND branch = 'ECE'
    AND cgpa = 7.8
  LIMIT 1;
  ```

---

### Query 11: Certification ROI in Dream Drives
- **Target Persona**: Student
- **Natural Language Question**: "Does having a certified AI skill correlate with a higher average CTC in Dream tier companies?"
- **Governed SQL Trace**:
  ```sql
  SELECT 
    CASE WHEN sk.certified_flag = TRUE THEN 'Certified AI Skill' ELSE 'Non-Certified / Standard' END AS certification_cohort,
    COUNT(DISTINCT s.student_id) AS total_placed_students,
    ROUND(AVG(ph.offered_ctc_lpa), 2) AS avg_ctc_lpa,
    MAX(ph.offered_ctc_lpa) AS max_ctc_lpa
  FROM workspace.campus_intelligence_gold.gold_fact_placement_history ph
  JOIN workspace.campus_intelligence_gold.gold_dim_students s ON ph.student_id = s.student_id
  LEFT JOIN workspace.campus_intelligence_gold.gold_fact_student_skills sk ON s.student_id = sk.student_id
  WHERE ph.tier = 'Dream'
    AND ph.offer_status = 'Placed'
    AND ph.had_ai_data_skill = TRUE
  GROUP BY CASE WHEN sk.certified_flag = TRUE THEN 'Certified AI Skill' ELSE 'Non-Certified / Standard' END
  ORDER BY avg_ctc_lpa DESC;
  ```

---

### Query 12: Tier-Wise Placement Offer Distribution
- **Target Persona**: TPO Placement Officer / Student
- **Natural Language Question**: "Show the distribution of placed students across Super Dream, Dream, and Core Tech tiers."
- **Governed SQL Trace**:
  ```sql
  SELECT 
    tier,
    COUNT(placement_id) AS total_placed_count,
    ROUND(AVG(offered_ctc_lpa), 2) AS avg_tier_ctc_lpa,
    MIN(offered_ctc_lpa) AS min_tier_ctc_lpa,
    MAX(offered_ctc_lpa) AS max_tier_ctc_lpa
  FROM workspace.campus_intelligence_gold.gold_fact_placement_history
  WHERE offer_status = 'Placed'
  GROUP BY tier
  ORDER BY avg_tier_ctc_lpa DESC;
  ```

---

### Query 13: Skill vs Skill Comparative Impact
- **Target Persona**: Student Career Guidance
- **Natural Language Question**: "Compare placement rates of students with GenAI_LLMs vs Machine_Learning across all branches."
- **Governed SQL Trace**:
  ```sql
  SELECT 
    'GenAI_LLMs' AS evaluated_skill,
    COUNT(CASE WHEN ph.offer_status = 'Placed' THEN 1 END) AS placed_count,
    COUNT(s.student_id) AS total_count,
    ROUND(AVG(CASE WHEN ph.offer_status = 'Placed' THEN ph.offered_ctc_lpa END), 2) AS avg_ctc_lpa
  FROM workspace.campus_intelligence_gold.gold_dim_students s
  JOIN workspace.campus_intelligence_gold.gold_fact_student_skills sk ON s.student_id = sk.student_id
  LEFT JOIN workspace.campus_intelligence_gold.gold_fact_placement_history ph ON s.student_id = ph.student_id
  WHERE LOWER(TRIM(sk.skill_name)) = 'genai_llms'

  UNION ALL

  SELECT 
    'Machine_Learning' AS evaluated_skill,
    COUNT(CASE WHEN ph.offer_status = 'Placed' THEN 1 END) AS placed_count,
    COUNT(s.student_id) AS total_count,
    ROUND(AVG(CASE WHEN ph.offer_status = 'Placed' THEN ph.offered_ctc_lpa END), 2) AS avg_ctc_lpa
  FROM workspace.campus_intelligence_gold.gold_dim_students s
  JOIN workspace.campus_intelligence_gold.gold_fact_student_skills sk ON s.student_id = sk.student_id
  LEFT JOIN workspace.campus_intelligence_gold.gold_fact_placement_history ph ON s.student_id = ph.student_id
  WHERE LOWER(TRIM(sk.skill_name)) = 'machine_learning';
  ```

---

## Tier 4 — Boundary & Integrity Stress Tests
*Zero-record and anomalous scenario validation to guarantee zero SQL syntax/runtime errors.*

### Query 14: Zero Skills with Active Backlogs Boundary
- **Target Persona**: Integrity Test Suite
- **Natural Language Question**: "Show eligibility for a student with 0 recorded skills and 2 active backlogs."
- **Semantic Intent**: Must return 0 eligible Super Dream/Dream companies with explicit blocker codes `ACTIVE_BACKLOGS` or `MISSING_MANDATORY_SKILLS`.
- **Governed SQL Trace**:
  ```sql
  SELECT 
    company_name,
    tier,
    ctc_lpa,
    is_fully_eligible,
    blocker_reason,
    missing_mandatory_skills
  FROM workspace.campus_intelligence_gold.v_student_company_eligibility
  WHERE active_backlogs = 2
    AND SIZE(SPLIT(COALESCE(missing_mandatory_skills, ''), ',')) > 0
    AND tier IN ('Super Dream', 'Dream')
  ORDER BY ctc_lpa DESC;
  ```

---

### Query 15: Out-of-Range Non-Existent Demographic Band
- **Target Persona**: Integrity Test Suite
- **Natural Language Question**: "Cohort comparison for a non-existent CGPA band (e.g. CGPA > 10.0)."
- **Semantic Intent**: Must return 0 integer counts gracefully without SQL runtime failure or division-by-zero exceptions.
- **Governed SQL Trace**:
  ```sql
  SELECT 
    COUNT(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN 1 END) AS placed_with_skill,
    COUNT(CASE WHEN had_ai_data_skill = TRUE THEN 1 END) AS total_with_skill,
    COUNT(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN 1 END) AS placed_without_skill,
    COUNT(CASE WHEN had_ai_data_skill = FALSE THEN 1 END) AS total_without_skill,
    COALESCE(ROUND(AVG(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2), 0.0) AS avg_ctc_with_skill,
    COALESCE(ROUND(AVG(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2), 0.0) AS avg_ctc_without_skill
  FROM workspace.campus_intelligence_gold.gold_fact_placement_history ph
  JOIN workspace.campus_intelligence_gold.gold_dim_students s ON ph.student_id = s.student_id
  WHERE s.cgpa > 10.0;
  ```
- **Expected Output**:
  | placed_with_skill | total_with_skill | placed_without_skill | total_without_skill | avg_ctc_with_skill | avg_ctc_without_skill |
  | :--- | :--- | :--- | :--- | :--- | :--- |
  | `0` | `0` | `0` | `0` | `0.0` | `0.0` |
