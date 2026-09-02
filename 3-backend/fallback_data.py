import re
from typing import List, Dict, Any, Optional
from fastapi import Request
from config import settings
from models import (
    CandidateRow,
    CompanyItem,
    TargetCompanyOption,
    StudentProfileResponse,
    CohortStatistics,
    MatchJDResponse,
    QueryResponse,
)

# ---------------------------------------------------------------------------
# Stage-Safe Fallback Switch Checker
# ---------------------------------------------------------------------------

def is_mock_fallback(request: Optional[Request] = None) -> bool:
    """
    Checks if stage-safe mock fallback mode is requested via:
    1. Environment variable USE_MOCK_FALLBACK=true
    2. HTTP Request Header 'X-Mock-Fallback: true' / '1' / 'yes' (e.g., Ctrl+Shift+F failsafe trigger)
    """
    if settings.USE_MOCK_FALLBACK:
        return True
    if request is not None:
        header_val = request.headers.get("X-Mock-Fallback") or request.headers.get("x-mock-fallback")
        if header_val and header_val.strip().lower() in ("true", "1", "yes"):
            return True
    return False


# ---------------------------------------------------------------------------
# Master Companies Catalog
# ---------------------------------------------------------------------------

COMPANIES_CATALOG: List[Dict[str, Any]] = [
    {
        "company_id": "COMP_001",
        "company_name": "Databricks",
        "tier": "Super Dream",
        "ctc_lpa": 48.0,
        "min_cgpa": 8.0,
        "allowed_branches": ["CSE", "ISE", "AI/DS"],
        "max_backlogs": 0,
        "mandatory_skills": ["Databricks DE", "PySpark", "SQL"],
        "preferred_skills": ["Python", "AWS", "Data Structures"],
    },
    {
        "company_id": "COMP_002",
        "company_name": "Microsoft",
        "tier": "Super Dream",
        "ctc_lpa": 44.0,
        "min_cgpa": 8.5,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 0,
        "mandatory_skills": ["Data Structures", "System Design", "Java"],
        "preferred_skills": ["Python", "Docker", "CI/CD"],
    },
    {
        "company_id": "COMP_003",
        "company_name": "Atlassian",
        "tier": "Super Dream",
        "ctc_lpa": 42.0,
        "min_cgpa": 8.2,
        "allowed_branches": ["CSE", "ISE", "AI/DS"],
        "max_backlogs": 0,
        "mandatory_skills": ["React", "FastAPI", "Docker"],
        "preferred_skills": ["Kubernetes", "System Design"],
    },
    {
        "company_id": "COMP_004",
        "company_name": "Amazon",
        "tier": "Super Dream",
        "ctc_lpa": 32.0,
        "min_cgpa": 7.8,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 0,
        "mandatory_skills": ["Data Structures", "Java", "AWS"],
        "preferred_skills": ["System Design", "SQL"],
    },
    {
        "company_id": "COMP_005",
        "company_name": "Goldman Sachs",
        "tier": "Super Dream",
        "ctc_lpa": 28.0,
        "min_cgpa": 8.0,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 0,
        "mandatory_skills": ["Data Structures", "SQL", "Java"],
        "preferred_skills": ["Machine Learning", "Python"],
    },
    {
        "company_id": "COMP_006",
        "company_name": "Razorpay",
        "tier": "Dream",
        "ctc_lpa": 18.0,
        "min_cgpa": 7.5,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 0,
        "mandatory_skills": ["Python", "FastAPI", "SQL"],
        "preferred_skills": ["Docker", "React"],
    },
    {
        "company_id": "COMP_007",
        "company_name": "Oracle",
        "tier": "Dream",
        "ctc_lpa": 16.0,
        "min_cgpa": 7.5,
        "allowed_branches": ["CSE", "ISE", "ECE"],
        "max_backlogs": 0,
        "mandatory_skills": ["SQL", "Java"],
        "preferred_skills": ["Docker", "Kubernetes"],
    },
    {
        "company_id": "COMP_008",
        "company_name": "Cisco",
        "tier": "Dream",
        "ctc_lpa": 15.0,
        "min_cgpa": 7.5,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 0,
        "mandatory_skills": ["Python", "Docker"],
        "preferred_skills": ["AWS", "CI/CD"],
    },
    {
        "company_id": "COMP_009",
        "company_name": "SAP Labs",
        "tier": "Dream",
        "ctc_lpa": 14.0,
        "min_cgpa": 7.0,
        "allowed_branches": ["CSE", "ISE", "AI/DS"],
        "max_backlogs": 0,
        "mandatory_skills": ["Java", "SQL"],
        "preferred_skills": ["React", "FastAPI"],
    },
    {
        "company_id": "COMP_010",
        "company_name": "Target",
        "tier": "Dream",
        "ctc_lpa": 12.0,
        "min_cgpa": 7.0,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 0,
        "mandatory_skills": ["Python", "SQL"],
        "preferred_skills": ["Data Structures", "FastAPI"],
    },
    {
        "company_id": "COMP_011",
        "company_name": "TCS Digital",
        "tier": "Core Tech",
        "ctc_lpa": 7.5,
        "min_cgpa": 6.5,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 1,
        "mandatory_skills": ["Python", "Data Structures"],
        "preferred_skills": ["SQL"],
    },
    {
        "company_id": "COMP_012",
        "company_name": "Cognizant GenC Next",
        "tier": "Core Tech",
        "ctc_lpa": 6.8,
        "min_cgpa": 6.5,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 1,
        "mandatory_skills": ["Java", "SQL"],
        "preferred_skills": ["React"],
    },
    {
        "company_id": "COMP_013",
        "company_name": "Infosys SpringBoard",
        "tier": "Core Tech",
        "ctc_lpa": 6.5,
        "min_cgpa": 6.0,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 1,
        "mandatory_skills": ["Python"],
        "preferred_skills": ["SQL", "FastAPI"],
    },
    {
        "company_id": "COMP_014",
        "company_name": "Wipro Turbo",
        "tier": "Core Tech",
        "ctc_lpa": 6.5,
        "min_cgpa": 6.0,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 1,
        "mandatory_skills": ["Data Structures", "SQL"],
        "preferred_skills": ["Java"],
    },
    {
        "company_id": "COMP_015",
        "company_name": "LTI Mindtree",
        "tier": "Core Tech",
        "ctc_lpa": 6.0,
        "min_cgpa": 6.0,
        "allowed_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "max_backlogs": 2,
        "mandatory_skills": ["SQL"],
        "preferred_skills": ["Python"],
    },
]

# ---------------------------------------------------------------------------
# Skill normalization helper
# ---------------------------------------------------------------------------

def normalize_skill(skill: str) -> str:
    s = skill.strip().upper().replace(" ", "_").replace("-", "_")
    mapping = {
        "DATABRICKS": "DATABRICKS_DE",
        "DATABRICKS_DATA_ENGINEERING": "DATABRICKS_DE",
        "SPARK": "PYSPARK",
        "FAST_API": "FASTAPI",
        "DSA": "DATA_STRUCTURES",
        "DATA_STRUCTURE": "DATA_STRUCTURES",
        "GENAI": "GENAI_LLM",
        "LLM": "GENAI_LLM",
        "GEN_AI": "GENAI_LLM",
    }
    return mapping.get(s, s)


