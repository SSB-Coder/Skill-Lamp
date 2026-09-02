import sys
import unittest
from fastapi.testclient import TestClient

from main import app
from probability import calculate_simulation
from models import CohortStatistics, MetricSnapshot, DeltaSummary, CompanyItem
import fallback_data

client = TestClient(app)

class TestSkillLampBackend(unittest.TestCase):

    def test_health_endpoint(self):
        response = client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "HEALTHY")

    def test_auth_login_tpo(self):
        payload = {"email": "tpo@rvce.edu.in", "password": "adminpassword"}
        response = client.post("/api/auth/login", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["role"], "TPO")
        self.assertIn("token", data)
        self.assertIsNone(data["student_id"])

    def test_auth_login_student(self):
        payload = {"email": "USN_2024_001@rvce.edu.in", "password": "studentpassword"}
        response = client.post("/api/auth/login", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["role"], "STUDENT")
        self.assertEqual(data["student_id"], "USN_2024_001")
        self.assertIn("token", data)

    def test_auth_me(self):
        login_res = client.post("/api/auth/login", json={"email": "tpo@rvce.edu.in", "password": "admin"})
        token = login_res.json()["token"]

        response = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["role"], "TPO")
        self.assertEqual(data["email"], "tpo@rvce.edu.in")

    def test_students_spreadsheet_authorized(self):
        login_res = client.post("/api/auth/login", json={"email": "tpo@rvce.edu.in", "password": "admin"})
        token = login_res.json()["token"]

        response = client.get("/api/students/spreadsheet", headers={"Authorization": f"Bearer {token}"})
        self.assertEqual(response.status_code, 200)
        rows = response.json()
        self.assertGreaterEqual(len(rows), 50)
        self.assertEqual(rows[0]["student_id"], "USN_2024_001")
        self.assertIn("skills", rows[0])
        self.assertIn("eligible_companies_count", rows[0])

    def test_students_spreadsheet_filters(self):
        login_res = client.post("/api/auth/login", json={"email": "tpo@rvce.edu.in", "password": "admin"})
        token = login_res.json()["token"]
        headers = {"Authorization": f"Bearer {token}"}

        # Branch filter
        res = client.get("/api/students/spreadsheet?branch=CSE", headers=headers)
        self.assertEqual(res.status_code, 200)
        for row in res.json():
            self.assertEqual(row["branch"], "CSE")

        # Min CGPA filter
        res = client.get("/api/students/spreadsheet?min_cgpa=9.0", headers=headers)
        self.assertEqual(res.status_code, 200)
        for row in res.json():
            self.assertGreaterEqual(row["cgpa"], 9.0)

        # Search filter
        res = client.get("/api/students/spreadsheet?search=Aarav", headers=headers)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.json()), 1)
        self.assertEqual(res.json()[0]["student_id"], "USN_2024_001")

    def test_students_spreadsheet_forbidden_for_student(self):
        login_res = client.post("/api/auth/login", json={"email": "student@rvce.edu.in", "password": "student"})
        token = login_res.json()["token"]

        response = client.get("/api/students/spreadsheet", headers={"Authorization": f"Bearer {token}"})
        self.assertEqual(response.status_code, 403)

    def test_student_isolated_profile(self):
        login_res = client.post("/api/auth/login", json={"email": "USN_2024_001@rvce.edu.in", "password": "student"})
        token = login_res.json()["token"]

        response = client.get("/api/student/me", headers={"Authorization": f"Bearer {token}"})
        self.assertEqual(response.status_code, 200)
        profile = response.json()
        self.assertEqual(profile["student_id"], "USN_2024_001")
        self.assertEqual(profile["full_name"], "Aarav Sharma")
        self.assertIn("eligible_companies", profile)
        self.assertIn("blocked_companies", profile)
        self.assertIn("target_company_options", profile)
        self.assertIn("readiness_score", profile)

    def test_match_jd(self):
        jd_text = (
            "Looking for Senior Data Engineer with strong experience in Databricks DE, "
            "PySpark, and SQL. Candidates must have minimum CGPA 8.0 and no active backlogs."
        )
        response = client.post("/api/match-jd", json={"raw_jd_text": jd_text})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("extracted_criteria", data)
        self.assertIn("matched_student_ids", data)
        self.assertGreater(data["match_count"], 0)
        self.assertIn("SELECT", data["sql_query"])

    def test_query_genie(self):
        payload = {"prompt": "Show all students eligible for Databricks"}
        response = client.post("/api/query", json=payload, headers={"X-Mock-Fallback": "true"})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "SUCCESS")
        self.assertIn("columns", data)
        self.assertIn("rows", data)
        self.assertGreater(len(data["rows"]), 0)

    def test_whatif_hero_simulation(self):
        payload = {
            "student_id": "USN_2024_001",
            "added_skills": ["DATABRICKS_DE"]
        }
        response = client.post("/api/whatif", json=payload, headers={"X-Mock-Fallback": "true"})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        
        # Verify baseline, simulated, and exact deltas
        self.assertEqual(data["baseline"]["placement_probability_pct"], 40.0)
        self.assertEqual(data["baseline"]["expected_ctc_lpa"], 8.20)
        self.assertEqual(data["simulated"]["placement_probability_pct"], 80.0)
        self.assertEqual(data["simulated"]["expected_ctc_lpa"], 18.50)
        self.assertEqual(data["delta"]["delta_probability_pct"], 40.0)
        self.assertEqual(data["delta"]["delta_ctc_lpa"], 10.30)
        
        # Synergy alert when DATABRICKS_DE added without PYSPARK
        self.assertIsNotNone(data["synergy_alert"])
        self.assertIn("PYSPARK", data["synergy_alert"])
        self.assertIn("92.0%", data["synergy_alert"])
        
        # Verify SQL trace and Governance metadata
        self.assertIn("sql_trace", data)
        self.assertIn("governance_metadata", data)
        self.assertEqual(data["governance_metadata"]["catalog"], "skill_lamp")

    def test_deterministic_probability_engine_laplace_smoothing(self):
        cohort_small = CohortStatistics(
            placed_with_skill=2,
            total_with_skill=3,
            placed_without_skill=1,
            total_without_skill=2,
            avg_ctc_with_skill=20.0,
            avg_ctc_without_skill=10.0
        )
        base, sim, delta, synergy = calculate_simulation(
            cohort=cohort_small,
            base_eligible_count=2,
            simulated_eligible_count=5,
            new_companies=[],
            added_skills=["Python"]
        )
        self.assertEqual(sim.placement_probability_pct, 50.0)
        self.assertEqual(base.placement_probability_pct, 42.9)

    def test_invalid_usn_validation(self):
        payload = {
            "student_id": "INVALID_USN",
            "added_skills": ["Python"]
        }
        response = client.post("/api/whatif", json=payload)
        self.assertEqual(response.status_code, 422)

    def test_spa_root_serve(self):
        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Skill Lamp", response.text)

    def test_spa_client_side_routing_fallback(self):
        response = client.get("/time-machine")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Skill Lamp", response.text)


if __name__ == "__main__":
    unittest.main()
