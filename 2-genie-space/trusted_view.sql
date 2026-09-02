-- ============================================================================
-- Skill Lamp — Placement Intelligence Assistant
-- Unity Catalog Trusted SQL View: v_student_company_eligibility
-- Catalog: workspace | Schema: campus_intelligence_gold
-- ============================================================================
-- Description:
-- Pre-computes the cartesian match between every registered student and every
-- visiting company criteria. Evaluates granular eligibility flags (CGPA, branch,
-- backlogs, mandatory skills) and assigns a single, deterministic blocker reason.
--
-- Blocker Reason Precedence:
--   1. 'ELIGIBLE'                 - All criteria met
--   2. 'CGPA_BELOW_CUTOFF'        - Student CGPA < company min_cgpa
--   3. 'MISSING_MANDATORY_SKILLS' - Student lacks one or more mandatory skills
--   4. 'BRANCH_INELIGIBLE'        - Student branch not in company eligible_branches
--   5. 'ACTIVE_BACKLOGS'          - Student backlogs > company max_backlogs_allowed
-- ============================================================================

CREATE OR REPLACE VIEW workspace.campus_intelligence_gold.v_student_company_eligibility AS
WITH student_skills_agg AS (
  SELECT 
    student_id,
    collect_set(lower(trim(skill_name))) AS student_skills_lower,
    collect_set(trim(skill_name))        AS student_skills_raw
  FROM workspace.campus_intelligence_gold.gold_fact_student_skills
  GROUP BY student_id
),

student_certifications_agg AS (
  SELECT
    student_id,
    COUNT(CASE WHEN certified_flag = TRUE THEN 1 END) AS cert_count
  FROM workspace.campus_intelligence_gold.gold_fact_student_skills
  GROUP BY student_id
),

parsed_criteria AS (
  SELECT
    c.company_id,
    c.company_name,
    c.tier,
    c.ctc_lpa,
    c.min_cgpa,
    COALESCE(c.max_backlogs_allowed, 0) AS max_backlogs_allowed,
    c.eligible_branches,
    c.mandatory_skills,
    c.preferred_skills,
    -- Normalized lower-case arrays for robust matching
    TRANSFORM(
      COALESCE(c.eligible_branches, ARRAY()),
      x -> LOWER(TRIM(x))
    ) AS eligible_branches_array,
    TRANSFORM(
      COALESCE(c.mandatory_skills, ARRAY()),
      x -> LOWER(TRIM(x))
    ) AS mandatory_skills_lower_array,
    COALESCE(c.mandatory_skills, ARRAY()) AS mandatory_skills_raw_array,
    TRANSFORM(
      COALESCE(c.preferred_skills, ARRAY()),
      x -> LOWER(TRIM(x))
    ) AS preferred_skills_lower_array,
    COALESCE(c.preferred_skills, ARRAY()) AS preferred_skills_raw_array
  FROM workspace.campus_intelligence_gold.gold_dim_company_criteria c
),

cross_evaluated AS (
  SELECT
    s.student_id,
    s.full_name,
    s.branch,
    s.cgpa,
    s.active_backlogs,
    COALESCE(sc.cert_count, 0) AS cert_count,
    COALESCE(sk.student_skills_lower, ARRAY()) AS student_skills_lower,
    COALESCE(sk.student_skills_raw, ARRAY())   AS student_skills_raw,
    c.company_id,
    c.company_name,
    c.tier,
    c.ctc_lpa,
    c.min_cgpa,
    c.max_backlogs_allowed,
    c.eligible_branches,
    c.mandatory_skills,
    c.preferred_skills,
    c.eligible_branches_array,
    c.mandatory_skills_lower_array,
    c.mandatory_skills_raw_array,
    c.preferred_skills_lower_array,
    c.preferred_skills_raw_array,

    -- 1. CGPA Eligibility Flag
    (s.cgpa >= c.min_cgpa) AS is_cgpa_eligible,

    -- 2. Branch Eligibility Flag
    CASE 
      WHEN SIZE(c.eligible_branches_array) = 0 OR ARRAY_CONTAINS(c.eligible_branches_array, 'all') THEN TRUE
      ELSE ARRAY_CONTAINS(c.eligible_branches_array, LOWER(TRIM(s.branch)))
    END AS is_branch_eligible,

    -- 3. Backlog Eligibility Flag
    (s.active_backlogs <= c.max_backlogs_allowed) AS is_backlog_eligible,

    -- Calculate Missing Skills Arrays (Case-Insensitive comparison)
    ARRAY_COMPACT(
      ARRAY_EXCEPT(c.mandatory_skills_lower_array, COALESCE(sk.student_skills_lower, ARRAY()))
    ) AS missing_mandatory_lower_array,

    ARRAY_COMPACT(
      ARRAY_EXCEPT(c.preferred_skills_lower_array, COALESCE(sk.student_skills_lower, ARRAY()))
    ) AS missing_preferred_lower_array

  FROM workspace.campus_intelligence_gold.gold_dim_students s
  CROSS JOIN parsed_criteria c
  LEFT JOIN student_skills_agg sk ON s.student_id = sk.student_id
  LEFT JOIN student_certifications_agg sc ON s.student_id = sc.student_id
),