def check_student_eligibility(
    student_branch: str,
    student_cgpa: float,
    student_backlogs: int,
    student_skills: List[str],
    company: Dict[str, Any]
) -> tuple[bool, Optional[str], List[str], List[str]]:
    """
    Evaluates eligibility and returns:
    (is_eligible, blocker_reason, missing_mandatory, missing_preferred)
    """
    normalized_student_skills = {normalize_skill(s) for s in student_skills}
    
    missing_mandatory = [
        s for s in company["mandatory_skills"]
        if normalize_skill(s) not in normalized_student_skills
    ]
    missing_preferred = [
        s for s in company["preferred_skills"]
        if normalize_skill(s) not in normalized_student_skills
    ]

    if student_backlogs > company["max_backlogs"]:
        return False, "ACTIVE_BACKLOGS", missing_mandatory, missing_preferred
    
    if student_branch not in company["allowed_branches"]:
        return False, "BRANCH_INELIGIBLE", missing_mandatory, missing_preferred

    if student_cgpa < company["min_cgpa"]:
        return False, "CGPA_BELOW_CUTOFF", missing_mandatory, missing_preferred

    if len(missing_mandatory) > 0:
        return False, "MISSING_MANDATORY_SKILLS", missing_mandatory, missing_preferred

    return True, "ELIGIBLE", missing_mandatory, missing_preferred


# ---------------------------------------------------------------------------
# Pre-populated Top 50 Students Data for TPO Spreadsheet
# ---------------------------------------------------------------------------

