import {
  StudentCandidate,
  StudentProfileResponse,
  JDMatchResponse,
  GenieQueryResponse,
  WhatIfResponse,
  LineageInfo
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

// 50 realistic student records for TPO spreadsheet
export const MOCK_STUDENTS: StudentCandidate[] = [
  {
    usn: 'USN_2025_001',
    name: 'Aarav Sharma',
    branch: 'CSE',
    cgpa: 9.45,
    active_backlogs: 0,
    skills: ['PYTHON', 'DATA_STRUCTURES', 'SYSTEM_DESIGN', 'AWS', 'DOCKER', 'FASTAPI'],
    eligible_company_count: 14,
    dream_eligible_count: 5,
    super_dream_eligible_count: 4,
    placement_readiness_score: 96.2,
    email: 'aarav.cse21@rvce.edu.in',
    phone_masked: '+91 98****1201'
  },
  {
    usn: 'USN_2025_002',
    name: 'Ananya Iyer',
    branch: 'ISE',
    cgpa: 9.12,
    active_backlogs: 0,
    skills: ['DATABRICKS_DE', 'PYSPARK', 'DELTA_LAKE', 'SQL', 'PYTHON', 'AWS'],
    eligible_company_count: 12,
    dream_eligible_count: 4,
    super_dream_eligible_count: 3,
    placement_readiness_score: 92.5,
    email: 'ananya.ise21@rvce.edu.in',
    phone_masked: '+91 98****1202'
  },
  {
    usn: 'USN_2025_003',
    name: 'Rohan Deshmukh',
    branch: 'AI/DS',
    cgpa: 8.84,
    active_backlogs: 0,
    skills: ['MACHINE_LEARNING', 'MLOPS', 'PYTHON', 'SQL', 'FASTAPI', 'DOCKER'],
    eligible_company_count: 11,
    dream_eligible_count: 4,
    super_dream_eligible_count: 2,
    placement_readiness_score: 88.0,
    email: 'rohan.aids21@rvce.edu.in',
    phone_masked: '+91 98****1203'
  },
  {
    usn: 'USN_2025_004',
    name: 'Siddharth Rao',
    branch: 'CSE',
    cgpa: 8.76,
    active_backlogs: 0,
    skills: ['REACT', 'FASTAPI', 'PYTHON', 'SQL', 'DOCKER', 'KAFKA'],
    eligible_company_count: 10,
    dream_eligible_count: 3,
    super_dream_eligible_count: 2,
    placement_readiness_score: 85.4,
    email: 'siddharth.cse21@rvce.edu.in',
    phone_masked: '+91 98****1204'
  },
  {
    usn: 'USN_2025_005',
    name: 'Kavya Hegde',
    branch: 'ECE',
    cgpa: 8.65,
    active_backlogs: 0,
    skills: ['PYTHON', 'DATA_STRUCTURES', 'AWS', 'SQL'],
    eligible_company_count: 9,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 81.0,
    email: 'kavya.ece21@rvce.edu.in',
    phone_masked: '+91 98****1205'
  },
  {
    usn: 'USN_2025_042',
    name: 'Priya Nair',
    branch: 'ISE',
    cgpa: 8.12,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'DATA_ANALYSIS', 'POWER_BI', 'PANDAS'],
    eligible_company_count: 6,
    dream_eligible_count: 2,
    super_dream_eligible_count: 0,
    placement_readiness_score: 74.5,
    email: 'priya.ise21@rvce.edu.in',
    phone_masked: '+91 98****1242'
  },
  {
    usn: 'USN_2025_006',
    name: 'Vikram Menon',
    branch: 'CSE',
    cgpa: 8.95,
    active_backlogs: 0,
    skills: ['DATABRICKS_DE', 'PYSPARK', 'SQL', 'PYTHON', 'KAFKA', 'AWS'],
    eligible_company_count: 13,
    dream_eligible_count: 4,
    super_dream_eligible_count: 3,
    placement_readiness_score: 91.0,
    email: 'vikram.cse21@rvce.edu.in',
    phone_masked: '+91 98****1206'
  },
  {
    usn: 'USN_2025_007',
    name: 'Meera Kulkarni',
    branch: 'AI/DS',
    cgpa: 8.35,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'MACHINE_LEARNING', 'PANDAS', 'POWER_BI'],
    eligible_company_count: 8,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 78.2,
    email: 'meera.aids21@rvce.edu.in',
    phone_masked: '+91 98****1207'
  },
  {
    usn: 'USN_2025_008',
    name: 'Aditya Varma',
    branch: 'ECE',
    cgpa: 7.92,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'FASTAPI', 'DOCKER'],
    eligible_company_count: 7,
    dream_eligible_count: 2,
    super_dream_eligible_count: 1,
    placement_readiness_score: 72.8,
    email: 'aditya.ece21@rvce.edu.in',
    phone_masked: '+91 98****1208'
  },
  {
    usn: 'USN_2025_009',
    name: 'Tanvi Joshi',
    branch: 'ISE',
    cgpa: 8.58,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'DATA_MODELING', 'POWER_BI', 'AWS'],
    eligible_company_count: 9,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 82.0,
    email: 'tanvi.ise21@rvce.edu.in',
    phone_masked: '+91 98****1209'
  },
  {
    usn: 'USN_2025_010',
    name: 'Rahul Sen',
    branch: 'CSE',
    cgpa: 7.45,
    active_backlogs: 1,
    skills: ['PYTHON', 'REACT', 'FASTAPI'],
    eligible_company_count: 4,
    dream_eligible_count: 1,
    super_dream_eligible_count: 0,
    placement_readiness_score: 58.0,
    email: 'rahul.cse21@rvce.edu.in',
    phone_masked: '+91 98****1210'
  },
  {
    usn: 'USN_2025_011',
    name: 'Neha Nambiar',
    branch: 'AI/DS',
    cgpa: 9.30,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'DATABRICKS_DE', 'PYSPARK', 'MACHINE_LEARNING', 'DELTA_LAKE'],
    eligible_company_count: 14,
    dream_eligible_count: 5,
    super_dream_eligible_count: 4,
    placement_readiness_score: 95.0,
    email: 'neha.aids21@rvce.edu.in',
    phone_masked: '+91 98****1211'
  },
  {
    usn: 'USN_2025_012',
    name: 'Gaurav Bhat',
    branch: 'ECE',
    cgpa: 7.80,
    active_backlogs: 0,
    skills: ['PYTHON', 'DATA_STRUCTURES', 'SQL'],
    eligible_company_count: 6,
    dream_eligible_count: 2,
    super_dream_eligible_count: 0,
    placement_readiness_score: 69.5,
    email: 'gaurav.ece21@rvce.edu.in',
    phone_masked: '+91 98****1212'
  },
  {
    usn: 'USN_2025_013',
    name: 'Pooja Reddy',
    branch: 'ISE',
    cgpa: 8.40,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'FASTAPI', 'DOCKER', 'AWS'],
    eligible_company_count: 9,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 80.5,
    email: 'pooja.ise21@rvce.edu.in',
    phone_masked: '+91 98****1213'
  },
  {
    usn: 'USN_2025_014',
    name: 'Nikhil Shetty',
    branch: 'CSE',
    cgpa: 8.22,
    active_backlogs: 0,
    skills: ['DATA_STRUCTURES', 'PYTHON', 'SQL', 'SYSTEM_DESIGN'],
    eligible_company_count: 8,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 79.0,
    email: 'nikhil.cse21@rvce.edu.in',
    phone_masked: '+91 98****1214'
  },
  {
    usn: 'USN_2025_015',
    name: 'Divya Pillai',
    branch: 'AI/DS',
    cgpa: 8.65,
    active_backlogs: 0,
    skills: ['PYTHON', 'MLOPS', 'MACHINE_LEARNING', 'DOCKER', 'FASTAPI'],
    eligible_company_count: 10,
    dream_eligible_count: 4,
    super_dream_eligible_count: 2,
    placement_readiness_score: 86.0,
    email: 'divya.aids21@rvce.edu.in',
    phone_masked: '+91 98****1215'
  },
  {
    usn: 'USN_2025_016',
    name: 'Harish Prabhu',
    branch: 'ECE',
    cgpa: 6.95,
    active_backlogs: 2,
    skills: ['PYTHON', 'SQL'],
    eligible_company_count: 3,
    dream_eligible_count: 0,
    super_dream_eligible_count: 0,
    placement_readiness_score: 48.0,
    email: 'harish.ece21@rvce.edu.in',
    phone_masked: '+91 98****1216'
  },
  {
    usn: 'USN_2025_017',
    name: 'Shruti Kamath',
    branch: 'ISE',
    cgpa: 8.88,
    active_backlogs: 0,
    skills: ['DATABRICKS_DE', 'SQL', 'DELTA_LAKE', 'PYTHON', 'POWER_BI'],
    eligible_company_count: 11,
    dream_eligible_count: 4,
    super_dream_eligible_count: 2,
    placement_readiness_score: 89.2,
    email: 'shruti.ise21@rvce.edu.in',
    phone_masked: '+91 98****1217'
  },
  {
    usn: 'USN_2025_018',
    name: 'Karthik Somayaji',
    branch: 'CSE',
    cgpa: 7.75,
    active_backlogs: 0,
    skills: ['PYTHON', 'REACT', 'SQL', 'DOCKER'],
    eligible_company_count: 6,
    dream_eligible_count: 2,
    super_dream_eligible_count: 0,
    placement_readiness_score: 71.0,
    email: 'karthik.cse21@rvce.edu.in',
    phone_masked: '+91 98****1218'
  },
  {
    usn: 'USN_2025_019',
    name: 'Bhavana Gowda',
    branch: 'AI/DS',
    cgpa: 8.15,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'DATA_ANALYSIS', 'MACHINE_LEARNING'],
    eligible_company_count: 7,
    dream_eligible_count: 2,
    super_dream_eligible_count: 1,
    placement_readiness_score: 75.0,
    email: 'bhavana.aids21@rvce.edu.in',
    phone_masked: '+91 98****1219'
  },
  {
    usn: 'USN_2025_020',
    name: 'Vishal Chawla',
    branch: 'CSE',
    cgpa: 9.05,
    active_backlogs: 0,
    skills: ['DATA_STRUCTURES', 'SYSTEM_DESIGN', 'KAFKA', 'AWS', 'PYTHON'],
    eligible_company_count: 13,
    dream_eligible_count: 5,
    super_dream_eligible_count: 3,
    placement_readiness_score: 93.0,
    email: 'vishal.cse21@rvce.edu.in',
    phone_masked: '+91 98****1220'
  },
  {
    usn: 'USN_2025_021',
    name: 'Trisha Das',
    branch: 'ISE',
    cgpa: 8.25,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'DATA_MODELING', 'FASTAPI'],
    eligible_company_count: 8,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 77.4,
    email: 'trisha.ise21@rvce.edu.in',
    phone_masked: '+91 98****1221'
  },
  {
    usn: 'USN_2025_022',
    name: 'Manoj Hegde',
    branch: 'ECE',
    cgpa: 8.10,
    active_backlogs: 0,
    skills: ['PYTHON', 'AWS', 'DOCKER', 'SQL'],
    eligible_company_count: 7,
    dream_eligible_count: 2,
    super_dream_eligible_count: 1,
    placement_readiness_score: 74.0,
    email: 'manoj.ece21@rvce.edu.in',
    phone_masked: '+91 98****1222'
  },
  {
    usn: 'USN_2025_023',
    name: 'Aishwarya Patil',
    branch: 'AI/DS',
    cgpa: 8.70,
    active_backlogs: 0,
    skills: ['PYTHON', 'PYSPARK', 'SQL', 'DATABRICKS_DE', 'POWER_BI'],
    eligible_company_count: 11,
    dream_eligible_count: 4,
    super_dream_eligible_count: 2,
    placement_readiness_score: 87.5,
    email: 'aishwarya.aids21@rvce.edu.in',
    phone_masked: '+91 98****1223'
  },
  {
    usn: 'USN_2025_024',
    name: 'Arjun Namboodiri',
    branch: 'CSE',
    cgpa: 8.50,
    active_backlogs: 0,
    skills: ['PYTHON', 'FASTAPI', 'DOCKER', 'REACT', 'SQL'],
    eligible_company_count: 9,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 82.5,
    email: 'arjun.cse21@rvce.edu.in',
    phone_masked: '+91 98****1224'
  },
  {
    usn: 'USN_2025_025',
    name: 'Sanjana Roy',
    branch: 'ISE',
    cgpa: 7.85,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'POWER_BI', 'DATA_ANALYSIS'],
    eligible_company_count: 6,
    dream_eligible_count: 2,
    super_dream_eligible_count: 0,
    placement_readiness_score: 70.0,
    email: 'sanjana.ise21@rvce.edu.in',
    phone_masked: '+91 98****1225'
  },
  {
    usn: 'USN_2025_026',
    name: 'Pranav Joshi',
    branch: 'ECE',
    cgpa: 7.60,
    active_backlogs: 1,
    skills: ['PYTHON', 'SQL', 'FASTAPI'],
    eligible_company_count: 4,
    dream_eligible_count: 1,
    super_dream_eligible_count: 0,
    placement_readiness_score: 61.2,
    email: 'pranav.ece21@rvce.edu.in',
    phone_masked: '+91 98****1226'
  },
  {
    usn: 'USN_2025_027',
    name: 'Deepika Murthy',
    branch: 'AI/DS',
    cgpa: 9.15,
    active_backlogs: 0,
    skills: ['PYTHON', 'DATABRICKS_DE', 'PYSPARK', 'DELTA_LAKE', 'MLOPS', 'SQL'],
    eligible_company_count: 13,
    dream_eligible_count: 5,
    super_dream_eligible_count: 3,
    placement_readiness_score: 93.8,
    email: 'deepika.aids21@rvce.edu.in',
    phone_masked: '+91 98****1227'
  },
  {
    usn: 'USN_2025_028',
    name: 'Tarun Khare',
    branch: 'CSE',
    cgpa: 8.38,
    active_backlogs: 0,
    skills: ['DATA_STRUCTURES', 'PYTHON', 'SQL', 'AWS'],
    eligible_company_count: 8,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 80.0,
    email: 'tarun.cse21@rvce.edu.in',
    phone_masked: '+91 98****1228'
  },
  {
    usn: 'USN_2025_029',
    name: 'Swati Shenoy',
    branch: 'ISE',
    cgpa: 8.60,
    active_backlogs: 0,
    skills: ['DATABRICKS_DE', 'PYTHON', 'SQL', 'DATA_MODELING'],
    eligible_company_count: 10,
    dream_eligible_count: 4,
    super_dream_eligible_count: 2,
    placement_readiness_score: 85.0,
    email: 'swati.ise21@rvce.edu.in',
    phone_masked: '+91 98****1229'
  },
  {
    usn: 'USN_2025_030',
    name: 'Varun Bhatia',
    branch: 'ECE',
    cgpa: 8.42,
    active_backlogs: 0,
    skills: ['PYTHON', 'DATA_STRUCTURES', 'FASTAPI', 'AWS'],
    eligible_company_count: 8,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 81.5,
    email: 'varun.ece21@rvce.edu.in',
    phone_masked: '+91 98****1230'
  },
  {
    usn: 'USN_2025_031',
    name: 'Gayatri Dixit',
    branch: 'AI/DS',
    cgpa: 8.90,
    active_backlogs: 0,
    skills: ['MACHINE_LEARNING', 'PYTHON', 'SQL', 'FASTAPI', 'DOCKER'],
    eligible_company_count: 11,
    dream_eligible_count: 4,
    super_dream_eligible_count: 2,
    placement_readiness_score: 88.5,
    email: 'gayatri.aids21@rvce.edu.in',
    phone_masked: '+91 98****1231'
  },
  {
    usn: 'USN_2025_032',
    name: 'Sanjay Krishnan',
    branch: 'CSE',
    cgpa: 8.68,
    active_backlogs: 0,
    skills: ['PYTHON', 'SYSTEM_DESIGN', 'DATA_STRUCTURES', 'DOCKER'],
    eligible_company_count: 9,
    dream_eligible_count: 3,
    super_dream_eligible_count: 2,
    placement_readiness_score: 84.0,
    email: 'sanjay.cse21@rvce.edu.in',
    phone_masked: '+91 98****1232'
  },
  {
    usn: 'USN_2025_033',
    name: 'Pavithra Mohan',
    branch: 'ISE',
    cgpa: 8.05,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'POWER_BI', 'FASTAPI'],
    eligible_company_count: 7,
    dream_eligible_count: 2,
    super_dream_eligible_count: 0,
    placement_readiness_score: 73.0,
    email: 'pavithra.ise21@rvce.edu.in',
    phone_masked: '+91 98****1233'
  },
  {
    usn: 'USN_2025_034',
    name: 'Rishi Poddar',
    branch: 'ECE',
    cgpa: 7.20,
    active_backlogs: 1,
    skills: ['PYTHON', 'SQL', 'DOCKER'],
    eligible_company_count: 4,
    dream_eligible_count: 1,
    super_dream_eligible_count: 0,
    placement_readiness_score: 56.0,
    email: 'rishi.ece21@rvce.edu.in',
    phone_masked: '+91 98****1234'
  },
  {
    usn: 'USN_2025_035',
    name: 'Ishita Bansal',
    branch: 'AI/DS',
    cgpa: 9.02,
    active_backlogs: 0,
    skills: ['PYTHON', 'DATABRICKS_DE', 'PYSPARK', 'SQL', 'AWS'],
    eligible_company_count: 12,
    dream_eligible_count: 4,
    super_dream_eligible_count: 3,
    placement_readiness_score: 91.5,
    email: 'ishita.aids21@rvce.edu.in',
    phone_masked: '+91 98****1235'
  },
  {
    usn: 'USN_2025_036',
    name: 'Abhishek Mathur',
    branch: 'CSE',
    cgpa: 8.20,
    active_backlogs: 0,
    skills: ['REACT', 'FASTAPI', 'PYTHON', 'SQL'],
    eligible_company_count: 7,
    dream_eligible_count: 2,
    super_dream_eligible_count: 1,
    placement_readiness_score: 76.0,
    email: 'abhishek.cse21@rvce.edu.in',
    phone_masked: '+91 98****1236'
  },
  {
    usn: 'USN_2025_037',
    name: 'Akanksha Tiwari',
    branch: 'ISE',
    cgpa: 8.75,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'DATABRICKS_DE', 'DELTA_LAKE', 'FASTAPI'],
    eligible_company_count: 11,
    dream_eligible_count: 4,
    super_dream_eligible_count: 2,
    placement_readiness_score: 87.0,
    email: 'akanksha.ise21@rvce.edu.in',
    phone_masked: '+91 98****1237'
  },
  {
    usn: 'USN_2025_038',
    name: 'Chinmay Kulkarni',
    branch: 'ECE',
    cgpa: 8.30,
    active_backlogs: 0,
    skills: ['PYTHON', 'AWS', 'FASTAPI', 'SQL'],
    eligible_company_count: 8,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 79.5,
    email: 'chinmay.ece21@rvce.edu.in',
    phone_masked: '+91 98****1238'
  },
  {
    usn: 'USN_2025_039',
    name: 'Suhasini Rao',
    branch: 'AI/DS',
    cgpa: 8.45,
    active_backlogs: 0,
    skills: ['MACHINE_LEARNING', 'PYTHON', 'SQL', 'PANDAS'],
    eligible_company_count: 8,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 80.0,
    email: 'suhasini.aids21@rvce.edu.in',
    phone_masked: '+91 98****1239'
  },
  {
    usn: 'USN_2025_040',
    name: 'Gautam Nair',
    branch: 'CSE',
    cgpa: 9.25,
    active_backlogs: 0,
    skills: ['DATA_STRUCTURES', 'SYSTEM_DESIGN', 'AWS', 'KAFKA', 'PYTHON'],
    eligible_company_count: 13,
    dream_eligible_count: 5,
    super_dream_eligible_count: 3,
    placement_readiness_score: 94.0,
    email: 'gautam.cse21@rvce.edu.in',
    phone_masked: '+91 98****1240'
  },
  {
    usn: 'USN_2025_041',
    name: 'Yashaswini Bhat',
    branch: 'ISE',
    cgpa: 8.35,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'FASTAPI', 'AWS'],
    eligible_company_count: 8,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 78.5,
    email: 'yashaswini.ise21@rvce.edu.in',
    phone_masked: '+91 98****1241'
  },
  {
    usn: 'USN_2025_043',
    name: 'Sourabh Ganguly',
    branch: 'ECE',
    cgpa: 7.50,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'REACT'],
    eligible_company_count: 5,
    dream_eligible_count: 1,
    super_dream_eligible_count: 0,
    placement_readiness_score: 64.0,
    email: 'sourabh.ece21@rvce.edu.in',
    phone_masked: '+91 98****1243'
  },
  {
    usn: 'USN_2025_044',
    name: 'Pragya Sinha',
    branch: 'AI/DS',
    cgpa: 8.85,
    active_backlogs: 0,
    skills: ['DATABRICKS_DE', 'PYSPARK', 'SQL', 'PYTHON', 'MLOPS'],
    eligible_company_count: 11,
    dream_eligible_count: 4,
    super_dream_eligible_count: 3,
    placement_readiness_score: 89.0,
    email: 'pragya.aids21@rvce.edu.in',
    phone_masked: '+91 98****1244'
  },
  {
    usn: 'USN_2025_045',
    name: 'Kunal Kapoor',
    branch: 'CSE',
    cgpa: 8.10,
    active_backlogs: 0,
    skills: ['PYTHON', 'FASTAPI', 'SQL', 'DOCKER'],
    eligible_company_count: 7,
    dream_eligible_count: 2,
    super_dream_eligible_count: 1,
    placement_readiness_score: 75.5,
    email: 'kunal.cse21@rvce.edu.in',
    phone_masked: '+91 98****1245'
  },
  {
    usn: 'USN_2025_046',
    name: 'Archana Varma',
    branch: 'ISE',
    cgpa: 8.92,
    active_backlogs: 0,
    skills: ['DATABRICKS_DE', 'PYSPARK', 'DELTA_LAKE', 'SQL', 'PYTHON'],
    eligible_company_count: 12,
    dream_eligible_count: 4,
    super_dream_eligible_count: 3,
    placement_readiness_score: 91.0,
    email: 'archana.ise21@rvce.edu.in',
    phone_masked: '+91 98****1246'
  },
  {
    usn: 'USN_2025_047',
    name: 'Rajat Singhal',
    branch: 'ECE',
    cgpa: 8.00,
    active_backlogs: 0,
    skills: ['PYTHON', 'SQL', 'AWS', 'FASTAPI'],
    eligible_company_count: 7,
    dream_eligible_count: 2,
    super_dream_eligible_count: 1,
    placement_readiness_score: 73.5,
    email: 'rajat.ece21@rvce.edu.in',
    phone_masked: '+91 98****1247'
  },
  {
    usn: 'USN_2025_048',
    name: 'Nandini Das',
    branch: 'AI/DS',
    cgpa: 8.60,
    active_backlogs: 0,
    skills: ['MACHINE_LEARNING', 'FASTAPI', 'PYTHON', 'SQL'],
    eligible_company_count: 9,
    dream_eligible_count: 3,
    super_dream_eligible_count: 1,
    placement_readiness_score: 83.0,
    email: 'nandini.aids21@rvce.edu.in',
    phone_masked: '+91 98****1248'
  },
  {
    usn: 'USN_2025_049',
    name: 'Chetan Desai',
    branch: 'CSE',
    cgpa: 7.90,
    active_backlogs: 0,
    skills: ['PYTHON', 'DATA_STRUCTURES', 'SQL'],
    eligible_company_count: 6,
    dream_eligible_count: 2,
    super_dream_eligible_count: 0,
    placement_readiness_score: 71.5,
    email: 'chetan.cse21@rvce.edu.in',
    phone_masked: '+91 98****1249'
  },
  {
    usn: 'USN_2025_050',
    name: 'Lavanya Sridhar',
    branch: 'ISE',
    cgpa: 9.35,
    active_backlogs: 0,
    skills: ['DATABRICKS_DE', 'PYSPARK', 'DELTA_LAKE', 'SQL', 'PYTHON', 'DATA_STRUCTURES'],
    eligible_company_count: 15,
    dream_eligible_count: 5,
    super_dream_eligible_count: 4,
    placement_readiness_score: 97.0,
    email: 'lavanya.ise21@rvce.edu.in',
    phone_masked: '+91 98****1250'
  }
];

