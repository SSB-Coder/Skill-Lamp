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
    Computes eligible company counts and top unlocked companies for the 50 students.
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
        if eligible_companies:
            sorted_companies = sorted(eligible_companies, key=lambda x: x["ctc_lpa"], reverse=True)
            top_company = f"{sorted_companies[0]['company_name']} ({sorted_companies[0]['ctc_lpa']} LPA)"

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

def mock_genie_query(prompt: str, conversation_id: Optional[str] = None) -> QueryResponse:
    """
    Deterministic response generator for TPO natural language queries.
    """
    conv_id = conversation_id or "conv_databricks_genie_demo_01"
    p_lower = prompt.lower()

    if "databricks" in p_lower:
        columns = ["student_id", "full_name", "branch", "cgpa", "skills", "status"]
        rows = [
            ["USN_2024_002", "Ananya Rao", "ISE", 9.1, "Python, Databricks DE, PySpark, SQL, AWS", "Eligible"],
            ["USN_2024_010", "Divya Deshmukh", "CSE", 9.0, "Databricks DE, PySpark, SQL, Python, Data Structures", "Eligible"],
            ["USN_2024_017", "Siddharth Das", "AI/DS", 9.2, "Databricks DE, PySpark, Python, SQL, GenAI/LLM", "Eligible"],
            ["USN_2024_023", "Gaurav Soni", "CSE", 9.5, "Databricks DE, PySpark, Java, System Design, AWS", "Eligible"],
            ["USN_2024_028", "Shreya Pillai", "ISE", 9.3, "Databricks DE, PySpark, SQL, AWS, FastAPI", "Eligible"],
            ["USN_2024_038", "Gayatri Nair", "AI/DS", 9.6, "Databricks DE, PySpark, Python, SQL, GenAI/LLM, AWS", "Eligible"],
            ["USN_2024_045", "Karan Malhotra", "ISE", 9.0, "Databricks DE, PySpark, SQL, Data Structures", "Eligible"],
            ["USN_2024_050", "Tanmay Bakshi", "AI/DS", 9.3, "Databricks DE, PySpark, Machine Learning, GenAI/LLM, SQL", "Eligible"],
        ]
        sql = (
            "SELECT s.student_id, s.full_name, s.branch, s.cgpa, array_join(s.skills, ', ') AS skills, 'Eligible' AS status\n"
            "FROM skill_lamp.gold.dim_student s\n"
            "WHERE s.cgpa >= 8.0\n"
            "  AND array_contains(s.skills, 'Databricks DE')\n"
            "  AND array_contains(s.skills, 'PySpark')\n"
            "ORDER BY s.cgpa DESC;"
        )
        filter_ids = [r[0] for r in rows]
    elif "branch" in p_lower or "count" in p_lower:
        columns = ["branch", "total_candidates", "placed_count", "avg_ctc_lpa"]
        rows = [
            ["CSE", 24, 21, 19.8],
            ["ISE", 14, 12, 17.5],
            ["AI/DS", 12, 11, 20.4],
            ["ECE", 10, 7, 12.2],
        ]
        sql = (
            "SELECT branch, COUNT(*) AS total_candidates, "
            "SUM(CASE WHEN is_placed THEN 1 ELSE 0 END) AS placed_count, "
            "ROUND(AVG(offered_ctc), 2) AS avg_ctc_lpa\n"
            "FROM skill_lamp.gold.fact_placement_history\n"
            "GROUP BY branch\n"
            "ORDER BY avg_ctc_lpa DESC;"
        )
        filter_ids = []
    else:
        columns = ["student_id", "full_name", "branch", "cgpa", "skills"]
        filtered = [s for s in STUDENTS_DB if s["cgpa"] >= 8.0]
        rows = [
            [s["student_id"], s["full_name"], s["branch"], s["cgpa"], ", ".join(s["skills"])]
            for s in filtered[:10]
        ]
        sql = (
            "SELECT student_id, full_name, branch, cgpa, array_join(skills, ', ') AS skills\n"
            "FROM skill_lamp.gold.dim_student\n"
            "WHERE cgpa >= 8.0\n"
            "ORDER BY cgpa DESC\n"
            "LIMIT 10;"
        )
        filter_ids = [r[0] for r in rows]

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
    )