STUDENTS_DB: List[Dict[str, Any]] = [
    {
        "student_id": "USN_2024_001",
        "full_name": "Aarav Sharma",
        "branch": "CSE",
        "cgpa": 8.4,
        "active_backlogs": 0,
        "skills": ["Python", "SQL", "Data Structures", "FastAPI"],
    },
    {
        "student_id": "USN_2024_002",
        "full_name": "Ananya Rao",
        "branch": "ISE",
        "cgpa": 9.1,
        "active_backlogs": 0,
        "skills": ["Python", "Databricks DE", "PySpark", "SQL", "AWS"],
    },
    {
        "student_id": "USN_2024_003",
        "full_name": "Rohan Verma",
        "branch": "ECE",
        "cgpa": 7.8,
        "active_backlogs": 0,
        "skills": ["Data Structures", "Java", "SQL"],
    },
    {
        "student_id": "USN_2024_004",
        "full_name": "Priya Nair",
        "branch": "AI/DS",
        "cgpa": 8.9,
        "active_backlogs": 0,
        "skills": ["Python", "Machine Learning", "Databricks DE", "SQL"],
    },
    {
        "student_id": "USN_2024_005",
        "full_name": "Aditya Patel",
        "branch": "CSE",
        "cgpa": 9.4,
        "active_backlogs": 0,
        "skills": ["Data Structures", "System Design", "Java", "Docker", "AWS"],
    },
    {
        "student_id": "USN_2024_006",
        "full_name": "Sneha Kulkarni",
        "branch": "ISE",
        "cgpa": 8.2,
        "active_backlogs": 0,
        "skills": ["React", "FastAPI", "Docker", "SQL"],
    },
    {
        "student_id": "USN_2024_007",
        "full_name": "Vikram Hegde",
        "branch": "CSE",
        "cgpa": 7.4,
        "active_backlogs": 1,
        "skills": ["Python", "SQL", "FastAPI"],
    },
    {
        "student_id": "USN_2024_008",
        "full_name": "Meera Iyer",
        "branch": "AI/DS",
        "cgpa": 8.7,
        "active_backlogs": 0,
        "skills": ["Python", "PySpark", "SQL", "GenAI/LLM"],
    },
    {
        "student_id": "USN_2024_009",
        "full_name": "Karthik Reddy",
        "branch": "ECE",
        "cgpa": 8.1,
        "active_backlogs": 0,
        "skills": ["Python", "Docker", "AWS", "SQL"],
    },
    {
        "student_id": "USN_2024_010",
        "full_name": "Divya Deshmukh",
        "branch": "CSE",
        "cgpa": 9.0,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "PySpark", "SQL", "Python", "Data Structures"],
    },
    {
        "student_id": "USN_2024_011",
        "full_name": "Nikhil Kamath",
        "branch": "ISE",
        "cgpa": 7.9,
        "active_backlogs": 0,
        "skills": ["Java", "SQL", "Data Structures"],
    },
    {
        "student_id": "USN_2024_012",
        "full_name": "Pooja Bhatt",
        "branch": "AI/DS",
        "cgpa": 8.6,
        "active_backlogs": 0,
        "skills": ["Python", "Machine Learning", "SQL", "FastAPI"],
    },
    {
        "student_id": "USN_2024_013",
        "full_name": "Varun Menon",
        "branch": "CSE",
        "cgpa": 8.3,
        "active_backlogs": 0,
        "skills": ["React", "FastAPI", "SQL", "Docker"],
    },
    {
        "student_id": "USN_2024_014",
        "full_name": "Tanvi Joshi",
        "branch": "ECE",
        "cgpa": 7.2,
        "active_backlogs": 0,
        "skills": ["Python", "Data Structures"],
    },
    {
        "student_id": "USN_2024_015",
        "full_name": "Abhishek Gupta",
        "branch": "CSE",
        "cgpa": 8.8,
        "active_backlogs": 0,
        "skills": ["Data Structures", "Java", "System Design", "AWS"],
    },
    {
        "student_id": "USN_2024_016",
        "full_name": "Ritu Sen",
        "branch": "ISE",
        "cgpa": 8.5,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "SQL", "Python", "Docker"],
    },
    {
        "student_id": "USN_2024_017",
        "full_name": "Siddharth Das",
        "branch": "AI/DS",
        "cgpa": 9.2,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "PySpark", "Python", "SQL", "GenAI/LLM"],
    },
    {
        "student_id": "USN_2024_018",
        "full_name": "Bhavya Gowda",
        "branch": "ECE",
        "cgpa": 7.6,
        "active_backlogs": 0,
        "skills": ["Python", "SQL", "AWS"],
    },
    {
        "student_id": "USN_2024_019",
        "full_name": "Rahul Nambiar",
        "branch": "CSE",
        "cgpa": 8.0,
        "active_backlogs": 0,
        "skills": ["Python", "FastAPI", "SQL", "React"],
    },
    {
        "student_id": "USN_2024_020",
        "full_name": "Ishita Saxena",
        "branch": "ISE",
        "cgpa": 8.9,
        "active_backlogs": 0,
        "skills": ["Data Structures", "Java", "SQL", "System Design"],
    },
    {
        "student_id": "USN_2024_021",
        "full_name": "Harsh Vardhan",
        "branch": "AI/DS",
        "cgpa": 7.7,
        "active_backlogs": 0,
        "skills": ["Python", "SQL", "Machine Learning"],
    },
    {
        "student_id": "USN_2024_022",
        "full_name": "Kavya Murthy",
        "branch": "ECE",
        "cgpa": 8.4,
        "active_backlogs": 0,
        "skills": ["Python", "Docker", "Data Structures", "SQL"],
    },
    {
        "student_id": "USN_2024_023",
        "full_name": "Gaurav Soni",
        "branch": "CSE",
        "cgpa": 9.5,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "PySpark", "Java", "System Design", "AWS"],
    },
    {
        "student_id": "USN_2024_024",
        "full_name": "Deepa Chandran",
        "branch": "ISE",
        "cgpa": 7.3,
        "active_backlogs": 0,
        "skills": ["Java", "SQL"],
    },
    {
        "student_id": "USN_2024_025",
        "full_name": "Manoj Kumar",
        "branch": "AI/DS",
        "cgpa": 8.1,
        "active_backlogs": 0,
        "skills": ["Python", "SQL", "GenAI/LLM", "FastAPI"],
    },
    {
        "student_id": "USN_2024_026",
        "full_name": "Swati Tiwari",
        "branch": "CSE",
        "cgpa": 8.7,
        "active_backlogs": 0,
        "skills": ["React", "FastAPI", "Docker", "Kubernetes"],
    },
    {
        "student_id": "USN_2024_027",
        "full_name": "Pranav Shastry",
        "branch": "ECE",
        "cgpa": 6.9,
        "active_backlogs": 1,
        "skills": ["SQL", "Python"],
    },
    {
        "student_id": "USN_2024_028",
        "full_name": "Shreya Pillai",
        "branch": "ISE",
        "cgpa": 9.3,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "PySpark", "SQL", "AWS", "FastAPI"],
    },
    {
        "student_id": "USN_2024_029",
        "full_name": "Arjun Singhania",
        "branch": "CSE",
        "cgpa": 8.2,
        "active_backlogs": 0,
        "skills": ["Data Structures", "Java", "SQL", "Docker"],
    },
    {
        "student_id": "USN_2024_030",
        "full_name": "Rhea Kapoor",
        "branch": "AI/DS",
        "cgpa": 8.8,
        "active_backlogs": 0,
        "skills": ["Python", "Machine Learning", "Databricks DE", "SQL"],
    },
    {
        "student_id": "USN_2024_031",
        "full_name": "Naveen Prasad",
        "branch": "ECE",
        "cgpa": 7.5,
        "active_backlogs": 0,
        "skills": ["Python", "SQL", "Data Structures"],
    },
    {
        "student_id": "USN_2024_032",
        "full_name": "Archana Rao",
        "branch": "CSE",
        "cgpa": 9.1,
        "active_backlogs": 0,
        "skills": ["System Design", "Java", "Data Structures", "AWS"],
    },
    {
        "student_id": "USN_2024_033",
        "full_name": "Yashwant Shenoy",
        "branch": "ISE",
        "cgpa": 7.8,
        "active_backlogs": 0,
        "skills": ["FastAPI", "React", "SQL"],
    },
    {
        "student_id": "USN_2024_034",
        "full_name": "Neelam Mehra",
        "branch": "AI/DS",
        "cgpa": 8.3,
        "active_backlogs": 0,
        "skills": ["Python", "SQL", "PySpark"],
    },
    {
        "student_id": "USN_2024_035",
        "full_name": "Tarun Bhat",
        "branch": "CSE",
        "cgpa": 7.1,
        "active_backlogs": 2,
        "skills": ["SQL", "Java"],
    },
    {
        "student_id": "USN_2024_036",
        "full_name": "Monika Sharma",
        "branch": "ECE",
        "cgpa": 8.6,
        "active_backlogs": 0,
        "skills": ["Python", "AWS", "Docker", "SQL"],
    },
    {
        "student_id": "USN_2024_037",
        "full_name": "Rohit Chawla",
        "branch": "ISE",
        "cgpa": 8.0,
        "active_backlogs": 0,
        "skills": ["SQL", "Java", "Data Structures"],
    },
    {
        "student_id": "USN_2024_038",
        "full_name": "Gayatri Nair",
        "branch": "AI/DS",
        "cgpa": 9.6,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "PySpark", "Python", "SQL", "GenAI/LLM", "AWS"],
    },
    {
        "student_id": "USN_2024_039",
        "full_name": "Akash Hegde",
        "branch": "CSE",
        "cgpa": 8.5,
        "active_backlogs": 0,
        "skills": ["Data Structures", "React", "FastAPI", "Docker"],
    },
    {
        "student_id": "USN_2024_040",
        "full_name": "Lavanya Sundaram",
        "branch": "ECE",
        "cgpa": 7.7,
        "active_backlogs": 0,
        "skills": ["Python", "Data Structures", "SQL"],
    },
    {
        "student_id": "USN_2024_041",
        "full_name": "Chetan Acharya",
        "branch": "ISE",
        "cgpa": 8.4,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "SQL", "FastAPI", "Python"],
    },
    {
        "student_id": "USN_2024_042",
        "full_name": "Smriti Jain",
        "branch": "AI/DS",
        "cgpa": 8.9,
        "active_backlogs": 0,
        "skills": ["Python", "Machine Learning", "GenAI/LLM", "SQL"],
    },
    {
        "student_id": "USN_2024_043",
        "full_name": "Vikas Nayak",
        "branch": "CSE",
        "cgpa": 7.6,
        "active_backlogs": 0,
        "skills": ["FastAPI", "SQL", "Python"],
    },
    {
        "student_id": "USN_2024_044",
        "full_name": "Pallavi Joshi",
        "branch": "ECE",
        "cgpa": 8.2,
        "active_backlogs": 0,
        "skills": ["Python", "Docker", "SQL"],
    },
    {
        "student_id": "USN_2024_045",
        "full_name": "Karan Malhotra",
        "branch": "ISE",
        "cgpa": 9.0,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "PySpark", "SQL", "Data Structures"],
    },
    {
        "student_id": "USN_2024_046",
        "full_name": "Aishwarya Srinivas",
        "branch": "AI/DS",
        "cgpa": 8.7,
        "active_backlogs": 0,
        "skills": ["Python", "PySpark", "SQL", "FastAPI"],
    },
    {
        "student_id": "USN_2024_047",
        "full_name": "Manish Rao",
        "branch": "CSE",
        "cgpa": 8.1,
        "active_backlogs": 0,
        "skills": ["Java", "SQL", "Data Structures", "Docker"],
    },
    {
        "student_id": "USN_2024_048",
        "full_name": "Chaitra Shetty",
        "branch": "ECE",
        "cgpa": 7.4,
        "active_backlogs": 0,
        "skills": ["Python", "SQL"],
    },
    {
        "student_id": "USN_2024_049",
        "full_name": "Sanjay Prabhu",
        "branch": "ISE",
        "cgpa": 8.6,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "Python", "SQL", "AWS"],
    },
    {
        "student_id": "USN_2024_050",
        "full_name": "Tanmay Bakshi",
        "branch": "AI/DS",
        "cgpa": 9.3,
        "active_backlogs": 0,
        "skills": ["Databricks DE", "PySpark", "Machine Learning", "GenAI/LLM", "SQL"],
    },
]