// All 16 standardized skills for What-If Simulation
export const ALL_SKILLS = [
  { id: 'DATABRICKS_DE', label: 'Databricks DE', category: 'Data & Lakehouse' },
  { id: 'PYSPARK', label: 'Apache PySpark', category: 'Data & Lakehouse' },
  { id: 'DELTA_LAKE', label: 'Delta Lake', category: 'Data & Lakehouse' },
  { id: 'SQL', label: 'Advanced SQL', category: 'Core & DB' },
  { id: 'PYTHON', label: 'Python Core', category: 'Core & DB' },
  { id: 'DATA_STRUCTURES', label: 'DSA & Algorithms', category: 'Core & DB' },
  { id: 'SYSTEM_DESIGN', label: 'System Design', category: 'Systems' },
  { id: 'FASTAPI', label: 'FastAPI Backend', category: 'Web & API' },
  { id: 'DOCKER', label: 'Docker Container', category: 'DevOps & Cloud' },
  { id: 'AWS', label: 'AWS Cloud', category: 'DevOps & Cloud' },
  { id: 'REACT', label: 'React / TypeScript', category: 'Web & API' },
  { id: 'MACHINE_LEARNING', label: 'Machine Learning', category: 'AI & ML' },
  { id: 'MLOPS', label: 'MLOps Pipeline', category: 'AI & ML' },
  { id: 'KAFKA', label: 'Apache Kafka', category: 'Systems' },
  { id: 'POWER_BI', label: 'Power BI Analytics', category: 'Data & Lakehouse' },
  { id: 'DATA_MODELING', label: 'Data Modeling', category: 'Data & Lakehouse' }
];

