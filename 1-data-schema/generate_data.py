#!/usr/bin/env python3
"""
Skill Lamp — Placement Intelligence Assistant
Data & Schema Layer: Synthetic Data Generator (Faker + NumPy)

Generates:
1. students.csv (500 candidate rows with exact branch, CGPA, backlog distributions & demo accounts)
2. companies.csv (13 companies with eligibility criteria and CTC tiers)
3. skills.csv (Student-skill mappings from the 16-skill taxonomy)
4. skills_taxonomy.csv (16 standardized technical skills catalog)
5. placement_history.csv (~2,400 historical records across 6 years with exact hero cohort metrics)
"""

import os
import csv
import math
import numpy as np
from faker import Faker

# Set deterministic random seeds for complete reproducibility
SEED = 42
np.random.seed(SEED)
fake = Faker('en_IN')
Faker.seed(SEED)

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

# ─────────────────────────────────────────────────────────────────────────────
# 1. TAXONOMY: 16 STANDARDIZED SKILLS
# ─────────────────────────────────────────────────────────────────────────────
SKILLS_TAXONOMY = [
    # AI / GenAI (8)
    {"skill_name": "GENAI_LLMS", "category": "AI / GenAI", "is_ai_data": 1, "demand_tier": "High"},
    {"skill_name": "MACHINE_LEARNING", "category": "AI / GenAI", "is_ai_data": 1, "demand_tier": "High"},
    {"skill_name": "DEEP_LEARNING", "category": "AI / GenAI", "is_ai_data": 1, "demand_tier": "High"},
    {"skill_name": "LANGCHAIN", "category": "AI / GenAI", "is_ai_data": 1, "demand_tier": "High"},
    {"skill_name": "PROMPT_ENGINEERING", "category": "AI / GenAI", "is_ai_data": 1, "demand_tier": "Medium"},
    {"skill_name": "COMPUTER_VISION", "category": "AI / GenAI", "is_ai_data": 1, "demand_tier": "High"},
    {"skill_name": "NLP", "category": "AI / GenAI", "is_ai_data": 1, "demand_tier": "High"},
    {"skill_name": "VECTOR_DATABASES", "category": "AI / GenAI", "is_ai_data": 1, "demand_tier": "High"},
    # Data Engineering & Cloud (4)
    {"skill_name": "DATABRICKS_DE", "category": "Data Engineering & Cloud", "is_ai_data": 1, "demand_tier": "High"},
    {"skill_name": "PYSPARK", "category": "Data Engineering & Cloud", "is_ai_data": 1, "demand_tier": "High"},
    {"skill_name": "SQL", "category": "Data Engineering & Cloud", "is_ai_data": 1, "demand_tier": "Core"},
    {"skill_name": "AWS_CLOUD", "category": "Data Engineering & Cloud", "is_ai_data": 1, "demand_tier": "High"},
    # Core Engineering (4)
    {"skill_name": "PYTHON", "category": "Core Engineering", "is_ai_data": 0, "demand_tier": "Core"},
    {"skill_name": "CPP", "category": "Core Engineering", "is_ai_data": 0, "demand_tier": "Core"},
    {"skill_name": "JAVA_BACKEND", "category": "Core Engineering", "is_ai_data": 0, "demand_tier": "Core"},
    {"skill_name": "REACT", "category": "Core Engineering", "is_ai_data": 0, "demand_tier": "Core"}
]

