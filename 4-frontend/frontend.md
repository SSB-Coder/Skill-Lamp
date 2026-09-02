# Skill Lamp — Frontend / UX Layer Architecture

## Overview
Skill Lamp is an institutional placement-intelligence assistant for a college Training & Placement Office (TPO), built around a Databricks Genie Space and Unity Catalog.

The frontend is a single-page React + TypeScript + Vite + Tailwind CSS application strictly adhering to the enterprise dark palette tokens and anti-vibecoding rules.

## Key Features & Components Built

### 1. Enterprise Dark Theme & Governance Styling
- **Color Tokens**: Solid matte `#0B0F19` background, `#151D2C` cards, `#283347` crisp borders, `#0284C7` steel blue actions, `#D97706` amber metric highlights, `#16A34A` success / green live cloud indicator.
- **Strict Anti-Vibecoding Rules**: Zero emojis, zero neon/purple glow, zero sparkles/magic-wands, standardized 14/16px functional icons, system typography.

### 2. Header (`src/components/Header.tsx`)
- Geometric SVG Lamp avatar icon (`#0284C7`).
- Unity Catalog governance status dot: `#16A34A` for live cloud, `#0284C7` for cached failsafe mode.
- Interactive failsafe toggle (`Ctrl+Shift+F` or 1-click on the status indicator).
- Discreet "Switch Persona (Demo Mode)" pill (`[ TPO Portal ⇄ Student: Priya ]`) executing instant ~0.5s stage transitions.
- Institutional session sign out button.

### 3. Institutional Authentication & Persona Gating (`src/components/LoginScreen.tsx` & `src/context/AuthContext.tsx`)
- Institutional login with `@college.edu` format and password input.
- **1-Click Quick Demo Identifiers**:
  - `Demo TPO Officer (tpo@rvce.edu.in)` → Logs into TPO Command Portal.
  - `Demo Student (Priya Nair - ISE)` → Logs into Student Time Machine.
- `sessionStorage` persistence preserving active session across page refreshes.
- Strict client-side data isolation for students (scoped only to their own `student_id`).

### 4. TPO Command Portal (`src/components/TPOSpreadsheet.tsx`)
- High-density enterprise data grid pre-populated with top 50 student candidates on load.
- Filter controls: search by candidate name / USN / skill, branch pills (`All`, `CSE`, `ISE`, `ECE`, `AI/DS`), minimum CGPA slider, zero-backlog toggle.
- 1-click **Export Shortlist (CSV)** button generating recruiter-ready CSV exports.
- **Dual-Sync Table Filter**: Automatically filters and highlights candidate rows matching Genie sidebar queries.

### 5. Genie AI Copilot & Career Advisor Sidebar (`src/components/SidebarCopilot.tsx`)
- 380px persistent left sidebar panel.
- Minimalist geometric SVG Lamp avatar (`#0284C7`) identifying Genie AI responses.
- Natural-language query console with pre-built 1-click prompt chips for both TPO and Student modes.
- **Recruiter JD Quick-Matcher Modal**: Modal to paste raw recruiter JD text; parses constraints and filters candidate cohorts with governed SQL.
- **Live Thinking State**: Inline status bubble with Lamp icon, monospace status text, and 3-dot pulsing loading animation (`bg-[#94A3B8] animate-pulse`).
- **SQL Trace Drawer (`src/components/SQLTraceDrawer.tsx`)**: Monospace latency, row count, raw SQL, and Unity Catalog Governance Strip (`Catalog: campus_intelligence.gold`, `PII_MASKED`, `Engine: Serverless Photon`).

### 6. Student Placement Time Machine (`src/components/StudentDashboard.tsx`)
- **Locked Profile Header**: Name (Priya Nair), USN (`USN_2025_042`), Branch (`ISE`), CGPA (`8.12`), Backlogs (`0`), Placement Readiness Score (`74.5%`).
- **Top-ROI Intelligence Callout**: Highlights single highest-value skill recommendation (`DATABRICKS_DE` yielding `+10.30 LPA` marginal CTC gain).
- **Target Company Reverse Roadmap (`src/components/ReverseRoadmap.tsx`)**: Goal-driven prerequisite gap diagnostic with 1-click "Simulate Skill Bridge".
- **Interactive 16-Skill Toggle Laboratory (`src/components/SkillToggleLab.tsx`)**: Standardized skill buttons with live recalculation and **Skill Synergy Multiplier Alert** (e.g. pairing `DATABRICKS_DE` with `PYSPARK` boosting Super Dream probability to 92%).
- **Hero Delta Cards (`src/components/HeroDeltaCards.tsx`)**: Visualizes ΔP (`40.0% → 80.0% (+40.0 pts)`), ΔCTC (`8.20 LPA → 18.50 LPA (+10.30 LPA)`), and newly unlocked company badges with "NEW" indicators.
- **Tier Migration Visualizer (`src/components/TierShiftBar.tsx`)**: Stacked segment distribution shift across Core Tech, Dream, and Super Dream tiers.
- **Underlying SQL Cohort Drawer**: Monospace `CASE WHEN` SQL cohort query trace.

### 7. API Client & Failsafe Architecture (`src/api/client.ts` & `src/api/mockData.ts`)
- Typed fetch wrappers for all 6 endpoints:
  - `POST /api/auth/login`
  - `GET /api/auth/me`
  - `POST /api/match-jd`
  - `GET /api/students/spreadsheet`
  - `GET /api/student/me`
  - `POST /api/query`
  - `POST /api/whatif`
- Automatic and manual failsafe mode switching with verified client-side fallback simulation engine.

## Production Build & Integration
- Run `npm run build` to generate `dist/`.
- `dist/` contains clean static SPA assets (`index.html`, `assets/index-*.js`, `assets/index-*.css`) with relative paths (`./`) ready to be mounted directly by FastAPI at `/` or static mounts.