// Mock What-If simulator engine
export function simulateWhatIf(studentId: string, addedSkills: string[], _targetCompany?: string): WhatIfResponse {
  const hasDatabricks = addedSkills.includes('DATABRICKS_DE');
  const hasPySpark = addedSkills.includes('PYSPARK');
  const hasDeltaLake = addedSkills.includes('DELTA_LAKE');
  const hasFastAPI = addedSkills.includes('FASTAPI');
  const hasDocker = addedSkills.includes('DOCKER');
  const hasDSA = addedSkills.includes('DATA_STRUCTURES');
  const hasSysDesign = addedSkills.includes('SYSTEM_DESIGN');
  const hasAWS = addedSkills.includes('AWS');

  const baseProb = 40.0;
  let simulatedProb = 40.0;
  const baseCtc = 8.20;
  let simulatedCtc = 8.20;

  const baseCore = 3;
  const baseDream = 1;
  const baseSuperDream = 0;

  const simCore = 3;
  let simDream = 1;
  let simSuperDream = 0;

  const newlyUnlocked: Array<{ name: string; ctc_lpa: number; tier: string; is_new?: boolean }> = [];

  // Skill calculations
  if (hasDatabricks) {
    simulatedProb += 28.0;
    simulatedCtc += 6.50;
    simSuperDream += 1;
    newlyUnlocked.push({ name: 'Databricks', ctc_lpa: 48.0, tier: 'Super Dream', is_new: true });
  }

  if (hasPySpark) {
    simulatedProb += 12.0;
    simulatedCtc += 3.80;
    if (!newlyUnlocked.some(c => c.name === 'Databricks')) {
      newlyUnlocked.push({ name: 'Databricks', ctc_lpa: 48.0, tier: 'Super Dream', is_new: true });
    }
  }

  if (hasDeltaLake) {
    simulatedProb += 6.0;
    simulatedCtc += 2.10;
  }

  if (hasFastAPI || hasDocker) {
    simulatedProb += 8.0;
    simulatedCtc += 2.40;
    simDream += 1;
    newlyUnlocked.push({ name: 'Adobe', ctc_lpa: 26.0, tier: 'Super Dream', is_new: true });
    newlyUnlocked.push({ name: 'Cisco', ctc_lpa: 18.0, tier: 'Dream', is_new: true });
  }

  if (hasDSA && hasSysDesign) {
    simulatedProb += 22.0;
    simulatedCtc += 7.00;
    simSuperDream += 1;
    newlyUnlocked.push({ name: 'Google', ctc_lpa: 45.0, tier: 'Super Dream', is_new: true });
    if (hasAWS) {
      newlyUnlocked.push({ name: 'Microsoft', ctc_lpa: 42.0, tier: 'Super Dream', is_new: true });
    }
  }

  // Synergy alert logic
  let synergyAlert: string | null = null;
  if (hasDatabricks && hasPySpark) {
    simulatedProb = Math.min(94.0, simulatedProb + 12.0);
    simulatedCtc += 3.80;
    simSuperDream = Math.max(simSuperDream, 2);
    synergyAlert = 'Synergy Alert: Pairing DATABRICKS_DE with PYSPARK boosts Super Dream probability from 80% to 92%';
  } else if (hasDatabricks && !hasPySpark) {
    synergyAlert = 'Top ROI Recommendation: Adding DATABRICKS_DE yields the highest marginal CTC gain (+10.30 LPA) and unlocks 2 Super Dream companies.';
  } else if (hasDSA && !hasSysDesign) {
    synergyAlert = 'Synergy Potential: Pair DATA_STRUCTURES with SYSTEM_DESIGN to unlock Tier-1 Super Dream cohorts (Google, Microsoft).';
  }

  // Bounds
  simulatedProb = Math.min(98.5, Math.max(baseProb, simulatedProb));
  simulatedCtc = Math.min(38.5, Math.max(baseCtc, simulatedCtc));

  const deltaProb = Number((simulatedProb - baseProb).toFixed(1));
  const deltaCtc = Number((simulatedCtc - baseCtc).toFixed(2));

  // SQL trace generation
  const addedSkillSqlList = addedSkills.map(s => `'${s}'`).join(', ');
  const sqlQuery = `SELECT 
    s.usn,
    s.cgpa,
    ARRAY_UNION(s.current_skills, ARRAY(${addedSkillSqlList || "''"})) AS simulated_skills,
    fn_readiness_score(s.cgpa, ARRAY_UNION(s.current_skills, ARRAY(${addedSkillSqlList || "''"}))) AS simulated_prob,
    AVG(c.ctc_lpa) FILTER (WHERE fn_is_eligible(s.usn, c.company_id, ARRAY(${addedSkillSqlList || "''"}))) AS expected_ctc
FROM campus_intelligence.gold.students s
CROSS JOIN campus_intelligence.gold.companies c
WHERE s.usn = '${studentId}'
GROUP BY s.usn, s.cgpa, s.current_skills;`;

  return {
    base_prob: baseProb,
    simulated_prob: Number(simulatedProb.toFixed(1)),
    delta_prob: deltaProb,
    base_ctc: baseCtc,
    simulated_ctc: Number(simulatedCtc.toFixed(2)),
    delta_ctc: deltaCtc,
    tier_distribution: {
      core_tech: simCore,
      dream: simDream,
      super_dream: simSuperDream
    },
    base_tier_distribution: {
      core_tech: baseCore,
      dream: baseDream,
      super_dream: baseSuperDream
    },
    synergy_alert: synergyAlert,
    newly_unlocked_companies: newlyUnlocked.length > 0 ? newlyUnlocked : [
      { name: 'Infosys DSE', ctc_lpa: 7.0, tier: 'Core Tech' },
      { name: 'TCS Digital', ctc_lpa: 7.5, tier: 'Core Tech' },
      { name: 'Accenture Innovation', ctc_lpa: 6.5, tier: 'Core Tech' }
    ],
    sql_query: sqlQuery,
    cohort_size_analyzed: 1420
  };
}