final_flags AS (
  SELECT
    student_id,
    full_name,
    branch,
    cgpa,
    company_id,
    company_name,
    tier,
    ctc_lpa,
    is_cgpa_eligible,
    is_branch_eligible,
    is_backlog_eligible,
    (SIZE(missing_mandatory_lower_array) = 0) AS is_skills_eligible,
    
    -- Missing mandatory skills string
    CASE 
      WHEN SIZE(missing_mandatory_lower_array) = 0 THEN ''
      ELSE ARRAY_JOIN(
        FILTER(mandatory_skills_raw_array, x -> ARRAY_CONTAINS(missing_mandatory_lower_array, LOWER(TRIM(x)))),
        ', '
      )
    END AS missing_mandatory_skills,

    -- Missing preferred skills string
    CASE 
      WHEN SIZE(missing_preferred_lower_array) = 0 THEN ''
      ELSE ARRAY_JOIN(
        FILTER(preferred_skills_raw_array, x -> ARRAY_CONTAINS(missing_preferred_lower_array, LOWER(TRIM(x)))),
        ', '
      )
    END AS missing_preferred_skills

  FROM cross_evaluated
)

SELECT
  student_id,
  full_name,
  branch,
  cgpa,
  company_id,
  company_name,
  tier,
  ctc_lpa,
  is_cgpa_eligible,
  is_branch_eligible,
  is_backlog_eligible,
  is_skills_eligible,
  (is_cgpa_eligible AND is_branch_eligible AND is_backlog_eligible AND is_skills_eligible) AS is_fully_eligible,
  missing_mandatory_skills,
  missing_preferred_skills,
  CASE
    WHEN (is_cgpa_eligible AND is_branch_eligible AND is_backlog_eligible AND is_skills_eligible) THEN 'ELIGIBLE'
    WHEN NOT is_cgpa_eligible THEN 'CGPA_BELOW_CUTOFF'
    WHEN NOT is_skills_eligible THEN 'MISSING_MANDATORY_SKILLS'
    WHEN NOT is_branch_eligible THEN 'BRANCH_INELIGIBLE'
    WHEN NOT is_backlog_eligible THEN 'ACTIVE_BACKLOGS'
    ELSE 'CGPA_BELOW_CUTOFF'
  END AS blocker_reason
FROM final_flags;

-- ============================================================================
-- Verification / Test Queries:
-- ============================================================================
-- 1. Check schema:
--    DESCRIBE TABLE workspace.campus_intelligence_gold.v_student_company_eligibility;
--
-- 2. Fully eligible students for Databricks:
--    SELECT student_id, full_name, branch, cgpa, ctc_lpa
--    FROM workspace.campus_intelligence_gold.v_student_company_eligibility
--    WHERE company_name = 'Databricks' AND is_fully_eligible = TRUE
--    ORDER BY cgpa DESC;
--
-- 3. Blocker breakdown for a specific student:
--    SELECT company_name, tier, ctc_lpa, is_fully_eligible, blocker_reason, missing_mandatory_skills
--    FROM workspace.campus_intelligence_gold.v_student_company_eligibility
--    WHERE student_id = 'USN_2025_042'
--    ORDER BY ctc_lpa DESC;
-- ============================================================================