def get_candidate_rows() -> List[CandidateRow]:
    """
    Computes eligible company counts, tier breakdowns, readiness scores, and top unlocked companies for the 50 students.
    """
    rows: List[CandidateRow] = []
    for s in STUDENTS_DB:
        eligible_companies = []
        for c in COMPANIES_CATALOG:
            is_elig, _, _, _ = check_student_eligibility(
                s["branch"], s["cgpa"], s["active_backlogs"], s["skills"], c
            )
            if is_elig:
                eligible_companies.append(c)
        
        top_company = None
        dream_cnt = 0
        super_dream_cnt = 0
        if eligible_companies:
            sorted_companies = sorted(eligible_companies, key=lambda x: x["ctc_lpa"], reverse=True)
            top_company = f"{sorted_companies[0]['company_name']} ({sorted_companies[0]['ctc_lpa']} LPA)"
            dream_cnt = len([c for c in eligible_companies if c["tier"] == "Dream"])
            super_dream_cnt = len([c for c in eligible_companies if c["tier"] == "Super Dream"])

        # Deterministic placement readiness score (0-100)
        skill_factor = min(1.0, len(s["skills"]) / 6.0) * 40.0
        cgpa_factor = min(1.0, s["cgpa"] / 10.0) * 40.0
        backlog_factor = 20.0 if s["active_backlogs"] == 0 else 0.0
        readiness = round(skill_factor + cgpa_factor + backlog_factor, 1)

        rows.append(
            CandidateRow(
                student_id=s["student_id"],
                full_name=s["full_name"],
                branch=s["branch"],
                cgpa=s["cgpa"],
                active_backlogs=s["active_backlogs"],
                skills=s["skills"],
                eligible_companies_count=len(eligible_companies),
                top_unlocked_company=top_company,
                dream_eligible_count=dream_cnt,
                super_dream_eligible_count=super_dream_cnt,
                placement_readiness_score=readiness,
            )
        )
    return rows


# ---------------------------------------------------------------------------
# Student Isolated Profile Generator
# ---------------------------------------------------------------------------

def get_student_profile(student_id: str) -> Optional[StudentProfileResponse]:
    """
    Builds the isolated student profile with Reverse Roadmap baseline options.
    """
    student = next((s for s in STUDENTS_DB if s["student_id"] == student_id), None)
    if not student:
        return None

    eligible_items: List[CompanyItem] = []
    blocked_items: List[CompanyItem] = []
    roadmap_options: List[TargetCompanyOption] = []

    for c in COMPANIES_CATALOG:
        is_elig, blocker, missing_mand, missing_pref = check_student_eligibility(
            student["branch"], student["cgpa"], student["active_backlogs"], student["skills"], c
        )
        
        item = CompanyItem(
            company_id=c["company_id"],
            company_name=c["company_name"],
            tier=c["tier"],
            ctc_lpa=c["ctc_lpa"],
            missing_mandatory_skills=missing_mand,
            missing_preferred_skills=missing_pref,
            blocker_reason=blocker,
        )

        if is_elig:
            eligible_items.append(item)
        else:
            blocked_items.append(item)

        roadmap_options.append(
            TargetCompanyOption(
                company_id=c["company_id"],
                company_name=c["company_name"],
                tier=c["tier"],
                ctc_lpa=c["ctc_lpa"],
                missing_skills=missing_mand,
                is_eligible=is_elig,
            )
        )

    # Readiness score calculation: baseline placement readiness index (0-100)
    skill_factor = min(1.0, len(student["skills"]) / 6.0) * 40.0
    cgpa_factor = min(1.0, student["cgpa"] / 10.0) * 40.0
    backlog_factor = 20.0 if student["active_backlogs"] == 0 else 0.0
    readiness_score = round(skill_factor + cgpa_factor + backlog_factor, 1)

    top_roi_recommendation = (
        "Add DATABRICKS_DE and PYSPARK to unlock Super Dream Tier (Databricks 48 LPA) with +40.0 pts placement boost."
    )

    return StudentProfileResponse(
        student_id=student["student_id"],
        full_name=student["full_name"],
        branch=student["branch"],
        cgpa=student["cgpa"],
        active_backlogs=student["active_backlogs"],
        current_skills=student["skills"],
        readiness_score=readiness_score,
        eligible_companies=eligible_items,
        blocked_companies=blocked_items,
        top_roi_recommendation=top_roi_recommendation,
        target_company_options=roadmap_options,
    )


# ---------------------------------------------------------------------------
# Pre-computed Hero Cohort Statistics for What-If
# ---------------------------------------------------------------------------

def get_hero_cohort_stats(student_branch: str, student_cgpa: float, added_skills: List[str]) -> CohortStatistics:
    """
    Returns deterministic cohort counts matching Person 1 Unity Catalog gold tables:
    - Without skill: 40 placed out of 100, avg CTC 20.50 LPA (Exp CTC = 8.20 LPA)
    - With skill (e.g. Databricks DE): 80 placed out of 100, avg CTC 23.125 LPA (Exp CTC = 18.50 LPA)
    """
    normalized = [normalize_skill(s) for s in added_skills]
    
    if any("DATABRICKS" in s for s in normalized):
        return CohortStatistics(
            placed_with_skill=80,
            total_with_skill=100,
            placed_without_skill=40,
            total_without_skill=100,
            avg_ctc_with_skill=23.125,
            avg_ctc_without_skill=20.50,
        )
    elif any("REACT" in s or "FASTAPI" in s for s in normalized):
        return CohortStatistics(
            placed_with_skill=75,
            total_with_skill=100,
            placed_without_skill=45,
            total_without_skill=100,
            avg_ctc_with_skill=18.00,
            avg_ctc_without_skill=14.00,
        )
    else:
        return CohortStatistics(
            placed_with_skill=65,
            total_with_skill=100,
            placed_without_skill=40,
            total_without_skill=100,
            avg_ctc_with_skill=16.50,
            avg_ctc_without_skill=12.00,
        )


# ---------------------------------------------------------------------------
# Recruiter JD Matcher Mock Engine
# ---------------------------------------------------------------------------

def parse_jd_and_match(raw_jd_text: str) -> MatchJDResponse:
    """
    Extracts skills, minimum CGPA, and branch requirements from raw JD text.
    Executes deterministic matching over candidate pool.
    """
    text_upper = raw_jd_text.upper()
    
    # Extract CGPA cutoff
    cgpa_match = re.search(r"(?:CGPA|GPA|CUTOFF|MINIMUM)\s*(?:OF|>=|:|-|\s)?\s*([6-9](?:\.\d{1,2})?)", text_upper)
    min_cgpa = float(cgpa_match.group(1)) if cgpa_match else 7.0

    # Extract required skills
    known_skills = [
        "DATABRICKS DE", "DATABRICKS", "PYSPARK", "SPARK", "PYTHON", "SQL",
        "FASTAPI", "REACT", "AWS", "DOCKER", "KUBERNETES", "JAVA",
        "SYSTEM DESIGN", "MACHINE LEARNING", "GENAI", "DATA STRUCTURES"
    ]
    extracted_skills = []
    for skill in known_skills:
        if skill in text_upper:
            normalized = normalize_skill(skill)
            if normalized not in [normalize_skill(s) for s in extracted_skills]:
                extracted_skills.append(skill.title() if len(skill) > 4 else skill)

    if not extracted_skills:
        extracted_skills = ["Python", "SQL"]

    # Extract branches
    allowed_branches = []
    for b in ["CSE", "ISE", "ECE", "AI/DS"]:
        if b in text_upper:
            allowed_branches.append(b)
    if not allowed_branches:
        allowed_branches = ["CSE", "ISE", "ECE", "AI/DS"]

    # Filter matching students
    matched_ids: List[str] = []
    for s in STUDENTS_DB:
        if s["cgpa"] >= min_cgpa and s["branch"] in allowed_branches and s["active_backlogs"] == 0:
            student_normalized_skills = {normalize_skill(sk) for sk in s["skills"]}
            req_normalized = {normalize_skill(sk) for sk in extracted_skills}
            # Check if student has at least one or more required skills
            if any(sk in student_normalized_skills for sk in req_normalized):
                matched_ids.append(s["student_id"])

    # Fallback to ensure matched_ids is non-empty for standard demos
    if not matched_ids:
        matched_ids = [s["student_id"] for s in STUDENTS_DB[:8]]

    skills_sql_str = ", ".join([f"'{s}'" for s in extracted_skills])
    branches_sql_str = ", ".join([f"'{b}'" for b in allowed_branches])
    sql = (
        f"SELECT student_id, full_name, branch, cgpa, skills\n"
        f"FROM skill_lamp.gold.dim_student\n"
        f"WHERE cgpa >= {min_cgpa}\n"
        f"  AND branch IN ({branches_sql_str})\n"
        f"  AND active_backlogs = 0\n"
        f"  AND arrays_overlap(skills, ARRAY({skills_sql_str}));"
    )

    return MatchJDResponse(
        extracted_criteria={
            "min_cgpa": min_cgpa,
            "required_skills": extracted_skills,
            "allowed_branches": allowed_branches,
            "max_backlogs": 0,
        },
        matched_student_ids=matched_ids,
        match_count=len(matched_ids),
        sql_query=sql,
        execution_time_ms=185,
    )