// Mock JD matcher
export function mockMatchJD(jdText: string): JDMatchResponse {
  const isDatabricks = /databricks|lakehouse|pyspark/i.test(jdText);
  const isFullstack = /react|fastapi|backend|frontend/i.test(jdText);
  
  let requiredSkills = ['PYTHON', 'SQL'];
  let minCgpa = 7.5;
  let targetRole = 'Cloud Data Engineer';
  let ctcLpa = 18.0;
  let companyName = 'Recruiter Search';

  if (isDatabricks) {
    requiredSkills = ['DATABRICKS_DE', 'PYSPARK', 'SQL', 'PYTHON'];
    minCgpa = 8.0;
    targetRole = 'Data Engineering Specialist';
    ctcLpa = 24.0;
    companyName = 'Databricks Partner Network';
  } else if (isFullstack) {
    requiredSkills = ['PYTHON', 'FASTAPI', 'REACT', 'SQL'];
    minCgpa = 7.5;
    targetRole = 'Full Stack Software Engineer';
    ctcLpa = 16.0;
    companyName = 'Tech Cloud Solutions';
  }

  // Filter mock students based on extracted criteria
  const matched = MOCK_STUDENTS.filter(s => {
    const meetsCgpa = s.cgpa >= minCgpa;
    const meetsBacklogs = s.active_backlogs === 0;
    const hasAtLeastOneSkill = requiredSkills.some(req => s.skills.includes(req));
    return meetsCgpa && meetsBacklogs && hasAtLeastOneSkill;
  });

  const sqlQuery = `SELECT 
    s.usn, s.full_name, s.branch, s.cgpa, s.active_backlogs, s.verified_skills
FROM campus_intelligence.gold.dim_students s
WHERE s.cgpa >= ${minCgpa}
  AND s.active_backlogs = 0
  AND ARRAY_INTERSECT(s.verified_skills, ARRAY(${requiredSkills.map(s => `'${s}'`).join(', ')})) IS NOT EMPTY
ORDER BY s.cgpa DESC
LIMIT 50;`;

  return {
    extracted_criteria: {
      min_cgpa: minCgpa,
      max_backlogs: 0,
      allowed_branches: ['CSE', 'ISE', 'AI/DS', 'ECE'],
      required_skills: requiredSkills,
      target_role: targetRole,
      ctc_lpa: ctcLpa,
      company_name: companyName
    },
    matched_students: matched,
    matched_student_ids: matched.map(s => s.usn),
    sql_query: sqlQuery,
    latency_ms: 1420,
    row_count: matched.length,
    lineage: {
      catalog: 'campus_intelligence.gold',
      pii_masked: true,
      engine: 'Serverless Photon'
    }
  };
}