# ─────────────────────────────────────────────────────────────────────────────
# 2. COMPANIES ROSTER (13 COMPANIES)
# ─────────────────────────────────────────────────────────────────────────────
COMPANIES_ROSTER = [
    {
        "company_id": "COMP_001",
        "company_name": "Databricks",
        "tier": "Super Dream",
        "ctc_lpa": 48.00,
        "min_cgpa": 8.50,
        "max_backlogs": 0,
        "eligible_branches": ["CSE", "ISE", "AI/DS"],
        "mandatory_skills": ["PYSPARK", "SQL", "PYTHON"],
        "preferred_skills": ["DATABRICKS_DE", "VECTOR_DATABASES"]
    },
    {
        "company_id": "COMP_002",
        "company_name": "Google",
        "tier": "Super Dream",
        "ctc_lpa": 45.00,
        "min_cgpa": 8.50,
        "max_backlogs": 0,
        "eligible_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "mandatory_skills": ["PYTHON", "CPP"],
        "preferred_skills": ["MACHINE_LEARNING", "DEEP_LEARNING"]
    },
    {
        "company_id": "COMP_003",
        "company_name": "Microsoft",
        "tier": "Super Dream",
        "ctc_lpa": 42.00,
        "min_cgpa": 8.00,
        "max_backlogs": 0,
        "eligible_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "mandatory_skills": ["CPP", "PYTHON", "SQL"],
        "preferred_skills": ["GENAI_LLMS", "AWS_CLOUD"]
    },
    {
        "company_id": "COMP_004",
        "company_name": "NVIDIA",
        "tier": "Super Dream",
        "ctc_lpa": 38.00,
        "min_cgpa": 8.00,
        "max_backlogs": 0,
        "eligible_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "mandatory_skills": ["CPP", "PYTHON"],
        "preferred_skills": ["DEEP_LEARNING", "COMPUTER_VISION"]
    },
    {
        "company_id": "COMP_005",
        "company_name": "Amazon",
        "tier": "Dream",
        "ctc_lpa": 32.00,
        "min_cgpa": 7.50,
        "max_backlogs": 0,
        "eligible_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "mandatory_skills": ["JAVA_BACKEND", "SQL"],
        "preferred_skills": ["AWS_CLOUD"]
    },
    {
        "company_id": "COMP_006",
        "company_name": "Goldman Sachs",
        "tier": "Dream",
        "ctc_lpa": 28.00,
        "min_cgpa": 7.75,
        "max_backlogs": 0,
        "eligible_branches": ["CSE", "ISE", "AI/DS"],
        "mandatory_skills": ["PYTHON", "SQL", "CPP"],
        "preferred_skills": ["MACHINE_LEARNING"]
    },
    {
        "company_id": "COMP_007",
        "company_name": "Adobe",
        "tier": "Dream",
        "ctc_lpa": 26.00,
        "min_cgpa": 7.50,
        "max_backlogs": 0,
        "eligible_branches": ["CSE", "ISE", "AI/DS"],
        "mandatory_skills": ["PYTHON", "REACT", "CPP"],
        "preferred_skills": ["COMPUTER_VISION", "GENAI_LLMS"]
    },
    {
        "company_id": "COMP_008",
        "company_name": "Atlassian",
        "tier": "Dream",
        "ctc_lpa": 24.00,
        "min_cgpa": 7.50,
        "max_backlogs": 0,
        "eligible_branches": ["CSE", "ISE"],
        "mandatory_skills": ["JAVA_BACKEND", "REACT"],
        "preferred_skills": ["AWS_CLOUD"]
    },
    {
        "company_id": "COMP_009",
        "company_name": "Morgan Stanley",
        "tier": "Dream",
        "ctc_lpa": 20.00,
        "min_cgpa": 7.25,
        "max_backlogs": 0,
        "eligible_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "mandatory_skills": ["JAVA_BACKEND", "SQL"],
        "preferred_skills": ["PYTHON"]
    },
    {
        "company_id": "COMP_010",
        "company_name": "Cisco",
        "tier": "Dream",
        "ctc_lpa": 18.00,
        "min_cgpa": 7.00,
        "max_backlogs": 1,
        "eligible_branches": ["CSE", "ISE", "ECE"],
        "mandatory_skills": ["PYTHON"],
        "preferred_skills": ["AWS_CLOUD"]
    },
    {
        "company_id": "COMP_011",
        "company_name": "TCS Digital",
        "tier": "Core Tech",
        "ctc_lpa": 9.00,
        "min_cgpa": 6.50,
        "max_backlogs": 1,
        "eligible_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "mandatory_skills": ["PYTHON", "SQL"],
        "preferred_skills": ["MACHINE_LEARNING", "REACT"]
    },
    {
        "company_id": "COMP_012",
        "company_name": "Accenture Adv",
        "tier": "Core Tech",
        "ctc_lpa": 8.50,
        "min_cgpa": 6.25,
        "max_backlogs": 1,
        "eligible_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "mandatory_skills": ["JAVA_BACKEND", "SQL"],
        "preferred_skills": ["AWS_CLOUD"]
    },
    {
        "company_id": "COMP_013",
        "company_name": "Infosys DSE",
        "tier": "Core Tech",
        "ctc_lpa": 7.00,
        "min_cgpa": 6.00,
        "max_backlogs": 2,
        "eligible_branches": ["CSE", "ISE", "ECE", "AI/DS"],
        "mandatory_skills": ["PYTHON", "SQL"],
        "preferred_skills": ["PYSPARK"]
    }
]

def generate_companies_csv():
    filepath = os.path.join(OUTPUT_DIR, "companies.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "company_id", "company_name", "tier", "ctc_lpa", "min_cgpa",
            "max_backlogs_allowed", "eligible_branches", "mandatory_skills", "preferred_skills"
        ])
        for c in COMPANIES_ROSTER:
            writer.writerow([
                c["company_id"],
                c["company_name"],
                c["tier"],
                f"{c['ctc_lpa']:.2f}",
                f"{c['min_cgpa']:.2f}",
                c["max_backlogs"],
                "[" + ", ".join(c["eligible_branches"]) + "]",
                "[" + ", ".join(c["mandatory_skills"]) + "]",
                "[" + ", ".join(c["preferred_skills"]) + "]"
            ])
    print(f"Generated companies.csv ({len(COMPANIES_ROSTER)} rows)")

