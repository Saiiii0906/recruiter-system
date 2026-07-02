// Realistic mock candidate pool for SharanAI workspace screens.
// Not connected to API — used by ranking, candidates list, and profile pages.

import type { CandidateStatus } from "@/types";
export type { CandidateStatus } from "@/types";

export interface SkillGroup {
  category: "Frontend" | "Backend" | "Cloud" | "AI" | "DevOps" | "Tools" | "Soft Skills";
  skills: string[];
}

export interface ExperienceEntry {
  title: string;
  company: string;
  start: string;
  end: string;
  description: string;
  achievements?: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  start: string;
  end: string;
  notes?: string;
}

export interface LanguageEntry {
  language: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Conversational";
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  year: string;
}

export interface ActivityEntry {
  type: "viewed" | "report" | "ranking" | "shortlisted" | "note";
  message: string;
  timestamp: string;
}

export interface MockCandidate {
  id: string;
  name: string;
  headline: string;
  current_role: string;
  current_company: string;
  location: string;
  email: string;
  experience_years: number;
  expected_salary: string;
  notice_period: string;
  availability: string;
  status: CandidateStatus;
  match_score: number;
  semantic_score: number;
  skill_score: number;
  behavior_score: number;
  profile_completion: number;
  primary_skill: string;
  professional_summary: string;
  ai_summary: {
    strengths: string[];
    concerns: string[];
    interview_recommendations: string[];
    culture_fit: string;
    risk_assessment: string;
  };
  skill_groups: SkillGroup[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  languages: LanguageEntry[];
  certifications: CertificationEntry[];
  activity: ActivityEntry[];
  recommendation: "strong_match" | "good_fit" | "consider" | "not_aligned";
  explanation: string;
}

const baseSkillSets: Record<string, SkillGroup[]> = {
  frontend: [
    { category: "Frontend", skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"] },
    { category: "Tools", skills: ["Figma", "Storybook", "Jest", "Cypress"] },
    { category: "Soft Skills", skills: ["Mentoring", "Code review", "Cross-team collaboration"] },
  ],
  backend: [
    { category: "Backend", skills: ["Node.js", "Python", "Go", "PostgreSQL", "GraphQL"] },
    { category: "Cloud", skills: ["AWS", "GCP", "Kubernetes", "Terraform"] },
    { category: "DevOps", skills: ["CI/CD", "Docker", "Observability"] },
  ],
  ai: [
    { category: "AI", skills: ["PyTorch", "LLM fine-tuning", "RAG", "Vector DBs", "LangChain"] },
    { category: "Backend", skills: ["Python", "FastAPI", "Postgres"] },
    { category: "Cloud", skills: ["AWS SageMaker", "GCP Vertex"] },
  ],
  fullstack: [
    { category: "Frontend", skills: ["React", "TypeScript", "Vue"] },
    { category: "Backend", skills: ["Node.js", "PostgreSQL", "Redis"] },
    { category: "Cloud", skills: ["AWS", "Docker"] },
    { category: "Soft Skills", skills: ["Product thinking", "Ownership"] },
  ],
  devops: [
    { category: "DevOps", skills: ["Kubernetes", "Helm", "ArgoCD", "Prometheus"] },
    { category: "Cloud", skills: ["AWS", "Azure", "Terraform"] },
    { category: "Tools", skills: ["Datadog", "PagerDuty"] },
  ],
};

const seeds: Array<Partial<MockCandidate> & { name: string; primary_skill: string; pack: keyof typeof baseSkillSets }> = [
  { name: "Aarav Mehta", primary_skill: "React", pack: "frontend", current_role: "Senior Frontend Engineer", current_company: "Linear Labs", location: "Bengaluru, IN", experience_years: 7, status: "available" },
  { name: "Priya Subramanian", primary_skill: "Python", pack: "ai", current_role: "Staff ML Engineer", current_company: "Forge AI", location: "Hyderabad, IN", experience_years: 9, status: "interviewing" },
  { name: "Daniel Okafor", primary_skill: "Go", pack: "backend", current_role: "Backend Tech Lead", current_company: "Stripe", location: "Lagos, NG", experience_years: 8, status: "shortlisted" },
  { name: "Sofia Romano", primary_skill: "TypeScript", pack: "fullstack", current_role: "Full-stack Engineer", current_company: "Vercel", location: "Milan, IT", experience_years: 5, status: "available" },
  { name: "Hiroshi Tanaka", primary_skill: "Kubernetes", pack: "devops", current_role: "Platform Engineer", current_company: "Rakuten", location: "Tokyo, JP", experience_years: 10, status: "available" },
  { name: "Maya Khoury", primary_skill: "React", pack: "frontend", current_role: "Senior UI Engineer", current_company: "Notion", location: "Berlin, DE", experience_years: 6, status: "interviewing" },
  { name: "Lucas Andrade", primary_skill: "Node.js", pack: "backend", current_role: "Backend Engineer", current_company: "Nubank", location: "São Paulo, BR", experience_years: 4, status: "available" },
  { name: "Elena Petrova", primary_skill: "PyTorch", pack: "ai", current_role: "Applied Scientist", current_company: "DeepMind", location: "London, UK", experience_years: 11, status: "shortlisted" },
  { name: "Noah Bergmann", primary_skill: "AWS", pack: "devops", current_role: "Senior DevOps Engineer", current_company: "Datadog", location: "Amsterdam, NL", experience_years: 7, status: "rejected" },
  { name: "Ananya Iyer", primary_skill: "TypeScript", pack: "fullstack", current_role: "Engineering Manager", current_company: "Razorpay", location: "Bengaluru, IN", experience_years: 12, status: "hired" },
  { name: "Mateo Garcia", primary_skill: "React", pack: "frontend", current_role: "Frontend Engineer", current_company: "Mercado Libre", location: "Buenos Aires, AR", experience_years: 3, status: "available" },
  { name: "Zara Ahmed", primary_skill: "Python", pack: "ai", current_role: "ML Engineer", current_company: "Hugging Face", location: "Paris, FR", experience_years: 5, status: "interviewing" },
  { name: "Wei Zhang", primary_skill: "Go", pack: "backend", current_role: "Senior Backend Engineer", current_company: "ByteDance", location: "Singapore, SG", experience_years: 8, status: "available" },
  { name: "Olivia Bennett", primary_skill: "React", pack: "fullstack", current_role: "Product Engineer", current_company: "Linear", location: "Toronto, CA", experience_years: 6, status: "shortlisted" },
  { name: "Karim El-Sayed", primary_skill: "Kubernetes", pack: "devops", current_role: "SRE", current_company: "Cloudflare", location: "Cairo, EG", experience_years: 9, status: "available" },
];

function recommend(score: number): MockCandidate["recommendation"] {
  if (score >= 88) return "strong_match";
  if (score >= 75) return "good_fit";
  if (score >= 60) return "consider";
  return "not_aligned";
}

function buildExperience(role: string, company: string, years: number): ExperienceEntry[] {
  const currentYear = 2026;
  const start = currentYear - Math.min(years, 3);
  return [
    {
      title: role,
      company,
      start: `${start}`,
      end: "Present",
      description: `Leading high-impact initiatives at ${company}, owning end-to-end delivery from architecture to rollout.`,
      achievements: [
        "Reduced p95 latency by 38% across critical user flows.",
        "Mentored 4 engineers and ran a guild on engineering excellence.",
        "Shipped a flagship release adopted by 120k+ users in Q1.",
      ],
    },
    {
      title: "Senior Engineer",
      company: "Acme Systems",
      start: `${start - 3}`,
      end: `${start}`,
      description: "Built platform primitives for high-scale workloads serving 4M MAU.",
      achievements: ["Designed event-sourced billing core.", "Cut infra spend by 22%."],
    },
    {
      title: "Software Engineer",
      company: "Helio Labs",
      start: `${Math.max(2014, start - 6)}`,
      end: `${start - 3}`,
      description: "Foundational engineering across product surface and internal tooling.",
    },
  ];
}

function buildAiSummary(name: string, role: string): MockCandidate["ai_summary"] {
  return {
    strengths: [
      `Deep expertise aligned with ${role} responsibilities.`,
      "Consistent record of shipping production systems at scale.",
      "Strong written communication evident across artifacts.",
    ],
    concerns: [
      "Limited recent exposure to greenfield zero-to-one work.",
      "Compensation expectations may exceed band ceiling.",
    ],
    interview_recommendations: [
      "System design: multi-tenant data isolation.",
      "Behavioral: conflict resolution across teams.",
      "Live coding: focus on tradeoffs over syntax.",
    ],
    culture_fit: `${name.split(" ")[0]} signals high autonomy, low ego, and a documentation-first mindset — strong fit for an async-first org.`,
    risk_assessment: "Low risk. Stable tenure, no red flags in pattern of moves.",
  };
}

export const MOCK_CANDIDATES: MockCandidate[] = seeds.map((s, idx) => {
  const matchBase = 95 - idx * 2.4 + (idx % 3) * 0.8;
  const match = Math.max(48, Math.min(97, matchBase));
  const semantic = Math.max(45, match - 2 + (idx % 4));
  const skill = Math.max(45, match - 4 + (idx % 5));
  const behavior = Math.max(50, match - 6 + (idx % 3) * 2);
  const completion = Math.max(62, Math.min(100, 100 - idx * 1.5));
  const noticeDays = [0, 15, 30, 60, 90][idx % 5];
  const availability = noticeDays === 0 ? "Immediate" : `${noticeDays} days`;
  const role = s.current_role ?? "Senior Engineer";

  return {
    id: `CAND-${String(1001 + idx).padStart(4, "0")}`,
    name: s.name,
    headline: `${role} · ${s.primary_skill} specialist`,
    current_role: role,
    current_company: s.current_company ?? "Independent",
    location: s.location ?? "Remote",
    email: `${s.name.toLowerCase().replace(/[^a-z]+/g, ".")}@mail.dev`,
    experience_years: s.experience_years ?? 5,
    expected_salary: `$${(120 + idx * 8).toLocaleString()}k`,
    notice_period: availability,
    availability,
    status: s.status ?? "available",
    match_score: Number(match.toFixed(1)),
    semantic_score: Number(semantic.toFixed(1)),
    skill_score: Number(skill.toFixed(1)),
    behavior_score: Number(behavior.toFixed(1)),
    profile_completion: Math.round(completion),
    primary_skill: s.primary_skill,
    professional_summary: `${s.name.split(" ")[0]} is a ${role.toLowerCase()} with ${s.experience_years ?? 5}+ years building production systems across ${s.primary_skill} ecosystems. Track record of leading complex deliveries end-to-end, partnering across product, design, and infrastructure.`,
    ai_summary: buildAiSummary(s.name, role),
    skill_groups: baseSkillSets[s.pack],
    experience: buildExperience(role, s.current_company ?? "Independent", s.experience_years ?? 5),
    education: [
      { degree: "M.S. Computer Science", institution: "ETH Zürich", start: "2014", end: "2016", notes: "Specialization in distributed systems." },
      { degree: "B.Tech Computer Engineering", institution: "IIT Bombay", start: "2010", end: "2014" },
    ],
    languages: [
      { language: "English", proficiency: "Fluent" },
      { language: "Hindi", proficiency: "Native" },
      { language: "German", proficiency: "Conversational" },
    ],
    certifications: [
      { name: "AWS Solutions Architect — Professional", issuer: "Amazon Web Services", year: "2024" },
      { name: "Certified Kubernetes Administrator", issuer: "CNCF", year: "2023" },
    ],
    activity: [
      { type: "viewed", message: "Profile viewed by Recruiter Anna", timestamp: "2h ago" },
      { type: "report", message: "AI report generated", timestamp: "1d ago" },
      { type: "ranking", message: "Ranked #2 in 'Senior Platform Engineer' search", timestamp: "3d ago" },
      { type: "shortlisted", message: "Added to shortlist by Hiring Manager", timestamp: "1w ago" },
    ],
    recommendation: recommend(match),
    explanation: `Strong alignment on ${s.primary_skill} and platform fundamentals. ${s.experience_years ?? 5}y experience matches seniority band.`,
  };
});

export function getMockCandidate(id: string): MockCandidate | undefined {
  return MOCK_CANDIDATES.find((c) => c.id === id || c.id.endsWith(id));
}

export const SAMPLE_JD = `We are hiring a Senior Platform Engineer to lead the next generation of our developer platform.

Responsibilities
- Architect multi-tenant services running on Kubernetes
- Drive observability, reliability, and cost efficiency initiatives
- Partner with product engineering on developer ergonomics

Requirements
- 6+ years building distributed systems in production
- Deep expertise in Go or TypeScript, Kubernetes, and AWS
- Strong written communication and async collaboration habits
- Bonus: experience with event-driven architectures, OpenTelemetry, or platform engineering`;