// Mock Genie natural language queries (Databricks AI/BI Genie Emulation)
export function mockGenieQuery(query: string, persona: 'TPO' | 'STUDENT', studentId?: string): GenieQueryResponse {
  const q = query.toLowerCase();

  const defaultLineage: LineageInfo = {
    catalog: 'workspace.campus_intelligence_gold',
    pii_masked: true,
    engine: 'Serverless Photon'
  };

  const citations = [
    { id: '1', source: 'workspace.campus_intelligence_gold.gold_dim_students' },
    { id: '2', source: 'workspace.campus_intelligence_gold.gold_fact_placement_history' },
    { id: '3', source: 'workspace.campus_intelligence_gold.v_student_company_eligibility' },
  ];

  // 1. Query 15: Out-of-range CGPA > 10.0
  if (q.includes('10.0') || q.includes('> 10') || q.includes('cgpa > 10') || q.includes('non-existent')) {
    return {
      thinking_steps: [
        'Students with CGPA > 10.0',
        'Overall CGPA distribution in student population',
        'Validating grade scale bounds against academic system parameters (0.0 - 10.0)'
      ],
      answer: `### Cohort Analysis: CGPA > 10.0

No students exist with **CGPA > 10.0** in the dataset. This CGPA band is impossible because the institution uses a 10.0 scale, where 10.0 is the maximum achievable grade point average. [1]

### Actual CGPA Distribution
The student population (500 students) has the following CGPA characteristics: [2]
• **Minimum CGPA:** 5.52
• **Maximum CGPA:** 9.85
• **Average CGPA:** 7.67

### Why This Query Returns Zero Results
CGPA in this campus placement system is measured on a **0.0 to 10.0 scale**, which is the standard grading system used by most Indian engineering colleges. A CGPA greater than 10.0 is structurally impossible — it would be equivalent to asking for students who scored above 100% in a percentage-based system.

### Recommendation
If you're looking to analyze high-performing students, consider these valid CGPA bands instead:
• **Top Tier (Super Dream Threshold):** CGPA ≥ 8.50 (92 candidates)
• **First Class with Distinction:** CGPA ≥ 7.75 (248 candidates)
• **First Class:** CGPA ≥ 6.75 (412 candidates)`,
      sql_query: `SELECT 
  COUNT(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN 1 END) AS placed_with_skill,
  COUNT(CASE WHEN had_ai_data_skill = TRUE THEN 1 END) AS total_with_skill,
  COUNT(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN 1 END) AS placed_without_skill,
  COUNT(CASE WHEN had_ai_data_skill = FALSE THEN 1 END) AS total_without_skill,
  COALESCE(ROUND(AVG(CASE WHEN had_ai_data_skill = TRUE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2), 0.0) AS avg_ctc_with_skill,
  COALESCE(ROUND(AVG(CASE WHEN had_ai_data_skill = FALSE AND offer_status = 'Placed' THEN offered_ctc_lpa END), 2), 0.0) AS avg_ctc_without_skill
FROM workspace.campus_intelligence_gold.gold_fact_placement_history ph
JOIN workspace.campus_intelligence_gold.gold_dim_students s ON ph.student_id = s.student_id
WHERE s.cgpa > 10.0;`,
      latency_ms: 210,
      row_count: 0,
      lineage: defaultLineage,
      matched_student_ids: [],
      citations
    };
  }

  // 2. Query 6: Branch-Wise Placement Statistics 2024 Batch
  if ((q.includes('branch') && (q.includes('placement percentage') || q.includes('average ctc') || q.includes('statistics') || q.includes('2024'))) || q.includes('branch-wise')) {
    return {
      thinking_steps: [
        'Filtering graduating batch: 2024',
        'Grouping by student branch across gold_dim_students and gold_fact_placement_history',
        'Aggregating placed count, total count, placement percentage, and mean offered CTC',
        'Sorting by average placed CTC in descending order'
      ],
      answer: `### 2024 Graduating Batch: Branch-Wise Placement & Compensation Analysis

Governed aggregation across **500 students** for the 2024 batch from \`workspace.campus_intelligence_gold.gold_dim_students\` [1] and \`gold_fact_placement_history\` [2]:

| Branch | Total Students | Placed Students | Placement Rate | Avg Placed CTC | Top Offer |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AI/DS** | 80 | 72 | **90.0%** | **20.40 LPA** | 48.0 LPA (Databricks) |
| **CSE** | 180 | 158 | **87.8%** | **19.80 LPA** | 44.0 LPA (Microsoft) |
| **ISE** | 120 | 102 | **85.0%** | **17.50 LPA** | 32.0 LPA (Adobe) |
| **ECE** | 120 | 84 | **70.0%** | **12.20 LPA** | 24.0 LPA (Qualcomm) |

### Key Observations
• **Highest Average Package:** AI/DS branch leads with **20.40 LPA**, driven by strong recruiter competition for GenAI/LLM and Lakehouse competencies.
• **Highest Offer Volume:** CSE generated **158 offers** (43.6% of campus total).
• **Lakehouse Skill Premium:** Candidates possessing \`DATABRICKS_DE\` achieved a **+5.63 LPA premium** over the general batch average.

### TPO Strategic Recommendations
1. **ECE Skill Gap Intervention:** ECE placement rate (70.0%) lags computing branches; providing Python/SQL cross-skilling bridges is projected to lift ECE placement by **+8.4%**.
2. **Super Dream Drive Prioritization:** 82% of eligible Super Dream candidates are concentrated in CSE/ISE/AI/DS.`,
      sql_query: `SELECT 
  s.branch,
  COUNT(s.student_id) AS total_students,
  COUNT(CASE WHEN ph.offer_status = 'Placed' THEN 1 END) AS placed_students,
  ROUND(COUNT(CASE WHEN ph.offer_status = 'Placed' THEN 1 END) * 100.0 / COUNT(s.student_id), 1) AS placement_pct,
  ROUND(AVG(CASE WHEN ph.offer_status = 'Placed' THEN ph.offered_ctc_lpa END), 2) AS avg_placed_ctc_lpa
FROM workspace.campus_intelligence_gold.gold_dim_students s
LEFT JOIN workspace.campus_intelligence_gold.gold_fact_placement_history ph ON s.student_id = ph.student_id
WHERE s.graduating_year = 2024
GROUP BY s.branch
ORDER BY avg_placed_ctc_lpa DESC;`,
      latency_ms: 240,
      row_count: 4,
      lineage: defaultLineage,
      matched_student_ids: [],
      citations
    };
  }

  // 3. Query 1 / TPO Shortlist: Databricks eligible with CGPA >= 8.0
  if (q.includes('databricks') && (q.includes('eligible') || q.includes('8.0') || q.includes('ise') || q.includes('shortlist') || q.includes('cgpa'))) {
    const matched = MOCK_STUDENTS.filter(s => (s.branch === 'ISE' || s.branch === 'CSE' || s.branch === 'AI/DS') && s.cgpa >= 8.0 && s.skills.includes('DATABRICKS_DE'));
    const fallbackMatched = matched.length > 0 ? matched : MOCK_STUDENTS.filter(s => s.cgpa >= 8.0);
    return {
      thinking_steps: [
        'Filtering company criteria: company_name = "Databricks"',
        'Joining gold_dim_students with gold_fact_student_skills on student_id',
        'Verifying mandatory skills: ["Databricks DE", "PySpark", "SQL"]',
        'Applying criteria: CGPA >= 8.0, 0 Backlogs, Branch IN ("CSE", "ISE", "AI/DS")',
        'Querying trusted view workspace.campus_intelligence_gold.v_student_company_eligibility'
      ],
      answer: `### Databricks (48.0 LPA Super Dream) Candidate Shortlist

Identified **${fallbackMatched.length} fully eligible candidates** meeting all criteria (CGPA ≥ 8.0, 0 Backlogs, verified \`Databricks DE\` + \`PySpark\` + \`SQL\` competencies) from \`workspace.campus_intelligence_gold.v_student_company_eligibility\` [3]:

| USN | Candidate Name | Branch | CGPA | Verified Lakehouse Stack | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
${fallbackMatched.slice(0, 6).map(s => `| \`${s.usn}\` | **${s.name}** | ${s.branch} | \`${s.cgpa.toFixed(2)}\` | ${s.skills.slice(0, 3).join(', ')} | \`ELIGIBLE\` |`).join('\n')}

**Candidate Grid Synchronized:** The main candidate spreadsheet has been filtered to highlight all ${fallbackMatched.length} matching students.`,
      sql_query: `SELECT 
  student_id, full_name, branch, cgpa, company_name, ctc_lpa, is_fully_eligible, blocker_reason
FROM workspace.campus_intelligence_gold.v_student_company_eligibility
WHERE company_name = 'Databricks'
  AND branch IN ('ISE', 'CSE', 'AI/DS')
  AND cgpa >= 8.0
  AND is_fully_eligible = TRUE
ORDER BY cgpa DESC, student_id ASC;`,
      latency_ms: 180,
      row_count: fallbackMatched.length,
      lineage: defaultLineage,
      matched_student_ids: fallbackMatched.map(s => s.usn),
      citations
    };
  }

  // 4. Query 9: High-Potential Unplaced Candidates in AI/DS
  if (q.includes('unplaced') || (q.includes('ai/ds') && q.includes('missing'))) {
    const aidsStudents = MOCK_STUDENTS.filter(s => s.branch === 'AI/DS');
    return {
      thinking_steps: [
        'Filtering gold_dim_students for branch = "AI/DS" and cgpa > 7.5',
        'Joining gold_fact_placement_history where offer_status != "Placed" OR NULL',
        'Collecting student acquired skills from gold_fact_student_skills',
        'Ordering by CGPA descending'
      ],
      answer: `### High-Potential Unplaced Candidates in AI/DS (CGPA > 7.5)

Identified **${aidsStudents.length} high-potential AI/DS candidates** eligible for placement recovery from \`workspace.campus_intelligence_gold.gold_dim_students\` [1]:

${aidsStudents.slice(0, 5).map(s => `• **${s.name}** (\`${s.usn}\`): CGPA \`${s.cgpa}\`, Backlogs: \`${s.active_backlogs}\` | Skills: \`${s.skills.slice(0, 4).join(', ')}\``).join('\n')}

