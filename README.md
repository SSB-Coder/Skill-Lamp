# 🌟 Skill Lamp — Institutional Placement Intelligence Platform

An enterprise-grade campus placement intelligence platform powered by **FastAPI**, **React**, **Databricks Genie**, and **Unity Catalog**. Governed by strict RBAC, data isolation, and cryptographic credential hashing.

---

## 🔐 Institutional Access Credentials (SHA-256 Hashed)

All authentication credentials are verified using cryptographic SHA-256 password hashing against institutional records in `1-data-schema/students.csv`.

### 🏢 Training & Placement Officer (TPO)

| Role | Officer Name | Institutional Email | Plain Password | SHA-256 Password Hash |
| :--- | :--- | :--- | :--- | :--- |
| **Head TPO** | Dr. S. K. Murthy | `tpo@rvce.edu.in` | `TpoPlacement@2025` | `08549d643924cdd171ff52ffc3c8995277d51253c78fcfd0cb945f647ef1f759` |

---

### 🎓 Student Accounts (Direct from `1-data-schema/students.csv`)

| USN | Student Name | Branch | CGPA | Institutional Email | Plain Password | SHA-256 Password Hash |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `USN_2025_042` | **Priya Nair** *(Hero Candidate)* | ISE | 8.12 | `priya.ise21@rvce.edu.in` | `Priya@RVCE2025` | `1247bf8497d347b79362a9b79de16ff3e2e10732698e15dc91273d6ea3a69a04` |
| `USN_2025_001` | **Aarav Sharma** *(Top Tier)* | CSE | 9.85 | `aarav.cse21_1@rvce.edu.in` | `Aarav@RVCE2025` | `bfacc63c15d33ce38ea64d97b2b56a660df2c249a2628e996de8f0c5039ea9d0` |
| `USN_2025_003` | **Bhavna Pillai** | CSE | 8.11 | `bhavna.cse21_3@rvce.edu.in` | `Bhavna@RVCE2025` | `a5ea9d71f297793e0d711ef2922aefa4d89a73785adf82d83dda09e8ae13ff77` |
| `USN_2025_202` | **Divya Kulkarni** | ISE | 7.94 | `divya.ise21_202@rvce.edu.in` | `Divya@RVCE2025` | `59baefcde33638f83c5f9fac7eabf635f14f2dc304924d4472aa33d72c0c0f0d` |
| `USN_2025_339` | **Meera Menon** | ECE | 9.80 | `meera.ece21_339@rvce.edu.in` | `Meera@RVCE2025` | `f7ebaa881ba6526247295b6cced50ec7ecf4058964597b3d994429a1106e7d3c` |
| `USN_2025_211` | **Tanvi Hegde** | ISE | 8.15 | `tanvi.ise21_211@rvce.edu.in` | `Tanvi@RVCE2025` | `c58e01c88afda08966d919c0c2b6784ca5bde16517050e8bc378d6263094fdc8` |

> 💡 **Password Convention for all 500 students in `students.csv`**: `<FirstName>@RVCE2025` (e.g., `Ankit@RVCE2025` for Ankit Verma).

---

## 🏛 Architecture & Persona Isolation

- **Training & Placement Officer (TPO)**:
  - **Module**: Candidate Catalog (`TPOSpreadsheet`).
  - **Copilot**: Genie AI Copilot (left sidebar) with direct query execution over Unity Catalog Delta tables (`workspace.campus_intelligence_gold`).
  - **JD Matcher**: Upload/paste recruiter Job Descriptions to parse cutoffs, extract skill requirements, and filter candidate pools.
  - **Zero Student Profile Exposure**: TPO interface never renders or cross-navigates into individual student private profile view.

- **Student Portal**:
  - **Module**: What-If Time Machine (`StudentDashboard`).
  - **Copilot**: Genie Career Advisor (right sidebar) locked strictly to authenticated student identity.
  - **Reverse Roadmap**: Prerequisite diagnostic and single-click skill bridge calculations.
  - **Skill ROI Calculator**: Full 22-skill canonical taxonomy with live probability and CTC uplift modeling.
  - **Zero Cohort Exposure**: Students cannot browse or query other students' sensitive placement records.

---

## 🚀 Running the Application Locally

### 1. Start Backend (FastAPI + Uvicorn)
```bash
cd 3-backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
- API Docs: `http://localhost:8000/docs`

### 2. Start Frontend (React + Vite + Tailwind)
```bash
cd 4-frontend
npm run dev -- --port 5173
```
- Web Application: `http://localhost:5173`