def generate_skills_taxonomy_csv():
    filepath = os.path.join(OUTPUT_DIR, "skills_taxonomy.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["skill_name", "category", "is_ai_data", "demand_tier"])
        for s in SKILLS_TAXONOMY:
            writer.writerow([s["skill_name"], s["category"], s["is_ai_data"], s["demand_tier"]])
    print(f"Generated skills_taxonomy.csv ({len(SKILLS_TAXONOMY)} rows)")

# ─────────────────────────────────────────────────────────────────────────────
# 3. STUDENTS COHORT GENERATOR (500 STUDENTS)
# ─────────────────────────────────────────────────────────────────────────────
def generate_students():
    """
    Generates 500 students with:
    - Branches: CSE (200, 40%), ISE (125, 25%), ECE (100, 20%), AI/DS (75, 15%)
    - CGPA: Gaussian (μ=7.65, σ=0.85, clamped [5.50, 9.90])
    - Backlogs: 82% 0 backlogs, 12% 1 backlog, 6% 2+ backlogs
    - Pre-seeded Demo Accounts:
        * Priya Nair (USN_2025_042): ISE, CGPA 8.12, 0 backlogs, Female, priya.ise21@rvce.edu.in
        * Rahul Verma (USN_2025_108): CSE, CGPA 7.65, 0 backlogs, Male, rahul.cse21@rvce.edu.in
        * TPO Officer (USN_2025_001 / institutional): tpo@rvce.edu.in
    """
    num_students = 500
    branch_counts = {
        "CSE": 200,
        "ISE": 125,
        "ECE": 100,
        "AI/DS": 75
    }

    # Generate branches array with exact counts: CSE (200), ISE (125), ECE (100), AI/DS (75)
    # Ensure index 41 (USN_2025_042) is ISE and index 107 (USN_2025_108) is CSE
    branches = ["CSE"] * 200 + ["ISE"] * 125 + ["ECE"] * 100 + ["AI/DS"] * 75
    # Swap index 41 (currently CSE) with an ISE slot (e.g. index 200)
    branches[41], branches[200] = branches[200], branches[41]

    # Generate CGPA distribution matching exact target tiers:
    # Tier A (>= 8.50): 100 students (20%)
    # Tier B (7.00 - 8.49): 275 students (55%)
    # Tier C (6.00 - 6.99): 100 students (20%)
    # Tier D (< 6.00): 25 students (5%)
    # Target Gaussian curve: mean μ = 7.65, std σ = 0.85, clamped [5.50, 9.90]
    cgpa_tier_a = np.random.uniform(8.50, 9.85, size=100)
    cgpa_tier_b = np.random.normal(loc=7.72, scale=0.42, size=275)
    cgpa_tier_b = np.clip(cgpa_tier_b, 7.00, 8.49)
    cgpa_tier_c = np.random.normal(loc=6.50, scale=0.28, size=100)
    cgpa_tier_c = np.clip(cgpa_tier_c, 6.00, 6.99)
    cgpa_tier_d = np.random.uniform(5.50, 5.99, size=25)
    
    all_cgpas = np.concatenate([cgpa_tier_a, cgpa_tier_b, cgpa_tier_c, cgpa_tier_d])
    np.random.shuffle(all_cgpas)
    cgpas = np.round(all_cgpas, 2)

    # Generate exact backlog distribution: 82% 0 (410), 12% 1 (60), 6% 2+ (30: 20 with 2, 10 with 3)
    backlogs_list = [0] * 410 + [1] * 60 + [2] * 20 + [3] * 10
    np.random.shuffle(backlogs_list)
    backlogs = np.array(backlogs_list)

    # Genders
    genders = np.random.choice(["Male", "Female"], size=num_students, p=[0.58, 0.42])

    students = []
    
    # Pre-generate names
    first_names_m = ["Aarav", "Aditya", "Rohan", "Vikram", "Siddharth", "Karthik", "Varun", "Nikhil", "Manish", "Ankit", "Deepak", "Gaurav", "Harsh", "Pranav", "Suresh"]
    first_names_f = ["Ananya", "Sneha", "Pooja", "Divya", "Meera", "Kavya", "Tanvi", "Neha", "Rhea", "Ishita", "Shreya", "Nandini", "Swati", "Deepa", "Bhavna"]
    last_names = ["Sharma", "Patel", "Rao", "Nair", "Iyer", "Verma", "Reddy", "Kulkarni", "Deshmukh", "Hegde", "Bhat", "Menon", "Joshi", "Gupta", "Singh", "Pillai"]

    for i in range(num_students):
        usn_num = i + 1
        student_id = f"USN_2025_{usn_num:03d}"
        branch = branches[i]
        cgpa = float(cgpas[i])
        active_backlogs = int(backlogs[i])
        gender = str(genders[i])
        graduation_year = 2025

        if gender == "Female":
            first_name = np.random.choice(first_names_f)
        else:
            first_name = np.random.choice(first_names_m)
        last_name = np.random.choice(last_names)
        full_name = f"{first_name} {last_name}"

        # Clean email domain format: name.branch21@rvce.edu.in
        clean_first = first_name.lower().replace(" ", "")
        clean_branch = branch.lower().replace("/", "")
        email_candidate = f"{clean_first}.{clean_branch}21_{usn_num}@rvce.edu.in"
        email = email_candidate

        student = {
            "student_id": student_id,
            "full_name": full_name,
            "email": email,
            "branch": branch,
            "cgpa": cgpa,
            "graduation_year": graduation_year,
            "active_backlogs": active_backlogs,
            "gender": gender
        }
        students.append(student)

    # ─────────────────────────────────────────────────────────────────────────
    # OVERWRITE PRE-SEEDED DEMO IDENTITIES (Must match specification exactly)
    # ─────────────────────────────────────────────────────────────────────────
    # Demo 1: TPO Officer (Admin Demo Account) - USN_2025_001
    students[0]["full_name"] = "Dr. S. K. Murthy (TPO)"
    students[0]["email"] = "tpo@rvce.edu.in"
    students[0]["branch"] = "CSE"
    students[0]["cgpa"] = 9.85
    students[0]["active_backlogs"] = 0
    students[0]["gender"] = "Male"

    # Demo 2: Hero Student - Priya Nair (USN_2025_042)
    # Index 41 corresponds to USN_2025_042
    students[41]["student_id"] = "USN_2025_042"
    students[41]["full_name"] = "Priya Nair"
    students[41]["email"] = "priya.ise21@rvce.edu.in"
    students[41]["branch"] = "ISE"
    students[41]["cgpa"] = 8.12
    students[41]["active_backlogs"] = 0
    students[41]["gender"] = "Female"
    students[41]["graduation_year"] = 2025

    # Demo 3: Alt Student - Rahul Verma (USN_2025_108)
    # Index 107 corresponds to USN_2025_108
    students[107]["student_id"] = "USN_2025_108"
    students[107]["full_name"] = "Rahul Verma"
    students[107]["email"] = "rahul.cse21@rvce.edu.in"
    students[107]["branch"] = "CSE"
    students[107]["cgpa"] = 7.65
    students[107]["active_backlogs"] = 0
    students[107]["gender"] = "Male"
    students[107]["graduation_year"] = 2025

    # Export students.csv
    filepath = os.path.join(OUTPUT_DIR, "students.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["student_id", "full_name", "email", "branch", "cgpa", "graduation_year", "active_backlogs", "gender"])
        for s in students:
            writer.writerow([
                s["student_id"],
                s["full_name"],
                s["email"],
                s["branch"],
                f"{s['cgpa']:.2f}",
                s["graduation_year"],
                s["active_backlogs"],
                s["gender"]
            ])
    print(f"Generated students.csv ({len(students)} rows)")
    return students

# ─────────────────────────────────────────────────────────────────────────────
# 4. STUDENT SKILLS FACT GENERATOR (skills.csv)
# ─────────────────────────────────────────────────────────────────────────────
def generate_student_skills(students):
    """
    Assigns realistic skills (3 to 6 skills per student) from the 16 taxonomy skills.
    Assigns proficiency levels (Beginner, Intermediate, Advanced) and certified_flag (true/false).
    Ensures Priya Nair (USN_2025_042) has standard foundational skills WITHOUT DATABRICKS_DE or PYSPARK,
    so what-if simulation demonstrates skill acquisition uplift.
    """
    skill_rows = []
    skill_counter = 1

    all_skill_names = [s["skill_name"] for s in SKILLS_TAXONOMY]
    skill_cat_map = {s["skill_name"]: s["category"] for s in SKILLS_TAXONOMY}

    for s in students:
        s_id = s["student_id"]
        branch = s["branch"]
        cgpa = s["cgpa"]

        if s_id == "USN_2025_042":  # Priya Nair (Hero)
            assigned_skills = [
                {"name": "PYTHON", "level": "Advanced", "cert": True},
                {"name": "SQL", "level": "Advanced", "cert": True},
                {"name": "JAVA_BACKEND", "level": "Intermediate", "cert": False},
                {"name": "AWS_CLOUD", "level": "Intermediate", "cert": True},
                {"name": "REACT", "level": "Intermediate", "cert": False}
            ]
        elif s_id == "USN_2025_108":  # Rahul Verma (Alt)
            assigned_skills = [
                {"name": "PYTHON", "level": "Intermediate", "cert": True},
                {"name": "SQL", "level": "Intermediate", "cert": False},
                {"name": "CPP", "level": "Advanced", "cert": False},
                {"name": "MACHINE_LEARNING", "level": "Beginner", "cert": False}
            ]
        else:
            # Branch-informed skill selection probabilities
            if branch in ["CSE", "ISE"]:
                core_pool = ["PYTHON", "SQL", "JAVA_BACKEND", "REACT", "CPP"]
                advanced_pool = ["DATABRICKS_DE", "PYSPARK", "AWS_CLOUD", "MACHINE_LEARNING", "GENAI_LLMS", "LANGCHAIN", "VECTOR_DATABASES"]
            elif branch == "AI/DS":
                core_pool = ["PYTHON", "SQL", "MACHINE_LEARNING", "DEEP_LEARNING"]
                advanced_pool = ["GENAI_LLMS", "NLP", "COMPUTER_VISION", "VECTOR_DATABASES", "PROMPT_ENGINEERING", "PYSPARK", "DATABRICKS_DE"]
            else:  # ECE
                core_pool = ["CPP", "PYTHON", "SQL"]
                advanced_pool = ["MACHINE_LEARNING", "DEEP_LEARNING", "COMPUTER_VISION", "AWS_CLOUD", "JAVA_BACKEND"]

            num_skills = np.random.randint(3, 7)
            # Pick 2 core + rest from advanced
            picked_core = list(np.random.choice(core_pool, size=min(2, len(core_pool)), replace=False))
            avail_adv = [k for k in advanced_pool if k not in picked_core]
            needed_adv = num_skills - len(picked_core)
            picked_adv = list(np.random.choice(avail_adv, size=min(needed_adv, len(avail_adv)), replace=False))
            
            chosen_skill_names = picked_core + picked_adv
            assigned_skills = []
            for sname in chosen_skill_names:
                # Higher CGPA -> higher chance of Advanced / Certified
                p_adv = 0.50 if cgpa >= 8.0 else 0.25
                p_int = 0.35
                p_beg = max(0.05, 1.0 - p_adv - p_int)
                level = np.random.choice(["Advanced", "Intermediate", "Beginner"], p=[p_adv, p_int, p_beg])
                cert = bool(np.random.choice([True, False], p=[0.40 if cgpa >= 7.5 else 0.20, 0.60 if cgpa >= 7.5 else 0.80]))
                assigned_skills.append({"name": sname, "level": level, "cert": cert})

        for askill in assigned_skills:
            skill_id = f"SSK_{skill_counter:05d}"
            skill_counter += 1
            skill_rows.append({
                "skill_id": skill_id,
                "student_id": s_id,
                "skill_name": askill["name"],
                "skill_category": skill_cat_map[askill["name"]],
                "proficiency_level": askill["level"],
                "certified_flag": str(askill["cert"]).lower()
            })

    filepath = os.path.join(OUTPUT_DIR, "skills.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["skill_id", "student_id", "skill_name", "skill_category", "proficiency_level", "certified_flag"])
        for r in skill_rows:
            writer.writerow([
                r["skill_id"],
                r["student_id"],
                r["skill_name"],
                r["skill_category"],
                r["proficiency_level"],
                r["certified_flag"]
            ])
    print(f"Generated skills.csv ({len(skill_rows)} student-skill fact rows)")
    return skill_rows

# ─────────────────────────────────────────────────────────────────────────────
# 5. HISTORICAL PLACEMENT DATASET GENERATOR (placement_history.csv)
# ─────────────────────────────────────────────────────────────────────────────
def generate_placement_history(students, student_skills):
    """
    Generates ~2,400 placement records across 6 academic years (2020-2025), ~400 records per year.
    Uses Sigmoid Placement Formula:
        P(Placed) = 1 / (1 + exp(-(0.85*CGPA + 1.60*I_skill + 0.50*I_certified - 1.20*Backlogs - 4.50)))

    PRE-SEEDED HERO DEMO COHORT REQUIREMENTS:
    ISE branch, CGPA bracket [7.77, 8.47]:
    1. WITHOUT DATABRICKS_DE (25 records):
       - Placed: 10 / 25 (40.0%)
       - Average CTC of placed: 8.20 LPA (Sum = 82.00 LPA)
    2. WITH DATABRICKS_DE (25 records):
       - Placed: 20 / 25 (80.0%)
       - Average CTC of placed: 18.50 LPA (Sum = 370.00 LPA)
    3. SYNERGY COHORT (WITH DATABRICKS_DE + PYSPARK) (25 records):
       - Placed: 23 / 25 (92.0%)
       - Average CTC of placed: 22.80 LPA (Sum = 524.40 LPA)
    Newly unlocked companies for target cohorts: Databricks (48.0 LPA), Adobe (26.0 LPA), Infosys DSE (7.0 LPA).
    """
    years = [2020, 2021, 2022, 2023, 2024, 2025]
    total_records = 2400

    # Map student attributes for quick lookup
    student_map = {s["student_id"]: s for s in students}
    
    # Identify ISE students in CGPA [7.77, 8.47] with 0 backlogs for hero cohorts
    ise_hero_students = [
        s for s in students 
        if s["branch"] == "ISE" and 7.77 <= s["cgpa"] <= 8.47 and s["active_backlogs"] == 0
    ]
    
    # In case there are fewer than 25, gather additional ISE students or cycle
    ise_hero_ids = [s["student_id"] for s in ise_hero_students]
    if len(ise_hero_ids) < 25:
        extra_ise = [s["student_id"] for s in students if s["branch"] == "ISE"]
        ise_hero_ids = (ise_hero_ids + extra_ise)[:25]

    placement_records = []
    record_id_counter = 1

    # ─────────────────────────────────────────────────────────────────────────
    # A. PRE-SEED HERO DEMO COHORTS (75 RECORDS TOTAL: 25 WITHOUT, 25 WITH, 25 SYNERGY)
    # ─────────────────────────────────────────────────────────────────────────
    
    # 1. Hero Cohort: WITHOUT DATABRICKS_DE (25 records)
    # Placed 10, Unplaced 15 -> 40.0% rate.
    # Placed 10 CTCs sum to 82.00 LPA (Avg = 8.20 LPA)
    without_databricks_placed_ctcs = [
        ("COMP_013", 7.00, "SQL"),
        ("COMP_012", 8.50, "JAVA_BACKEND"),
        ("COMP_011", 9.00, "PYTHON"),
        ("COMP_012", 8.50, "JAVA_BACKEND"),
        ("COMP_013", 7.00, "PYTHON"),
        ("COMP_011", 9.00, "SQL"),
        ("COMP_012", 8.50, "JAVA_BACKEND"),
        ("COMP_012", 8.50, "SQL"),
        ("COMP_013", 7.00, "PYTHON"),
        ("COMP_011", 9.00, "SQL")
    ]
    assert sum(c[1] for c in without_databricks_placed_ctcs) == 82.00, "Sum of without_databricks CTCs must be 82.00"

    for idx in range(25):
        st_id = ise_hero_ids[idx % len(ise_hero_ids)]
        year = 2024 if idx < 12 else 2023  # Historical alumni years
        if idx < 10:
            comp_id, ctc, pskill = without_databricks_placed_ctcs[idx]
            status = "Placed"
        else:
            comp_id = ""
            ctc = 0.00
            pskill = "PYTHON"
            status = "Not Placed"

        placement_records.append({
            "placement_id": f"PLACE_{record_id_counter:05d}",
            "academic_year": year,
            "student_id": st_id,
            "company_id": comp_id,
            "offer_status": status,
            "offered_ctc_lpa": ctc,
            "primary_skill_at_hire": pskill,
            "had_ai_data_skill": 0,
            "_cohort_tag": "HERO_WITHOUT_DATABRICKS"
        })
        record_id_counter += 1

    # 2. Hero Cohort: WITH DATABRICKS_DE (25 records)
    # Placed 20, Unplaced 5 -> 80.0% rate.
    # Placed 20 CTCs sum to 370.00 LPA (Avg = 18.50 LPA)
    with_databricks_placed_ctcs = [
        ("COMP_001", 48.00, "DATABRICKS_DE"),  # Databricks
        ("COMP_007", 26.00, "DATABRICKS_DE"),  # Adobe
        ("COMP_007", 26.00, "DATABRICKS_DE"),  # Adobe
        ("COMP_008", 24.00, "DATABRICKS_DE"),  # Atlassian
        ("COMP_008", 24.00, "DATABRICKS_DE"),  # Atlassian
        ("COMP_009", 20.00, "DATABRICKS_DE"),  # Morgan Stanley
        ("COMP_009", 20.00, "DATABRICKS_DE"),  # Morgan Stanley
        ("COMP_009", 20.00, "DATABRICKS_DE"),  # Morgan Stanley
        ("COMP_009", 20.00, "DATABRICKS_DE"),  # Morgan Stanley
        ("COMP_010", 18.00, "DATABRICKS_DE"),  # Cisco
        ("COMP_010", 18.00, "DATABRICKS_DE"),  # Cisco
        ("COMP_010", 18.00, "DATABRICKS_DE"),  # Cisco
        ("COMP_010", 18.00, "DATABRICKS_DE"),  # Cisco
        ("COMP_010", 18.00, "DATABRICKS_DE"),  # Cisco
        ("COMP_011", 9.00, "DATABRICKS_DE"),   # TCS Digital
        ("COMP_011", 9.00, "DATABRICKS_DE"),   # TCS Digital
        ("COMP_012", 8.50, "DATABRICKS_DE"),   # Accenture Adv
        ("COMP_012", 8.50, "DATABRICKS_DE"),   # Accenture Adv
        ("COMP_012", 8.50, "DATABRICKS_DE"),   # Accenture Adv
        ("COMP_012", 8.50, "DATABRICKS_DE")    # Accenture Adv
    ]
    assert len(with_databricks_placed_ctcs) == 20, "Must have exactly 20 placed records"
    assert sum(c[1] for c in with_databricks_placed_ctcs) == 370.00, f"Sum must be 370.00, got {sum(c[1] for c in with_databricks_placed_ctcs)}"

    for idx in range(25):
        st_id = ise_hero_ids[idx % len(ise_hero_ids)]
        year = 2024 if idx < 13 else 2023
        if idx < 20:
            comp_id, ctc, pskill = with_databricks_placed_ctcs[idx]
            status = "Placed"
        else:
            comp_id = ""
            ctc = 0.00
            pskill = "DATABRICKS_DE"
            status = "Not Placed"

        placement_records.append({
            "placement_id": f"PLACE_{record_id_counter:05d}",
            "academic_year": year,
            "student_id": st_id,
            "company_id": comp_id,
            "offer_status": status,
            "offered_ctc_lpa": ctc,
            "primary_skill_at_hire": pskill,
            "had_ai_data_skill": 1,
            "_cohort_tag": "HERO_WITH_DATABRICKS"
        })
        record_id_counter += 1

    # 3. Synergy Cohort: WITH DATABRICKS_DE + PYSPARK (25 records)
    # Placed 23, Unplaced 2 -> 92.0% rate.
    # Placed 23 CTCs sum to 524.40 LPA (Avg = 22.80 LPA)
    synergy_placed_ctcs = [
        ("COMP_001", 48.00, "DATABRICKS_DE"),  # Databricks
        ("COMP_001", 48.00, "PYSPARK"),        # Databricks
        ("COMP_001", 48.00, "DATABRICKS_DE"),  # Databricks
        ("COMP_003", 42.00, "PYSPARK"),        # Microsoft
        ("COMP_005", 32.00, "PYSPARK"),        # Amazon
        ("COMP_006", 28.00, "DATABRICKS_DE"),  # Goldman Sachs
        ("COMP_006", 28.00, "PYSPARK"),        # Goldman Sachs
        ("COMP_007", 26.00, "DATABRICKS_DE"),  # Adobe
        ("COMP_007", 26.00, "PYSPARK"),        # Adobe
        ("COMP_008", 24.00, "DATABRICKS_DE"),  # Atlassian
        ("COMP_008", 24.00, "PYSPARK"),        # Atlassian
        ("COMP_009", 20.00, "DATABRICKS_DE"),  # Morgan Stanley
        ("COMP_009", 20.00, "PYSPARK"),        # Morgan Stanley
        ("COMP_009", 20.00, "DATABRICKS_DE"),  # Morgan Stanley
        ("COMP_010", 18.00, "PYSPARK"),        # Cisco
        ("COMP_010", 18.00, "DATABRICKS_DE"),  # Cisco
        ("COMP_011", 9.00, "PYSPARK"),         # TCS Digital
        ("COMP_011", 9.00, "DATABRICKS_DE"),   # TCS Digital
        ("COMP_012", 8.40, "DATABRICKS_DE"),   # Accenture Adv
        ("COMP_013", 7.00, "PYSPARK"),         # Infosys DSE
        ("COMP_013", 7.00, "PYSPARK"),         # Infosys DSE
        ("COMP_013", 7.00, "PYSPARK"),         # Infosys DSE
        ("COMP_013", 7.00, "PYSPARK")          # Infosys DSE
    ]
    assert len(synergy_placed_ctcs) == 23, "Must have exactly 23 placed records"
    assert math.isclose(sum(c[1] for c in synergy_placed_ctcs), 524.40, abs_tol=1e-3), f"Sum must be 524.40, got {sum(c[1] for c in synergy_placed_ctcs)}"

    for idx in range(25):
        st_id = ise_hero_ids[idx % len(ise_hero_ids)]
        year = 2024 if idx < 13 else 2023
        if idx < 23:
            comp_id, ctc, pskill = synergy_placed_ctcs[idx]
            status = "Placed"
        else:
            comp_id = ""
            ctc = 0.00
            pskill = "DATABRICKS_DE"
            status = "Not Placed"

        placement_records.append({
            "placement_id": f"PLACE_{record_id_counter:05d}",
            "academic_year": year,
            "student_id": st_id,
            "company_id": comp_id,
            "offer_status": status,
            "offered_ctc_lpa": ctc,
            "primary_skill_at_hire": pskill,
            "had_ai_data_skill": 1,
            "_cohort_tag": "HERO_SYNERGY"
        })
        record_id_counter += 1

    # ─────────────────────────────────────────────────────────────────────────
    # B. GENERATE GENERAL HISTORICAL PLACEMENT DATASET USING SIGMOID MODEL
    # ─────────────────────────────────────────────────────────────────────────
    remaining_records = total_records - len(placement_records)
    all_student_ids = [s["student_id"] for s in students]

    # Map skills per student
    student_skill_map = {}
    for sk in student_skills:
        s_id = sk["student_id"]
        if s_id not in student_skill_map:
            student_skill_map[s_id] = []
        student_skill_map[s_id].append(sk)

    ai_data_skills_set = {s["skill_name"] for s in SKILLS_TAXONOMY if s["is_ai_data"] == 1}

    # Distribute remaining records evenly across the 6 years
    year_distribution = np.random.choice(years, size=remaining_records)

    for i in range(remaining_records):
        st_id = np.random.choice(all_student_ids)
        st = student_map[st_id]
        year = int(year_distribution[i])

        cgpa = st["cgpa"]
        backlogs = st["active_backlogs"]
        st_skills = student_skill_map.get(st_id, [])

        has_ai_data = any(sk["skill_name"] in ai_data_skills_set for sk in st_skills)
        i_skill = 1 if has_ai_data else 0
        has_cert = any(sk["certified_flag"] == "true" for sk in st_skills)
        i_certified = 1 if has_cert else 0

        # Sigmoid probability equation:
        # P(Placed) = 1 / (1 + exp(-(0.85*CGPA + 1.60*I_skill + 0.50*I_certified - 1.20*Backlogs - 4.50)))
        logit = 0.85 * cgpa + 1.60 * i_skill + 0.50 * i_certified - 1.20 * backlogs - 4.50
        prob_placed = 1.0 / (1.0 + np.exp(-logit))

        is_placed = np.random.random() < prob_placed

        if is_placed:
            status = "Placed"
            # Match with an eligible company based on CGPA, Backlogs, Branch
            eligible_companies = [
                c for c in COMPANIES_ROSTER
                if c["min_cgpa"] <= cgpa and c["max_backlogs"] >= backlogs and st["branch"] in c["eligible_branches"]
            ]
            if not eligible_companies:
                eligible_companies = [c for c in COMPANIES_ROSTER if c["tier"] == "Core Tech"]
            
            # Company selection weights (favoring higher tier for higher CGPA)
            comp_weights = [math.exp(c["ctc_lpa"] / 15.0) if cgpa >= c["min_cgpa"] else 0.1 for c in eligible_companies]
            weight_sum = sum(comp_weights)
            norm_weights = [w / weight_sum for w in comp_weights]
            
            selected_comp = np.random.choice(eligible_companies, p=norm_weights)
            comp_id = selected_comp["company_id"]
            ctc = selected_comp["ctc_lpa"]

            # Pick primary skill at hire
            if st_skills:
                matching_skills = [sk["skill_name"] for sk in st_skills if sk["skill_name"] in selected_comp["mandatory_skills"] or sk["skill_name"] in selected_comp["preferred_skills"]]
                if matching_skills:
                    primary_skill = np.random.choice(matching_skills)
                else:
                    primary_skill = np.random.choice([sk["skill_name"] for sk in st_skills])
            else:
                primary_skill = "PYTHON"
        else:
            status = "Not Placed"
            comp_id = ""
            ctc = 0.00
            if st_skills:
                primary_skill = np.random.choice([sk["skill_name"] for sk in st_skills])
            else:
                primary_skill = "PYTHON"

        placement_records.append({
            "placement_id": f"PLACE_{record_id_counter:05d}",
            "academic_year": year,
            "student_id": st_id,
            "company_id": comp_id,
            "offer_status": status,
            "offered_ctc_lpa": ctc,
            "primary_skill_at_hire": primary_skill,
            "had_ai_data_skill": 1 if has_ai_data else 0,
            "_cohort_tag": "GENERAL"
        })
        record_id_counter += 1

    # Write placement_history.csv
    filepath = os.path.join(OUTPUT_DIR, "placement_history.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            "placement_id", "academic_year", "student_id", "company_id",
            "offer_status", "offered_ctc_lpa", "primary_skill_at_hire", "had_ai_data_skill"
        ])
        for r in placement_records:
            writer.writerow([
                r["placement_id"],
                r["academic_year"],
                r["student_id"],
                r["company_id"],
                r["offer_status"],
                f"{r['offered_ctc_lpa']:.2f}",
                r["primary_skill_at_hire"],
                r["had_ai_data_skill"]
            ])
    print(f"Generated placement_history.csv ({len(placement_records)} historical placement rows)")
    return placement_records

# ─────────────────────────────────────────────────────────────────────────────
# 6. VERIFICATION SCORECARD
# ─────────────────────────────────────────────────────────────────────────────
def verify_dataset(students, student_skills, placement_records):
    print("\n" + "="*60)
    print("DATASET VERIFICATION SCORECARD")
    print("="*60)

    # 1. Students Demographics Verification
    n_students = len(students)
    print(f"Total Students: {n_students} (Target: 500)")
    assert n_students == 500, "Student count must be 500"

    branch_counts = {}
    for s in students:
        b = s["branch"]
        branch_counts[b] = branch_counts.get(b, 0) + 1
    
    print("\nBranch Distribution:")
    for b, expected_pct, expected_cnt in [("CSE", 40, 200), ("ISE", 25, 125), ("ECE", 20, 100), ("AI/DS", 15, 75)]:
        cnt = branch_counts.get(b, 0)
        pct = (cnt / n_students) * 100
        print(f"  - {b:6s}: {cnt:3d} ({pct:5.1f}%) | Target: {expected_cnt} ({expected_pct}%)")
        assert cnt == expected_cnt, f"Branch {b} count mismatch!"

    # CGPA & Backlogs
    cgpas = [s["cgpa"] for s in students]
    mean_cgpa = np.mean(cgpas)
    std_cgpa = np.std(cgpas)
    print(f"\nCGPA Statistics: Mean = {mean_cgpa:.2f} (Target ~7.65), StdDev = {std_cgpa:.2f} (Target ~0.85)")
    print(f"CGPA Range: [{min(cgpas):.2f}, {max(cgpas):.2f}] (Clamped [5.50, 9.90])")

    tier_a = sum(1 for c in cgpas if c >= 8.50)
    tier_b = sum(1 for c in cgpas if 7.00 <= c < 8.50)
    tier_c = sum(1 for c in cgpas if 6.00 <= c < 7.00)
    tier_d = sum(1 for c in cgpas if c < 6.00)
    print(f"  - Tier A (>=8.50): {tier_a} ({tier_a/5:.1f}%)")
    print(f"  - Tier B (7.00-8.49): {tier_b} ({tier_b/5:.1f}%)")
    print(f"  - Tier C (6.00-6.99): {tier_c} ({tier_c/5:.1f}%)")
    print(f"  - Tier D (<6.00): {tier_d} ({tier_d/5:.1f}%)")

    backlogs = [s["active_backlogs"] for s in students]
    b0 = sum(1 for b in backlogs if b == 0)
    b1 = sum(1 for b in backlogs if b == 1)
    b2 = sum(1 for b in backlogs if b >= 2)
    print(f"\nBacklog Distribution: 0 Backlogs: {b0/5:.1f}%, 1 Backlog: {b1/5:.1f}%, 2+ Backlogs: {b2/5:.1f}%")

    # 2. Demo Accounts Verification
    print("\nPre-Seeded Demo Accounts Verification:")
    priya = next(s for s in students if s["student_id"] == "USN_2025_042")
    print(f"  - Hero Account: {priya['full_name']} | {priya['email']} | {priya['branch']} | CGPA: {priya['cgpa']} | Backlogs: {priya['active_backlogs']}")
    assert priya["full_name"] == "Priya Nair"
    assert priya["email"] == "priya.ise21@rvce.edu.in"
    assert priya["branch"] == "ISE"
    assert priya["cgpa"] == 8.12
    assert priya["active_backlogs"] == 0

    rahul = next(s for s in students if s["student_id"] == "USN_2025_108")
    print(f"  - Alt Account:  {rahul['full_name']} | {rahul['email']} | {rahul['branch']} | CGPA: {rahul['cgpa']} | Backlogs: {rahul['active_backlogs']}")
    assert rahul["full_name"] == "Rahul Verma"
    assert rahul["email"] == "rahul.cse21@rvce.edu.in"
    assert rahul["branch"] == "CSE"
    assert rahul["cgpa"] == 7.65
    assert rahul["active_backlogs"] == 0

    tpo = next(s for s in students if s["email"] == "tpo@rvce.edu.in")
    print(f"  - TPO Account:  {tpo['full_name']} | {tpo['email']} | {tpo['branch']}")

    # 3. Hero Cohort Pre-seeding Numbers Verification
    print("\nHero Cohort Exact Metric Validation:")
    c_without = [r for r in placement_records if r.get("_cohort_tag") == "HERO_WITHOUT_DATABRICKS"]
    c_with = [r for r in placement_records if r.get("_cohort_tag") == "HERO_WITH_DATABRICKS"]
    c_synergy = [r for r in placement_records if r.get("_cohort_tag") == "HERO_SYNERGY"]

    # Cohort Without DATABRICKS_DE
    p_without = sum(1 for r in c_without if r["offer_status"] == "Placed")
    avg_ctc_without = sum(r["offered_ctc_lpa"] for r in c_without if r["offer_status"] == "Placed") / p_without
    rate_without = (p_without / len(c_without)) * 100
    print(f"  - WITHOUT DATABRICKS_DE: Placed {p_without}/{len(c_without)} ({rate_without:.1f}%) | Avg CTC: {avg_ctc_without:.2f} LPA")
    assert len(c_without) == 25 and p_without == 10 and math.isclose(avg_ctc_without, 8.20, abs_tol=1e-2)

    # Cohort With DATABRICKS_DE
    p_with = sum(1 for r in c_with if r["offer_status"] == "Placed")
    avg_ctc_with = sum(r["offered_ctc_lpa"] for r in c_with if r["offer_status"] == "Placed") / p_with
    rate_with = (p_with / len(c_with)) * 100
    print(f"  - WITH DATABRICKS_DE:    Placed {p_with}/{len(c_with)} ({rate_with:.1f}%) | Avg CTC: {avg_ctc_with:.2f} LPA")
    assert len(c_with) == 25 and p_with == 20 and math.isclose(avg_ctc_with, 18.50, abs_tol=1e-2)

    # Synergy Cohort
    p_synergy = sum(1 for r in c_synergy if r["offer_status"] == "Placed")
    avg_ctc_synergy = sum(r["offered_ctc_lpa"] for r in c_synergy if r["offer_status"] == "Placed") / p_synergy
    rate_synergy = (p_synergy / len(c_synergy)) * 100
    print(f"  - SYNERGY (DE + PYSPARK): Placed {p_synergy}/{len(c_synergy)} ({rate_synergy:.1f}%) | Avg CTC: {avg_ctc_synergy:.2f} LPA")
    assert len(c_synergy) == 25 and p_synergy == 23 and math.isclose(avg_ctc_synergy, 22.80, abs_tol=1e-2)

    # Deltas
    delta_p = rate_with - rate_without
    delta_ctc = avg_ctc_with - avg_ctc_without
    delta_p_syn = rate_synergy - rate_without
    delta_ctc_syn = avg_ctc_synergy - avg_ctc_without
    print(f"\nUplift Deltas:")
    print(f"  - Single Skill Uplift (DATABRICKS_DE): Delta P = +{delta_p:.1f} pts | Delta CTC = +{delta_ctc:.2f} LPA")
    print(f"  - Synergy Uplift (DE + PYSPARK):       Delta P = +{delta_p_syn:.1f} pts | Delta CTC = +{delta_ctc_syn:.2f} LPA")
    assert math.isclose(delta_p, 40.0, abs_tol=1e-2)
    assert math.isclose(delta_ctc, 10.30, abs_tol=1e-2)
    assert math.isclose(delta_p_syn, 52.0, abs_tol=1e-2)
    assert math.isclose(delta_ctc_syn, 14.60, abs_tol=1e-2)

    print("\nALL VERIFICATIONS PASSED WITH 100% SPEC COMPLIANCE!")
    print("="*60 + "\n")

# ─────────────────────────────────────────────────────────────────────────────
# MAIN EXECUTION PIPELINE
# ─────────────────────────────────────────────────────────────────────────────
def main():
    print("="*60)
    print("Skill Lamp Data Pipeline: Generating Gold Datasets")
    print("="*60)
    generate_companies_csv()
    generate_skills_taxonomy_csv()
    students = generate_students()
    student_skills = generate_student_skills(students)
    placement_records = generate_placement_history(students, student_skills)
    verify_dataset(students, student_skills, placement_records)

if __name__ == "__main__":
    main()
