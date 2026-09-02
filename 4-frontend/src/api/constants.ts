// ==============================================================================
// Skill Lamp — Canonical 16 Skills Taxonomy (Matching skills.csv & Unity Catalog)
// ==============================================================================

export interface SkillItem {
  id: string;
  label: string;
  category: 'AI / GenAI' | 'Data & Cloud' | 'Core Eng.';
}

export const ALL_SKILLS: SkillItem[] = [
  // AI / GenAI (8)
  { id: 'GENAI_LLMS', label: 'GenAI / LLMs', category: 'AI / GenAI' },
  { id: 'MACHINE_LEARNING', label: 'Machine Learning', category: 'AI / GenAI' },
  { id: 'DEEP_LEARNING', label: 'Deep Learning', category: 'AI / GenAI' },
  { id: 'LANGCHAIN', label: 'LangChain', category: 'AI / GenAI' },
  { id: 'PROMPT_ENGINEERING', label: 'Prompt Eng.', category: 'AI / GenAI' },
  { id: 'COMPUTER_VISION', label: 'Computer Vision', category: 'AI / GenAI' },
  { id: 'NLP', label: 'NLP', category: 'AI / GenAI' },
  { id: 'VECTOR_DATABASES', label: 'Vector Databases', category: 'AI / GenAI' },

  // Data Engineering & Cloud (7)
  { id: 'DATABRICKS_DE', label: 'Databricks DE', category: 'Data & Cloud' },
  { id: 'PYSPARK', label: 'PySpark', category: 'Data & Cloud' },
  { id: 'SQL', label: 'SQL / Delta Lake', category: 'Data & Cloud' },
  { id: 'AWS_CLOUD', label: 'AWS Cloud', category: 'Data & Cloud' },
  { id: 'DOCKER', label: 'Docker', category: 'Data & Cloud' },
  { id: 'KUBERNETES', label: 'Kubernetes', category: 'Data & Cloud' },
  { id: 'CICD', label: 'CI/CD Pipelines', category: 'Data & Cloud' },

  // Core Software Engineering & Architecture (7)
  { id: 'PYTHON', label: 'Python', category: 'Core Eng.' },
  { id: 'DATA_STRUCTURES', label: 'Data Structures / DSA', category: 'Core Eng.' },
  { id: 'SYSTEM_DESIGN', label: 'System Design', category: 'Core Eng.' },
  { id: 'JAVA_BACKEND', label: 'Java Backend', category: 'Core Eng.' },
  { id: 'CPP', label: 'C++', category: 'Core Eng.' },
  { id: 'REACT', label: 'React.js', category: 'Core Eng.' },
  { id: 'FASTAPI', label: 'FastAPI', category: 'Core Eng.' }
];

export function normalizeSkill(skill: string): string {
  const s = skill.trim().toUpperCase().replace(/[\s\-\.\/]+/g, '_');
  const mapping: Record<string, string> = {
    DATABRICKS: 'DATABRICKS_DE',
    DATABRICKS_DE: 'DATABRICKS_DE',
    DATABRICKS_DATA_ENGINEERING: 'DATABRICKS_DE',
    SPARK: 'PYSPARK',
    PYSPARK: 'PYSPARK',
    SQL: 'SQL',
    DELTA_LAKE: 'SQL',
    SQL_DELTA_LAKE: 'SQL',
    FAST_API: 'FASTAPI',
    FASTAPI: 'FASTAPI',
    DSA: 'DATA_STRUCTURES',
    DATA_STRUCTURES: 'DATA_STRUCTURES',
    DATA_STRUCTURE: 'DATA_STRUCTURES',
    DATA_STRUCTURES_DSA: 'DATA_STRUCTURES',
    SYSTEM_DESIGN: 'SYSTEM_DESIGN',
    DOCKER: 'DOCKER',
    KUBERNETES: 'KUBERNETES',
    K8S: 'KUBERNETES',
    CI_CD: 'CICD',
    CICD: 'CICD',
    CI_CD_PIPELINES: 'CICD',
    AWS: 'AWS_CLOUD',
    AWS_CLOUD: 'AWS_CLOUD',
    JAVA: 'JAVA_BACKEND',
    JAVA_BACKEND: 'JAVA_BACKEND',
    CPP: 'CPP',
    'C++': 'CPP',
    PYTHON: 'PYTHON',
    REACT: 'REACT',
    REACTJS: 'REACT',
    REACT_JS: 'REACT',
    GENAI: 'GENAI_LLMS',
    GENAI_LLM: 'GENAI_LLMS',
    GENAI_LLMS: 'GENAI_LLMS',
    GEN_AI: 'GENAI_LLMS',
    MACHINE_LEARNING: 'MACHINE_LEARNING',
    ML: 'MACHINE_LEARNING',
    DEEP_LEARNING: 'DEEP_LEARNING',
    DL: 'DEEP_LEARNING',
    LANGCHAIN: 'LANGCHAIN',
    PROMPT_ENG: 'PROMPT_ENGINEERING',
    PROMPT_ENGINEERING: 'PROMPT_ENGINEERING',
    COMPUTER_VISION: 'COMPUTER_VISION',
    CV: 'COMPUTER_VISION',
    NLP: 'NLP',
    VECTOR_DATABASES: 'VECTOR_DATABASES',
    VECTOR_DB: 'VECTOR_DATABASES'
  };
  return mapping[s] || s;
}