# ---------------------------------------------------------------------------
# Genie Natural Language Mock Query Engine
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Genie Natural Language Mock Query Engine (Databricks AI/BI Genie Emulation)
# ---------------------------------------------------------------------------

def mock_genie_query(prompt: str, conversation_id: Optional[str] = None) -> QueryResponse:
    """
    High-fidelity Databricks AI/BI Genie query engine.
    Generates inline step-by-step thinking traces, structured Markdown analytical
    responses, formatted data tables, citations, and governed SQL traces matching
    the Unity Catalog schema `workspace.campus_intelligence_gold`.
    """
    conv_id = conversation_id or "conv_databricks_genie_gold_01"
    p = prompt.lower().strip()

    # Default thinking steps
    thinking_steps = [
        "Inspecting Unity Catalog semantic schema workspace.campus_intelligence_gold",
        f"Parsing query intent: '{prompt}'",
        "Generating governed SQL trace over Gold Dimension & Fact tables",
        "Executing query on Serverless Photon Engine"
    ]

    # Citations
    citations = [
        {"id": "1", "source": "workspace.campus_intelligence_gold.gold_dim_students"},
        {"id": "2", "source": "workspace.campus_intelligence_gold.gold_fact_placement_history"},
        {"id": "3", "source": "workspace.campus_intelligence_gold.v_student_company_eligibility"},
    ]

    # -------------------------------------------------------------------------
    # Query 15 / User Screenshot: Out-of-Range Non-Existent Demographic Band (CGPA > 10.0)
    # -------------------------------------------------------------------------
    if "10.0" in p or "> 10" in p or "cgpa > 10" in p or "non-existent" in p:
        thinking_steps = [
            "Students with CGPA > 10.0",
            "Overall CGPA distribution in student population",
            "Validating grade scale bounds against academic system parameters (0.0 - 10.0)"
        ]
        sql = (
            "SELECT \n"
            "  COUNT(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN 1 END) AS placed_with_skill,\n"
            "  COUNT(CASE WHEN had_ai_data_skill = TRUE THEN 1 END) AS total_with_skill,\n"
            "  COUNT(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN 1 END) AS placed_without_skill,\n"
            "  COUNT(CASE WHEN had_ai_data_skill = FALSE THEN 1 END) AS total_without_skill,\n"
            "  COALESCE(ROUND(AVG(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2), 0.0) AS avg_ctc_with_skill,\n"
            "  COALESCE(ROUND(AVG(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2), 0.0) AS avg_ctc_without_skill\n"
            "FROM workspace.campus_intelligence_gold.gold_fact_placement_history ph\n"
            "JOIN workspace.campus_intelligence_gold.gold_dim_students s ON ph.student_id = s.student_id\n"
            "WHERE s.cgpa > 10.0;"
        )
        answer = (
            "### Cohort Analysis: CGPA > 10.0\n\n"
            "No students exist with **CGPA > 10.0** in the dataset. This CGPA band is impossible because the institution uses a 10.0 scale, where 10.0 is the maximum achievable grade point average. [1]\n\n"
            "### Actual CGPA Distribution\n"
            "The student population (500 students) has the following CGPA characteristics: [2]\n"
            "• **Minimum CGPA:** 5.52\n"
            "• **Maximum CGPA:** 9.85\n"
            "• **Average CGPA:** 7.67\n\n"
            "### Why This Query Returns Zero Results\n"
            "CGPA in this campus placement system is measured on a **0.0 to 10.0 scale**, which is the standard grading system used by most Indian engineering colleges. A CGPA greater than 10.0 is structurally impossible — it would be equivalent to asking for students who scored above 100% in a percentage-based system.\n\n"
            "### Recommendation\n"
            "If you're looking to analyze high-performing students, consider these valid CGPA bands instead:\n"
            "• **Top Tier (Super Dream Threshold):** CGPA ≥ 8.50 (92 candidates)\n"
            "• **First Class with Distinction:** CGPA ≥ 7.75 (248 candidates)\n"
            "• **First Class:** CGPA ≥ 6.75 (412 candidates)"
        )
        return QueryResponse(
            conversation_id=conv_id,
            status="SUCCESS",
            sql_query=sql,
            columns=["placed_with_skill", "total_with_skill", "placed_without_skill", "total_without_skill", "avg_ctc_with_skill", "avg_ctc_without_skill"],
            rows=[[0, 0, 0, 0, 0.0, 0.0]],
            row_count=0,
            execution_time_ms=190,
            filter_student_ids=[],
            answer=answer,
            thinking_steps=thinking_steps,
            citations=citations
        )

    # -------------------------------------------------------------------------
    # Query 6 / Screenshot 1: Branch-Wise Placement Statistics for 2024 Batch
    # -------------------------------------------------------------------------
    if ("branch" in p and ("placement percentage" in p or "average ctc" in p or "statistics" in p or "2024" in p)) or "branch-wise" in p:
        thinking_steps = [
            "Filtering graduating batch: 2024",
            "Grouping by student branch across gold_dim_students and gold_fact_placement_history",
            "Aggregating placed count, total count, placement percentage, and mean offered CTC",
            "Sorting by average placed CTC in descending order"
        ]
        sql = (
            "SELECT \n"
            "  s.branch,\n"
            "  COUNT(s.student_id) AS total_students,\n"
            "  COUNT(CASE WHEN ph.offer_status = 'Placed' THEN 1 END) AS placed_students,\n"
            "  ROUND(COUNT(CASE WHEN ph.offer_status = 'Placed' THEN 1 END) * 100.0 / COUNT(s.student_id), 1) AS placement_pct,\n"
            "  ROUND(AVG(CASE WHEN ph.offer_status = 'Placed' THEN ph.offered_ctc_lpa END), 2) AS avg_placed_ctc_lpa\n"
            "FROM workspace.campus_intelligence_gold.gold_dim_students s\n"
            "LEFT JOIN workspace.campus_intelligence_gold.gold_fact_placement_history ph ON s.student_id = ph.student_id\n"
            "WHERE s.graduating_year = 2024\n"
            "GROUP BY s.branch\n"
            "ORDER BY avg_placed_ctc_lpa DESC;"
        )
        columns = ["branch", "total_students", "placed_students", "placement_pct", "avg_placed_ctc_lpa"]
        rows = [
            ["AI/DS", 80, 72, 90.0, 20.40],
            ["CSE", 180, 158, 87.8, 19.80],
            ["ISE", 120, 102, 85.0, 17.50],
            ["ECE", 120, 84, 70.0, 12.20],
        ]
        answer = (
            "### 2024 Graduating Batch: Branch-Wise Placement & Compensation Analysis\n\n"
            "Governed aggregation across **500 students** for the 2024 batch from `workspace.campus_intelligence_gold.gold_dim_students` [1] and `gold_fact_placement_history` [2]:\n\n"
            "| Branch | Total Students | Placed Students | Placement Rate | Avg Placed CTC | Top Offer |\n"
            "| :--- | :--- | :--- | :--- | :--- | :--- |\n"
            "| **AI/DS** | 80 | 72 | **90.0%** | **20.40 LPA** | 48.0 LPA (Databricks) |\n"
            "| **CSE** | 180 | 158 | **87.8%** | **19.80 LPA** | 44.0 LPA (Microsoft) |\n"
            "| **ISE** | 120 | 102 | **85.0%** | **17.50 LPA** | 32.0 LPA (Adobe) |\n"
            "| **ECE** | 120 | 84 | **70.0%** | **12.20 LPA** | 24.0 LPA (Qualcomm) |\n\n"
            "### Key Observations\n"
            "• **Highest Average Package:** AI/DS branch leads with **20.40 LPA**, driven by strong recruiter competition for GenAI/LLM and Lakehouse competencies.\n"
            "• **Highest Offer Volume:** CSE generated **158 offers** (43.6% of campus total).\n"
            "• **Lakehouse Skill Premium:** Candidates possessing `DATABRICKS_DE` achieved a **+5.63 LPA premium** over the general batch average.\n\n"
            "### TPO Strategic Recommendations\n"
            "1. **ECE Skill Gap Intervention:** ECE placement rate (70.0%) lags computing branches; providing Python/SQL cross-skilling bridges is projected to lift ECE placement by **+8.4%**.\n"
            "2. **Super Dream Drive Prioritization:** 82% of eligible Super Dream candidates are concentrated in CSE/ISE/AI/DS."
        )
        return QueryResponse(
            conversation_id=conv_id,
            status="SUCCESS",
            sql_query=sql,
            columns=columns,
            rows=rows,
            row_count=len(rows),
            execution_time_ms=215,
            filter_student_ids=[],
            answer=answer,
            thinking_steps=thinking_steps,
            citations=citations
        )

    # -------------------------------------------------------------------------
    # Query 1 / TPO Shortlist: Databricks eligible with CGPA >= 8.0
    # -------------------------------------------------------------------------
    if "databricks" in p and ("eligible" in p or "cgpa" in p or "8.0" in p or "shortlist" in p):
        thinking_steps = [
            "Filtering company criteria: company_name = 'Databricks'",
            "Joining gold_dim_students with gold_fact_student_skills on student_id",
            "Verifying mandatory skills: ['Databricks DE', 'PySpark', 'SQL']",
            "Applying criteria: CGPA >= 8.0, 0 Backlogs, Branch IN ('CSE', 'ISE', 'AI/DS')",
            "Querying trusted view workspace.campus_intelligence_gold.v_student_company_eligibility"
        ]
        sql = (
            "SELECT \n"
            "  student_id, full_name, branch, cgpa, company_name, ctc_lpa, is_fully_eligible, blocker_reason\n"
            "FROM workspace.campus_intelligence_gold.v_student_company_eligibility\n"
            "WHERE company_name = 'Databricks'\n"
            "  AND branch IN ('ISE', 'CSE', 'AI/DS')\n"
            "  AND cgpa >= 8.0\n"
            "  AND is_fully_eligible = TRUE\n"
            "ORDER BY cgpa DESC, student_id ASC;"
        )
        columns = ["student_id", "full_name", "branch", "cgpa", "company_name", "ctc_lpa", "is_fully_eligible", "blocker_reason"]
        matched_students = [s for s in STUDENTS_DB if s["cgpa"] >= 8.0 and any("DATABRICKS" in sk.upper() for sk in s["skills"])]
        if not matched_students:
            matched_students = [s for s in STUDENTS_DB if s["cgpa"] >= 8.5][:8]
        
        rows = [
            [s["student_id"], s["full_name"], s["branch"], s["cgpa"], "Databricks", 48.0, True, "ELIGIBLE"]
            for s in matched_students[:8]
        ]
        filter_ids = [s["student_id"] for s in matched_students]

        answer = (
            f"### Databricks (48.0 LPA Super Dream) Candidate Shortlist\n\n"
            f"Identified **{len(matched_students)} fully eligible candidates** meeting all criteria (CGPA ≥ 8.0, 0 Backlogs, verified `Databricks DE` + `PySpark` + `SQL` competencies) from `workspace.campus_intelligence_gold.v_student_company_eligibility` [3]:\n\n"
            "| USN | Candidate Name | Branch | CGPA | Verified Lakehouse Stack | Status |\n"
            "| :--- | :--- | :--- | :--- | :--- | :--- |\n"
            + "\n".join([f"| `{s['student_id']}` | **{s['full_name']}** | {s['branch']} | `{s['cgpa']}` | {', '.join(s['skills'][:4])} | `ELIGIBLE` |" for s in matched_students[:6]])
            + f"\n\n**Candidate Grid Synchronized:** The main candidate spreadsheet has been filtered to highlight all {len(matched_students)} matching students."
        )
        return QueryResponse(
            conversation_id=conv_id,
            status="SUCCESS",
            sql_query=sql,
            columns=columns,
            rows=rows,
            row_count=len(rows),
            execution_time_ms=180,
            filter_student_ids=filter_ids,
            answer=answer,
            thinking_steps=thinking_steps,
            citations=citations
        )

    # -------------------------------------------------------------------------
    # Query 7: Top Hiring Partners by Offer Volume Over Last 3 Years
    # -------------------------------------------------------------------------
    if "top 5 companies" in p or "hiring partners" in p or "offer volume" in p or "top hiring" in p:
        thinking_steps = [
            "Querying workspace.campus_intelligence_gold.gold_fact_placement_history",
            "Filtering offer_status = 'Placed'",
            "Aggregating offer count, average CTC, and maximum package by company_name",
            "Ordering by total_offers_extended DESC, LIMIT 5"
        ]
        sql = (
            "SELECT \n"
            "  company_name,\n"
            "  COUNT(placement_id) AS total_offers_extended,\n"
            "  ROUND(AVG(offered_ctc_lpa), 2) AS avg_offered_ctc_lpa,\n"
            "  MAX(offered_ctc_lpa) AS max_offered_ctc_lpa\n"
            "FROM workspace.campus_intelligence_gold.gold_fact_placement_history\n"
            "WHERE offer_status = 'Placed'\n"
            "GROUP BY company_name\n"
            "ORDER BY total_offers_extended DESC, avg_offered_ctc_lpa DESC\n"
            "LIMIT 5;"
        )
        columns = ["company_name", "total_offers_extended", "avg_offered_ctc_lpa", "max_offered_ctc_lpa"]
        rows = [
            ["Infosys", 68, 6.80, 9.50],
            ["TCS Digital", 54, 7.50, 11.00],
            ["Accenture", 48, 8.20, 12.00],
            ["Amazon", 32, 28.50, 32.00],
            ["Databricks", 18, 48.00, 48.00],
        ]
        answer = (
            "### Top 5 Campus Hiring Partners by Offer Volume (3-Year History)\n\n"
            "Analysis of historical placement records in `workspace.campus_intelligence_gold.gold_fact_placement_history` [2]:\n\n"
            "| Company Name | Tier | Total Offers Extended | Avg Offered CTC | Maximum CTC |\n"
            "| :--- | :--- | :--- | :--- | :--- |\n"
            "| **Infosys** | Core Tech / DSE | **68** | 6.80 LPA | 9.50 LPA |\n"
            "| **TCS Digital** | Dream | **54** | 7.50 LPA | 11.00 LPA |\n"
            "| **Accenture** | Dream | **48** | 8.20 LPA | 12.00 LPA |\n"
            "| **Amazon** | Super Dream | **32** | 28.50 LPA | 32.00 LPA |\n"
            "| **Databricks** | Super Dream | **18** | 48.00 LPA | 48.00 LPA |\n\n"
            "### Key Insight\n"
            "While volume recruitment is anchored by Core Tech partners, **Databricks and Amazon** provide the highest institutional CTC impact, accounting for 38% of total compensation value."
        )
        return QueryResponse(
            conversation_id=conv_id,
            status="SUCCESS",
            sql_query=sql,
            columns=columns,
            rows=rows,
            row_count=len(rows),
            execution_time_ms=195,
            filter_student_ids=[],
            answer=answer,
            thinking_steps=thinking_steps,
            citations=citations
        )

    # -------------------------------------------------------------------------
    # Query 8: High-Demand Skillset in Super Dream Drives
    # -------------------------------------------------------------------------
    if "high-demand" in p or "highest demand" in p or "super dream" in p and "skill" in p:
        thinking_steps = [
            "Querying gold_dim_company_criteria for tier = 'Super Dream'",
            "Exploding mandatory skills array",
            "Counting company hiring demand frequency per skill",
            "Sorting by demand count descending, LIMIT 3"
        ]
        sql = (
            "WITH exploded_skills AS (\n"
            "  SELECT TRIM(skill) AS skill_name\n"
            "  FROM workspace.campus_intelligence_gold.gold_dim_company_criteria\n"
            "  LATERAL VIEW EXPLODE(COALESCE(mandatory_skills, ARRAY())) t AS skill\n"
            "  WHERE tier = 'Super Dream' AND TRIM(skill) != ''\n"
            ")\n"
            "SELECT skill_name, COUNT(*) AS company_demand_count\n"
            "FROM exploded_skills\n"
            "GROUP BY skill_name\n"
            "ORDER BY company_demand_count DESC\n"
            "LIMIT 3;"
        )
        columns = ["skill_name", "company_demand_count"]
        rows = [
            ["Databricks DE", 8],
            ["PySpark", 7],
            ["SQL", 7],
        ]
        answer = (
            "### Top 3 In-Demand Skills Across Super Dream Drives (CTC ≥ 20 LPA)\n\n"
            "Governed analysis across all Super Dream criteria in `gold_dim_company_criteria`:\n\n"
            "1. **`DATABRICKS_DE`** — Required by **8 Super Dream companies** (Databricks, Adobe, Snowflake Partner Network, Walmart Labs).\n"
            "2. **`PYSPARK`** — Required by **7 Super Dream companies** (adds +12.0% placement probability multiplier when paired with SQL).\n"
            "3. **`SQL`** — Baseline mandatory requirement across **7 Super Dream companies**.\n\n"
            "### Curriculum Synergy Multiplier\n"
            "Students possessing the **Lakehouse Triad (`Databricks DE` + `PySpark` + `SQL`)** have an **80.0% placement probability** and an expected package of **18.50 LPA**."
        )
        return QueryResponse(
            conversation_id=conv_id,
            status="SUCCESS",
            sql_query=sql,
            columns=columns,
            rows=rows,
            row_count=len(rows),
            execution_time_ms=175,
            filter_student_ids=[],
            answer=answer,
            thinking_steps=thinking_steps,
            citations=citations
        )

    # -------------------------------------------------------------------------
    # Query 9: High-Potential Unplaced Candidates in AI/DS Branch
    # -------------------------------------------------------------------------
    if "unplaced" in p or ("ai/ds" in p and "missing" in p):
        thinking_steps = [
            "Filtering gold_dim_students for branch = 'AI/DS' and cgpa > 7.5",
            "Joining gold_fact_placement_history where offer_status != 'Placed' OR NULL",
            "Collecting student acquired skills from gold_fact_student_skills",
            "Ordering by CGPA descending"
        ]
        sql = (
            "SELECT \n"
            "  s.student_id, s.full_name, s.cgpa, s.active_backlogs,\n"
            "  ARRAY_JOIN(COLLECT_SET(sk.skill_name), ', ') AS acquired_skills\n"
            "FROM workspace.campus_intelligence_gold.gold_dim_students s\n"
            "LEFT JOIN workspace.campus_intelligence_gold.gold_fact_placement_history ph ON s.student_id = ph.student_id\n"
            "LEFT JOIN workspace.campus_intelligence_gold.gold_fact_student_skills sk ON s.student_id = sk.student_id\n"
            "WHERE s.branch = 'AI/DS'\n"
            "  AND s.cgpa > 7.5\n"
            "  AND (ph.offer_status IS NULL OR ph.offer_status != 'Placed')\n"
            "GROUP BY s.student_id, s.full_name, s.cgpa, s.active_backlogs\n"
            "ORDER BY s.cgpa DESC;"
        )
        columns = ["student_id", "full_name", "cgpa", "active_backlogs", "acquired_skills"]
        aids_unplaced = [s for s in STUDENTS_DB if s["branch"] == "AI/DS" and s["cgpa"] >= 7.5]
        rows = [
            [s["student_id"], s["full_name"], s["cgpa"], s["active_backlogs"], ", ".join(s["skills"])]
            for s in aids_unplaced[:6]
        ]
        filter_ids = [s["student_id"] for s in aids_unplaced]

        answer = (
            f"### High-Potential Unplaced Candidates in AI/DS (CGPA > 7.5)\n\n"
            f"Identified **{len(aids_unplaced)} high-potential AI/DS students** eligible for immediate intervention from `gold_dim_students` [1]:\n\n"
            + "\n".join([f"• **{s['full_name']}** (`{s['student_id']}`): CGPA `{s['cgpa']}`, Backlogs: `{s['active_backlogs']}` | Skills: `{', '.join(s['skills'][:4])}`" for s in aids_unplaced[:5]])
            + "\n\n### Primary Placement Blocker\n"
            "75% of these unplaced students have strong Python/ML foundations but lack **production Lakehouse skills (`Databricks DE` or `PySpark`)**, which is the primary filter in current Super Dream drives."
        )
        return QueryResponse(
            conversation_id=conv_id,
            status="SUCCESS",
            sql_query=sql,
            columns=columns,
            rows=rows,
            row_count=len(rows),
            execution_time_ms=190,
            filter_student_ids=filter_ids,
            answer=answer,
            thinking_steps=thinking_steps,
            citations=citations
        )

    # -------------------------------------------------------------------------
    # Query 3 / Student Blocker Diagnostic: Why blocked / Google / USN_2025_042
    # -------------------------------------------------------------------------
    if "google" in p or "why am i blocked" in p or "usn_2025_042" in p or "blocker" in p:
        thinking_steps = [
            "Resolving student session identity: USN_2025_042 (Priya Nair)",
            "Querying trusted view workspace.campus_intelligence_gold.v_student_company_eligibility",
            "Evaluating blocker criteria: CGPA, Backlogs, Branch, Mandatory Skills",
            "Sorting by company CTC descending"
        ]
        sql = (
            "SELECT \n"
            "  company_name, tier, ctc_lpa, is_fully_eligible, blocker_reason,\n"
            "  missing_mandatory_skills, missing_preferred_skills\n"
            "FROM workspace.campus_intelligence_gold.v_student_company_eligibility\n"
            "WHERE student_id = 'USN_2025_042'\n"
            "  AND tier IN ('Super Dream', 'Dream')\n"
            "ORDER BY ctc_lpa DESC, company_name ASC;"
        )
        columns = ["company_name", "tier", "ctc_lpa", "is_fully_eligible", "blocker_reason", "missing_mandatory_skills"]
        rows = [
            ["Databricks", "Super Dream", 48.0, False, "MISSING_MANDATORY_SKILLS", "Databricks DE, PySpark"],
            ["Google", "Super Dream", 45.0, False, "CGPA_BELOW_CUTOFF", "Data Structures, System Design"],
            ["Microsoft", "Super Dream", 44.0, False, "CGPA_BELOW_CUTOFF", "System Design"],
            ["Adobe", "Super Dream", 32.0, False, "MISSING_MANDATORY_SKILLS", "Databricks DE"],
        ]
        answer = (
            "### Personal Placement Diagnostic for Priya Nair (USN_2025_042)\n\n"
            "Diagnostic analysis for your profile (Branch: **ISE**, CGPA: **8.12**, Backlogs: **0**) from `v_student_company_eligibility` [3]:\n\n"
            "| Company | Tier | Package | Eligibility | Primary Blocker | Missing Requirements |\n"
            "| :--- | :--- | :--- | :--- | :--- | :--- |\n"
            "| **Databricks** | Super Dream | **48.0 LPA** | Blocked | `MISSING_MANDATORY_SKILLS` | `Databricks DE`, `PySpark` |\n"
            "| **Google** | Super Dream | **45.0 LPA** | Blocked | `CGPA_BELOW_CUTOFF` | Required CGPA: 8.50 (Your CGPA: 8.12) |\n"
            "| **Adobe** | Super Dream | **32.0 LPA** | Blocked | `MISSING_MANDATORY_SKILLS` | `Databricks DE` |\n\n"
            "### Actionable Recommendation\n"
            "• **Google** has a hard 8.50 CGPA cutoff. However, **Databricks (48.0 LPA)** has an 8.00 CGPA cutoff where you are academically eligible.\n"
            "• **Fastest Unlock Path:** Adding **`DATABRICKS_DE` + `PYSPARK`** unlocks Databricks & Adobe immediately with a **+10.30 LPA CTC lift**."
        )
        return QueryResponse(
            conversation_id=conv_id,
            status="SUCCESS",
            sql_query=sql,
            columns=columns,
            rows=rows,
            row_count=len(rows),
            execution_time_ms=160,
            filter_student_ids=[],
            answer=answer,
            thinking_steps=thinking_steps,
            citations=citations
        )

    # -------------------------------------------------------------------------
    # Student ROI & Readiness Score Breakdowns
    # -------------------------------------------------------------------------
    if "readiness" in p or "score breakdown" in p:
        thinking_steps = [
            "Executing trusted SQL function fn_readiness_score",
            "Evaluating weighted factors: Academic (40 pts), Core Data Stack (40 pts), Backlogs (20 pts)",
            "Computing next milestone trajectory"
        ]
        sql = "SELECT * FROM workspace.campus_intelligence_gold.fn_readiness_score('USN_2025_042');"
        answer = (
            "### Placement Readiness Score Breakdown (74.5%)\n\n"
            "Governed evaluation of your profile from `fn_readiness_score` in Unity Catalog:\n\n"
            "• **Academic Standing (CGPA 8.12, 0 Backlogs):** 38.5 / 40.0 pts (Excellent)\n"
            "• **Core Data Stack (Python, SQL, Power BI):** 24.0 / 30.0 pts\n"
            "• **Advanced Lakehouse / Systems Gap:** 12.0 / 30.0 pts\n\n"
            "### Next Milestone\n"
            "Adding **`DATABRICKS_DE`** elevates your overall readiness score to **86.8%** (+12.3 pts) and qualifies you for Super Dream placement drives."
        )
        return QueryResponse(
            conversation_id=conv_id,
            status="SUCCESS",
            sql_query=sql,
            columns=["factor", "score", "max_points"],
            rows=[["Academic Index", 38.5, 40.0], ["Core Skills", 24.0, 30.0], ["Advanced Gap", 12.0, 30.0]],
            row_count=3,
            execution_time_ms=145,
            filter_student_ids=[],
            answer=answer,
            thinking_steps=thinking_steps,
            citations=citations
        )

    # -------------------------------------------------------------------------
    # Default Intelligent Response for any freeform queries
    # -------------------------------------------------------------------------
    thinking_steps = [
        "Analyzing natural language criteria in prompt",
        "Executing governed search across gold_dim_students & gold_dim_company_criteria",
        "Returning matching candidate cohort and analytical insights"
    ]
    sql = (
        "SELECT student_id, full_name, branch, cgpa, array_join(skills, ', ') AS verified_skills\n"
        "FROM workspace.campus_intelligence_gold.gold_dim_students\n"
        "WHERE active_backlogs = 0 AND cgpa >= 7.5\n"
        "ORDER BY cgpa DESC\n"
        "LIMIT 10;"
    )
    filtered = [s for s in STUDENTS_DB if s["cgpa"] >= 7.5][:8]
    columns = ["student_id", "full_name", "branch", "cgpa", "skills"]
    rows = [[s["student_id"], s["full_name"], s["branch"], s["cgpa"], ", ".join(s["skills"])] for s in filtered]
    filter_ids = [s["student_id"] for s in filtered]

    answer = (
        f"### Query Analysis: \"{prompt}\"\n\n"
        f"Retrieved **{len(filtered)} candidate records** matching your criteria from `workspace.campus_intelligence_gold.gold_dim_students` [1]:\n\n"
        + "\n".join([f"• **{s['full_name']}** (`{s['student_id']}`): {s['branch']} | CGPA `{s['cgpa']}` | Skills: `{', '.join(s['skills'][:3])}`" for s in filtered[:5]])
        + f"\n\n**Grid Synchronized:** Candidate spreadsheet synchronized with matching cohort."
    )

    return QueryResponse(
        conversation_id=conv_id,
        status="SUCCESS",
        sql_query=sql,
        columns=columns,
        rows=rows,
        row_count=len(rows),
        execution_time_ms=210,
        filter_student_ids=filter_ids,
        error_message=None,
        answer=answer,
        thinking_steps=thinking_steps,
        citations=citations
    )

