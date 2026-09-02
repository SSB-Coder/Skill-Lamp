import {
  StudentCandidate,
  StudentProfileResponse
} from './types';

// Priya Nair's fixed student identity
export const MOCK_STUDENT_PRIYA: StudentProfileResponse = {
  usn: 'USN_2025_042',
  name: 'Priya Nair',
  email: 'priya.ise21@rvce.edu.in',
  branch: 'ISE',
  cgpa: 8.12,
  active_backlogs: 0,
  readiness_score: 74.5,
  current_skills: ['PYTHON', 'SQL', 'DATA_ANALYSIS', 'POWER_BI', 'PANDAS'],
  target_companies_available: [
    {
      name: 'Databricks',
      tier: 'Super Dream',
      ctc_lpa: 48.0,
      required_skills: ['DATABRICKS_DE', 'PYSPARK', 'DELTA_LAKE', 'SQL'],
      min_cgpa: 8.0,
      is_currently_eligible: false,
      missing_skills: ['DATABRICKS_DE', 'PYSPARK', 'DELTA_LAKE']
    },
    {
      name: 'Google',
      tier: 'Super Dream',
      ctc_lpa: 45.0,
      required_skills: ['DATA_STRUCTURES', 'SYSTEM_DESIGN', 'PYTHON'],
      min_cgpa: 8.5,
      is_currently_eligible: false,
      missing_skills: ['DATA_STRUCTURES', 'SYSTEM_DESIGN']
    },
    {
      name: 'Microsoft',
      tier: 'Super Dream',
      ctc_lpa: 42.0,
      required_skills: ['DATA_STRUCTURES', 'SYSTEM_DESIGN', 'AWS'],
      min_cgpa: 8.0,
      is_currently_eligible: false,
      missing_skills: ['DATA_STRUCTURES', 'SYSTEM_DESIGN', 'AWS']
    },
    {
      name: 'Adobe',
      tier: 'Super Dream',
      ctc_lpa: 26.0,
      required_skills: ['PYTHON', 'SQL', 'FASTAPI', 'DOCKER'],
      min_cgpa: 7.5,
      is_currently_eligible: false,
      missing_skills: ['FASTAPI', 'DOCKER']
    },
    {
      name: 'Cisco',
      tier: 'Dream',
      ctc_lpa: 18.0,
      required_skills: ['PYTHON', 'SQL', 'FASTAPI'],
      min_cgpa: 7.5,
      is_currently_eligible: false,
      missing_skills: ['FASTAPI']
    },
    {
      name: 'Oracle',
      tier: 'Dream',
      ctc_lpa: 19.5,
      required_skills: ['SQL', 'PYTHON', 'DATA_MODELING'],
      min_cgpa: 7.8,
      is_currently_eligible: false,
      missing_skills: ['DATA_MODELING']
    },
    {
      name: 'Infosys DSE',
      tier: 'Core Tech',
      ctc_lpa: 7.0,
      required_skills: ['PYTHON', 'SQL'],
      min_cgpa: 6.5,
      is_currently_eligible: true,
      missing_skills: []
    },
    {
      name: 'TCS Digital',
      tier: 'Core Tech',
      ctc_lpa: 7.5,
      required_skills: ['PYTHON', 'DATA_ANALYSIS'],
      min_cgpa: 7.0,
      is_currently_eligible: true,
      missing_skills: []
    },
    {
      name: 'Accenture Innovation',
      tier: 'Core Tech',
      ctc_lpa: 6.5,
      required_skills: ['POWER_BI', 'SQL'],
      min_cgpa: 6.5,
      is_currently_eligible: true,
      missing_skills: []
    }
  ],
  top_roi_recommendation: {
    skill: 'DATABRICKS_DE',
    marginal_ctc_lpa: 10.30,
    unlocked_super_dream_count: 2,
    rationale: 'Adding DATABRICKS_DE yields the highest marginal CTC gain (+10.30 LPA) and unlocks 2 Super Dream companies.'
  }
};

