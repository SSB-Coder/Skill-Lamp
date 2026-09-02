-- ============================================================================
-- Skill Lamp — Placement Intelligence Assistant
-- Unity Catalog Trusted SQL Function: fn_readiness_score
-- Catalog: workspace | Schema: campus_intelligence_gold
-- ============================================================================
-- Description:
-- Calculates a deterministic 0-100 placement readiness score for Skill Lamp.
-- Combines academic performance (CGPA), mandatory skill coverage, preferred/AI
-- skill coverage, industry certifications, and applies severe penalties for
-- active backlogs.
--
-- Mathematical Formula:
--   Score = LEAST(100.0, GREATEST(0.0,
--     (cgpa * 4.0)
--     + (mandatory_match_pct * 0.35)
--     + (preferred_ai_match_pct * 0.15)
--     + (cert_count * 5.0)
--     - (active_backlogs * 15.0)
--   ))
--
-- Parameter Specifications:
--   - cgpa: Student Cumulative Grade Point Average (0.00 to 10.00)
--   - mandatory_match_pct: Percentage of company mandatory skills matched (0.0 to 100.0)
--   - preferred_ai_match_pct: Percentage of preferred/AI skills matched (0.0 to 100.0)
--   - cert_count: Number of verified skill certifications (integer >= 0)
--   - active_backlogs: Number of uncleared backlogs (integer >= 0)
--
-- Returns:
--   DOUBLE precision score bounded strictly between 0.0 and 100.0
-- ============================================================================

CREATE OR REPLACE FUNCTION workspace.campus_intelligence_gold.fn_readiness_score(
  cgpa DOUBLE,
  mandatory_match_pct DOUBLE,
  preferred_ai_match_pct DOUBLE,
  cert_count INT,
  active_backlogs INT
)
RETURNS DOUBLE
LANGUAGE SQL
DETERMINISTIC
CONTAINS SQL
COMMENT 'Calculates a deterministic 0-100 student placement readiness score for Skill Lamp based on CGPA (40%), mandatory skill match (35%), preferred/AI skill match (15%), certifications (+5 each), and backlog penalties (-15 each).'
RETURN LEAST(100.0, GREATEST(0.0,
  ROUND(
    (COALESCE(cgpa, 0.0) * 4.0)
    + (COALESCE(mandatory_match_pct, 0.0) * 0.35)
    + (COALESCE(preferred_ai_match_pct, 0.0) * 0.15)
    + (COALESCE(cert_count, 0) * 5.0)
    - (COALESCE(active_backlogs, 0) * 15.0)
  , 2)
));

-- ============================================================================
-- Verification / Test Cases:
-- ============================================================================
-- Test Case 1: Ideal top-tier student
-- CGPA 9.5, 100% mandatory match, 100% AI match, 2 certs, 0 backlogs
-- Expected calculation: (9.5*4 = 38) + (100*0.35 = 35) + (100*0.15 = 15) + (2*5 = 10) - 0 = 98.0
-- Output: 98.0
-- SELECT workspace.campus_intelligence_gold.fn_readiness_score(9.5, 100.0, 100.0, 2, 0) AS test_1_score;

-- Test Case 2: Max Cap Boundary (Score > 100 capped at 100.0)
-- CGPA 10.0, 100% mandatory, 100% AI, 4 certs, 0 backlogs
-- Raw = 40 + 35 + 15 + 20 = 110 -> Capped at 100.0
-- SELECT workspace.campus_intelligence_gold.fn_readiness_score(10.0, 100.0, 100.0, 4, 0) AS test_2_score;

-- Test Case 3: Student with active backlogs (Backlog penalty)
-- CGPA 7.5, 50% mandatory, 0% AI, 0 certs, 2 backlogs
-- Raw = (7.5*4 = 30) + (50*0.35 = 17.5) + 0 + 0 - (2*15 = 30) = 17.5
-- SELECT workspace.campus_intelligence_gold.fn_readiness_score(7.5, 50.0, 0.0, 0, 2) AS test_3_score;

-- Test Case 4: Severe backlogs floor boundary (Score < 0 floored at 0.0)
-- CGPA 5.0, 0% mandatory, 0% AI, 0 certs, 3 backlogs
-- Raw = 20 + 0 + 0 + 0 - 45 = -25 -> Floored at 0.0
-- SELECT workspace.campus_intelligence_gold.fn_readiness_score(5.0, 0.0, 0.0, 0, 3) AS test_4_score;

-- Test Case 5: NULL safety test (All NULLs return 0.0)
-- SELECT workspace.campus_intelligence_gold.fn_readiness_score(NULL, NULL, NULL, NULL, NULL) AS test_5_score;
-- ============================================================================