### Primary Placement Blocker
82% of these unplaced students have strong Python/ML foundations but lack **production Lakehouse skills (\`Databricks DE\` or \`PySpark\`)**, which is the primary filter in current Super Dream drives.`,
      sql_query: `SELECT 
  s.student_id, s.full_name, s.cgpa, s.active_backlogs,
  ARRAY_JOIN(COLLECT_SET(sk.skill_name), ', ') AS acquired_skills
FROM workspace.campus_intelligence_gold.gold_dim_students s
LEFT JOIN workspace.campus_intelligence_gold.gold_fact_placement_history ph ON s.student_id = ph.student_id
LEFT JOIN workspace.campus_intelligence_gold.gold_fact_student_skills sk ON s.student_id = sk.student_id
WHERE s.branch = 'AI/DS'
  AND s.cgpa > 7.5
  AND (ph.offer_status IS NULL OR ph.offer_status != 'Placed')
GROUP BY s.student_id, s.full_name, s.cgpa, s.active_backlogs
ORDER BY s.cgpa DESC;`,
      latency_ms: 195,
      row_count: aidsStudents.length,
      lineage: defaultLineage,
      matched_student_ids: aidsStudents.map(s => s.usn),
      citations
    };
  }

  // 5. Query 7: Top Hiring Partners by Offer Volume
  if (q.includes('top 5 companies') || q.includes('hiring partners') || q.includes('offer volume')) {
    return {
      thinking_steps: [
        'Querying workspace.campus_intelligence_gold.gold_fact_placement_history',
        'Filtering offer_status = "Placed"',
        'Aggregating offer count, average CTC, and maximum package by company_name',
        'Ordering by total_offers_extended DESC, LIMIT 5'
      ],
      answer: `### Top 5 Campus Hiring Partners by Offer Volume (3-Year History)

Analysis of historical placement records in \`workspace.campus_intelligence_gold.gold_fact_placement_history\` [2]:

| Company Name | Tier | Total Offers Extended | Avg Offered CTC | Maximum CTC |
| :--- | :--- | :--- | :--- | :--- |
| **Infosys** | Core Tech / DSE | **68** | 6.80 LPA | 9.50 LPA |
| **TCS Digital** | Dream | **54** | 7.50 LPA | 11.00 LPA |
| **Accenture** | Dream | **48** | 8.20 LPA | 12.00 LPA |
| **Amazon** | Super Dream | **32** | 28.50 LPA | 32.00 LPA |
| **Databricks** | Super Dream | **18** | 48.00 LPA | 48.00 LPA |

### Key Insight
While volume recruitment is anchored by Core Tech partners, **Databricks and Amazon** provide the highest institutional CTC impact, accounting for 38% of total compensation value.`,
      sql_query: `SELECT 
  company_name,
  COUNT(placement_id) AS total_offers_extended,
  ROUND(AVG(offered_ctc_lpa), 2) AS avg_offered_ctc_lpa,
  MAX(offered_ctc_lpa) AS max_offered_ctc_lpa
FROM workspace.campus_intelligence_gold.gold_fact_placement_history
WHERE offer_status = 'Placed'
GROUP BY company_name
ORDER BY total_offers_extended DESC, avg_offered_ctc_lpa DESC
LIMIT 5;`,
      latency_ms: 195,
      row_count: 5,
      lineage: defaultLineage,
      matched_student_ids: [],
      citations
    };
  }

  // 6. Student Persona Queries (Google blocker, Top ROI, Readiness)
  if (persona === 'STUDENT' || q.includes('google') || q.includes('why am i blocked') || q.includes('readiness') || q.includes('roi')) {
    if (q.includes('google') || q.includes('why am i blocked')) {
      return {
        thinking_steps: [
          `Resolving student session identity: ${studentId || 'USN_2025_042'} (Priya Nair)`,
          'Querying trusted view workspace.campus_intelligence_gold.v_student_company_eligibility',
          'Evaluating blocker criteria: CGPA, Backlogs, Branch, Mandatory Skills',
          'Sorting by company CTC descending'
        ],
        answer: `### Personal Placement Diagnostic for Priya Nair (${studentId || 'USN_2025_042'})

Diagnostic analysis for your profile (Branch: **ISE**, CGPA: **8.12**, Backlogs: **0**) from \`v_student_company_eligibility\` [3]:

| Company | Tier | Package | Eligibility | Primary Blocker | Missing Requirements |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Databricks** | Super Dream | **48.0 LPA** | Blocked | \`MISSING_MANDATORY_SKILLS\` | \`Databricks DE\`, \`PySpark\` |
| **Google** | Super Dream | **45.0 LPA** | Blocked | \`CGPA_BELOW_CUTOFF\` | Required CGPA: 8.50 (Your CGPA: 8.12) |
| **Adobe** | Super Dream | **32.0 LPA** | Blocked | \`MISSING_MANDATORY_SKILLS\` | \`Databricks DE\` |

### Actionable Recommendation
• **Google** has a hard 8.50 CGPA cutoff. However, **Databricks (48.0 LPA)** has an 8.00 CGPA cutoff where you are academically eligible.
• **Fastest Unlock Path:** Adding **\`DATABRICKS_DE\` + \`PYSPARK\`** unlocks Databricks & Adobe immediately with a **+10.30 LPA CTC lift**.`,
        sql_query: `SELECT 
  company_name, tier, ctc_lpa, is_fully_eligible, blocker_reason,
  missing_mandatory_skills, missing_preferred_skills
FROM workspace.campus_intelligence_gold.v_student_company_eligibility
WHERE student_id = '${studentId || 'USN_2025_042'}'
  AND tier IN ('Super Dream', 'Dream')
ORDER BY ctc_lpa DESC, company_name ASC;`,
        latency_ms: 160,
        row_count: 4,
        lineage: defaultLineage,
        citations
      };
    }

    if (q.includes('roi') || q.includes('top skill')) {
      return {
        thinking_steps: [
          'Querying historical cohort placement returns for branch = "ISE"',
          'Calculating expected marginal CTC delta per skill addition',
          'Evaluating Super Dream unlock potential'
        ],
        answer: `### Top ROI Skill Analysis for ISE Branch (2021-2025 Cohorts)

Governed Bayesian analysis across 6 years of placement records:

1. **\`DATABRICKS_DE\`:** **+10.30 LPA Expected CTC lift**, unlocks Databricks (48.0 LPA) & Adobe (26.0 LPA).
2. **\`PYSPARK\`:** Adds **+12.0% placement probability multiplier** when paired with SQL.
3. **\`DELTA_LAKE\`:** Increases Super Dream shortlisting rate by **2.4x**.

### Recommended Action
Use the **Time Machine Laboratory** on the right to simulate adding \`DATABRICKS_DE\` to your profile.`,
        sql_query: `SELECT skill_name, avg_marginal_ctc_lift, super_dream_unlock_count
FROM workspace.campus_intelligence_gold.gold_fact_placement_history
WHERE branch = 'ISE'
ORDER BY avg_marginal_ctc_lift DESC LIMIT 3;`,
        latency_ms: 180,
        row_count: 3,
        lineage: defaultLineage,
        citations
      };
    }

    if (q.includes('readiness') || q.includes('score')) {
      return {
        thinking_steps: [
          'Executing trusted SQL function fn_readiness_score',
          'Evaluating weighted factors: Academic (40 pts), Core Data Stack (40 pts), Backlogs (20 pts)',
          'Computing next milestone trajectory'
        ],
        answer: `### Placement Readiness Score Breakdown (74.5%)

Governed evaluation of your profile from \`fn_readiness_score\` in Unity Catalog:

• **Academic Standing (CGPA 8.12, 0 Backlogs):** 38.5 / 40.0 pts (Excellent)
• **Core Data Stack (Python, SQL, Power BI):** 24.0 / 30.0 pts
• **Advanced Lakehouse / Systems Gap:** 12.0 / 30.0 pts

### Next Milestone
Adding **\`DATABRICKS_DE\`** elevates your overall readiness score to **86.8%** (+12.3 pts) and qualifies you for Super Dream placement drives.`,
        sql_query: `SELECT * FROM workspace.campus_intelligence_gold.fn_readiness_score('${studentId || 'USN_2025_042'}');`,
        latency_ms: 150,
        row_count: 3,
        lineage: defaultLineage,
        citations
      };
    }
  }

  // Default fallback response
  const matched = MOCK_STUDENTS.slice(0, 10);
  return {
    thinking_steps: [
      'Analyzing natural language criteria in prompt',
      'Executing governed search across gold_dim_students & gold_dim_company_criteria',
      'Returning matching candidate cohort and analytical insights'
    ],
    answer: `### Query Analysis: "${query}"

Retrieved **${matched.length} candidate records** matching your criteria from \`workspace.campus_intelligence_gold.gold_dim_students\` [1]:

${matched.slice(0, 5).map(s => `• **${s.name}** (\`${s.usn}\`): ${s.branch} | CGPA \`${s.cgpa.toFixed(2)}\` | Skills: \`${s.skills.slice(0, 3).join(', ')}\``).join('\n')}

**Grid Synchronized:** Candidate spreadsheet synchronized with matching cohort.`,
    sql_query: `SELECT student_id, full_name, branch, cgpa, array_join(skills, ', ') AS verified_skills
FROM workspace.campus_intelligence_gold.gold_dim_students
WHERE active_backlogs = 0 AND cgpa >= 7.5
ORDER BY cgpa DESC
LIMIT 10;`,
    latency_ms: 210,
    row_count: matched.length,
    lineage: defaultLineage,
    matched_student_ids: matched.map(s => s.usn),
    citations
  };
}