// 500 candidate records from Databricks Unity Catalog (workspace.campus_intelligence_gold)
export const MOCK_STUDENTS: StudentCandidate[] = [
  {
    "usn": "USN_2025_001",
    "name": "Dr. S. K. Murthy (TPO)",
    "branch": "CSE",
    "cgpa": 9.85,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "DATABRICKS_DE",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 86.1,
    "email": "tpo@rvce.edu.in",
    "phone_masked": "+91 98****_001"
  },
  {
    "usn": "USN_2025_002",
    "name": "Ankit Verma",
    "branch": "CSE",
    "cgpa": 8.34,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "CPP",
      "MACHINE_LEARNING",
      "LANGCHAIN",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 66.7,
    "email": "ankit.cse21_2@rvce.edu.in",
    "phone_masked": "+91 98****_002"
  },
  {
    "usn": "USN_2025_003",
    "name": "Bhavna Pillai",
    "branch": "CSE",
    "cgpa": 8.11,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "PYSPARK",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 79.1,
    "email": "bhavna.cse21_3@rvce.edu.in",
    "phone_masked": "+91 98****_003"
  },
  {
    "usn": "USN_2025_004",
    "name": "Gaurav Sharma",
    "branch": "CSE",
    "cgpa": 7.27,
    "active_backlogs": 1,
    "skills": [
      "CPP",
      "PYTHON",
      "LANGCHAIN",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 62.4,
    "email": "gaurav.cse21_4@rvce.edu.in",
    "phone_masked": "+91 98****_004"
  },
  {
    "usn": "USN_2025_005",
    "name": "Bhavna Kulkarni",
    "branch": "CSE",
    "cgpa": 7.37,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "PYSPARK",
      "AWS_CLOUD",
      "LANGCHAIN",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 89.5,
    "email": "bhavna.cse21_5@rvce.edu.in",
    "phone_masked": "+91 98****_005"
  },
  {
    "usn": "USN_2025_006",
    "name": "Nikhil Deshmukh",
    "branch": "CSE",
    "cgpa": 6.59,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "AWS_CLOUD",
      "VECTOR_DATABASES",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 86.4,
    "email": "nikhil.cse21_6@rvce.edu.in",
    "phone_masked": "+91 98****_006"
  },
  {
    "usn": "USN_2025_007",
    "name": "Rhea Patel",
    "branch": "CSE",
    "cgpa": 7.67,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.7,
    "email": "rhea.cse21_7@rvce.edu.in",
    "phone_masked": "+91 98****_007"
  },
  {
    "usn": "USN_2025_008",
    "name": "Suresh Patel",
    "branch": "CSE",
    "cgpa": 8.49,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "LANGCHAIN",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 74.0,
    "email": "suresh.cse21_8@rvce.edu.in",
    "phone_masked": "+91 98****_008"
  },
  {
    "usn": "USN_2025_009",
    "name": "Rohan Sharma",
    "branch": "CSE",
    "cgpa": 9.55,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "VECTOR_DATABASES",
      "GENAI_LLMS",
      "DATABRICKS_DE",
      "LANGCHAIN"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 98.2,
    "email": "rohan.cse21_9@rvce.edu.in",
    "phone_masked": "+91 98****_009"
  },
  {
    "usn": "USN_2025_010",
    "name": "Vikram Gupta",
    "branch": "CSE",
    "cgpa": 8.77,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "VECTOR_DATABASES",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 81.7,
    "email": "vikram.cse21_10@rvce.edu.in",
    "phone_masked": "+91 98****_010"
  },
  {
    "usn": "USN_2025_011",
    "name": "Vikram Gupta",
    "branch": "CSE",
    "cgpa": 8.66,
    "active_backlogs": 1,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "GENAI_LLMS",
      "DATABRICKS_DE",
      "AWS_CLOUD",
      "LANGCHAIN"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 74.6,
    "email": "vikram.cse21_11@rvce.edu.in",
    "phone_masked": "+91 98****_011"
  },
  {
    "usn": "USN_2025_012",
    "name": "Rhea Deshmukh",
    "branch": "CSE",
    "cgpa": 9.23,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "PYSPARK",
      "GENAI_LLMS",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 90.3,
    "email": "rhea.cse21_12@rvce.edu.in",
    "phone_masked": "+91 98****_012"
  },
  {
    "usn": "USN_2025_013",
    "name": "Manish Hegde",
    "branch": "CSE",
    "cgpa": 5.73,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "MACHINE_LEARNING",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.6,
    "email": "manish.cse21_13@rvce.edu.in",
    "phone_masked": "+91 98****_013"
  },
  {
    "usn": "USN_2025_014",
    "name": "Tanvi Gupta",
    "branch": "CSE",
    "cgpa": 6.36,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 65.4,
    "email": "tanvi.cse21_14@rvce.edu.in",
    "phone_masked": "+91 98****_014"
  },
  {
    "usn": "USN_2025_015",
    "name": "Suresh Patel",
    "branch": "CSE",
    "cgpa": 7.66,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "DATABRICKS_DE",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.0,
    "email": "suresh.cse21_15@rvce.edu.in",
    "phone_masked": "+91 98****_015"
  },
  {
    "usn": "USN_2025_016",
    "name": "Ankit Iyer",
    "branch": "CSE",
    "cgpa": 8.13,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "PYSPARK",
      "MACHINE_LEARNING",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 85.9,
    "email": "ankit.cse21_16@rvce.edu.in",
    "phone_masked": "+91 98****_016"
  },
  {
    "usn": "USN_2025_017",
    "name": "Divya Menon",
    "branch": "CSE",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "DATABRICKS_DE",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 80.6,
    "email": "divya.cse21_17@rvce.edu.in",
    "phone_masked": "+91 98****_017"
  },
  {
    "usn": "USN_2025_018",
    "name": "Shreya Kulkarni",
    "branch": "CSE",
    "cgpa": 6.48,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "PYSPARK",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.6,
    "email": "shreya.cse21_18@rvce.edu.in",
    "phone_masked": "+91 98****_018"
  },
  {
    "usn": "USN_2025_019",
    "name": "Aditya Verma",
    "branch": "CSE",
    "cgpa": 6.02,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.1,
    "email": "aditya.cse21_19@rvce.edu.in",
    "phone_masked": "+91 98****_019"
  },
  {
    "usn": "USN_2025_020",
    "name": "Harsh Iyer",
    "branch": "CSE",
    "cgpa": 7.98,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "LANGCHAIN",
      "MACHINE_LEARNING",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.9,
    "email": "harsh.cse21_20@rvce.edu.in",
    "phone_masked": "+91 98****_020"
  },
  {
    "usn": "USN_2025_021",
    "name": "Bhavna Pillai",
    "branch": "CSE",
    "cgpa": 6.96,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "GENAI_LLMS",
      "PYSPARK",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 87.8,
    "email": "bhavna.cse21_21@rvce.edu.in",
    "phone_masked": "+91 98****_021"
  },
  {
    "usn": "USN_2025_022",
    "name": "Gaurav Patel",
    "branch": "CSE",
    "cgpa": 7.62,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "CPP",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 50.5,
    "email": "gaurav.cse21_22@rvce.edu.in",
    "phone_masked": "+91 98****_022"
  },
  {
    "usn": "USN_2025_023",
    "name": "Shreya Hegde",
    "branch": "CSE",
    "cgpa": 8.51,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "VECTOR_DATABASES",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 94.0,
    "email": "shreya.cse21_23@rvce.edu.in",
    "phone_masked": "+91 98****_023"
  },
  {
    "usn": "USN_2025_024",
    "name": "Bhavna Sharma",
    "branch": "CSE",
    "cgpa": 7.22,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "SQL",
      "AWS_CLOUD",
      "LANGCHAIN",
      "DATABRICKS_DE",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 68.9,
    "email": "bhavna.cse21_24@rvce.edu.in",
    "phone_masked": "+91 98****_024"
  },
  {
    "usn": "USN_2025_025",
    "name": "Neha Patel",
    "branch": "CSE",
    "cgpa": 8.98,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "CPP",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 55.9,
    "email": "neha.cse21_25@rvce.edu.in",
    "phone_masked": "+91 98****_025"
  },
  {
    "usn": "USN_2025_026",
    "name": "Varun Deshmukh",
    "branch": "CSE",
    "cgpa": 8.37,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 73.5,
    "email": "varun.cse21_26@rvce.edu.in",
    "phone_masked": "+91 98****_026"
  },
  {
    "usn": "USN_2025_027",
    "name": "Rhea Kulkarni",
    "branch": "CSE",
    "cgpa": 7.97,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.9,
    "email": "rhea.cse21_27@rvce.edu.in",
    "phone_masked": "+91 98****_027"
  },
  {
    "usn": "USN_2025_028",
    "name": "Deepak Gupta",
    "branch": "CSE",
    "cgpa": 8.0,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 72.0,
    "email": "deepak.cse21_28@rvce.edu.in",
    "phone_masked": "+91 98****_028"
  },
  {
    "usn": "USN_2025_029",
    "name": "Gaurav Hegde",
    "branch": "CSE",
    "cgpa": 6.88,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 74.2,
    "email": "gaurav.cse21_29@rvce.edu.in",
    "phone_masked": "+91 98****_029"
  },
  {
    "usn": "USN_2025_030",
    "name": "Manish Patel",
    "branch": "CSE",
    "cgpa": 7.24,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.0,
    "email": "manish.cse21_30@rvce.edu.in",
    "phone_masked": "+91 98****_030"
  },
  {
    "usn": "USN_2025_031",
    "name": "Karthik Nair",
    "branch": "CSE",
    "cgpa": 8.05,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "PYSPARK",
      "GENAI_LLMS",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 85.5,
    "email": "karthik.cse21_31@rvce.edu.in",
    "phone_masked": "+91 98****_031"
  },
  {
    "usn": "USN_2025_032",
    "name": "Deepa Nair",
    "branch": "CSE",
    "cgpa": 5.59,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "VECTOR_DATABASES",
      "DATABRICKS_DE",
      "LANGCHAIN",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.4,
    "email": "deepa.cse21_32@rvce.edu.in",
    "phone_masked": "+91 98****_032"
  },
  {
    "usn": "USN_2025_033",
    "name": "Meera Menon",
    "branch": "CSE",
    "cgpa": 9.33,
    "active_backlogs": 2,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "PYSPARK",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.0,
    "email": "meera.cse21_33@rvce.edu.in",
    "phone_masked": "+91 98****_033"
  },
  {
    "usn": "USN_2025_034",
    "name": "Pooja Gupta",
    "branch": "CSE",
    "cgpa": 6.99,
    "active_backlogs": 3,
    "skills": [
      "REACT",
      "SQL",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 48.0,
    "email": "pooja.cse21_34@rvce.edu.in",
    "phone_masked": "+91 98****_034"
  },
  {
    "usn": "USN_2025_035",
    "name": "Aarav Kulkarni",
    "branch": "CSE",
    "cgpa": 6.99,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 74.6,
    "email": "aarav.cse21_35@rvce.edu.in",
    "phone_masked": "+91 98****_035"
  },
  {
    "usn": "USN_2025_036",
    "name": "Siddharth Rao",
    "branch": "CSE",
    "cgpa": 7.73,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "PYSPARK",
      "DATABRICKS_DE",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.3,
    "email": "siddharth.cse21_36@rvce.edu.in",
    "phone_masked": "+91 98****_036"
  },
  {
    "usn": "USN_2025_037",
    "name": "Ankit Pillai",
    "branch": "CSE",
    "cgpa": 6.88,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "GENAI_LLMS",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 80.9,
    "email": "ankit.cse21_37@rvce.edu.in",
    "phone_masked": "+91 98****_037"
  },
  {
    "usn": "USN_2025_038",
    "name": "Deepa Reddy",
    "branch": "CSE",
    "cgpa": 8.76,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "SQL",
      "PYSPARK",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 75.0,
    "email": "deepa.cse21_38@rvce.edu.in",
    "phone_masked": "+91 98****_038"
  },
  {
    "usn": "USN_2025_039",
    "name": "Varun Sharma",
    "branch": "CSE",
    "cgpa": 7.99,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "MACHINE_LEARNING",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 92.0,
    "email": "varun.cse21_39@rvce.edu.in",
    "phone_masked": "+91 98****_039"
  },
  {
    "usn": "USN_2025_040",
    "name": "Nandini Deshmukh",
    "branch": "CSE",
    "cgpa": 7.92,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "PYTHON",
      "MACHINE_LEARNING",
      "LANGCHAIN",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 65.0,
    "email": "nandini.cse21_40@rvce.edu.in",
    "phone_masked": "+91 98****_040"
  },
  {
    "usn": "USN_2025_041",
    "name": "Suresh Patel",
    "branch": "CSE",
    "cgpa": 6.69,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "MACHINE_LEARNING",
      "AWS_CLOUD",
      "DATABRICKS_DE",
      "LANGCHAIN"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 86.8,
    "email": "suresh.cse21_41@rvce.edu.in",
    "phone_masked": "+91 98****_041"
  },
  {
    "usn": "USN_2025_042",
    "name": "Priya Nair",
    "branch": "ISE",
    "cgpa": 8.12,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "JAVA_BACKEND",
      "AWS_CLOUD",
      "REACT"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 85.8,
    "email": "priya.ise21@rvce.edu.in",
    "phone_masked": "+91 98****_042"
  },
  {
    "usn": "USN_2025_043",
    "name": "Deepa Iyer",
    "branch": "CSE",
    "cgpa": 8.55,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "DATABRICKS_DE",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 80.9,
    "email": "deepa.cse21_43@rvce.edu.in",
    "phone_masked": "+91 98****_043"
  },
  {
    "usn": "USN_2025_044",
    "name": "Pranav Kulkarni",
    "branch": "CSE",
    "cgpa": 8.69,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 74.8,
    "email": "pranav.cse21_44@rvce.edu.in",
    "phone_masked": "+91 98****_044"
  },
  {
    "usn": "USN_2025_045",
    "name": "Deepa Kulkarni",
    "branch": "CSE",
    "cgpa": 7.75,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.0,
    "email": "deepa.cse21_45@rvce.edu.in",
    "phone_masked": "+91 98****_045"
  },
  {
    "usn": "USN_2025_046",
    "name": "Deepa Reddy",
    "branch": "CSE",
    "cgpa": 7.8,
    "active_backlogs": 2,
    "skills": [
      "REACT",
      "PYTHON",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.2,
    "email": "deepa.cse21_46@rvce.edu.in",
    "phone_masked": "+91 98****_046"
  },
  {
    "usn": "USN_2025_047",
    "name": "Varun Menon",
    "branch": "CSE",
    "cgpa": 7.0,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.3,
    "email": "varun.cse21_47@rvce.edu.in",
    "phone_masked": "+91 98****_047"
  },
  {
    "usn": "USN_2025_048",
    "name": "Deepak Pillai",
    "branch": "CSE",
    "cgpa": 8.85,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 75.4,
    "email": "deepak.cse21_48@rvce.edu.in",
    "phone_masked": "+91 98****_048"
  },
  {
    "usn": "USN_2025_049",
    "name": "Kavya Verma",
    "branch": "CSE",
    "cgpa": 6.69,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 80.1,
    "email": "kavya.cse21_49@rvce.edu.in",
    "phone_masked": "+91 98****_049"
  },
  {
    "usn": "USN_2025_050",
    "name": "Shreya Deshmukh",
    "branch": "CSE",
    "cgpa": 7.08,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "VECTOR_DATABASES",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.7,
    "email": "shreya.cse21_50@rvce.edu.in",
    "phone_masked": "+91 98****_050"
  },
  {
    "usn": "USN_2025_051",
    "name": "Karthik Menon",
    "branch": "CSE",
    "cgpa": 7.59,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "PYSPARK",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.0,
    "email": "karthik.cse21_51@rvce.edu.in",
    "phone_masked": "+91 98****_051"
  },
  {
    "usn": "USN_2025_052",
    "name": "Swati Joshi",
    "branch": "CSE",
    "cgpa": 9.08,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 83.0,
    "email": "swati.cse21_52@rvce.edu.in",
    "phone_masked": "+91 98****_052"
  },
  {
    "usn": "USN_2025_053",
    "name": "Sneha Patel",
    "branch": "CSE",
    "cgpa": 9.02,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 82.7,
    "email": "sneha.cse21_53@rvce.edu.in",
    "phone_masked": "+91 98****_053"
  },
  {
    "usn": "USN_2025_054",
    "name": "Swati Iyer",
    "branch": "CSE",
    "cgpa": 6.68,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "PYSPARK",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 80.1,
    "email": "swati.cse21_54@rvce.edu.in",
    "phone_masked": "+91 98****_054"
  },
  {
    "usn": "USN_2025_055",
    "name": "Suresh Nair",
    "branch": "CSE",
    "cgpa": 8.75,
    "active_backlogs": 2,
    "skills": [
      "REACT",
      "SQL",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "DATABRICKS_DE",
      "LANGCHAIN"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 75.0,
    "email": "suresh.cse21_55@rvce.edu.in",
    "phone_masked": "+91 98****_055"
  },
  {
    "usn": "USN_2025_056",
    "name": "Shreya Patel",
    "branch": "CSE",
    "cgpa": 8.98,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 75.9,
    "email": "shreya.cse21_56@rvce.edu.in",
    "phone_masked": "+91 98****_056"
  },
  {
    "usn": "USN_2025_057",
    "name": "Bhavna Singh",
    "branch": "CSE",
    "cgpa": 7.04,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 68.2,
    "email": "bhavna.cse21_57@rvce.edu.in",
    "phone_masked": "+91 98****_057"
  },
  {
    "usn": "USN_2025_058",
    "name": "Rohan Reddy",
    "branch": "CSE",
    "cgpa": 7.47,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.9,
    "email": "rohan.cse21_58@rvce.edu.in",
    "phone_masked": "+91 98****_058"
  },
  {
    "usn": "USN_2025_059",
    "name": "Nikhil Menon",
    "branch": "CSE",
    "cgpa": 7.38,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.5,
    "email": "nikhil.cse21_59@rvce.edu.in",
    "phone_masked": "+91 98****_059"
  },
  {
    "usn": "USN_2025_060",
    "name": "Swati Verma",
    "branch": "CSE",
    "cgpa": 7.84,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "LANGCHAIN",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.0,
    "email": "swati.cse21_60@rvce.edu.in",
    "phone_masked": "+91 98****_060"
  },
  {
    "usn": "USN_2025_061",
    "name": "Deepak Iyer",
    "branch": "CSE",
    "cgpa": 5.64,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 62.6,
    "email": "deepak.cse21_61@rvce.edu.in",
    "phone_masked": "+91 98****_061"
  },
  {
    "usn": "USN_2025_062",
    "name": "Swati Sharma",
    "branch": "CSE",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 74.0,
    "email": "swati.cse21_62@rvce.edu.in",
    "phone_masked": "+91 98****_062"
  },
  {
    "usn": "USN_2025_063",
    "name": "Nikhil Rao",
    "branch": "CSE",
    "cgpa": 8.12,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "LANGCHAIN",
      "VECTOR_DATABASES",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 85.8,
    "email": "nikhil.cse21_63@rvce.edu.in",
    "phone_masked": "+91 98****_063"
  },
  {
    "usn": "USN_2025_064",
    "name": "Suresh Verma",
    "branch": "CSE",
    "cgpa": 8.05,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "VECTOR_DATABASES",
      "LANGCHAIN"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 78.9,
    "email": "suresh.cse21_64@rvce.edu.in",
    "phone_masked": "+91 98****_064"
  },
  {
    "usn": "USN_2025_065",
    "name": "Pooja Reddy",
    "branch": "CSE",
    "cgpa": 8.99,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 76.0,
    "email": "pooja.cse21_65@rvce.edu.in",
    "phone_masked": "+91 98****_065"
  },
  {
    "usn": "USN_2025_066",
    "name": "Harsh Gupta",
    "branch": "CSE",
    "cgpa": 9.73,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "DATABRICKS_DE",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 98.9,
    "email": "harsh.cse21_66@rvce.edu.in",
    "phone_masked": "+91 98****_066"
  },
  {
    "usn": "USN_2025_067",
    "name": "Varun Menon",
    "branch": "CSE",
    "cgpa": 6.39,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "DATABRICKS_DE",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.2,
    "email": "varun.cse21_67@rvce.edu.in",
    "phone_masked": "+91 98****_067"
  },
  {
    "usn": "USN_2025_068",
    "name": "Suresh Deshmukh",
    "branch": "CSE",
    "cgpa": 9.31,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 77.2,
    "email": "suresh.cse21_68@rvce.edu.in",
    "phone_masked": "+91 98****_068"
  },
  {
    "usn": "USN_2025_069",
    "name": "Meera Singh",
    "branch": "CSE",
    "cgpa": 8.07,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 78.9,
    "email": "meera.cse21_69@rvce.edu.in",
    "phone_masked": "+91 98****_069"
  },
  {
    "usn": "USN_2025_070",
    "name": "Nikhil Hegde",
    "branch": "CSE",
    "cgpa": 7.84,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "DATABRICKS_DE",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.0,
    "email": "nikhil.cse21_70@rvce.edu.in",
    "phone_masked": "+91 98****_070"
  },
  {
    "usn": "USN_2025_071",
    "name": "Ankit Pillai",
    "branch": "CSE",
    "cgpa": 7.91,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.6,
    "email": "ankit.cse21_71@rvce.edu.in",
    "phone_masked": "+91 98****_071"
  },
  {
    "usn": "USN_2025_072",
    "name": "Neha Sharma",
    "branch": "CSE",
    "cgpa": 9.54,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "GENAI_LLMS",
      "MACHINE_LEARNING",
      "LANGCHAIN",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 98.2,
    "email": "neha.cse21_72@rvce.edu.in",
    "phone_masked": "+91 98****_072"
  },
  {
    "usn": "USN_2025_073",
    "name": "Gaurav Iyer",
    "branch": "CSE",
    "cgpa": 9.81,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "PYSPARK",
      "VECTOR_DATABASES",
      "DATABRICKS_DE",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 99.2,
    "email": "gaurav.cse21_73@rvce.edu.in",
    "phone_masked": "+91 98****_073"
  },
  {
    "usn": "USN_2025_074",
    "name": "Pooja Sharma",
    "branch": "CSE",
    "cgpa": 8.13,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "GENAI_LLMS",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 92.5,
    "email": "pooja.cse21_74@rvce.edu.in",
    "phone_masked": "+91 98****_074"
  },
  {
    "usn": "USN_2025_075",
    "name": "Vikram Kulkarni",
    "branch": "CSE",
    "cgpa": 7.69,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.8,
    "email": "vikram.cse21_75@rvce.edu.in",
    "phone_masked": "+91 98****_075"
  },
  {
    "usn": "USN_2025_076",
    "name": "Pooja Pillai",
    "branch": "CSE",
    "cgpa": 7.75,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "GENAI_LLMS",
      "LANGCHAIN",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.3,
    "email": "pooja.cse21_76@rvce.edu.in",
    "phone_masked": "+91 98****_076"
  },
  {
    "usn": "USN_2025_077",
    "name": "Ankit Patel",
    "branch": "CSE",
    "cgpa": 6.49,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.6,
    "email": "ankit.cse21_77@rvce.edu.in",
    "phone_masked": "+91 98****_077"
  },
  {
    "usn": "USN_2025_078",
    "name": "Shreya Deshmukh",
    "branch": "CSE",
    "cgpa": 6.64,
    "active_backlogs": 2,
    "skills": [
      "SQL",
      "REACT",
      "PYSPARK",
      "DATABRICKS_DE",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 59.9,
    "email": "shreya.cse21_78@rvce.edu.in",
    "phone_masked": "+91 98****_078"
  },
  {
    "usn": "USN_2025_079",
    "name": "Ankit Iyer",
    "branch": "CSE",
    "cgpa": 7.52,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "MACHINE_LEARNING",
      "DATABRICKS_DE",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.4,
    "email": "ankit.cse21_79@rvce.edu.in",
    "phone_masked": "+91 98****_079"
  },
  {
    "usn": "USN_2025_080",
    "name": "Pranav Reddy",
    "branch": "CSE",
    "cgpa": 8.27,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "SQL",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 53.1,
    "email": "pranav.cse21_80@rvce.edu.in",
    "phone_masked": "+91 98****_080"
  },
  {
    "usn": "USN_2025_081",
    "name": "Deepak Bhat",
    "branch": "CSE",
    "cgpa": 9.78,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "DATABRICKS_DE",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 85.8,
    "email": "deepak.cse21_81@rvce.edu.in",
    "phone_masked": "+91 98****_081"
  },
  {
    "usn": "USN_2025_082",
    "name": "Aditya Deshmukh",
    "branch": "CSE",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 74.0,
    "email": "aditya.cse21_82@rvce.edu.in",
    "phone_masked": "+91 98****_082"
  },
  {
    "usn": "USN_2025_083",
    "name": "Harsh Deshmukh",
    "branch": "CSE",
    "cgpa": 7.04,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "LANGCHAIN",
      "AWS_CLOUD",
      "DATABRICKS_DE",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 88.2,
    "email": "harsh.cse21_83@rvce.edu.in",
    "phone_masked": "+91 98****_083"
  },
  {
    "usn": "USN_2025_084",
    "name": "Vikram Nair",
    "branch": "CSE",
    "cgpa": 7.77,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "DATABRICKS_DE",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.7,
    "email": "vikram.cse21_84@rvce.edu.in",
    "phone_masked": "+91 98****_084"
  },
  {
    "usn": "USN_2025_085",
    "name": "Kavya Hegde",
    "branch": "CSE",
    "cgpa": 6.26,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.7,
    "email": "kavya.cse21_85@rvce.edu.in",
    "phone_masked": "+91 98****_085"
  },
  {
    "usn": "USN_2025_086",
    "name": "Ankit Hegde",
    "branch": "CSE",
    "cgpa": 6.23,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "DATABRICKS_DE",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.6,
    "email": "ankit.cse21_86@rvce.edu.in",
    "phone_masked": "+91 98****_086"
  },
  {
    "usn": "USN_2025_087",
    "name": "Karthik Menon",
    "branch": "CSE",
    "cgpa": 7.84,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "LANGCHAIN",
      "MACHINE_LEARNING",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.7,
    "email": "karthik.cse21_87@rvce.edu.in",
    "phone_masked": "+91 98****_087"
  },
  {
    "usn": "USN_2025_088",
    "name": "Ananya Gupta",
    "branch": "CSE",
    "cgpa": 8.53,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 74.1,
    "email": "ananya.cse21_88@rvce.edu.in",
    "phone_masked": "+91 98****_088"
  },
  {
    "usn": "USN_2025_089",
    "name": "Deepa Deshmukh",
    "branch": "CSE",
    "cgpa": 7.45,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.8,
    "email": "deepa.cse21_89@rvce.edu.in",
    "phone_masked": "+91 98****_089"
  },
  {
    "usn": "USN_2025_090",
    "name": "Aditya Iyer",
    "branch": "CSE",
    "cgpa": 8.59,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "PYTHON",
      "GENAI_LLMS",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 67.7,
    "email": "aditya.cse21_90@rvce.edu.in",
    "phone_masked": "+91 98****_090"
  },
  {
    "usn": "USN_2025_091",
    "name": "Manish Nair",
    "branch": "CSE",
    "cgpa": 7.92,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.7,
    "email": "manish.cse21_91@rvce.edu.in",
    "phone_masked": "+91 98****_091"
  },
  {
    "usn": "USN_2025_092",
    "name": "Deepak Pillai",
    "branch": "CSE",
    "cgpa": 9.6,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 78.4,
    "email": "deepak.cse21_92@rvce.edu.in",
    "phone_masked": "+91 98****_092"
  },
  {
    "usn": "USN_2025_093",
    "name": "Pooja Singh",
    "branch": "CSE",
    "cgpa": 5.59,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "VECTOR_DATABASES",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.0,
    "email": "pooja.cse21_93@rvce.edu.in",
    "phone_masked": "+91 98****_093"
  },
  {
    "usn": "USN_2025_094",
    "name": "Tanvi Verma",
    "branch": "CSE",
    "cgpa": 9.34,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 77.4,
    "email": "tanvi.cse21_94@rvce.edu.in",
    "phone_masked": "+91 98****_094"
  },
  {
    "usn": "USN_2025_095",
    "name": "Nikhil Rao",
    "branch": "CSE",
    "cgpa": 9.2,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "AWS_CLOUD",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 83.5,
    "email": "nikhil.cse21_95@rvce.edu.in",
    "phone_masked": "+91 98****_095"
  },
  {
    "usn": "USN_2025_096",
    "name": "Meera Hegde",
    "branch": "CSE",
    "cgpa": 6.0,
    "active_backlogs": 1,
    "skills": [
      "CPP",
      "PYTHON",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 50.7,
    "email": "meera.cse21_96@rvce.edu.in",
    "phone_masked": "+91 98****_096"
  },
  {
    "usn": "USN_2025_097",
    "name": "Divya Singh",
    "branch": "CSE",
    "cgpa": 8.08,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "LANGCHAIN",
      "PYSPARK",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 92.3,
    "email": "divya.cse21_97@rvce.edu.in",
    "phone_masked": "+91 98****_097"
  },
  {
    "usn": "USN_2025_098",
    "name": "Swati Nair",
    "branch": "CSE",
    "cgpa": 7.84,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.0,
    "email": "swati.cse21_98@rvce.edu.in",
    "phone_masked": "+91 98****_098"
  },
  {
    "usn": "USN_2025_099",
    "name": "Divya Hegde",
    "branch": "CSE",
    "cgpa": 8.92,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 75.7,
    "email": "divya.cse21_99@rvce.edu.in",
    "phone_masked": "+91 98****_099"
  },
  {
    "usn": "USN_2025_100",
    "name": "Nikhil Verma",
    "branch": "CSE",
    "cgpa": 7.0,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 68.0,
    "email": "nikhil.cse21_100@rvce.edu.in",
    "phone_masked": "+91 98****_100"
  },
  {
    "usn": "USN_2025_101",
    "name": "Rohan Hegde",
    "branch": "CSE",
    "cgpa": 5.83,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "MACHINE_LEARNING",
      "LANGCHAIN",
      "AWS_CLOUD",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.3,
    "email": "rohan.cse21_101@rvce.edu.in",
    "phone_masked": "+91 98****_101"
  },
  {
    "usn": "USN_2025_102",
    "name": "Siddharth Verma",
    "branch": "CSE",
    "cgpa": 7.62,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "GENAI_LLMS",
      "LANGCHAIN",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.8,
    "email": "siddharth.cse21_102@rvce.edu.in",
    "phone_masked": "+91 98****_102"
  },
  {
    "usn": "USN_2025_103",
    "name": "Siddharth Verma",
    "branch": "CSE",
    "cgpa": 8.75,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "AWS_CLOUD",
      "LANGCHAIN",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 88.3,
    "email": "siddharth.cse21_103@rvce.edu.in",
    "phone_masked": "+91 98****_103"
  },
  {
    "usn": "USN_2025_104",
    "name": "Nikhil Reddy",
    "branch": "CSE",
    "cgpa": 7.78,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.1,
    "email": "nikhil.cse21_104@rvce.edu.in",
    "phone_masked": "+91 98****_104"
  },
  {
    "usn": "USN_2025_105",
    "name": "Meera Hegde",
    "branch": "CSE",
    "cgpa": 7.8,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "DATABRICKS_DE",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.9,
    "email": "meera.cse21_105@rvce.edu.in",
    "phone_masked": "+91 98****_105"
  },
  {
    "usn": "USN_2025_106",
    "name": "Karthik Gupta",
    "branch": "CSE",
    "cgpa": 8.31,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 86.6,
    "email": "karthik.cse21_106@rvce.edu.in",
    "phone_masked": "+91 98****_106"
  },
  {
    "usn": "USN_2025_107",
    "name": "Vikram Menon",
    "branch": "CSE",
    "cgpa": 7.45,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "AWS_CLOUD",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.5,
    "email": "vikram.cse21_107@rvce.edu.in",
    "phone_masked": "+91 98****_107"
  },
  {
    "usn": "USN_2025_108",
    "name": "Rahul Verma",
    "branch": "CSE",
    "cgpa": 7.65,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "CPP",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.3,
    "email": "rahul.cse21@rvce.edu.in",
    "phone_masked": "+91 98****_108"
  },
  {
    "usn": "USN_2025_109",
    "name": "Divya Sharma",
    "branch": "CSE",
    "cgpa": 7.82,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "GENAI_LLMS",
      "PYSPARK",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.6,
    "email": "divya.cse21_109@rvce.edu.in",
    "phone_masked": "+91 98****_109"
  },
  {
    "usn": "USN_2025_110",
    "name": "Varun Reddy",
    "branch": "CSE",
    "cgpa": 6.99,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "LANGCHAIN"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 68.0,
    "email": "varun.cse21_110@rvce.edu.in",
    "phone_masked": "+91 98****_110"
  },
  {
    "usn": "USN_2025_111",
    "name": "Vikram Joshi",
    "branch": "CSE",
    "cgpa": 7.31,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "VECTOR_DATABASES",
      "PYSPARK",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.6,
    "email": "vikram.cse21_111@rvce.edu.in",
    "phone_masked": "+91 98****_111"
  },
  {
    "usn": "USN_2025_112",
    "name": "Pranav Rao",
    "branch": "CSE",
    "cgpa": 7.37,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.5,
    "email": "pranav.cse21_112@rvce.edu.in",
    "phone_masked": "+91 98****_112"
  },
  {
    "usn": "USN_2025_113",
    "name": "Nikhil Iyer",
    "branch": "CSE",
    "cgpa": 7.96,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 58.5,
    "email": "nikhil.cse21_113@rvce.edu.in",
    "phone_masked": "+91 98****_113"
  },
  {
    "usn": "USN_2025_114",
    "name": "Ishita Reddy",
    "branch": "CSE",
    "cgpa": 5.56,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "VECTOR_DATABASES",
      "GENAI_LLMS",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.2,
    "email": "ishita.cse21_114@rvce.edu.in",
    "phone_masked": "+91 98****_114"
  },
  {
    "usn": "USN_2025_115",
    "name": "Divya Nair",
    "branch": "CSE",
    "cgpa": 8.03,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "DATABRICKS_DE",
      "LANGCHAIN",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 85.5,
    "email": "divya.cse21_115@rvce.edu.in",
    "phone_masked": "+91 98****_115"
  },
  {
    "usn": "USN_2025_116",
    "name": "Nikhil Gupta",
    "branch": "CSE",
    "cgpa": 7.4,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "CPP",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 56.3,
    "email": "nikhil.cse21_116@rvce.edu.in",
    "phone_masked": "+91 98****_116"
  },
  {
    "usn": "USN_2025_117",
    "name": "Neha Patel",
    "branch": "CSE",
    "cgpa": 7.35,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "LANGCHAIN",
      "AWS_CLOUD",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.7,
    "email": "neha.cse21_117@rvce.edu.in",
    "phone_masked": "+91 98****_117"
  },
  {
    "usn": "USN_2025_118",
    "name": "Deepa Patel",
    "branch": "CSE",
    "cgpa": 8.18,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 72.7,
    "email": "deepa.cse21_118@rvce.edu.in",
    "phone_masked": "+91 98****_118"
  },
  {
    "usn": "USN_2025_119",
    "name": "Pooja Singh",
    "branch": "CSE",
    "cgpa": 9.71,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "DATABRICKS_DE",
      "GENAI_LLMS",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 98.8,
    "email": "pooja.cse21_119@rvce.edu.in",
    "phone_masked": "+91 98****_119"
  },
  {
    "usn": "USN_2025_120",
    "name": "Gaurav Menon",
    "branch": "CSE",
    "cgpa": 5.59,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "AWS_CLOUD",
      "PYSPARK",
      "DATABRICKS_DE",
      "LANGCHAIN"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.4,
    "email": "gaurav.cse21_120@rvce.edu.in",
    "phone_masked": "+91 98****_120"
  },
  {
    "usn": "USN_2025_121",
    "name": "Rohan Sharma",
    "branch": "CSE",
    "cgpa": 8.56,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "AWS_CLOUD",
      "PYSPARK",
      "VECTOR_DATABASES",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 94.2,
    "email": "rohan.cse21_121@rvce.edu.in",
    "phone_masked": "+91 98****_121"
  },
  {
    "usn": "USN_2025_122",
    "name": "Suresh Gupta",
    "branch": "CSE",
    "cgpa": 7.42,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "LANGCHAIN",
      "MACHINE_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.0,
    "email": "suresh.cse21_122@rvce.edu.in",
    "phone_masked": "+91 98****_122"
  },
  {
    "usn": "USN_2025_123",
    "name": "Pooja Verma",
    "branch": "CSE",
    "cgpa": 7.92,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "LANGCHAIN",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.3,
    "email": "pooja.cse21_123@rvce.edu.in",
    "phone_masked": "+91 98****_123"
  },
  {
    "usn": "USN_2025_124",
    "name": "Nikhil Joshi",
    "branch": "CSE",
    "cgpa": 7.72,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "VECTOR_DATABASES",
      "DATABRICKS_DE",
      "GENAI_LLMS",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.9,
    "email": "nikhil.cse21_124@rvce.edu.in",
    "phone_masked": "+91 98****_124"
  },
  {
    "usn": "USN_2025_125",
    "name": "Gaurav Gupta",
    "branch": "CSE",
    "cgpa": 6.13,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.5,
    "email": "gaurav.cse21_125@rvce.edu.in",
    "phone_masked": "+91 98****_125"
  },
  {
    "usn": "USN_2025_126",
    "name": "Ankit Verma",
    "branch": "CSE",
    "cgpa": 7.82,
    "active_backlogs": 1,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 57.9,
    "email": "ankit.cse21_126@rvce.edu.in",
    "phone_masked": "+91 98****_126"
  },
  {
    "usn": "USN_2025_127",
    "name": "Meera Singh",
    "branch": "CSE",
    "cgpa": 8.88,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 75.5,
    "email": "meera.cse21_127@rvce.edu.in",
    "phone_masked": "+91 98****_127"
  },
  {
    "usn": "USN_2025_128",
    "name": "Vikram Pillai",
    "branch": "CSE",
    "cgpa": 6.5,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "LANGCHAIN",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.7,
    "email": "vikram.cse21_128@rvce.edu.in",
    "phone_masked": "+91 98****_128"
  },
  {
    "usn": "USN_2025_129",
    "name": "Pooja Pillai",
    "branch": "CSE",
    "cgpa": 9.53,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "GENAI_LLMS",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING",
      "LANGCHAIN"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 98.1,
    "email": "pooja.cse21_129@rvce.edu.in",
    "phone_masked": "+91 98****_129"
  },
  {
    "usn": "USN_2025_130",
    "name": "Swati Nair",
    "branch": "CSE",
    "cgpa": 6.48,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "GENAI_LLMS",
      "VECTOR_DATABASES",
      "AWS_CLOUD",
      "LANGCHAIN"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.9,
    "email": "swati.cse21_130@rvce.edu.in",
    "phone_masked": "+91 98****_130"
  },
  {
    "usn": "USN_2025_131",
    "name": "Pranav Reddy",
    "branch": "CSE",
    "cgpa": 6.51,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "PYSPARK",
      "LANGCHAIN",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 86.0,
    "email": "pranav.cse21_131@rvce.edu.in",
    "phone_masked": "+91 98****_131"
  },
  {
    "usn": "USN_2025_132",
    "name": "Ananya Reddy",
    "branch": "CSE",
    "cgpa": 9.48,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "PYTHON",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.6,
    "email": "ananya.cse21_132@rvce.edu.in",
    "phone_masked": "+91 98****_132"
  },
  {
    "usn": "USN_2025_133",
    "name": "Aarav Patel",
    "branch": "CSE",
    "cgpa": 7.62,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "PYTHON",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 50.5,
    "email": "aarav.cse21_133@rvce.edu.in",
    "phone_masked": "+91 98****_133"
  },
  {
    "usn": "USN_2025_134",
    "name": "Bhavna Nair",
    "branch": "CSE",
    "cgpa": 7.74,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "CPP",
      "DATABRICKS_DE",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 57.6,
    "email": "bhavna.cse21_134@rvce.edu.in",
    "phone_masked": "+91 98****_134"
  },
  {
    "usn": "USN_2025_135",
    "name": "Aarav Bhat",
    "branch": "CSE",
    "cgpa": 8.05,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "MACHINE_LEARNING",
      "AWS_CLOUD",
      "GENAI_LLMS",
      "LANGCHAIN"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 92.2,
    "email": "aarav.cse21_135@rvce.edu.in",
    "phone_masked": "+91 98****_135"
  },
  {
    "usn": "USN_2025_136",
    "name": "Nandini Bhat",
    "branch": "CSE",
    "cgpa": 7.07,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "LANGCHAIN",
      "DATABRICKS_DE",
      "GENAI_LLMS",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 88.3,
    "email": "nandini.cse21_136@rvce.edu.in",
    "phone_masked": "+91 98****_136"
  },
  {
    "usn": "USN_2025_137",
    "name": "Bhavna Bhat",
    "branch": "CSE",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "MACHINE_LEARNING",
      "AWS_CLOUD",
      "GENAI_LLMS",
      "PYSPARK"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 94.0,
    "email": "bhavna.cse21_137@rvce.edu.in",
    "phone_masked": "+91 98****_137"
  },
  {
    "usn": "USN_2025_138",
    "name": "Rhea Menon",
    "branch": "CSE",
    "cgpa": 7.76,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "VECTOR_DATABASES",
      "PYSPARK",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.4,
    "email": "rhea.cse21_138@rvce.edu.in",
    "phone_masked": "+91 98****_138"
  },
  {
    "usn": "USN_2025_139",
    "name": "Kavya Joshi",
    "branch": "CSE",
    "cgpa": 7.42,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "VECTOR_DATABASES",
      "LANGCHAIN",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.0,
    "email": "kavya.cse21_139@rvce.edu.in",
    "phone_masked": "+91 98****_139"
  },
  {
    "usn": "USN_2025_140",
    "name": "Aarav Sharma",
    "branch": "CSE",
    "cgpa": 9.67,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 85.3,
    "email": "aarav.cse21_140@rvce.edu.in",
    "phone_masked": "+91 98****_140"
  },
  {
    "usn": "USN_2025_141",
    "name": "Kavya Nair",
    "branch": "CSE",
    "cgpa": 7.65,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "GENAI_LLMS",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.9,
    "email": "kavya.cse21_141@rvce.edu.in",
    "phone_masked": "+91 98****_141"
  },
  {
    "usn": "USN_2025_142",
    "name": "Divya Pillai",
    "branch": "CSE",
    "cgpa": 7.71,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "PYSPARK",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.5,
    "email": "divya.cse21_142@rvce.edu.in",
    "phone_masked": "+91 98****_142"
  },
  {
    "usn": "USN_2025_143",
    "name": "Suresh Bhat",
    "branch": "CSE",
    "cgpa": 8.06,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 85.6,
    "email": "suresh.cse21_143@rvce.edu.in",
    "phone_masked": "+91 98****_143"
  },
  {
    "usn": "USN_2025_144",
    "name": "Suresh Verma",
    "branch": "CSE",
    "cgpa": 6.53,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "MACHINE_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.8,
    "email": "suresh.cse21_144@rvce.edu.in",
    "phone_masked": "+91 98****_144"
  },
  {
    "usn": "USN_2025_145",
    "name": "Bhavna Gupta",
    "branch": "CSE",
    "cgpa": 6.46,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "LANGCHAIN",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.5,
    "email": "bhavna.cse21_145@rvce.edu.in",
    "phone_masked": "+91 98****_145"
  },
  {
    "usn": "USN_2025_146",
    "name": "Nandini Bhat",
    "branch": "CSE",
    "cgpa": 7.63,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.5,
    "email": "nandini.cse21_146@rvce.edu.in",
    "phone_masked": "+91 98****_146"
  },
  {
    "usn": "USN_2025_147",
    "name": "Tanvi Deshmukh",
    "branch": "CSE",
    "cgpa": 8.06,
    "active_backlogs": 1,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 52.2,
    "email": "tanvi.cse21_147@rvce.edu.in",
    "phone_masked": "+91 98****_147"
  },
  {
    "usn": "USN_2025_148",
    "name": "Ankit Pillai",
    "branch": "CSE",
    "cgpa": 7.52,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.1,
    "email": "ankit.cse21_148@rvce.edu.in",
    "phone_masked": "+91 98****_148"
  },
  {
    "usn": "USN_2025_149",
    "name": "Meera Deshmukh",
    "branch": "CSE",
    "cgpa": 9.21,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "VECTOR_DATABASES",
      "PYSPARK",
      "DATABRICKS_DE",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 96.8,
    "email": "meera.cse21_149@rvce.edu.in",
    "phone_masked": "+91 98****_149"
  },
  {
    "usn": "USN_2025_150",
    "name": "Vikram Joshi",
    "branch": "CSE",
    "cgpa": 9.08,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "DATABRICKS_DE",
      "PYSPARK",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 89.7,
    "email": "vikram.cse21_150@rvce.edu.in",
    "phone_masked": "+91 98****_150"
  },
  {
    "usn": "USN_2025_151",
    "name": "Ishita Patel",
    "branch": "CSE",
    "cgpa": 8.04,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "DATABRICKS_DE",
      "LANGCHAIN",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 85.5,
    "email": "ishita.cse21_151@rvce.edu.in",
    "phone_masked": "+91 98****_151"
  },
  {
    "usn": "USN_2025_152",
    "name": "Rohan Joshi",
    "branch": "CSE",
    "cgpa": 8.56,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "PYTHON",
      "DATABRICKS_DE",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 60.9,
    "email": "rohan.cse21_152@rvce.edu.in",
    "phone_masked": "+91 98****_152"
  },
  {
    "usn": "USN_2025_153",
    "name": "Shreya Sharma",
    "branch": "CSE",
    "cgpa": 7.48,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "PYSPARK",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.6,
    "email": "shreya.cse21_153@rvce.edu.in",
    "phone_masked": "+91 98****_153"
  },
  {
    "usn": "USN_2025_154",
    "name": "Deepa Gupta",
    "branch": "CSE",
    "cgpa": 7.87,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.5,
    "email": "deepa.cse21_154@rvce.edu.in",
    "phone_masked": "+91 98****_154"
  },
  {
    "usn": "USN_2025_155",
    "name": "Karthik Joshi",
    "branch": "CSE",
    "cgpa": 8.73,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "REACT",
      "VECTOR_DATABASES",
      "GENAI_LLMS",
      "PYSPARK",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 74.9,
    "email": "karthik.cse21_155@rvce.edu.in",
    "phone_masked": "+91 98****_155"
  },
  {
    "usn": "USN_2025_156",
    "name": "Kavya Sharma",
    "branch": "CSE",
    "cgpa": 6.55,
    "active_backlogs": 3,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "GENAI_LLMS",
      "AWS_CLOUD",
      "DATABRICKS_DE",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 66.2,
    "email": "kavya.cse21_156@rvce.edu.in",
    "phone_masked": "+91 98****_156"
  },
  {
    "usn": "USN_2025_157",
    "name": "Deepak Joshi",
    "branch": "CSE",
    "cgpa": 6.53,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 66.1,
    "email": "deepak.cse21_157@rvce.edu.in",
    "phone_masked": "+91 98****_157"
  },
  {
    "usn": "USN_2025_158",
    "name": "Pooja Iyer",
    "branch": "CSE",
    "cgpa": 7.81,
    "active_backlogs": 2,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "PYSPARK",
      "VECTOR_DATABASES",
      "LANGCHAIN"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.6,
    "email": "pooja.cse21_158@rvce.edu.in",
    "phone_masked": "+91 98****_158"
  },
  {
    "usn": "USN_2025_159",
    "name": "Pooja Hegde",
    "branch": "CSE",
    "cgpa": 6.65,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "GENAI_LLMS",
      "PYSPARK",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 79.9,
    "email": "pooja.cse21_159@rvce.edu.in",
    "phone_masked": "+91 98****_159"
  },
  {
    "usn": "USN_2025_160",
    "name": "Rohan Gupta",
    "branch": "CSE",
    "cgpa": 9.54,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "PYTHON",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 58.2,
    "email": "rohan.cse21_160@rvce.edu.in",
    "phone_masked": "+91 98****_160"
  },
  {
    "usn": "USN_2025_161",
    "name": "Ishita Rao",
    "branch": "CSE",
    "cgpa": 8.05,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "GENAI_LLMS",
      "LANGCHAIN"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 78.9,
    "email": "ishita.cse21_161@rvce.edu.in",
    "phone_masked": "+91 98****_161"
  },
  {
    "usn": "USN_2025_162",
    "name": "Meera Joshi",
    "branch": "CSE",
    "cgpa": 7.52,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.1,
    "email": "meera.cse21_162@rvce.edu.in",
    "phone_masked": "+91 98****_162"
  },
  {
    "usn": "USN_2025_163",
    "name": "Siddharth Nair",
    "branch": "CSE",
    "cgpa": 7.98,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "GENAI_LLMS",
      "MACHINE_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.3,
    "email": "siddharth.cse21_163@rvce.edu.in",
    "phone_masked": "+91 98****_163"
  },
  {
    "usn": "USN_2025_164",
    "name": "Aarav Iyer",
    "branch": "CSE",
    "cgpa": 7.33,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "GENAI_LLMS",
      "AWS_CLOUD",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.7,
    "email": "aarav.cse21_164@rvce.edu.in",
    "phone_masked": "+91 98****_164"
  },
  {
    "usn": "USN_2025_165",
    "name": "Ishita Pillai",
    "branch": "CSE",
    "cgpa": 8.25,
    "active_backlogs": 2,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "VECTOR_DATABASES",
      "AWS_CLOUD",
      "LANGCHAIN"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 66.3,
    "email": "ishita.cse21_165@rvce.edu.in",
    "phone_masked": "+91 98****_165"
  },
  {
    "usn": "USN_2025_166",
    "name": "Meera Nair",
    "branch": "CSE",
    "cgpa": 6.83,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "LANGCHAIN",
      "PYSPARK",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 80.7,
    "email": "meera.cse21_166@rvce.edu.in",
    "phone_masked": "+91 98****_166"
  },
  {
    "usn": "USN_2025_167",
    "name": "Kavya Hegde",
    "branch": "CSE",
    "cgpa": 7.63,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.9,
    "email": "kavya.cse21_167@rvce.edu.in",
    "phone_masked": "+91 98****_167"
  },
  {
    "usn": "USN_2025_168",
    "name": "Divya Gupta",
    "branch": "CSE",
    "cgpa": 7.51,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "GENAI_LLMS",
      "PYSPARK",
      "DATABRICKS_DE",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.0,
    "email": "divya.cse21_168@rvce.edu.in",
    "phone_masked": "+91 98****_168"
  },
  {
    "usn": "USN_2025_169",
    "name": "Varun Reddy",
    "branch": "CSE",
    "cgpa": 9.67,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "PYSPARK",
      "AWS_CLOUD",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 92.0,
    "email": "varun.cse21_169@rvce.edu.in",
    "phone_masked": "+91 98****_169"
  },
  {
    "usn": "USN_2025_170",
    "name": "Sneha Rao",
    "branch": "CSE",
    "cgpa": 9.24,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "GENAI_LLMS",
      "AWS_CLOUD",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 90.3,
    "email": "sneha.cse21_170@rvce.edu.in",
    "phone_masked": "+91 98****_170"
  },
  {
    "usn": "USN_2025_171",
    "name": "Aarav Kulkarni",
    "branch": "CSE",
    "cgpa": 7.94,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "LANGCHAIN",
      "AWS_CLOUD",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.1,
    "email": "aarav.cse21_171@rvce.edu.in",
    "phone_masked": "+91 98****_171"
  },
  {
    "usn": "USN_2025_172",
    "name": "Manish Nair",
    "branch": "CSE",
    "cgpa": 7.75,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.0,
    "email": "manish.cse21_172@rvce.edu.in",
    "phone_masked": "+91 98****_172"
  },
  {
    "usn": "USN_2025_173",
    "name": "Karthik Deshmukh",
    "branch": "CSE",
    "cgpa": 6.54,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "VECTOR_DATABASES",
      "DATABRICKS_DE",
      "MACHINE_LEARNING",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 86.2,
    "email": "karthik.cse21_173@rvce.edu.in",
    "phone_masked": "+91 98****_173"
  },
  {
    "usn": "USN_2025_174",
    "name": "Karthik Gupta",
    "branch": "CSE",
    "cgpa": 6.07,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "LANGCHAIN",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.9,
    "email": "karthik.cse21_174@rvce.edu.in",
    "phone_masked": "+91 98****_174"
  },
  {
    "usn": "USN_2025_175",
    "name": "Gaurav Menon",
    "branch": "CSE",
    "cgpa": 7.35,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "DATABRICKS_DE",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.1,
    "email": "gaurav.cse21_175@rvce.edu.in",
    "phone_masked": "+91 98****_175"
  },
  {
    "usn": "USN_2025_176",
    "name": "Gaurav Deshmukh",
    "branch": "CSE",
    "cgpa": 7.33,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.7,
    "email": "gaurav.cse21_176@rvce.edu.in",
    "phone_masked": "+91 98****_176"
  },
  {
    "usn": "USN_2025_177",
    "name": "Bhavna Nair",
    "branch": "CSE",
    "cgpa": 7.43,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "AWS_CLOUD",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.1,
    "email": "bhavna.cse21_177@rvce.edu.in",
    "phone_masked": "+91 98****_177"
  },
  {
    "usn": "USN_2025_178",
    "name": "Nikhil Deshmukh",
    "branch": "CSE",
    "cgpa": 6.37,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "VECTOR_DATABASES",
      "DATABRICKS_DE",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.8,
    "email": "nikhil.cse21_178@rvce.edu.in",
    "phone_masked": "+91 98****_178"
  },
  {
    "usn": "USN_2025_179",
    "name": "Vikram Iyer",
    "branch": "CSE",
    "cgpa": 9.36,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "LANGCHAIN"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 77.4,
    "email": "vikram.cse21_179@rvce.edu.in",
    "phone_masked": "+91 98****_179"
  },
  {
    "usn": "USN_2025_180",
    "name": "Pranav Kulkarni",
    "branch": "CSE",
    "cgpa": 6.5,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "GENAI_LLMS",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.7,
    "email": "pranav.cse21_180@rvce.edu.in",
    "phone_masked": "+91 98****_180"
  },
  {
    "usn": "USN_2025_181",
    "name": "Gaurav Hegde",
    "branch": "CSE",
    "cgpa": 6.34,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.0,
    "email": "gaurav.cse21_181@rvce.edu.in",
    "phone_masked": "+91 98****_181"
  },
  {
    "usn": "USN_2025_182",
    "name": "Pranav Verma",
    "branch": "CSE",
    "cgpa": 8.21,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "LANGCHAIN",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 86.2,
    "email": "pranav.cse21_182@rvce.edu.in",
    "phone_masked": "+91 98****_182"
  },
  {
    "usn": "USN_2025_183",
    "name": "Gaurav Reddy",
    "branch": "CSE",
    "cgpa": 7.5,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "MACHINE_LEARNING",
      "DATABRICKS_DE",
      "LANGCHAIN",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.0,
    "email": "gaurav.cse21_183@rvce.edu.in",
    "phone_masked": "+91 98****_183"
  },
  {
    "usn": "USN_2025_184",
    "name": "Pooja Reddy",
    "branch": "CSE",
    "cgpa": 6.6,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 73.1,
    "email": "pooja.cse21_184@rvce.edu.in",
    "phone_masked": "+91 98****_184"
  },
  {
    "usn": "USN_2025_185",
    "name": "Nandini Gupta",
    "branch": "CSE",
    "cgpa": 7.38,
    "active_backlogs": 2,
    "skills": [
      "REACT",
      "SQL",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 49.5,
    "email": "nandini.cse21_185@rvce.edu.in",
    "phone_masked": "+91 98****_185"
  },
  {
    "usn": "USN_2025_186",
    "name": "Neha Hegde",
    "branch": "CSE",
    "cgpa": 8.91,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "GENAI_LLMS",
      "VECTOR_DATABASES",
      "LANGCHAIN",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 95.6,
    "email": "neha.cse21_186@rvce.edu.in",
    "phone_masked": "+91 98****_186"
  },
  {
    "usn": "USN_2025_187",
    "name": "Karthik Singh",
    "branch": "CSE",
    "cgpa": 8.66,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "VECTOR_DATABASES",
      "AWS_CLOUD",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 94.6,
    "email": "karthik.cse21_187@rvce.edu.in",
    "phone_masked": "+91 98****_187"
  },
  {
    "usn": "USN_2025_188",
    "name": "Ankit Deshmukh",
    "branch": "CSE",
    "cgpa": 7.58,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "MACHINE_LEARNING",
      "PYSPARK",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.3,
    "email": "ankit.cse21_188@rvce.edu.in",
    "phone_masked": "+91 98****_188"
  },
  {
    "usn": "USN_2025_189",
    "name": "Swati Verma",
    "branch": "CSE",
    "cgpa": 7.0,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "PYSPARK",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.3,
    "email": "swati.cse21_189@rvce.edu.in",
    "phone_masked": "+91 98****_189"
  },
  {
    "usn": "USN_2025_190",
    "name": "Gaurav Deshmukh",
    "branch": "CSE",
    "cgpa": 7.22,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "PYSPARK",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 75.5,
    "email": "gaurav.cse21_190@rvce.edu.in",
    "phone_masked": "+91 98****_190"
  },
  {
    "usn": "USN_2025_191",
    "name": "Harsh Nair",
    "branch": "CSE",
    "cgpa": 8.21,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "LANGCHAIN",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 86.2,
    "email": "harsh.cse21_191@rvce.edu.in",
    "phone_masked": "+91 98****_191"
  },
  {
    "usn": "USN_2025_192",
    "name": "Nikhil Bhat",
    "branch": "CSE",
    "cgpa": 6.29,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "DATABRICKS_DE",
      "PYSPARK",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.2,
    "email": "nikhil.cse21_192@rvce.edu.in",
    "phone_masked": "+91 98****_192"
  },
  {
    "usn": "USN_2025_193",
    "name": "Vikram Patel",
    "branch": "CSE",
    "cgpa": 7.79,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.2,
    "email": "vikram.cse21_193@rvce.edu.in",
    "phone_masked": "+91 98****_193"
  },
  {
    "usn": "USN_2025_194",
    "name": "Ankit Bhat",
    "branch": "CSE",
    "cgpa": 6.17,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "PYSPARK",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.7,
    "email": "ankit.cse21_194@rvce.edu.in",
    "phone_masked": "+91 98****_194"
  },
  {
    "usn": "USN_2025_195",
    "name": "Manish Iyer",
    "branch": "CSE",
    "cgpa": 6.49,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "PYTHON",
      "MACHINE_LEARNING",
      "LANGCHAIN",
      "GENAI_LLMS",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 66.0,
    "email": "manish.cse21_195@rvce.edu.in",
    "phone_masked": "+91 98****_195"
  },
  {
    "usn": "USN_2025_196",
    "name": "Divya Patel",
    "branch": "CSE",
    "cgpa": 8.27,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "REACT",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 53.1,
    "email": "divya.cse21_196@rvce.edu.in",
    "phone_masked": "+91 98****_196"
  },
  {
    "usn": "USN_2025_197",
    "name": "Aarav Bhat",
    "branch": "CSE",
    "cgpa": 7.83,
    "active_backlogs": 2,
    "skills": [
      "REACT",
      "PYTHON",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 51.3,
    "email": "aarav.cse21_197@rvce.edu.in",
    "phone_masked": "+91 98****_197"
  },
  {
    "usn": "USN_2025_198",
    "name": "Tanvi Verma",
    "branch": "CSE",
    "cgpa": 5.68,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "AWS_CLOUD",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.4,
    "email": "tanvi.cse21_198@rvce.edu.in",
    "phone_masked": "+91 98****_198"
  },
  {
    "usn": "USN_2025_199",
    "name": "Bhavna Singh",
    "branch": "CSE",
    "cgpa": 7.43,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "PYSPARK",
      "LANGCHAIN",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 89.7,
    "email": "bhavna.cse21_199@rvce.edu.in",
    "phone_masked": "+91 98****_199"
  },
  {
    "usn": "USN_2025_200",
    "name": "Sneha Pillai",
    "branch": "CSE",
    "cgpa": 6.2,
    "active_backlogs": 2,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 51.5,
    "email": "sneha.cse21_200@rvce.edu.in",
    "phone_masked": "+91 98****_200"
  },
  {
    "usn": "USN_2025_201",
    "name": "Neha Bhat",
    "branch": "CSE",
    "cgpa": 6.64,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 66.6,
    "email": "neha.cse21_201@rvce.edu.in",
    "phone_masked": "+91 98****_201"
  },
  {
    "usn": "USN_2025_202",
    "name": "Divya Kulkarni",
    "branch": "ISE",
    "cgpa": 7.94,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "PYSPARK",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.4,
    "email": "divya.ise21_202@rvce.edu.in",
    "phone_masked": "+91 98****_202"
  },
  {
    "usn": "USN_2025_203",
    "name": "Suresh Pillai",
    "branch": "ISE",
    "cgpa": 9.77,
    "active_backlogs": 1,
    "skills": [
      "CPP",
      "SQL",
      "PYSPARK",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 65.7,
    "email": "suresh.ise21_203@rvce.edu.in",
    "phone_masked": "+91 98****_203"
  },
  {
    "usn": "USN_2025_204",
    "name": "Varun Iyer",
    "branch": "ISE",
    "cgpa": 7.73,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "GENAI_LLMS",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.6,
    "email": "varun.ise21_204@rvce.edu.in",
    "phone_masked": "+91 98****_204"
  },
  {
    "usn": "USN_2025_205",
    "name": "Ankit Hegde",
    "branch": "ISE",
    "cgpa": 7.83,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.3,
    "email": "ankit.ise21_205@rvce.edu.in",
    "phone_masked": "+91 98****_205"
  },
  {
    "usn": "USN_2025_206",
    "name": "Nandini Kulkarni",
    "branch": "ISE",
    "cgpa": 6.74,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "PYTHON",
      "GENAI_LLMS",
      "PYSPARK",
      "VECTOR_DATABASES",
      "LANGCHAIN"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 67.0,
    "email": "nandini.ise21_206@rvce.edu.in",
    "phone_masked": "+91 98****_206"
  },
  {
    "usn": "USN_2025_207",
    "name": "Deepa Deshmukh",
    "branch": "ISE",
    "cgpa": 8.39,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 73.6,
    "email": "deepa.ise21_207@rvce.edu.in",
    "phone_masked": "+91 98****_207"
  },
  {
    "usn": "USN_2025_208",
    "name": "Siddharth Hegde",
    "branch": "ISE",
    "cgpa": 7.44,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "MACHINE_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.4,
    "email": "siddharth.ise21_208@rvce.edu.in",
    "phone_masked": "+91 98****_208"
  },
  {
    "usn": "USN_2025_209",
    "name": "Meera Patel",
    "branch": "ISE",
    "cgpa": 7.47,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "SQL",
      "DATABRICKS_DE",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 56.5,
    "email": "meera.ise21_209@rvce.edu.in",
    "phone_masked": "+91 98****_209"
  },
  {
    "usn": "USN_2025_210",
    "name": "Siddharth Rao",
    "branch": "ISE",
    "cgpa": 9.31,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "MACHINE_LEARNING",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 83.9,
    "email": "siddharth.ise21_210@rvce.edu.in",
    "phone_masked": "+91 98****_210"
  },
  {
    "usn": "USN_2025_211",
    "name": "Tanvi Hegde",
    "branch": "ISE",
    "cgpa": 8.15,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 72.6,
    "email": "tanvi.ise21_211@rvce.edu.in",
    "phone_masked": "+91 98****_211"
  },
  {
    "usn": "USN_2025_212",
    "name": "Siddharth Kulkarni",
    "branch": "ISE",
    "cgpa": 7.2,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES",
      "AWS_CLOUD",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 88.8,
    "email": "siddharth.ise21_212@rvce.edu.in",
    "phone_masked": "+91 98****_212"
  },
  {
    "usn": "USN_2025_213",
    "name": "Aarav Rao",
    "branch": "ISE",
    "cgpa": 6.27,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.7,
    "email": "aarav.ise21_213@rvce.edu.in",
    "phone_masked": "+91 98****_213"
  },
  {
    "usn": "USN_2025_214",
    "name": "Rohan Deshmukh",
    "branch": "ISE",
    "cgpa": 8.62,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 81.1,
    "email": "rohan.ise21_214@rvce.edu.in",
    "phone_masked": "+91 98****_214"
  },
  {
    "usn": "USN_2025_215",
    "name": "Siddharth Pillai",
    "branch": "ISE",
    "cgpa": 7.53,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.1,
    "email": "siddharth.ise21_215@rvce.edu.in",
    "phone_masked": "+91 98****_215"
  },
  {
    "usn": "USN_2025_216",
    "name": "Gaurav Deshmukh",
    "branch": "ISE",
    "cgpa": 7.92,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "DATABRICKS_DE",
      "PYSPARK",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.0,
    "email": "gaurav.ise21_216@rvce.edu.in",
    "phone_masked": "+91 98****_216"
  },
  {
    "usn": "USN_2025_217",
    "name": "Harsh Deshmukh",
    "branch": "ISE",
    "cgpa": 7.2,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "AWS_CLOUD",
      "PYSPARK",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 88.8,
    "email": "harsh.ise21_217@rvce.edu.in",
    "phone_masked": "+91 98****_217"
  },
  {
    "usn": "USN_2025_218",
    "name": "Ananya Patel",
    "branch": "ISE",
    "cgpa": 7.51,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.0,
    "email": "ananya.ise21_218@rvce.edu.in",
    "phone_masked": "+91 98****_218"
  },
  {
    "usn": "USN_2025_219",
    "name": "Siddharth Nair",
    "branch": "ISE",
    "cgpa": 7.63,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "DATABRICKS_DE",
      "MACHINE_LEARNING",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.9,
    "email": "siddharth.ise21_219@rvce.edu.in",
    "phone_masked": "+91 98****_219"
  },
  {
    "usn": "USN_2025_220",
    "name": "Suresh Hegde",
    "branch": "ISE",
    "cgpa": 7.97,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "AWS_CLOUD",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.5,
    "email": "suresh.ise21_220@rvce.edu.in",
    "phone_masked": "+91 98****_220"
  },
  {
    "usn": "USN_2025_221",
    "name": "Rhea Reddy",
    "branch": "ISE",
    "cgpa": 7.98,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.9,
    "email": "rhea.ise21_221@rvce.edu.in",
    "phone_masked": "+91 98****_221"
  },
  {
    "usn": "USN_2025_222",
    "name": "Kavya Reddy",
    "branch": "ISE",
    "cgpa": 9.39,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "LANGCHAIN",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 90.9,
    "email": "kavya.ise21_222@rvce.edu.in",
    "phone_masked": "+91 98****_222"
  },
  {
    "usn": "USN_2025_223",
    "name": "Aarav Sharma",
    "branch": "ISE",
    "cgpa": 8.06,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 72.2,
    "email": "aarav.ise21_223@rvce.edu.in",
    "phone_masked": "+91 98****_223"
  },
  {
    "usn": "USN_2025_224",
    "name": "Nikhil Joshi",
    "branch": "ISE",
    "cgpa": 7.3,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.2,
    "email": "nikhil.ise21_224@rvce.edu.in",
    "phone_masked": "+91 98****_224"
  },
  {
    "usn": "USN_2025_225",
    "name": "Harsh Patel",
    "branch": "ISE",
    "cgpa": 7.44,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "GENAI_LLMS",
      "DATABRICKS_DE",
      "LANGCHAIN",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 89.8,
    "email": "harsh.ise21_225@rvce.edu.in",
    "phone_masked": "+91 98****_225"
  },
  {
    "usn": "USN_2025_226",
    "name": "Gaurav Hegde",
    "branch": "ISE",
    "cgpa": 5.53,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 68.8,
    "email": "gaurav.ise21_226@rvce.edu.in",
    "phone_masked": "+91 98****_226"
  },
  {
    "usn": "USN_2025_227",
    "name": "Shreya Deshmukh",
    "branch": "ISE",
    "cgpa": 8.66,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "AWS_CLOUD",
      "DATABRICKS_DE",
      "GENAI_LLMS",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 94.6,
    "email": "shreya.ise21_227@rvce.edu.in",
    "phone_masked": "+91 98****_227"
  },
  {
    "usn": "USN_2025_228",
    "name": "Varun Verma",
    "branch": "ISE",
    "cgpa": 5.52,
    "active_backlogs": 3,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 42.1,
    "email": "varun.ise21_228@rvce.edu.in",
    "phone_masked": "+91 98****_228"
  },
  {
    "usn": "USN_2025_229",
    "name": "Aarav Sharma",
    "branch": "ISE",
    "cgpa": 7.36,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "LANGCHAIN",
      "VECTOR_DATABASES",
      "GENAI_LLMS",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 89.4,
    "email": "aarav.ise21_229@rvce.edu.in",
    "phone_masked": "+91 98****_229"
  },
  {
    "usn": "USN_2025_230",
    "name": "Sneha Verma",
    "branch": "ISE",
    "cgpa": 9.3,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 90.5,
    "email": "sneha.ise21_230@rvce.edu.in",
    "phone_masked": "+91 98****_230"
  },
  {
    "usn": "USN_2025_231",
    "name": "Pranav Verma",
    "branch": "ISE",
    "cgpa": 9.81,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "GENAI_LLMS",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 92.6,
    "email": "pranav.ise21_231@rvce.edu.in",
    "phone_masked": "+91 98****_231"
  },
  {
    "usn": "USN_2025_232",
    "name": "Aditya Sharma",
    "branch": "ISE",
    "cgpa": 8.01,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "PYSPARK",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 78.7,
    "email": "aditya.ise21_232@rvce.edu.in",
    "phone_masked": "+91 98****_232"
  },
  {
    "usn": "USN_2025_233",
    "name": "Ankit Iyer",
    "branch": "ISE",
    "cgpa": 7.83,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "GENAI_LLMS",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.0,
    "email": "ankit.ise21_233@rvce.edu.in",
    "phone_masked": "+91 98****_233"
  },
  {
    "usn": "USN_2025_234",
    "name": "Meera Patel",
    "branch": "ISE",
    "cgpa": 6.35,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "LANGCHAIN",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.1,
    "email": "meera.ise21_234@rvce.edu.in",
    "phone_masked": "+91 98****_234"
  },
  {
    "usn": "USN_2025_235",
    "name": "Karthik Pillai",
    "branch": "ISE",
    "cgpa": 9.46,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 91.2,
    "email": "karthik.ise21_235@rvce.edu.in",
    "phone_masked": "+91 98****_235"
  },
  {
    "usn": "USN_2025_236",
    "name": "Rhea Patel",
    "branch": "ISE",
    "cgpa": 7.87,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.5,
    "email": "rhea.ise21_236@rvce.edu.in",
    "phone_masked": "+91 98****_236"
  },
  {
    "usn": "USN_2025_237",
    "name": "Ankit Patel",
    "branch": "ISE",
    "cgpa": 5.9,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 63.6,
    "email": "ankit.ise21_237@rvce.edu.in",
    "phone_masked": "+91 98****_237"
  },
  {
    "usn": "USN_2025_238",
    "name": "Rohan Joshi",
    "branch": "ISE",
    "cgpa": 8.77,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 81.7,
    "email": "rohan.ise21_238@rvce.edu.in",
    "phone_masked": "+91 98****_238"
  },
  {
    "usn": "USN_2025_239",
    "name": "Tanvi Verma",
    "branch": "ISE",
    "cgpa": 8.91,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 75.6,
    "email": "tanvi.ise21_239@rvce.edu.in",
    "phone_masked": "+91 98****_239"
  },
  {
    "usn": "USN_2025_240",
    "name": "Nandini Kulkarni",
    "branch": "ISE",
    "cgpa": 7.11,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 55.1,
    "email": "nandini.ise21_240@rvce.edu.in",
    "phone_masked": "+91 98****_240"
  },
  {
    "usn": "USN_2025_241",
    "name": "Bhavna Kulkarni",
    "branch": "ISE",
    "cgpa": 5.84,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "LANGCHAIN",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.7,
    "email": "bhavna.ise21_241@rvce.edu.in",
    "phone_masked": "+91 98****_241"
  },
  {
    "usn": "USN_2025_242",
    "name": "Kavya Menon",
    "branch": "ISE",
    "cgpa": 6.01,
    "active_backlogs": 2,
    "skills": [
      "SQL",
      "CPP",
      "LANGCHAIN"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 44.0,
    "email": "kavya.ise21_242@rvce.edu.in",
    "phone_masked": "+91 98****_242"
  },
  {
    "usn": "USN_2025_243",
    "name": "Shreya Hegde",
    "branch": "ISE",
    "cgpa": 8.04,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "AWS_CLOUD",
      "DATABRICKS_DE",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 92.2,
    "email": "shreya.ise21_243@rvce.edu.in",
    "phone_masked": "+91 98****_243"
  },
  {
    "usn": "USN_2025_244",
    "name": "Rohan Pillai",
    "branch": "ISE",
    "cgpa": 8.65,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 74.6,
    "email": "rohan.ise21_244@rvce.edu.in",
    "phone_masked": "+91 98****_244"
  },
  {
    "usn": "USN_2025_245",
    "name": "Rohan Singh",
    "branch": "ISE",
    "cgpa": 7.86,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.4,
    "email": "rohan.ise21_245@rvce.edu.in",
    "phone_masked": "+91 98****_245"
  },
  {
    "usn": "USN_2025_246",
    "name": "Ananya Pillai",
    "branch": "ISE",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 74.0,
    "email": "ananya.ise21_246@rvce.edu.in",
    "phone_masked": "+91 98****_246"
  },
  {
    "usn": "USN_2025_247",
    "name": "Varun Iyer",
    "branch": "ISE",
    "cgpa": 7.2,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "LANGCHAIN",
      "GENAI_LLMS",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.1,
    "email": "varun.ise21_247@rvce.edu.in",
    "phone_masked": "+91 98****_247"
  },
  {
    "usn": "USN_2025_248",
    "name": "Divya Hegde",
    "branch": "ISE",
    "cgpa": 6.56,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.9,
    "email": "divya.ise21_248@rvce.edu.in",
    "phone_masked": "+91 98****_248"
  },
  {
    "usn": "USN_2025_249",
    "name": "Bhavna Nair",
    "branch": "ISE",
    "cgpa": 7.41,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.6,
    "email": "bhavna.ise21_249@rvce.edu.in",
    "phone_masked": "+91 98****_249"
  },
  {
    "usn": "USN_2025_250",
    "name": "Pranav Nair",
    "branch": "ISE",
    "cgpa": 5.93,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "PYSPARK",
      "DATABRICKS_DE",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.7,
    "email": "pranav.ise21_250@rvce.edu.in",
    "phone_masked": "+91 98****_250"
  },
  {
    "usn": "USN_2025_251",
    "name": "Karthik Singh",
    "branch": "ISE",
    "cgpa": 7.56,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "DATABRICKS_DE",
      "GENAI_LLMS",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.6,
    "email": "karthik.ise21_251@rvce.edu.in",
    "phone_masked": "+91 98****_251"
  },
  {
    "usn": "USN_2025_252",
    "name": "Neha Kulkarni",
    "branch": "ISE",
    "cgpa": 7.81,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "LANGCHAIN",
      "VECTOR_DATABASES",
      "PYSPARK",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.2,
    "email": "neha.ise21_252@rvce.edu.in",
    "phone_masked": "+91 98****_252"
  },
  {
    "usn": "USN_2025_253",
    "name": "Siddharth Singh",
    "branch": "ISE",
    "cgpa": 8.02,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "VECTOR_DATABASES",
      "LANGCHAIN"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 78.7,
    "email": "siddharth.ise21_253@rvce.edu.in",
    "phone_masked": "+91 98****_253"
  },
  {
    "usn": "USN_2025_254",
    "name": "Kavya Nair",
    "branch": "ISE",
    "cgpa": 7.89,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "GENAI_LLMS",
      "MACHINE_LEARNING",
      "DATABRICKS_DE",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.6,
    "email": "kavya.ise21_254@rvce.edu.in",
    "phone_masked": "+91 98****_254"
  },
  {
    "usn": "USN_2025_255",
    "name": "Gaurav Gupta",
    "branch": "ISE",
    "cgpa": 7.47,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "DATABRICKS_DE",
      "LANGCHAIN"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.5,
    "email": "gaurav.ise21_255@rvce.edu.in",
    "phone_masked": "+91 98****_255"
  },
  {
    "usn": "USN_2025_256",
    "name": "Shreya Joshi",
    "branch": "ISE",
    "cgpa": 7.71,
    "active_backlogs": 1,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "GENAI_LLMS",
      "DATABRICKS_DE",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.2,
    "email": "shreya.ise21_256@rvce.edu.in",
    "phone_masked": "+91 98****_256"
  },
  {
    "usn": "USN_2025_257",
    "name": "Manish Kulkarni",
    "branch": "ISE",
    "cgpa": 7.2,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "DATABRICKS_DE",
      "MACHINE_LEARNING",
      "AWS_CLOUD",
      "LANGCHAIN"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 88.8,
    "email": "manish.ise21_257@rvce.edu.in",
    "phone_masked": "+91 98****_257"
  },
  {
    "usn": "USN_2025_258",
    "name": "Ishita Menon",
    "branch": "ISE",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 87.3,
    "email": "ishita.ise21_258@rvce.edu.in",
    "phone_masked": "+91 98****_258"
  },
  {
    "usn": "USN_2025_259",
    "name": "Ankit Sharma",
    "branch": "ISE",
    "cgpa": 8.07,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 78.9,
    "email": "ankit.ise21_259@rvce.edu.in",
    "phone_masked": "+91 98****_259"
  },
  {
    "usn": "USN_2025_260",
    "name": "Bhavna Patel",
    "branch": "ISE",
    "cgpa": 7.31,
    "active_backlogs": 1,
    "skills": [
      "JAVA_BACKEND",
      "CPP",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 55.9,
    "email": "bhavna.ise21_260@rvce.edu.in",
    "phone_masked": "+91 98****_260"
  },
  {
    "usn": "USN_2025_261",
    "name": "Manish Kulkarni",
    "branch": "ISE",
    "cgpa": 7.12,
    "active_backlogs": 1,
    "skills": [
      "REACT",
      "SQL",
      "DATABRICKS_DE",
      "MACHINE_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 61.8,
    "email": "manish.ise21_261@rvce.edu.in",
    "phone_masked": "+91 98****_261"
  },
  {
    "usn": "USN_2025_262",
    "name": "Deepa Rao",
    "branch": "ISE",
    "cgpa": 7.0,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 68.0,
    "email": "deepa.ise21_262@rvce.edu.in",
    "phone_masked": "+91 98****_262"
  },
  {
    "usn": "USN_2025_263",
    "name": "Neha Menon",
    "branch": "ISE",
    "cgpa": 8.53,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 74.1,
    "email": "neha.ise21_263@rvce.edu.in",
    "phone_masked": "+91 98****_263"
  },
  {
    "usn": "USN_2025_264",
    "name": "Aarav Hegde",
    "branch": "ISE",
    "cgpa": 7.13,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "LANGCHAIN",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.9,
    "email": "aarav.ise21_264@rvce.edu.in",
    "phone_masked": "+91 98****_264"
  },
  {
    "usn": "USN_2025_265",
    "name": "Vikram Rao",
    "branch": "ISE",
    "cgpa": 7.76,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "LANGCHAIN",
      "DATABRICKS_DE",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.0,
    "email": "vikram.ise21_265@rvce.edu.in",
    "phone_masked": "+91 98****_265"
  },
  {
    "usn": "USN_2025_266",
    "name": "Karthik Reddy",
    "branch": "ISE",
    "cgpa": 6.29,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.5,
    "email": "karthik.ise21_266@rvce.edu.in",
    "phone_masked": "+91 98****_266"
  },
  {
    "usn": "USN_2025_267",
    "name": "Divya Reddy",
    "branch": "ISE",
    "cgpa": 7.76,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.4,
    "email": "divya.ise21_267@rvce.edu.in",
    "phone_masked": "+91 98****_267"
  },
  {
    "usn": "USN_2025_268",
    "name": "Rhea Bhat",
    "branch": "ISE",
    "cgpa": 7.38,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "DATABRICKS_DE",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.2,
    "email": "rhea.ise21_268@rvce.edu.in",
    "phone_masked": "+91 98****_268"
  },
  {
    "usn": "USN_2025_269",
    "name": "Aditya Bhat",
    "branch": "ISE",
    "cgpa": 7.75,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "PYSPARK",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.7,
    "email": "aditya.ise21_269@rvce.edu.in",
    "phone_masked": "+91 98****_269"
  },
  {
    "usn": "USN_2025_270",
    "name": "Rohan Iyer",
    "branch": "ISE",
    "cgpa": 6.61,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "REACT",
      "LANGCHAIN",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 53.1,
    "email": "rohan.ise21_270@rvce.edu.in",
    "phone_masked": "+91 98****_270"
  },
  {
    "usn": "USN_2025_271",
    "name": "Rohan Bhat",
    "branch": "ISE",
    "cgpa": 6.91,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 67.6,
    "email": "rohan.ise21_271@rvce.edu.in",
    "phone_masked": "+91 98****_271"
  },
  {
    "usn": "USN_2025_272",
    "name": "Neha Menon",
    "branch": "ISE",
    "cgpa": 6.42,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "LANGCHAIN",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.3,
    "email": "neha.ise21_272@rvce.edu.in",
    "phone_masked": "+91 98****_272"
  },
  {
    "usn": "USN_2025_273",
    "name": "Ankit Kulkarni",
    "branch": "ISE",
    "cgpa": 7.59,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "VECTOR_DATABASES",
      "DATABRICKS_DE",
      "LANGCHAIN",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.4,
    "email": "ankit.ise21_273@rvce.edu.in",
    "phone_masked": "+91 98****_273"
  },
  {
    "usn": "USN_2025_274",
    "name": "Neha Menon",
    "branch": "ISE",
    "cgpa": 7.71,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.2,
    "email": "neha.ise21_274@rvce.edu.in",
    "phone_masked": "+91 98****_274"
  },
  {
    "usn": "USN_2025_275",
    "name": "Gaurav Deshmukh",
    "branch": "ISE",
    "cgpa": 7.2,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "AWS_CLOUD",
      "PYSPARK",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.1,
    "email": "gaurav.ise21_275@rvce.edu.in",
    "phone_masked": "+91 98****_275"
  },
  {
    "usn": "USN_2025_276",
    "name": "Divya Iyer",
    "branch": "ISE",
    "cgpa": 6.67,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "LANGCHAIN",
      "VECTOR_DATABASES",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 80.0,
    "email": "divya.ise21_276@rvce.edu.in",
    "phone_masked": "+91 98****_276"
  },
  {
    "usn": "USN_2025_277",
    "name": "Siddharth Kulkarni",
    "branch": "ISE",
    "cgpa": 8.0,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "MACHINE_LEARNING",
      "PYSPARK",
      "GENAI_LLMS",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 92.0,
    "email": "siddharth.ise21_277@rvce.edu.in",
    "phone_masked": "+91 98****_277"
  },
  {
    "usn": "USN_2025_278",
    "name": "Varun Deshmukh",
    "branch": "ISE",
    "cgpa": 5.52,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "AWS_CLOUD",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 75.4,
    "email": "varun.ise21_278@rvce.edu.in",
    "phone_masked": "+91 98****_278"
  },
  {
    "usn": "USN_2025_279",
    "name": "Bhavna Singh",
    "branch": "ISE",
    "cgpa": 6.43,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 65.7,
    "email": "bhavna.ise21_279@rvce.edu.in",
    "phone_masked": "+91 98****_279"
  },
  {
    "usn": "USN_2025_280",
    "name": "Deepa Kulkarni",
    "branch": "ISE",
    "cgpa": 7.33,
    "active_backlogs": 3,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "VECTOR_DATABASES",
      "LANGCHAIN",
      "PYSPARK",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.3,
    "email": "deepa.ise21_280@rvce.edu.in",
    "phone_masked": "+91 98****_280"
  },
  {
    "usn": "USN_2025_281",
    "name": "Sneha Hegde",
    "branch": "ISE",
    "cgpa": 6.27,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.4,
    "email": "sneha.ise21_281@rvce.edu.in",
    "phone_masked": "+91 98****_281"
  },
  {
    "usn": "USN_2025_282",
    "name": "Gaurav Nair",
    "branch": "ISE",
    "cgpa": 7.72,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "LANGCHAIN",
      "AWS_CLOUD",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.9,
    "email": "gaurav.ise21_282@rvce.edu.in",
    "phone_masked": "+91 98****_282"
  },
  {
    "usn": "USN_2025_283",
    "name": "Karthik Menon",
    "branch": "ISE",
    "cgpa": 6.59,
    "active_backlogs": 1,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 46.4,
    "email": "karthik.ise21_283@rvce.edu.in",
    "phone_masked": "+91 98****_283"
  },
  {
    "usn": "USN_2025_284",
    "name": "Sneha Reddy",
    "branch": "ISE",
    "cgpa": 5.58,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "PYTHON",
      "GENAI_LLMS",
      "AWS_CLOUD",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 75.7,
    "email": "sneha.ise21_284@rvce.edu.in",
    "phone_masked": "+91 98****_284"
  },
  {
    "usn": "USN_2025_285",
    "name": "Rohan Joshi",
    "branch": "ISE",
    "cgpa": 6.11,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "GENAI_LLMS",
      "AWS_CLOUD",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.8,
    "email": "rohan.ise21_285@rvce.edu.in",
    "phone_masked": "+91 98****_285"
  },
  {
    "usn": "USN_2025_286",
    "name": "Rohan Bhat",
    "branch": "ISE",
    "cgpa": 7.38,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.2,
    "email": "rohan.ise21_286@rvce.edu.in",
    "phone_masked": "+91 98****_286"
  },
  {
    "usn": "USN_2025_287",
    "name": "Aditya Bhat",
    "branch": "ISE",
    "cgpa": 8.01,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "GENAI_LLMS",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 78.7,
    "email": "aditya.ise21_287@rvce.edu.in",
    "phone_masked": "+91 98****_287"
  },
  {
    "usn": "USN_2025_288",
    "name": "Nikhil Verma",
    "branch": "ISE",
    "cgpa": 9.21,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 83.5,
    "email": "nikhil.ise21_288@rvce.edu.in",
    "phone_masked": "+91 98****_288"
  },
  {
    "usn": "USN_2025_289",
    "name": "Ananya Menon",
    "branch": "ISE",
    "cgpa": 7.3,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "REACT",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 55.9,
    "email": "ananya.ise21_289@rvce.edu.in",
    "phone_masked": "+91 98****_289"
  },
  {
    "usn": "USN_2025_290",
    "name": "Aarav Reddy",
    "branch": "ISE",
    "cgpa": 7.82,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "LANGCHAIN",
      "AWS_CLOUD",
      "GENAI_LLMS",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.3,
    "email": "aarav.ise21_290@rvce.edu.in",
    "phone_masked": "+91 98****_290"
  },
  {
    "usn": "USN_2025_291",
    "name": "Nikhil Iyer",
    "branch": "ISE",
    "cgpa": 6.02,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES",
      "AWS_CLOUD",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.1,
    "email": "nikhil.ise21_291@rvce.edu.in",
    "phone_masked": "+91 98****_291"
  },
  {
    "usn": "USN_2025_292",
    "name": "Gaurav Pillai",
    "branch": "ISE",
    "cgpa": 6.33,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "LANGCHAIN",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.0,
    "email": "gaurav.ise21_292@rvce.edu.in",
    "phone_masked": "+91 98****_292"
  },
  {
    "usn": "USN_2025_293",
    "name": "Deepak Iyer",
    "branch": "ISE",
    "cgpa": 7.27,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.1,
    "email": "deepak.ise21_293@rvce.edu.in",
    "phone_masked": "+91 98****_293"
  },
  {
    "usn": "USN_2025_294",
    "name": "Vikram Gupta",
    "branch": "ISE",
    "cgpa": 6.52,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 66.1,
    "email": "vikram.ise21_294@rvce.edu.in",
    "phone_masked": "+91 98****_294"
  },
  {
    "usn": "USN_2025_295",
    "name": "Karthik Gupta",
    "branch": "ISE",
    "cgpa": 5.81,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "VECTOR_DATABASES",
      "DATABRICKS_DE",
      "AWS_CLOUD",
      "LANGCHAIN"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.2,
    "email": "karthik.ise21_295@rvce.edu.in",
    "phone_masked": "+91 98****_295"
  },
  {
    "usn": "USN_2025_296",
    "name": "Karthik Rao",
    "branch": "ISE",
    "cgpa": 7.67,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "PYSPARK",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.3,
    "email": "karthik.ise21_296@rvce.edu.in",
    "phone_masked": "+91 98****_296"
  },
  {
    "usn": "USN_2025_297",
    "name": "Rhea Menon",
    "branch": "ISE",
    "cgpa": 6.77,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "LANGCHAIN",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 80.4,
    "email": "rhea.ise21_297@rvce.edu.in",
    "phone_masked": "+91 98****_297"
  },
  {
    "usn": "USN_2025_298",
    "name": "Deepak Gupta",
    "branch": "ISE",
    "cgpa": 6.69,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "VECTOR_DATABASES",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 73.4,
    "email": "deepak.ise21_298@rvce.edu.in",
    "phone_masked": "+91 98****_298"
  },
  {
    "usn": "USN_2025_299",
    "name": "Varun Pillai",
    "branch": "ISE",
    "cgpa": 6.91,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "DATABRICKS_DE",
      "AWS_CLOUD",
      "GENAI_LLMS",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 87.6,
    "email": "varun.ise21_299@rvce.edu.in",
    "phone_masked": "+91 98****_299"
  },
  {
    "usn": "USN_2025_300",
    "name": "Ananya Singh",
    "branch": "ISE",
    "cgpa": 6.47,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "PYTHON",
      "DATABRICKS_DE",
      "PYSPARK",
      "GENAI_LLMS",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 65.9,
    "email": "ananya.ise21_300@rvce.edu.in",
    "phone_masked": "+91 98****_300"
  },
  {
    "usn": "USN_2025_301",
    "name": "Swati Reddy",
    "branch": "ISE",
    "cgpa": 6.49,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "CPP",
      "VECTOR_DATABASES",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.6,
    "email": "swati.ise21_301@rvce.edu.in",
    "phone_masked": "+91 98****_301"
  },
  {
    "usn": "USN_2025_302",
    "name": "Siddharth Iyer",
    "branch": "ISE",
    "cgpa": 5.87,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "DATABRICKS_DE",
      "PYSPARK",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.5,
    "email": "siddharth.ise21_302@rvce.edu.in",
    "phone_masked": "+91 98****_302"
  },
  {
    "usn": "USN_2025_303",
    "name": "Pranav Joshi",
    "branch": "ISE",
    "cgpa": 7.46,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "PYTHON",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.2,
    "email": "pranav.ise21_303@rvce.edu.in",
    "phone_masked": "+91 98****_303"
  },
  {
    "usn": "USN_2025_304",
    "name": "Aditya Nair",
    "branch": "ISE",
    "cgpa": 6.22,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.9,
    "email": "aditya.ise21_304@rvce.edu.in",
    "phone_masked": "+91 98****_304"
  },
  {
    "usn": "USN_2025_305",
    "name": "Nandini Verma",
    "branch": "ISE",
    "cgpa": 6.7,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 66.8,
    "email": "nandini.ise21_305@rvce.edu.in",
    "phone_masked": "+91 98****_305"
  },
  {
    "usn": "USN_2025_306",
    "name": "Ishita Singh",
    "branch": "ISE",
    "cgpa": 7.76,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.0,
    "email": "ishita.ise21_306@rvce.edu.in",
    "phone_masked": "+91 98****_306"
  },
  {
    "usn": "USN_2025_307",
    "name": "Shreya Reddy",
    "branch": "ISE",
    "cgpa": 8.2,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "GENAI_LLMS",
      "LANGCHAIN",
      "VECTOR_DATABASES",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 92.8,
    "email": "shreya.ise21_307@rvce.edu.in",
    "phone_masked": "+91 98****_307"
  },
  {
    "usn": "USN_2025_308",
    "name": "Deepak Iyer",
    "branch": "ISE",
    "cgpa": 9.62,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "JAVA_BACKEND",
      "PYSPARK",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 85.1,
    "email": "deepak.ise21_308@rvce.edu.in",
    "phone_masked": "+91 98****_308"
  },
  {
    "usn": "USN_2025_309",
    "name": "Rhea Rao",
    "branch": "ISE",
    "cgpa": 8.89,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "VECTOR_DATABASES",
      "GENAI_LLMS",
      "LANGCHAIN",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 95.6,
    "email": "rhea.ise21_309@rvce.edu.in",
    "phone_masked": "+91 98****_309"
  },
  {
    "usn": "USN_2025_310",
    "name": "Aarav Nair",
    "branch": "ISE",
    "cgpa": 7.13,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "AWS_CLOUD",
      "VECTOR_DATABASES",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.9,
    "email": "aarav.ise21_310@rvce.edu.in",
    "phone_masked": "+91 98****_310"
  },
  {
    "usn": "USN_2025_311",
    "name": "Manish Nair",
    "branch": "ISE",
    "cgpa": 7.84,
    "active_backlogs": 2,
    "skills": [
      "REACT",
      "PYTHON",
      "GENAI_LLMS",
      "VECTOR_DATABASES",
      "LANGCHAIN",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.4,
    "email": "manish.ise21_311@rvce.edu.in",
    "phone_masked": "+91 98****_311"
  },
  {
    "usn": "USN_2025_312",
    "name": "Aditya Hegde",
    "branch": "ISE",
    "cgpa": 7.29,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "MACHINE_LEARNING",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 75.8,
    "email": "aditya.ise21_312@rvce.edu.in",
    "phone_masked": "+91 98****_312"
  },
  {
    "usn": "USN_2025_313",
    "name": "Deepa Gupta",
    "branch": "ISE",
    "cgpa": 5.6,
    "active_backlogs": 1,
    "skills": [
      "CPP",
      "REACT",
      "DATABRICKS_DE",
      "LANGCHAIN",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 55.7,
    "email": "deepa.ise21_313@rvce.edu.in",
    "phone_masked": "+91 98****_313"
  },
  {
    "usn": "USN_2025_314",
    "name": "Siddharth Rao",
    "branch": "ISE",
    "cgpa": 7.0,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "REACT",
      "MACHINE_LEARNING",
      "LANGCHAIN"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 74.7,
    "email": "siddharth.ise21_314@rvce.edu.in",
    "phone_masked": "+91 98****_314"
  },
  {
    "usn": "USN_2025_315",
    "name": "Swati Menon",
    "branch": "ISE",
    "cgpa": 8.33,
    "active_backlogs": 1,
    "skills": [
      "CPP",
      "SQL",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 53.3,
    "email": "swati.ise21_315@rvce.edu.in",
    "phone_masked": "+91 98****_315"
  },
  {
    "usn": "USN_2025_316",
    "name": "Harsh Deshmukh",
    "branch": "ISE",
    "cgpa": 8.07,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "VECTOR_DATABASES",
      "PYSPARK"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 78.9,
    "email": "harsh.ise21_316@rvce.edu.in",
    "phone_masked": "+91 98****_316"
  },
  {
    "usn": "USN_2025_317",
    "name": "Vikram Verma",
    "branch": "ISE",
    "cgpa": 7.59,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "JAVA_BACKEND",
      "LANGCHAIN"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.4,
    "email": "vikram.ise21_317@rvce.edu.in",
    "phone_masked": "+91 98****_317"
  },
  {
    "usn": "USN_2025_318",
    "name": "Aditya Verma",
    "branch": "ISE",
    "cgpa": 6.86,
    "active_backlogs": 2,
    "skills": [
      "CPP",
      "PYTHON",
      "LANGCHAIN",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 54.1,
    "email": "aditya.ise21_318@rvce.edu.in",
    "phone_masked": "+91 98****_318"
  },
  {
    "usn": "USN_2025_319",
    "name": "Rohan Menon",
    "branch": "ISE",
    "cgpa": 8.12,
    "active_backlogs": 0,
    "skills": [
      "REACT",
      "SQL",
      "DATABRICKS_DE",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 79.1,
    "email": "rohan.ise21_319@rvce.edu.in",
    "phone_masked": "+91 98****_319"
  },
  {
    "usn": "USN_2025_320",
    "name": "Nandini Deshmukh",
    "branch": "ISE",
    "cgpa": 9.7,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "REACT",
      "VECTOR_DATABASES",
      "PYSPARK",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 92.1,
    "email": "nandini.ise21_320@rvce.edu.in",
    "phone_masked": "+91 98****_320"
  },
  {
    "usn": "USN_2025_321",
    "name": "Deepak Patel",
    "branch": "ISE",
    "cgpa": 7.79,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.5,
    "email": "deepak.ise21_321@rvce.edu.in",
    "phone_masked": "+91 98****_321"
  },
  {
    "usn": "USN_2025_322",
    "name": "Bhavna Menon",
    "branch": "ISE",
    "cgpa": 6.53,
    "active_backlogs": 2,
    "skills": [
      "REACT",
      "SQL",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 46.1,
    "email": "bhavna.ise21_322@rvce.edu.in",
    "phone_masked": "+91 98****_322"
  },
  {
    "usn": "USN_2025_323",
    "name": "Nandini Deshmukh",
    "branch": "ISE",
    "cgpa": 5.89,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "REACT",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 63.6,
    "email": "nandini.ise21_323@rvce.edu.in",
    "phone_masked": "+91 98****_323"
  },
  {
    "usn": "USN_2025_324",
    "name": "Meera Kulkarni",
    "branch": "ISE",
    "cgpa": 8.71,
    "active_backlogs": 0,
    "skills": [
      "JAVA_BACKEND",
      "REACT",
      "MACHINE_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 81.5,
    "email": "meera.ise21_324@rvce.edu.in",
    "phone_masked": "+91 98****_324"
  },
  {
    "usn": "USN_2025_325",
    "name": "Aditya Verma",
    "branch": "ISE",
    "cgpa": 7.82,
    "active_backlogs": 2,
    "skills": [
      "JAVA_BACKEND",
      "SQL",
      "AWS_CLOUD",
      "PYSPARK",
      "MACHINE_LEARNING",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.3,
    "email": "aditya.ise21_325@rvce.edu.in",
    "phone_masked": "+91 98****_325"
  },
  {
    "usn": "USN_2025_326",
    "name": "Rohan Menon",
    "branch": "ECE",
    "cgpa": 7.36,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "PYTHON",
      "COMPUTER_VISION",
      "JAVA_BACKEND",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 62.8,
    "email": "rohan.ece21_326@rvce.edu.in",
    "phone_masked": "+91 98****_326"
  },
  {
    "usn": "USN_2025_327",
    "name": "Gaurav Gupta",
    "branch": "ECE",
    "cgpa": 8.41,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "PYTHON",
      "DEEP_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 60.3,
    "email": "gaurav.ece21_327@rvce.edu.in",
    "phone_masked": "+91 98****_327"
  },
  {
    "usn": "USN_2025_328",
    "name": "Ishita Pillai",
    "branch": "ECE",
    "cgpa": 7.69,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.8,
    "email": "ishita.ece21_328@rvce.edu.in",
    "phone_masked": "+91 98****_328"
  },
  {
    "usn": "USN_2025_329",
    "name": "Meera Menon",
    "branch": "ECE",
    "cgpa": 7.51,
    "active_backlogs": 2,
    "skills": [
      "SQL",
      "CPP",
      "AWS_CLOUD",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 56.7,
    "email": "meera.ece21_329@rvce.edu.in",
    "phone_masked": "+91 98****_329"
  },
  {
    "usn": "USN_2025_330",
    "name": "Nikhil Hegde",
    "branch": "ECE",
    "cgpa": 7.58,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.3,
    "email": "nikhil.ece21_330@rvce.edu.in",
    "phone_masked": "+91 98****_330"
  },
  {
    "usn": "USN_2025_331",
    "name": "Deepa Sharma",
    "branch": "ECE",
    "cgpa": 6.33,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "CPP",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 45.3,
    "email": "deepa.ece21_331@rvce.edu.in",
    "phone_masked": "+91 98****_331"
  },
  {
    "usn": "USN_2025_332",
    "name": "Siddharth Rao",
    "branch": "ECE",
    "cgpa": 7.93,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "SQL",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 51.7,
    "email": "siddharth.ece21_332@rvce.edu.in",
    "phone_masked": "+91 98****_332"
  },
  {
    "usn": "USN_2025_333",
    "name": "Divya Patel",
    "branch": "ECE",
    "cgpa": 7.98,
    "active_backlogs": 3,
    "skills": [
      "PYTHON",
      "CPP",
      "AWS_CLOUD",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 58.6,
    "email": "divya.ece21_333@rvce.edu.in",
    "phone_masked": "+91 98****_333"
  },
  {
    "usn": "USN_2025_334",
    "name": "Manish Rao",
    "branch": "ECE",
    "cgpa": 8.18,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 72.7,
    "email": "manish.ece21_334@rvce.edu.in",
    "phone_masked": "+91 98****_334"
  },
  {
    "usn": "USN_2025_335",
    "name": "Bhavna Patel",
    "branch": "ECE",
    "cgpa": 8.94,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "AWS_CLOUD",
      "DEEP_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 89.1,
    "email": "bhavna.ece21_335@rvce.edu.in",
    "phone_masked": "+91 98****_335"
  },
  {
    "usn": "USN_2025_336",
    "name": "Ankit Bhat",
    "branch": "ECE",
    "cgpa": 7.13,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "COMPUTER_VISION",
      "JAVA_BACKEND",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.9,
    "email": "ankit.ece21_336@rvce.edu.in",
    "phone_masked": "+91 98****_336"
  },
  {
    "usn": "USN_2025_337",
    "name": "Rhea Reddy",
    "branch": "ECE",
    "cgpa": 7.12,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "DEEP_LEARNING",
      "AWS_CLOUD",
      "JAVA_BACKEND",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 88.5,
    "email": "rhea.ece21_337@rvce.edu.in",
    "phone_masked": "+91 98****_337"
  },
  {
    "usn": "USN_2025_338",
    "name": "Kavya Sharma",
    "branch": "ECE",
    "cgpa": 7.85,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "JAVA_BACKEND",
      "AWS_CLOUD",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.7,
    "email": "kavya.ece21_338@rvce.edu.in",
    "phone_masked": "+91 98****_338"
  },
  {
    "usn": "USN_2025_339",
    "name": "Meera Menon",
    "branch": "ECE",
    "cgpa": 9.8,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "DEEP_LEARNING",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 85.9,
    "email": "meera.ece21_339@rvce.edu.in",
    "phone_masked": "+91 98****_339"
  },
  {
    "usn": "USN_2025_340",
    "name": "Deepak Gupta",
    "branch": "ECE",
    "cgpa": 9.48,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "MACHINE_LEARNING",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 84.6,
    "email": "deepak.ece21_340@rvce.edu.in",
    "phone_masked": "+91 98****_340"
  },
  {
    "usn": "USN_2025_341",
    "name": "Suresh Bhat",
    "branch": "ECE",
    "cgpa": 6.99,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 68.0,
    "email": "suresh.ece21_341@rvce.edu.in",
    "phone_masked": "+91 98****_341"
  },
  {
    "usn": "USN_2025_342",
    "name": "Rohan Sharma",
    "branch": "ECE",
    "cgpa": 7.64,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "COMPUTER_VISION",
      "DEEP_LEARNING",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.9,
    "email": "rohan.ece21_342@rvce.edu.in",
    "phone_masked": "+91 98****_342"
  },
  {
    "usn": "USN_2025_343",
    "name": "Vikram Joshi",
    "branch": "ECE",
    "cgpa": 6.29,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "COMPUTER_VISION",
      "JAVA_BACKEND",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.5,
    "email": "vikram.ece21_343@rvce.edu.in",
    "phone_masked": "+91 98****_343"
  },
  {
    "usn": "USN_2025_344",
    "name": "Aditya Patel",
    "branch": "ECE",
    "cgpa": 6.13,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "DEEP_LEARNING",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.2,
    "email": "aditya.ece21_344@rvce.edu.in",
    "phone_masked": "+91 98****_344"
  },
  {
    "usn": "USN_2025_345",
    "name": "Pooja Kulkarni",
    "branch": "ECE",
    "cgpa": 8.6,
    "active_backlogs": 2,
    "skills": [
      "SQL",
      "CPP",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 54.4,
    "email": "pooja.ece21_345@rvce.edu.in",
    "phone_masked": "+91 98****_345"
  },
  {
    "usn": "USN_2025_346",
    "name": "Nikhil Menon",
    "branch": "ECE",
    "cgpa": 7.77,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "DEEP_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.7,
    "email": "nikhil.ece21_346@rvce.edu.in",
    "phone_masked": "+91 98****_346"
  },
  {
    "usn": "USN_2025_347",
    "name": "Suresh Reddy",
    "branch": "ECE",
    "cgpa": 6.25,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.3,
    "email": "suresh.ece21_347@rvce.edu.in",
    "phone_masked": "+91 98****_347"
  },
  {
    "usn": "USN_2025_348",
    "name": "Karthik Deshmukh",
    "branch": "ECE",
    "cgpa": 6.8,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "JAVA_BACKEND",
      "DEEP_LEARNING",
      "MACHINE_LEARNING",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 87.2,
    "email": "karthik.ece21_348@rvce.edu.in",
    "phone_masked": "+91 98****_348"
  },
  {
    "usn": "USN_2025_349",
    "name": "Vikram Menon",
    "branch": "ECE",
    "cgpa": 6.24,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "AWS_CLOUD",
      "JAVA_BACKEND",
      "COMPUTER_VISION",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.0,
    "email": "vikram.ece21_349@rvce.edu.in",
    "phone_masked": "+91 98****_349"
  },
  {
    "usn": "USN_2025_350",
    "name": "Ananya Kulkarni",
    "branch": "ECE",
    "cgpa": 7.39,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "AWS_CLOUD",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.2,
    "email": "ananya.ece21_350@rvce.edu.in",
    "phone_masked": "+91 98****_350"
  },
  {
    "usn": "USN_2025_351",
    "name": "Varun Reddy",
    "branch": "ECE",
    "cgpa": 6.48,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "PYTHON",
      "DEEP_LEARNING",
      "JAVA_BACKEND",
      "AWS_CLOUD",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 65.9,
    "email": "varun.ece21_351@rvce.edu.in",
    "phone_masked": "+91 98****_351"
  },
  {
    "usn": "USN_2025_352",
    "name": "Bhavna Rao",
    "branch": "ECE",
    "cgpa": 7.71,
    "active_backlogs": 3,
    "skills": [
      "SQL",
      "CPP",
      "MACHINE_LEARNING",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 57.5,
    "email": "bhavna.ece21_352@rvce.edu.in",
    "phone_masked": "+91 98****_352"
  },
  {
    "usn": "USN_2025_353",
    "name": "Vikram Hegde",
    "branch": "ECE",
    "cgpa": 6.19,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.8,
    "email": "vikram.ece21_353@rvce.edu.in",
    "phone_masked": "+91 98****_353"
  },
  {
    "usn": "USN_2025_354",
    "name": "Rhea Singh",
    "branch": "ECE",
    "cgpa": 7.87,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.8,
    "email": "rhea.ece21_354@rvce.edu.in",
    "phone_masked": "+91 98****_354"
  },
  {
    "usn": "USN_2025_355",
    "name": "Kavya Singh",
    "branch": "ECE",
    "cgpa": 8.1,
    "active_backlogs": 1,
    "skills": [
      "CPP",
      "PYTHON",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 52.4,
    "email": "kavya.ece21_355@rvce.edu.in",
    "phone_masked": "+91 98****_355"
  },
  {
    "usn": "USN_2025_356",
    "name": "Suresh Iyer",
    "branch": "ECE",
    "cgpa": 8.59,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "JAVA_BACKEND",
      "AWS_CLOUD",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 87.7,
    "email": "suresh.ece21_356@rvce.edu.in",
    "phone_masked": "+91 98****_356"
  },
  {
    "usn": "USN_2025_357",
    "name": "Pooja Deshmukh",
    "branch": "ECE",
    "cgpa": 7.89,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "COMPUTER_VISION",
      "JAVA_BACKEND",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.9,
    "email": "pooja.ece21_357@rvce.edu.in",
    "phone_masked": "+91 98****_357"
  },
  {
    "usn": "USN_2025_358",
    "name": "Siddharth Iyer",
    "branch": "ECE",
    "cgpa": 7.8,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.2,
    "email": "siddharth.ece21_358@rvce.edu.in",
    "phone_masked": "+91 98****_358"
  },
  {
    "usn": "USN_2025_359",
    "name": "Deepa Nair",
    "branch": "ECE",
    "cgpa": 6.42,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "MACHINE_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.3,
    "email": "deepa.ece21_359@rvce.edu.in",
    "phone_masked": "+91 98****_359"
  },
  {
    "usn": "USN_2025_360",
    "name": "Pranav Nair",
    "branch": "ECE",
    "cgpa": 7.17,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.0,
    "email": "pranav.ece21_360@rvce.edu.in",
    "phone_masked": "+91 98****_360"
  },
  {
    "usn": "USN_2025_361",
    "name": "Nandini Sharma",
    "branch": "ECE",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "COMPUTER_VISION",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 80.6,
    "email": "nandini.ece21_361@rvce.edu.in",
    "phone_masked": "+91 98****_361"
  },
  {
    "usn": "USN_2025_362",
    "name": "Tanvi Deshmukh",
    "branch": "ECE",
    "cgpa": 7.0,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "DEEP_LEARNING",
      "JAVA_BACKEND",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.3,
    "email": "tanvi.ece21_362@rvce.edu.in",
    "phone_masked": "+91 98****_362"
  },
  {
    "usn": "USN_2025_363",
    "name": "Pooja Menon",
    "branch": "ECE",
    "cgpa": 9.46,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "AWS_CLOUD",
      "DEEP_LEARNING",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 91.2,
    "email": "pooja.ece21_363@rvce.edu.in",
    "phone_masked": "+91 98****_363"
  },
  {
    "usn": "USN_2025_364",
    "name": "Swati Singh",
    "branch": "ECE",
    "cgpa": 7.82,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "SQL",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 51.3,
    "email": "swati.ece21_364@rvce.edu.in",
    "phone_masked": "+91 98****_364"
  },
  {
    "usn": "USN_2025_365",
    "name": "Aditya Rao",
    "branch": "ECE",
    "cgpa": 7.39,
    "active_backlogs": 1,
    "skills": [
      "CPP",
      "PYTHON",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 49.6,
    "email": "aditya.ece21_365@rvce.edu.in",
    "phone_masked": "+91 98****_365"
  },
  {
    "usn": "USN_2025_366",
    "name": "Aarav Verma",
    "branch": "ECE",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "JAVA_BACKEND",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 80.6,
    "email": "aarav.ece21_366@rvce.edu.in",
    "phone_masked": "+91 98****_366"
  },
  {
    "usn": "USN_2025_367",
    "name": "Deepak Bhat",
    "branch": "ECE",
    "cgpa": 7.95,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "MACHINE_LEARNING",
      "JAVA_BACKEND",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.1,
    "email": "deepak.ece21_367@rvce.edu.in",
    "phone_masked": "+91 98****_367"
  },
  {
    "usn": "USN_2025_368",
    "name": "Varun Bhat",
    "branch": "ECE",
    "cgpa": 7.34,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.4,
    "email": "varun.ece21_368@rvce.edu.in",
    "phone_masked": "+91 98****_368"
  },
  {
    "usn": "USN_2025_369",
    "name": "Shreya Patel",
    "branch": "ECE",
    "cgpa": 7.64,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "JAVA_BACKEND",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.2,
    "email": "shreya.ece21_369@rvce.edu.in",
    "phone_masked": "+91 98****_369"
  },
  {
    "usn": "USN_2025_370",
    "name": "Nikhil Gupta",
    "branch": "ECE",
    "cgpa": 7.54,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "DEEP_LEARNING",
      "JAVA_BACKEND",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.5,
    "email": "nikhil.ece21_370@rvce.edu.in",
    "phone_masked": "+91 98****_370"
  },
  {
    "usn": "USN_2025_371",
    "name": "Kavya Gupta",
    "branch": "ECE",
    "cgpa": 8.63,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "DEEP_LEARNING",
      "JAVA_BACKEND",
      "COMPUTER_VISION",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 94.5,
    "email": "kavya.ece21_371@rvce.edu.in",
    "phone_masked": "+91 98****_371"
  },
  {
    "usn": "USN_2025_372",
    "name": "Divya Iyer",
    "branch": "ECE",
    "cgpa": 6.46,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "AWS_CLOUD",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.8,
    "email": "divya.ece21_372@rvce.edu.in",
    "phone_masked": "+91 98****_372"
  },
  {
    "usn": "USN_2025_373",
    "name": "Neha Gupta",
    "branch": "ECE",
    "cgpa": 7.23,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "CPP",
      "DEEP_LEARNING",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 62.3,
    "email": "neha.ece21_373@rvce.edu.in",
    "phone_masked": "+91 98****_373"
  },
  {
    "usn": "USN_2025_374",
    "name": "Rohan Rao",
    "branch": "ECE",
    "cgpa": 9.14,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 76.6,
    "email": "rohan.ece21_374@rvce.edu.in",
    "phone_masked": "+91 98****_374"
  },
  {
    "usn": "USN_2025_375",
    "name": "Deepa Singh",
    "branch": "ECE",
    "cgpa": 9.01,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "AWS_CLOUD",
      "DEEP_LEARNING",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 89.4,
    "email": "deepa.ece21_375@rvce.edu.in",
    "phone_masked": "+91 98****_375"
  },
  {
    "usn": "USN_2025_376",
    "name": "Deepa Bhat",
    "branch": "ECE",
    "cgpa": 8.92,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "AWS_CLOUD",
      "COMPUTER_VISION",
      "MACHINE_LEARNING",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 95.7,
    "email": "deepa.ece21_376@rvce.edu.in",
    "phone_masked": "+91 98****_376"
  },
  {
    "usn": "USN_2025_377",
    "name": "Vikram Sharma",
    "branch": "ECE",
    "cgpa": 7.85,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.7,
    "email": "vikram.ece21_377@rvce.edu.in",
    "phone_masked": "+91 98****_377"
  },
  {
    "usn": "USN_2025_378",
    "name": "Rhea Kulkarni",
    "branch": "ECE",
    "cgpa": 7.5,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "SQL",
      "JAVA_BACKEND",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 56.7,
    "email": "rhea.ece21_378@rvce.edu.in",
    "phone_masked": "+91 98****_378"
  },
  {
    "usn": "USN_2025_379",
    "name": "Neha Gupta",
    "branch": "ECE",
    "cgpa": 8.89,
    "active_backlogs": 2,
    "skills": [
      "PYTHON",
      "CPP",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 55.6,
    "email": "neha.ece21_379@rvce.edu.in",
    "phone_masked": "+91 98****_379"
  },
  {
    "usn": "USN_2025_380",
    "name": "Ankit Verma",
    "branch": "ECE",
    "cgpa": 7.87,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "AWS_CLOUD",
      "COMPUTER_VISION",
      "JAVA_BACKEND",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.5,
    "email": "ankit.ece21_380@rvce.edu.in",
    "phone_masked": "+91 98****_380"
  },
  {
    "usn": "USN_2025_381",
    "name": "Varun Verma",
    "branch": "ECE",
    "cgpa": 6.0,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "AWS_CLOUD",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 70.7,
    "email": "varun.ece21_381@rvce.edu.in",
    "phone_masked": "+91 98****_381"
  },
  {
    "usn": "USN_2025_382",
    "name": "Manish Rao",
    "branch": "ECE",
    "cgpa": 7.19,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "CPP",
      "JAVA_BACKEND",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 55.4,
    "email": "manish.ece21_382@rvce.edu.in",
    "phone_masked": "+91 98****_382"
  },
  {
    "usn": "USN_2025_383",
    "name": "Pranav Rao",
    "branch": "ECE",
    "cgpa": 7.98,
    "active_backlogs": 2,
    "skills": [
      "SQL",
      "CPP",
      "DEEP_LEARNING",
      "AWS_CLOUD",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 65.3,
    "email": "pranav.ece21_383@rvce.edu.in",
    "phone_masked": "+91 98****_383"
  },
  {
    "usn": "USN_2025_384",
    "name": "Rohan Hegde",
    "branch": "ECE",
    "cgpa": 6.64,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "AWS_CLOUD",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 73.2,
    "email": "rohan.ece21_384@rvce.edu.in",
    "phone_masked": "+91 98****_384"
  },
  {
    "usn": "USN_2025_385",
    "name": "Rohan Deshmukh",
    "branch": "ECE",
    "cgpa": 7.48,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.9,
    "email": "rohan.ece21_385@rvce.edu.in",
    "phone_masked": "+91 98****_385"
  },
  {
    "usn": "USN_2025_386",
    "name": "Gaurav Nair",
    "branch": "ECE",
    "cgpa": 7.83,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "JAVA_BACKEND",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.0,
    "email": "gaurav.ece21_386@rvce.edu.in",
    "phone_masked": "+91 98****_386"
  },
  {
    "usn": "USN_2025_387",
    "name": "Harsh Reddy",
    "branch": "ECE",
    "cgpa": 6.52,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "COMPUTER_VISION",
      "AWS_CLOUD",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 79.4,
    "email": "harsh.ece21_387@rvce.edu.in",
    "phone_masked": "+91 98****_387"
  },
  {
    "usn": "USN_2025_388",
    "name": "Deepa Singh",
    "branch": "ECE",
    "cgpa": 7.94,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "COMPUTER_VISION",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.8,
    "email": "deepa.ece21_388@rvce.edu.in",
    "phone_masked": "+91 98****_388"
  },
  {
    "usn": "USN_2025_389",
    "name": "Manish Bhat",
    "branch": "ECE",
    "cgpa": 9.56,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "JAVA_BACKEND",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 84.9,
    "email": "manish.ece21_389@rvce.edu.in",
    "phone_masked": "+91 98****_389"
  },
  {
    "usn": "USN_2025_390",
    "name": "Nandini Reddy",
    "branch": "ECE",
    "cgpa": 7.61,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "JAVA_BACKEND",
      "DEEP_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.8,
    "email": "nandini.ece21_390@rvce.edu.in",
    "phone_masked": "+91 98****_390"
  },
  {
    "usn": "USN_2025_391",
    "name": "Manish Menon",
    "branch": "ECE",
    "cgpa": 6.77,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "SQL",
      "MACHINE_LEARNING",
      "AWS_CLOUD",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 60.4,
    "email": "manish.ece21_391@rvce.edu.in",
    "phone_masked": "+91 98****_391"
  },
  {
    "usn": "USN_2025_392",
    "name": "Rohan Singh",
    "branch": "ECE",
    "cgpa": 7.4,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.9,
    "email": "rohan.ece21_392@rvce.edu.in",
    "phone_masked": "+91 98****_392"
  },
  {
    "usn": "USN_2025_393",
    "name": "Vikram Gupta",
    "branch": "ECE",
    "cgpa": 8.87,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 75.5,
    "email": "vikram.ece21_393@rvce.edu.in",
    "phone_masked": "+91 98****_393"
  },
  {
    "usn": "USN_2025_394",
    "name": "Nikhil Verma",
    "branch": "ECE",
    "cgpa": 9.26,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "DEEP_LEARNING",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 83.7,
    "email": "nikhil.ece21_394@rvce.edu.in",
    "phone_masked": "+91 98****_394"
  },
  {
    "usn": "USN_2025_395",
    "name": "Siddharth Joshi",
    "branch": "ECE",
    "cgpa": 6.61,
    "active_backlogs": 3,
    "skills": [
      "PYTHON",
      "SQL",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 46.4,
    "email": "siddharth.ece21_395@rvce.edu.in",
    "phone_masked": "+91 98****_395"
  },
  {
    "usn": "USN_2025_396",
    "name": "Divya Kulkarni",
    "branch": "ECE",
    "cgpa": 7.58,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.3,
    "email": "divya.ece21_396@rvce.edu.in",
    "phone_masked": "+91 98****_396"
  },
  {
    "usn": "USN_2025_397",
    "name": "Aarav Gupta",
    "branch": "ECE",
    "cgpa": 7.69,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "MACHINE_LEARNING",
      "JAVA_BACKEND",
      "COMPUTER_VISION",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.8,
    "email": "aarav.ece21_397@rvce.edu.in",
    "phone_masked": "+91 98****_397"
  },
  {
    "usn": "USN_2025_398",
    "name": "Rhea Pillai",
    "branch": "ECE",
    "cgpa": 7.63,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "DEEP_LEARNING",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.5,
    "email": "rhea.ece21_398@rvce.edu.in",
    "phone_masked": "+91 98****_398"
  },
  {
    "usn": "USN_2025_399",
    "name": "Ananya Kulkarni",
    "branch": "ECE",
    "cgpa": 6.37,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 65.5,
    "email": "ananya.ece21_399@rvce.edu.in",
    "phone_masked": "+91 98****_399"
  },
  {
    "usn": "USN_2025_400",
    "name": "Vikram Deshmukh",
    "branch": "ECE",
    "cgpa": 9.45,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "DEEP_LEARNING",
      "JAVA_BACKEND",
      "COMPUTER_VISION",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 97.8,
    "email": "vikram.ece21_400@rvce.edu.in",
    "phone_masked": "+91 98****_400"
  },
  {
    "usn": "USN_2025_401",
    "name": "Pranav Bhat",
    "branch": "ECE",
    "cgpa": 7.88,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "AWS_CLOUD",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.2,
    "email": "pranav.ece21_401@rvce.edu.in",
    "phone_masked": "+91 98****_401"
  },
  {
    "usn": "USN_2025_402",
    "name": "Meera Rao",
    "branch": "ECE",
    "cgpa": 7.85,
    "active_backlogs": 2,
    "skills": [
      "CPP",
      "PYTHON",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.7,
    "email": "meera.ece21_402@rvce.edu.in",
    "phone_masked": "+91 98****_402"
  },
  {
    "usn": "USN_2025_403",
    "name": "Manish Bhat",
    "branch": "ECE",
    "cgpa": 6.7,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "AWS_CLOUD",
      "COMPUTER_VISION",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 80.1,
    "email": "manish.ece21_403@rvce.edu.in",
    "phone_masked": "+91 98****_403"
  },
  {
    "usn": "USN_2025_404",
    "name": "Pranav Gupta",
    "branch": "ECE",
    "cgpa": 7.74,
    "active_backlogs": 3,
    "skills": [
      "CPP",
      "PYTHON",
      "AWS_CLOUD",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 57.6,
    "email": "pranav.ece21_404@rvce.edu.in",
    "phone_masked": "+91 98****_404"
  },
  {
    "usn": "USN_2025_405",
    "name": "Rhea Nair",
    "branch": "ECE",
    "cgpa": 9.59,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "AWS_CLOUD",
      "COMPUTER_VISION",
      "MACHINE_LEARNING",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 98.4,
    "email": "rhea.ece21_405@rvce.edu.in",
    "phone_masked": "+91 98****_405"
  },
  {
    "usn": "USN_2025_406",
    "name": "Deepak Nair",
    "branch": "ECE",
    "cgpa": 6.51,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 66.0,
    "email": "deepak.ece21_406@rvce.edu.in",
    "phone_masked": "+91 98****_406"
  },
  {
    "usn": "USN_2025_407",
    "name": "Nandini Kulkarni",
    "branch": "ECE",
    "cgpa": 9.09,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "JAVA_BACKEND",
      "COMPUTER_VISION",
      "DEEP_LEARNING",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 96.4,
    "email": "nandini.ece21_407@rvce.edu.in",
    "phone_masked": "+91 98****_407"
  },
  {
    "usn": "USN_2025_408",
    "name": "Sneha Deshmukh",
    "branch": "ECE",
    "cgpa": 9.32,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "COMPUTER_VISION",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 83.9,
    "email": "sneha.ece21_408@rvce.edu.in",
    "phone_masked": "+91 98****_408"
  },
  {
    "usn": "USN_2025_409",
    "name": "Harsh Gupta",
    "branch": "ECE",
    "cgpa": 7.52,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "DEEP_LEARNING",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.7,
    "email": "harsh.ece21_409@rvce.edu.in",
    "phone_masked": "+91 98****_409"
  },
  {
    "usn": "USN_2025_410",
    "name": "Karthik Deshmukh",
    "branch": "ECE",
    "cgpa": 6.47,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "JAVA_BACKEND",
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.9,
    "email": "karthik.ece21_410@rvce.edu.in",
    "phone_masked": "+91 98****_410"
  },
  {
    "usn": "USN_2025_411",
    "name": "Nikhil Singh",
    "branch": "ECE",
    "cgpa": 8.01,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 72.0,
    "email": "nikhil.ece21_411@rvce.edu.in",
    "phone_masked": "+91 98****_411"
  },
  {
    "usn": "USN_2025_412",
    "name": "Suresh Reddy",
    "branch": "ECE",
    "cgpa": 7.75,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "CPP",
      "MACHINE_LEARNING",
      "JAVA_BACKEND",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.3,
    "email": "suresh.ece21_412@rvce.edu.in",
    "phone_masked": "+91 98****_412"
  },
  {
    "usn": "USN_2025_413",
    "name": "Harsh Gupta",
    "branch": "ECE",
    "cgpa": 7.66,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "AWS_CLOUD",
      "DEEP_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.0,
    "email": "harsh.ece21_413@rvce.edu.in",
    "phone_masked": "+91 98****_413"
  },
  {
    "usn": "USN_2025_414",
    "name": "Ananya Pillai",
    "branch": "ECE",
    "cgpa": 7.48,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.9,
    "email": "ananya.ece21_414@rvce.edu.in",
    "phone_masked": "+91 98****_414"
  },
  {
    "usn": "USN_2025_415",
    "name": "Pranav Menon",
    "branch": "ECE",
    "cgpa": 9.54,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "DEEP_LEARNING",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 91.5,
    "email": "pranav.ece21_415@rvce.edu.in",
    "phone_masked": "+91 98****_415"
  },
  {
    "usn": "USN_2025_416",
    "name": "Rohan Bhat",
    "branch": "ECE",
    "cgpa": 6.83,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "CPP",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 67.3,
    "email": "rohan.ece21_416@rvce.edu.in",
    "phone_masked": "+91 98****_416"
  },
  {
    "usn": "USN_2025_417",
    "name": "Deepa Patel",
    "branch": "ECE",
    "cgpa": 8.08,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "AWS_CLOUD",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 79.0,
    "email": "deepa.ece21_417@rvce.edu.in",
    "phone_masked": "+91 98****_417"
  },
  {
    "usn": "USN_2025_418",
    "name": "Meera Singh",
    "branch": "ECE",
    "cgpa": 8.26,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "PYTHON",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 53.0,
    "email": "meera.ece21_418@rvce.edu.in",
    "phone_masked": "+91 98****_418"
  },
  {
    "usn": "USN_2025_419",
    "name": "Meera Iyer",
    "branch": "ECE",
    "cgpa": 7.21,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 68.8,
    "email": "meera.ece21_419@rvce.edu.in",
    "phone_masked": "+91 98****_419"
  },
  {
    "usn": "USN_2025_420",
    "name": "Vikram Iyer",
    "branch": "ECE",
    "cgpa": 9.31,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "DEEP_LEARNING",
      "COMPUTER_VISION",
      "AWS_CLOUD",
      "MACHINE_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 97.2,
    "email": "vikram.ece21_420@rvce.edu.in",
    "phone_masked": "+91 98****_420"
  },
  {
    "usn": "USN_2025_421",
    "name": "Pooja Menon",
    "branch": "ECE",
    "cgpa": 7.86,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "PYTHON",
      "JAVA_BACKEND",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.1,
    "email": "pooja.ece21_421@rvce.edu.in",
    "phone_masked": "+91 98****_421"
  },
  {
    "usn": "USN_2025_422",
    "name": "Aarav Iyer",
    "branch": "ECE",
    "cgpa": 9.83,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "JAVA_BACKEND",
      "COMPUTER_VISION",
      "DEEP_LEARNING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 92.7,
    "email": "aarav.ece21_422@rvce.edu.in",
    "phone_masked": "+91 98****_422"
  },
  {
    "usn": "USN_2025_423",
    "name": "Harsh Deshmukh",
    "branch": "ECE",
    "cgpa": 7.86,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "CPP",
      "AWS_CLOUD",
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.4,
    "email": "harsh.ece21_423@rvce.edu.in",
    "phone_masked": "+91 98****_423"
  },
  {
    "usn": "USN_2025_424",
    "name": "Harsh Deshmukh",
    "branch": "ECE",
    "cgpa": 8.49,
    "active_backlogs": 3,
    "skills": [
      "SQL",
      "PYTHON",
      "DEEP_LEARNING",
      "COMPUTER_VISION",
      "JAVA_BACKEND"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 67.3,
    "email": "harsh.ece21_424@rvce.edu.in",
    "phone_masked": "+91 98****_424"
  },
  {
    "usn": "USN_2025_425",
    "name": "Divya Rao",
    "branch": "ECE",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "CPP",
      "SQL",
      "AWS_CLOUD"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 74.0,
    "email": "divya.ece21_425@rvce.edu.in",
    "phone_masked": "+91 98****_425"
  },
  {
    "usn": "USN_2025_426",
    "name": "Aarav Patel",
    "branch": "AI/DS",
    "cgpa": 7.61,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "NLP",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.8,
    "email": "aarav.aids21_426@rvce.edu.in",
    "phone_masked": "+91 98****_426"
  },
  {
    "usn": "USN_2025_427",
    "name": "Nikhil Pillai",
    "branch": "AI/DS",
    "cgpa": 6.74,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "VECTOR_DATABASES",
      "DATABRICKS_DE",
      "PROMPT_ENGINEERING",
      "NLP"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 87.0,
    "email": "nikhil.aids21_427@rvce.edu.in",
    "phone_masked": "+91 98****_427"
  },
  {
    "usn": "USN_2025_428",
    "name": "Aarav Kulkarni",
    "branch": "AI/DS",
    "cgpa": 7.14,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "DEEP_LEARNING",
      "COMPUTER_VISION",
      "DATABRICKS_DE",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.9,
    "email": "aarav.aids21_428@rvce.edu.in",
    "phone_masked": "+91 98****_428"
  },
  {
    "usn": "USN_2025_429",
    "name": "Harsh Reddy",
    "branch": "AI/DS",
    "cgpa": 5.75,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "PYTHON",
      "NLP",
      "COMPUTER_VISION",
      "PYSPARK"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.3,
    "email": "harsh.aids21_429@rvce.edu.in",
    "phone_masked": "+91 98****_429"
  },
  {
    "usn": "USN_2025_430",
    "name": "Bhavna Kulkarni",
    "branch": "AI/DS",
    "cgpa": 7.63,
    "active_backlogs": 1,
    "skills": [
      "DEEP_LEARNING",
      "SQL",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 50.5,
    "email": "bhavna.aids21_430@rvce.edu.in",
    "phone_masked": "+91 98****_430"
  },
  {
    "usn": "USN_2025_431",
    "name": "Nandini Verma",
    "branch": "AI/DS",
    "cgpa": 7.96,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "DEEP_LEARNING",
      "GENAI_LLMS",
      "PYSPARK",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.2,
    "email": "nandini.aids21_431@rvce.edu.in",
    "phone_masked": "+91 98****_431"
  },
  {
    "usn": "USN_2025_432",
    "name": "Nandini Gupta",
    "branch": "AI/DS",
    "cgpa": 7.43,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "SQL",
      "GENAI_LLMS",
      "PROMPT_ENGINEERING",
      "DATABRICKS_DE",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 89.7,
    "email": "nandini.aids21_432@rvce.edu.in",
    "phone_masked": "+91 98****_432"
  },
  {
    "usn": "USN_2025_433",
    "name": "Suresh Singh",
    "branch": "AI/DS",
    "cgpa": 7.42,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "SQL",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.7,
    "email": "suresh.aids21_433@rvce.edu.in",
    "phone_masked": "+91 98****_433"
  },
  {
    "usn": "USN_2025_434",
    "name": "Manish Rao",
    "branch": "AI/DS",
    "cgpa": 7.42,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "MACHINE_LEARNING",
      "DATABRICKS_DE",
      "GENAI_LLMS",
      "VECTOR_DATABASES",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 89.7,
    "email": "manish.aids21_434@rvce.edu.in",
    "phone_masked": "+91 98****_434"
  },
  {
    "usn": "USN_2025_435",
    "name": "Ankit Nair",
    "branch": "AI/DS",
    "cgpa": 8.71,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "PYTHON",
      "PYSPARK",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 61.5,
    "email": "ankit.aids21_435@rvce.edu.in",
    "phone_masked": "+91 98****_435"
  },
  {
    "usn": "USN_2025_436",
    "name": "Harsh Verma",
    "branch": "AI/DS",
    "cgpa": 7.76,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "SQL",
      "NLP"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.0,
    "email": "harsh.aids21_436@rvce.edu.in",
    "phone_masked": "+91 98****_436"
  },
  {
    "usn": "USN_2025_437",
    "name": "Nikhil Iyer",
    "branch": "AI/DS",
    "cgpa": 6.05,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES",
      "PYSPARK",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.5,
    "email": "nikhil.aids21_437@rvce.edu.in",
    "phone_masked": "+91 98****_437"
  },
  {
    "usn": "USN_2025_438",
    "name": "Pooja Verma",
    "branch": "AI/DS",
    "cgpa": 9.17,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "PYTHON",
      "PYSPARK",
      "COMPUTER_VISION",
      "VECTOR_DATABASES",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 96.7,
    "email": "pooja.aids21_438@rvce.edu.in",
    "phone_masked": "+91 98****_438"
  },
  {
    "usn": "USN_2025_439",
    "name": "Vikram Deshmukh",
    "branch": "AI/DS",
    "cgpa": 8.95,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "PROMPT_ENGINEERING",
      "COMPUTER_VISION",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 95.8,
    "email": "vikram.aids21_439@rvce.edu.in",
    "phone_masked": "+91 98****_439"
  },
  {
    "usn": "USN_2025_440",
    "name": "Harsh Rao",
    "branch": "AI/DS",
    "cgpa": 8.2,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 72.8,
    "email": "harsh.aids21_440@rvce.edu.in",
    "phone_masked": "+91 98****_440"
  },
  {
    "usn": "USN_2025_441",
    "name": "Vikram Reddy",
    "branch": "AI/DS",
    "cgpa": 7.52,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "DATABRICKS_DE",
      "PROMPT_ENGINEERING"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.7,
    "email": "vikram.aids21_441@rvce.edu.in",
    "phone_masked": "+91 98****_441"
  },
  {
    "usn": "USN_2025_442",
    "name": "Varun Menon",
    "branch": "AI/DS",
    "cgpa": 6.85,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "SQL",
      "COMPUTER_VISION",
      "NLP",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 80.7,
    "email": "varun.aids21_442@rvce.edu.in",
    "phone_masked": "+91 98****_442"
  },
  {
    "usn": "USN_2025_443",
    "name": "Gaurav Nair",
    "branch": "AI/DS",
    "cgpa": 8.08,
    "active_backlogs": 1,
    "skills": [
      "SQL",
      "DEEP_LEARNING",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 52.3,
    "email": "gaurav.aids21_443@rvce.edu.in",
    "phone_masked": "+91 98****_443"
  },
  {
    "usn": "USN_2025_444",
    "name": "Kavya Menon",
    "branch": "AI/DS",
    "cgpa": 6.99,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "MACHINE_LEARNING",
      "PYSPARK",
      "NLP",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.3,
    "email": "kavya.aids21_444@rvce.edu.in",
    "phone_masked": "+91 98****_444"
  },
  {
    "usn": "USN_2025_445",
    "name": "Swati Rao",
    "branch": "AI/DS",
    "cgpa": 9.78,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 79.1,
    "email": "swati.aids21_445@rvce.edu.in",
    "phone_masked": "+91 98****_445"
  },
  {
    "usn": "USN_2025_446",
    "name": "Kavya Menon",
    "branch": "AI/DS",
    "cgpa": 6.77,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "NLP",
      "VECTOR_DATABASES",
      "PROMPT_ENGINEERING",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 87.1,
    "email": "kavya.aids21_446@rvce.edu.in",
    "phone_masked": "+91 98****_446"
  },
  {
    "usn": "USN_2025_447",
    "name": "Aditya Kulkarni",
    "branch": "AI/DS",
    "cgpa": 8.16,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "MACHINE_LEARNING",
      "NLP",
      "COMPUTER_VISION",
      "VECTOR_DATABASES",
      "PROMPT_ENGINEERING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 92.6,
    "email": "aditya.aids21_447@rvce.edu.in",
    "phone_masked": "+91 98****_447"
  },
  {
    "usn": "USN_2025_448",
    "name": "Aditya Bhat",
    "branch": "AI/DS",
    "cgpa": 5.58,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "DEEP_LEARNING",
      "COMPUTER_VISION",
      "VECTOR_DATABASES",
      "GENAI_LLMS",
      "PROMPT_ENGINEERING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 82.3,
    "email": "aditya.aids21_448@rvce.edu.in",
    "phone_masked": "+91 98****_448"
  },
  {
    "usn": "USN_2025_449",
    "name": "Varun Deshmukh",
    "branch": "AI/DS",
    "cgpa": 7.34,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES",
      "COMPUTER_VISION",
      "DATABRICKS_DE",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 89.4,
    "email": "varun.aids21_449@rvce.edu.in",
    "phone_masked": "+91 98****_449"
  },
  {
    "usn": "USN_2025_450",
    "name": "Aarav Kulkarni",
    "branch": "AI/DS",
    "cgpa": 7.38,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "COMPUTER_VISION",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 76.2,
    "email": "aarav.aids21_450@rvce.edu.in",
    "phone_masked": "+91 98****_450"
  },
  {
    "usn": "USN_2025_451",
    "name": "Tanvi Verma",
    "branch": "AI/DS",
    "cgpa": 7.94,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "PYTHON",
      "PROMPT_ENGINEERING",
      "GENAI_LLMS",
      "NLP",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.8,
    "email": "tanvi.aids21_451@rvce.edu.in",
    "phone_masked": "+91 98****_451"
  },
  {
    "usn": "USN_2025_452",
    "name": "Karthik Verma",
    "branch": "AI/DS",
    "cgpa": 8.69,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "MACHINE_LEARNING",
      "PYSPARK",
      "COMPUTER_VISION",
      "PROMPT_ENGINEERING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 88.1,
    "email": "karthik.aids21_452@rvce.edu.in",
    "phone_masked": "+91 98****_452"
  },
  {
    "usn": "USN_2025_453",
    "name": "Manish Patel",
    "branch": "AI/DS",
    "cgpa": 6.28,
    "active_backlogs": 1,
    "skills": [
      "MACHINE_LEARNING",
      "PYTHON",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 45.1,
    "email": "manish.aids21_453@rvce.edu.in",
    "phone_masked": "+91 98****_453"
  },
  {
    "usn": "USN_2025_454",
    "name": "Aarav Joshi",
    "branch": "AI/DS",
    "cgpa": 9.58,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "MACHINE_LEARNING",
      "COMPUTER_VISION",
      "GENAI_LLMS",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 91.7,
    "email": "aarav.aids21_454@rvce.edu.in",
    "phone_masked": "+91 98****_454"
  },
  {
    "usn": "USN_2025_455",
    "name": "Gaurav Verma",
    "branch": "AI/DS",
    "cgpa": 6.92,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 74.3,
    "email": "gaurav.aids21_455@rvce.edu.in",
    "phone_masked": "+91 98****_455"
  },
  {
    "usn": "USN_2025_456",
    "name": "Ishita Bhat",
    "branch": "AI/DS",
    "cgpa": 7.69,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "PYTHON",
      "GENAI_LLMS",
      "NLP",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 84.1,
    "email": "ishita.aids21_456@rvce.edu.in",
    "phone_masked": "+91 98****_456"
  },
  {
    "usn": "USN_2025_457",
    "name": "Nikhil Rao",
    "branch": "AI/DS",
    "cgpa": 9.62,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "VECTOR_DATABASES",
      "NLP",
      "COMPUTER_VISION",
      "PROMPT_ENGINEERING"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 98.5,
    "email": "nikhil.aids21_457@rvce.edu.in",
    "phone_masked": "+91 98****_457"
  },
  {
    "usn": "USN_2025_458",
    "name": "Gaurav Hegde",
    "branch": "AI/DS",
    "cgpa": 8.05,
    "active_backlogs": 3,
    "skills": [
      "SQL",
      "PYTHON",
      "PROMPT_ENGINEERING",
      "NLP",
      "COMPUTER_VISION",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 2,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 72.2,
    "email": "gaurav.aids21_458@rvce.edu.in",
    "phone_masked": "+91 98****_458"
  },
  {
    "usn": "USN_2025_459",
    "name": "Aarav Deshmukh",
    "branch": "AI/DS",
    "cgpa": 9.12,
    "active_backlogs": 1,
    "skills": [
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "PROMPT_ENGINEERING",
      "VECTOR_DATABASES",
      "NLP"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.8,
    "email": "aarav.aids21_459@rvce.edu.in",
    "phone_masked": "+91 98****_459"
  },
  {
    "usn": "USN_2025_460",
    "name": "Harsh Joshi",
    "branch": "AI/DS",
    "cgpa": 7.91,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "DEEP_LEARNING",
      "PROMPT_ENGINEERING",
      "NLP",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 85.0,
    "email": "harsh.aids21_460@rvce.edu.in",
    "phone_masked": "+91 98****_460"
  },
  {
    "usn": "USN_2025_461",
    "name": "Ananya Rao",
    "branch": "AI/DS",
    "cgpa": 7.54,
    "active_backlogs": 1,
    "skills": [
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "COMPUTER_VISION",
      "NLP"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 56.8,
    "email": "ananya.aids21_461@rvce.edu.in",
    "phone_masked": "+91 98****_461"
  },
  {
    "usn": "USN_2025_462",
    "name": "Neha Gupta",
    "branch": "AI/DS",
    "cgpa": 8.94,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "SQL",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 75.8,
    "email": "neha.aids21_462@rvce.edu.in",
    "phone_masked": "+91 98****_462"
  },
  {
    "usn": "USN_2025_463",
    "name": "Pooja Pillai",
    "branch": "AI/DS",
    "cgpa": 7.94,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "SQL",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.8,
    "email": "pooja.aids21_463@rvce.edu.in",
    "phone_masked": "+91 98****_463"
  },
  {
    "usn": "USN_2025_464",
    "name": "Swati Nair",
    "branch": "AI/DS",
    "cgpa": 8.46,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "MACHINE_LEARNING",
      "COMPUTER_VISION",
      "VECTOR_DATABASES",
      "PROMPT_ENGINEERING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 87.2,
    "email": "swati.aids21_464@rvce.edu.in",
    "phone_masked": "+91 98****_464"
  },
  {
    "usn": "USN_2025_465",
    "name": "Nikhil Sharma",
    "branch": "AI/DS",
    "cgpa": 6.93,
    "active_backlogs": 1,
    "skills": [
      "PYTHON",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES",
      "PROMPT_ENGINEERING",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 61.1,
    "email": "nikhil.aids21_465@rvce.edu.in",
    "phone_masked": "+91 98****_465"
  },
  {
    "usn": "USN_2025_466",
    "name": "Swati Joshi",
    "branch": "AI/DS",
    "cgpa": 9.42,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "SQL",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 77.7,
    "email": "swati.aids21_466@rvce.edu.in",
    "phone_masked": "+91 98****_466"
  },
  {
    "usn": "USN_2025_467",
    "name": "Karthik Sharma",
    "branch": "AI/DS",
    "cgpa": 8.33,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "PYTHON",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 73.3,
    "email": "karthik.aids21_467@rvce.edu.in",
    "phone_masked": "+91 98****_467"
  },
  {
    "usn": "USN_2025_468",
    "name": "Pranav Sharma",
    "branch": "AI/DS",
    "cgpa": 5.54,
    "active_backlogs": 2,
    "skills": [
      "PYTHON",
      "SQL",
      "NLP",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 1,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 48.8,
    "email": "pranav.aids21_468@rvce.edu.in",
    "phone_masked": "+91 98****_468"
  },
  {
    "usn": "USN_2025_469",
    "name": "Deepa Kulkarni",
    "branch": "AI/DS",
    "cgpa": 7.56,
    "active_backlogs": 1,
    "skills": [
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "NLP"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 50.2,
    "email": "deepa.aids21_469@rvce.edu.in",
    "phone_masked": "+91 98****_469"
  },
  {
    "usn": "USN_2025_470",
    "name": "Deepak Nair",
    "branch": "AI/DS",
    "cgpa": 8.49,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "GENAI_LLMS",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 80.6,
    "email": "deepak.aids21_470@rvce.edu.in",
    "phone_masked": "+91 98****_470"
  },
  {
    "usn": "USN_2025_471",
    "name": "Nandini Sharma",
    "branch": "AI/DS",
    "cgpa": 8.75,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "NLP",
      "COMPUTER_VISION",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 88.3,
    "email": "nandini.aids21_471@rvce.edu.in",
    "phone_masked": "+91 98****_471"
  },
  {
    "usn": "USN_2025_472",
    "name": "Ankit Reddy",
    "branch": "AI/DS",
    "cgpa": 5.54,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "PYTHON",
      "COMPUTER_VISION",
      "DATABRICKS_DE",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 75.5,
    "email": "ankit.aids21_472@rvce.edu.in",
    "phone_masked": "+91 98****_472"
  },
  {
    "usn": "USN_2025_473",
    "name": "Meera Iyer",
    "branch": "AI/DS",
    "cgpa": 8.17,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "MACHINE_LEARNING",
      "PROMPT_ENGINEERING"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 72.7,
    "email": "meera.aids21_473@rvce.edu.in",
    "phone_masked": "+91 98****_473"
  },
  {
    "usn": "USN_2025_474",
    "name": "Ananya Pillai",
    "branch": "AI/DS",
    "cgpa": 7.77,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "SQL",
      "PYSPARK",
      "GENAI_LLMS",
      "NLP",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 91.1,
    "email": "ananya.aids21_474@rvce.edu.in",
    "phone_masked": "+91 98****_474"
  },
  {
    "usn": "USN_2025_475",
    "name": "Deepa Hegde",
    "branch": "AI/DS",
    "cgpa": 7.89,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "MACHINE_LEARNING",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.6,
    "email": "deepa.aids21_475@rvce.edu.in",
    "phone_masked": "+91 98****_475"
  },
  {
    "usn": "USN_2025_476",
    "name": "Shreya Verma",
    "branch": "AI/DS",
    "cgpa": 7.59,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "PYSPARK",
      "VECTOR_DATABASES",
      "COMPUTER_VISION",
      "NLP"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.4,
    "email": "shreya.aids21_476@rvce.edu.in",
    "phone_masked": "+91 98****_476"
  },
  {
    "usn": "USN_2025_477",
    "name": "Deepa Deshmukh",
    "branch": "AI/DS",
    "cgpa": 7.89,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.6,
    "email": "deepa.aids21_477@rvce.edu.in",
    "phone_masked": "+91 98****_477"
  },
  {
    "usn": "USN_2025_478",
    "name": "Manish Kulkarni",
    "branch": "AI/DS",
    "cgpa": 7.99,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "PYSPARK",
      "GENAI_LLMS",
      "DATABRICKS_DE",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 92.0,
    "email": "manish.aids21_478@rvce.edu.in",
    "phone_masked": "+91 98****_478"
  },
  {
    "usn": "USN_2025_479",
    "name": "Siddharth Sharma",
    "branch": "AI/DS",
    "cgpa": 6.0,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "PYTHON",
      "PROMPT_ENGINEERING"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 64.0,
    "email": "siddharth.aids21_479@rvce.edu.in",
    "phone_masked": "+91 98****_479"
  },
  {
    "usn": "USN_2025_480",
    "name": "Manish Sharma",
    "branch": "AI/DS",
    "cgpa": 8.1,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "MACHINE_LEARNING",
      "NLP",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 79.1,
    "email": "manish.aids21_480@rvce.edu.in",
    "phone_masked": "+91 98****_480"
  },
  {
    "usn": "USN_2025_481",
    "name": "Neha Iyer",
    "branch": "AI/DS",
    "cgpa": 9.49,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "MACHINE_LEARNING",
      "PYSPARK",
      "VECTOR_DATABASES",
      "GENAI_LLMS",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 98.0,
    "email": "neha.aids21_481@rvce.edu.in",
    "phone_masked": "+91 98****_481"
  },
  {
    "usn": "USN_2025_482",
    "name": "Rohan Bhat",
    "branch": "AI/DS",
    "cgpa": 8.58,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "MACHINE_LEARNING",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 74.3,
    "email": "rohan.aids21_482@rvce.edu.in",
    "phone_masked": "+91 98****_482"
  },
  {
    "usn": "USN_2025_483",
    "name": "Tanvi Reddy",
    "branch": "AI/DS",
    "cgpa": 7.11,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "MACHINE_LEARNING",
      "DATABRICKS_DE",
      "GENAI_LLMS",
      "NLP",
      "PYSPARK"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 88.4,
    "email": "tanvi.aids21_483@rvce.edu.in",
    "phone_masked": "+91 98****_483"
  },
  {
    "usn": "USN_2025_484",
    "name": "Manish Reddy",
    "branch": "AI/DS",
    "cgpa": 7.97,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "PYTHON",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 71.9,
    "email": "manish.aids21_484@rvce.edu.in",
    "phone_masked": "+91 98****_484"
  },
  {
    "usn": "USN_2025_485",
    "name": "Harsh Pillai",
    "branch": "AI/DS",
    "cgpa": 8.21,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "MACHINE_LEARNING",
      "PROMPT_ENGINEERING",
      "VECTOR_DATABASES",
      "DATABRICKS_DE",
      "NLP"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 92.8,
    "email": "harsh.aids21_485@rvce.edu.in",
    "phone_masked": "+91 98****_485"
  },
  {
    "usn": "USN_2025_486",
    "name": "Shreya Gupta",
    "branch": "AI/DS",
    "cgpa": 5.95,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "DEEP_LEARNING",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 63.8,
    "email": "shreya.aids21_486@rvce.edu.in",
    "phone_masked": "+91 98****_486"
  },
  {
    "usn": "USN_2025_487",
    "name": "Rohan Bhat",
    "branch": "AI/DS",
    "cgpa": 7.51,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "PYTHON",
      "VECTOR_DATABASES",
      "PYSPARK",
      "NLP",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 90.0,
    "email": "rohan.aids21_487@rvce.edu.in",
    "phone_masked": "+91 98****_487"
  },
  {
    "usn": "USN_2025_488",
    "name": "Harsh Singh",
    "branch": "AI/DS",
    "cgpa": 7.37,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "DEEP_LEARNING",
      "NLP"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 69.5,
    "email": "harsh.aids21_488@rvce.edu.in",
    "phone_masked": "+91 98****_488"
  },
  {
    "usn": "USN_2025_489",
    "name": "Pranav Joshi",
    "branch": "AI/DS",
    "cgpa": 6.93,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "PYTHON",
      "PROMPT_ENGINEERING",
      "GENAI_LLMS",
      "COMPUTER_VISION"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.1,
    "email": "pranav.aids21_489@rvce.edu.in",
    "phone_masked": "+91 98****_489"
  },
  {
    "usn": "USN_2025_490",
    "name": "Ananya Kulkarni",
    "branch": "AI/DS",
    "cgpa": 8.08,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "MACHINE_LEARNING",
      "GENAI_LLMS",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 7,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 1,
    "placement_readiness_score": 79.0,
    "email": "ananya.aids21_490@rvce.edu.in",
    "phone_masked": "+91 98****_490"
  },
  {
    "usn": "USN_2025_491",
    "name": "Nandini Rao",
    "branch": "AI/DS",
    "cgpa": 8.6,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "PYTHON",
      "PROMPT_ENGINEERING",
      "VECTOR_DATABASES",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 87.7,
    "email": "nandini.aids21_491@rvce.edu.in",
    "phone_masked": "+91 98****_491"
  },
  {
    "usn": "USN_2025_492",
    "name": "Gaurav Kulkarni",
    "branch": "AI/DS",
    "cgpa": 6.6,
    "active_backlogs": 0,
    "skills": [
      "PYTHON",
      "SQL",
      "GENAI_LLMS",
      "COMPUTER_VISION",
      "DATABRICKS_DE",
      "NLP"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 86.4,
    "email": "gaurav.aids21_492@rvce.edu.in",
    "phone_masked": "+91 98****_492"
  },
  {
    "usn": "USN_2025_493",
    "name": "Nikhil Joshi",
    "branch": "AI/DS",
    "cgpa": 9.19,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "MACHINE_LEARNING",
      "PROMPT_ENGINEERING",
      "GENAI_LLMS",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 90.1,
    "email": "nikhil.aids21_493@rvce.edu.in",
    "phone_masked": "+91 98****_493"
  },
  {
    "usn": "USN_2025_494",
    "name": "Siddharth Joshi",
    "branch": "AI/DS",
    "cgpa": 6.2,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "SQL",
      "NLP",
      "PYSPARK",
      "VECTOR_DATABASES"
    ],
    "eligible_company_count": 3,
    "dream_eligible_count": 1,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 78.1,
    "email": "siddharth.aids21_494@rvce.edu.in",
    "phone_masked": "+91 98****_494"
  },
  {
    "usn": "USN_2025_495",
    "name": "Nandini Joshi",
    "branch": "AI/DS",
    "cgpa": 8.79,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "DEEP_LEARNING",
      "VECTOR_DATABASES",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 81.8,
    "email": "nandini.aids21_495@rvce.edu.in",
    "phone_masked": "+91 98****_495"
  },
  {
    "usn": "USN_2025_496",
    "name": "Ananya Joshi",
    "branch": "AI/DS",
    "cgpa": 7.08,
    "active_backlogs": 0,
    "skills": [
      "SQL",
      "MACHINE_LEARNING",
      "COMPUTER_VISION",
      "PYSPARK",
      "PROMPT_ENGINEERING"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 81.7,
    "email": "ananya.aids21_496@rvce.edu.in",
    "phone_masked": "+91 98****_496"
  },
  {
    "usn": "USN_2025_497",
    "name": "Ankit Reddy",
    "branch": "AI/DS",
    "cgpa": 9.74,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "MACHINE_LEARNING",
      "DATABRICKS_DE",
      "PYSPARK"
    ],
    "eligible_company_count": 8,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 2,
    "placement_readiness_score": 85.6,
    "email": "ankit.aids21_497@rvce.edu.in",
    "phone_masked": "+91 98****_497"
  },
  {
    "usn": "USN_2025_498",
    "name": "Gaurav Hegde",
    "branch": "AI/DS",
    "cgpa": 7.58,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "PYTHON",
      "COMPUTER_VISION",
      "NLP",
      "PYSPARK"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 83.7,
    "email": "gaurav.aids21_498@rvce.edu.in",
    "phone_masked": "+91 98****_498"
  },
  {
    "usn": "USN_2025_499",
    "name": "Siddharth Kulkarni",
    "branch": "AI/DS",
    "cgpa": 7.75,
    "active_backlogs": 0,
    "skills": [
      "MACHINE_LEARNING",
      "DEEP_LEARNING",
      "NLP",
      "GENAI_LLMS"
    ],
    "eligible_company_count": 6,
    "dream_eligible_count": 4,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 77.7,
    "email": "siddharth.aids21_499@rvce.edu.in",
    "phone_masked": "+91 98****_499"
  },
  {
    "usn": "USN_2025_500",
    "name": "Rhea Bhat",
    "branch": "AI/DS",
    "cgpa": 7.27,
    "active_backlogs": 0,
    "skills": [
      "DEEP_LEARNING",
      "MACHINE_LEARNING",
      "VECTOR_DATABASES",
      "COMPUTER_VISION",
      "GENAI_LLMS",
      "DATABRICKS_DE"
    ],
    "eligible_company_count": 4,
    "dream_eligible_count": 2,
    "super_dream_eligible_count": 0,
    "placement_readiness_score": 89.1,
    "email": "rhea.aids21_500@rvce.edu.in",
    "phone_masked": "+91 98****_500"
  }
];




export const ALL_SKILLS = [
  // AI / GenAI (8)
  { id: 'GENAI_LLMS', label: 'GenAI / LLMs', category: 'AI / GenAI' },
  { id: 'MACHINE_LEARNING', label: 'Machine Learning', category: 'AI / GenAI' },
  { id: 'DEEP_LEARNING', label: 'Deep Learning', category: 'AI / GenAI' },
  { id: 'LANGCHAIN', label: 'LangChain', category: 'AI / GenAI' },
  { id: 'PROMPT_ENGINEERING', label: 'Prompt Eng.', category: 'AI / GenAI' },
  { id: 'COMPUTER_VISION', label: 'Computer Vision', category: 'AI / GenAI' },
  { id: 'NLP', label: 'NLP', category: 'AI / GenAI' },
  { id: 'VECTOR_DATABASES', label: 'Vector Databases', category: 'AI / GenAI' },

  // Data Engineering & Cloud (4)
  { id: 'DATABRICKS_DE', label: 'Databricks DE', category: 'Data & Cloud' },
  { id: 'PYSPARK', label: 'PySpark', category: 'Data & Cloud' },
  { id: 'SQL', label: 'SQL / Delta Lake', category: 'Data & Cloud' },
  { id: 'AWS_CLOUD', label: 'AWS Cloud', category: 'Data & Cloud' },

  // Core Engineering (4)
  { id: 'PYTHON', label: 'Python', category: 'Core Eng.' },
  { id: 'CPP', label: 'C++', category: 'Core Eng.' },
  { id: 'JAVA_BACKEND', label: 'Java Backend', category: 'Core Eng.' },
  { id: 'REACT', label: 'React.js', category: 'Core Eng.' }
];

export function mockMatchJD(_rawJd: string) {
  return {
    extracted_criteria: {
      min_cgpa: 8.0,
      max_backlogs: 0,
      allowed_branches: ['CSE', 'ISE', 'AI/DS'],
      required_skills: ['PYTHON', 'SQL', 'DATABRICKS_DE'],
      target_role: 'Data Engineer',
      ctc_lpa: 48.0
    },
    matched_students: MOCK_STUDENTS.slice(0, 5),
    matched_student_ids: MOCK_STUDENTS.slice(0, 5).map(s => s.usn),
    sql_query: "SELECT student_id, full_name, cgpa, branch FROM workspace.campus_intelligence_gold.gold_dim_students WHERE cgpa >= 8.0 AND active_backlogs = 0;",
    latency_ms: 120,
    row_count: 5,
    lineage: {
      catalog: 'workspace.campus_intelligence_gold',
      pii_masked: true,
      engine: 'Serverless Photon'
    }
  };
}

export function mockGenieQuery(prompt: string, _persona: string = 'TPO') {
  const pLower = prompt.toLowerCase();
  
  // Student skill ROI / probability / PySpark calculation query
  if (
    pLower.includes('probability') ||
    pLower.includes('pyspark') ||
    pLower.includes('databricks') ||
    pLower.includes('chance') ||
    pLower.includes('increase') ||
    pLower.includes('roi') ||
    pLower.includes('ctc') ||
    pLower.includes('what if') ||
    pLower.includes('learn')
  ) {
    return {
      answer: "### 6-Year Historical Placement Cohort Analysis (2020–2025)\n\nBased on **2,400 historical placement records** in `workspace.campus_intelligence_gold.gold_fact_placement_history` for your cohort demographic (**ISE Branch, CGPA ~8.12**): [1]\n\n### Historical Cohort Return Metrics\n• **Baseline (Without Skill):** **40.0%** placement rate (10/25 placed) with **8.20 LPA** average CTC.\n• **With Target Skill (e.g. PySpark / Databricks DE):** **80.0%** placement rate (20/25 placed) with **18.50 LPA** average CTC. [2]\n• **Synergy Uplift (PySpark + Databricks DE):** **92.0%** placement rate (23/25 placed) with **22.80 LPA** average CTC.\n\n### Net Calculated Gains\n• **Placement Probability Gain:** **+40.0 percentage points** (from 40.0% to 80.0%)\n• **Expected Compensation Gain:** **+10.30 LPA** (from 8.20 LPA to 18.50 LPA)\n\n### Unlocked Dream & Super Dream Companies\n1. **Databricks** (48.0 LPA • Super Dream) — *Prerequisites: PySpark, SQL, Python*\n2. **Adobe** (26.0 LPA • Dream) — *Prerequisites: Python, React, C++*\n3. **Infosys DSE** (7.0 LPA • Core Tech) — *Prerequisites: Python, SQL*",
      sql_query: "SELECT \n  COUNT(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN 1 END) AS placed_with_skill,\n  COUNT(CASE WHEN had_ai_data_skill = TRUE THEN 1 END) AS total_with_skill,\n  COUNT(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN 1 END) AS placed_without_skill,\n  COUNT(CASE WHEN had_ai_data_skill = FALSE THEN 1 END) AS total_without_skill,\n  ROUND(AVG(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2) AS avg_ctc_with_skill,\n  ROUND(AVG(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2) AS avg_ctc_without_skill\nFROM workspace.campus_intelligence_gold.gold_fact_placement_history ph\nJOIN workspace.campus_intelligence_gold.gold_dim_students s ON ph.student_id = s.student_id\nWHERE s.branch = 'ISE' AND s.cgpa BETWEEN 7.77 AND 8.47;",
      latency_ms: 185,
      row_count: 1,
      columns: ['placed_with_skill', 'total_with_skill', 'placed_without_skill', 'total_without_skill', 'avg_ctc_with_skill', 'avg_ctc_without_skill'],
      rows: [[20, 25, 10, 25, 18.50, 8.20]],
      table_title: '6-Year Historical Cohort Placement Returns (ISE • CGPA 7.77-8.47)',
      thinking_steps: [
        'Querying 6-year placement history (2020-2025) from gold_fact_placement_history',
        'Filtering cohort demographic: branch = ISE, CGPA range [7.77, 8.47]',
        'Calculating historical placement probability and average CTC with vs without skill'
      ],
      citations: [
        { id: '1', source: 'workspace.campus_intelligence_gold.gold_fact_placement_history' },
        { id: '2', source: 'workspace.campus_intelligence_gold.gold_dim_company_criteria' }
      ],
      lineage: {
        catalog: 'workspace.campus_intelligence_gold',
        pii_masked: true,
        engine: 'Serverless Photon'
      }
    };
  }

  // Benchmark Query 6 / TPO Placement Overview
  return {
    answer: "### 2024 Graduating Batch Placement Performance\n\nThe 2024 graduating batch achieved a **94.80% overall placement rate** with an **average CTC of 19.19 LPA** across 269 students. [1]\n\n### Overall Statistics\n• **Total Students:** 269\n• **Placed Students:** 255\n• **Placement Rate:** 94.80%\n• **Average CTC:** 19.19 LPA\n\n---\n\n### Branch-wise Performance [2]\n\n| Branch | Total Students | Placed | Placement % | Avg CTC (LPA) |\n| :--- | :--- | :--- | :--- | :--- |\n| **AI/DS** | 38 | 37 | **97.37%** | **18.28** |\n| **ISE** | 72 | 69 | **95.83%** | **18.78** |\n| **ECE** | 48 | 45 | **93.75%** | **18.42** |\n| **CSE** | 111 | 104 | **93.69%** | **20.24** |\n\n### Key Insights\n• **Highest Placement Rate:** AI/DS leads with 97.37% placement, placing 37 out of 38 students.\n• **Highest Average CTC:** CSE graduates commanded the highest average compensation at 20.24 LPA, despite having a slightly lower placement percentage (93.69%) than AI/DS and ISE.\n• **Most Consistent Performance:** All four branches maintained placement rates above 93%, demonstrating strong overall campus recruitment outcomes for the 2024 cohort.",
    sql_query: "SELECT\n  s.`branch`,\n  COUNT(DISTINCT s.`student_id`) AS total_students,\n  COUNT(DISTINCT CASE WHEN ph.`offer_status` = 'Placed' THEN s.`student_id` END) AS placed_students,\n  ROUND(\n    COUNT(DISTINCT CASE WHEN ph.`offer_status` = 'Placed' THEN s.`student_id` END) * 100.0\n    / COUNT(DISTINCT s.`student_id`),\n    2\n  ) AS placement_pct,\n  ROUND(\n    AVG(CASE WHEN ph.`offer_status` = 'Placed' THEN ph.`offered_ctc_lpa` END),\n    2\n  ) AS avg_placed_ctc_lpa\nFROM workspace.campus_intelligence_gold.gold_dim_students s\nLEFT JOIN workspace.campus_intelligence_gold.gold_fact_placement_history ph ON s.student_id = ph.student_id\nWHERE s.graduating_year = 2024\nGROUP BY s.branch\nORDER BY avg_placed_ctc_lpa DESC;",
    latency_ms: 215,
    row_count: 4,
    columns: ['branch', 'total_students', 'placed_students', 'placement_pct', 'avg_ctc_lpa'],
    rows: [['AI/DS', 38, 37, '97.37%', 18.28], ['ISE', 72, 69, '95.83%', 18.78], ['ECE', 48, 45, '93.75%', 18.42], ['CSE', 111, 104, '93.69%', 20.24]],
    table_title: '2024 Graduating Batch Placement Performance by Branch',
    thinking_steps: [
      "I'll analyze the placement outcomes for the 2024 graduating batch across all branches.",
      '2024 batch placement percentage and average CTC by branch',
      '2024 batch overall placement statistics'
    ],
    citations: [
      { id: '1', source: 'workspace.campus_intelligence_gold.gold_dim_students' },
      { id: '2', source: 'workspace.campus_intelligence_gold.gold_fact_placement_history' }
    ],
    lineage: {
      catalog: 'workspace.campus_intelligence_gold',
      pii_masked: true,
      engine: 'Serverless Photon'
    }
  };
}

export function simulateWhatIf(req: { student_id: string; added_skills: string[]; target_company?: string }) {
  const hasDatabricks = req.added_skills.includes('DATABRICKS_DE');
  const hasPySpark = req.added_skills.includes('PYSPARK');

  let baseProb = 40.0;
  let baseCtc = 8.20;
  let simProb = baseProb;
  let simCtc = baseCtc;
  let newlyUnlocked: any[] = [];
  let synergyAlert: string | null = null;

  if (hasDatabricks && hasPySpark) {
    simProb = 92.0;
    simCtc = 22.80;
    synergyAlert = 'Synergy Alert: Pairing DATABRICKS_DE with PYSPARK boosts Super Dream probability to 92.0% (+52.0 pts) and expected CTC to 22.80 LPA (+14.60 LPA).';
    newlyUnlocked = [
      { name: 'Databricks', ctc_lpa: 48.0, tier: 'Super Dream', is_new: true },
      { name: 'Adobe', ctc_lpa: 26.0, tier: 'Dream', is_new: true },
      { name: 'Infosys DSE', ctc_lpa: 7.0, tier: 'Core Tech', is_new: true }
    ];
  } else if (hasDatabricks) {
    simProb = 80.0;
    simCtc = 18.50;
    synergyAlert = 'Top ROI Recommendation: Adding DATABRICKS_DE yields the highest marginal CTC gain (+10.30 LPA) and unlocks 2 Super Dream companies.';
    newlyUnlocked = [
      { name: 'Databricks', ctc_lpa: 48.0, tier: 'Super Dream', is_new: true },
      { name: 'Adobe', ctc_lpa: 26.0, tier: 'Dream', is_new: true }
    ];
  } else if (req.added_skills.length > 0) {
    simProb = Math.min(85.0, baseProb + req.added_skills.length * 10.0);
    simCtc = Number((baseCtc + req.added_skills.length * 2.2).toFixed(2));
    newlyUnlocked = [
      { name: 'Cisco', ctc_lpa: 18.0, tier: 'Dream', is_new: true }
    ];
  }

  return {
    student_id: req.student_id,
    added_skills: req.added_skills,
    base_prob: baseProb,
    simulated_prob: simProb,
    delta_prob: Number((simProb - baseProb).toFixed(1)),
    base_ctc: baseCtc,
    simulated_ctc: simCtc,
    delta_ctc: Number((simCtc - baseCtc).toFixed(2)),
    base_tier_distribution: { core_tech: 3, dream: 0, super_dream: 0 },
    tier_distribution: { core_tech: 3, dream: newlyUnlocked.length >= 2 ? 1 : 0, super_dream: hasDatabricks ? 1 : 0 },
    synergy_alert: synergyAlert,
    newly_unlocked_companies: newlyUnlocked,
    sql_query: "SELECT \n  COUNT(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN 1 END) AS placed_with_skill,\n  COUNT(CASE WHEN had_ai_data_skill = TRUE THEN 1 END) AS total_with_skill,\n  COUNT(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN 1 END) AS placed_without_skill,\n  COUNT(CASE WHEN had_ai_data_skill = FALSE THEN 1 END) AS total_without_skill,\n  ROUND(AVG(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2) AS avg_ctc_with_skill,\n  ROUND(AVG(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2) AS avg_ctc_without_skill\nFROM workspace.campus_intelligence_gold.gold_fact_placement_history ph\nJOIN workspace.campus_intelligence_gold.gold_dim_students s ON ph.student_id = s.student_id\nWHERE s.branch = 'ISE';",
    cohort_size_analyzed: 50
  };
}
