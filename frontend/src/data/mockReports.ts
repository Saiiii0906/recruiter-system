// Mock AI reports for SharanAI Reports Center.
import { MOCK_CANDIDATES } from "./mockCandidates";

export type ReportType = "full" | "screening" | "technical" | "executive";
export type ReportStatus = "ready" | "processing" | "failed";
export type ReportRecommendation = "strong_hire" | "hire" | "lean_hire" | "no_hire";

export interface MockReport {
  id: string;
  candidate_id: string;
  candidate_name: string;
  candidate_role: string;
  candidate_location: string;
  candidate_avatar?: string;
  generated_at: string;
  generated_label: string;
  type: ReportType;
  status: ReportStatus;
  recommendation: ReportRecommendation;
  match_score: number;
  semantic_score: number;
  skill_score: number;
  behavior_score: number;
  ranking_session: string;
  job_title: string;
  executive_summary: string;
  candidate_overview: string;
  strengths: string[];
  weaknesses: string[];
  skill_analysis: {
    skill: string;
    level: "expert" | "advanced" | "intermediate" | "developing";
    evidence: string;
    score: number;
  }[];
  experience_analysis: {
    company: string;
    role: string;
    duration: string;
    impact: string;
  }[];
  education_analysis: {
    school: string;
    degree: string;
    period: string;
    relevance: string;
  }[];
  risk_assessment: {
    level: "low" | "medium" | "high";
    factors: string[];
    mitigation: string;
  };
  interview_questions: {
    category: "Technical" | "System Design" | "Behavioral" | "Culture";
    question: string;
    rationale: string;
  }[];
  hiring_recommendation: string;
  overall_decision: string;
}

const RECS: ReportRecommendation[] = ["strong_hire", "hire", "lean_hire", "no_hire"];
const TYPES: ReportType[] = ["full", "screening", "technical", "executive"];
const SESSIONS = [
  "Senior Platform Engineer · Q1",
  "Staff ML Engineer · Q1",
  "Frontend Lead · EMEA",
  "Backend Engineer · LATAM",
  "Engineering Manager · Bengaluru",
];

const TIME_LABELS = ["2h ago", "5h ago", "Yesterday", "2 days ago", "1 week ago", "2 weeks ago"];

function deriveRecommendation(score: number): ReportRecommendation {
  if (score >= 88) return "strong_hire";
  if (score >= 76) return "hire";
  if (score >= 62) return "lean_hire";
  return "no_hire";
}

export const MOCK_REPORTS: MockReport[] = MOCK_CANDIDATES.map((c, idx) => {
  const generatedDate = new Date(Date.now() - idx * 86400000 * 0.7);
  return {
    id: `RPT-${String(20461 + idx).padStart(5, "0")}`,
    candidate_id: c.id,
    candidate_name: c.name,
    candidate_role: c.current_role,
    candidate_location: c.location,
    generated_at: generatedDate.toISOString(),
    generated_label: TIME_LABELS[idx % TIME_LABELS.length],
    type: TYPES[idx % TYPES.length],
    status: idx === 4 ? "processing" : idx === 9 ? "failed" : "ready",
    recommendation: deriveRecommendation(c.match_score),
    match_score: c.match_score,
    semantic_score: c.semantic_score,
    skill_score: c.skill_score,
    behavior_score: c.behavior_score,
    ranking_session: SESSIONS[idx % SESSIONS.length],
    job_title: SESSIONS[idx % SESSIONS.length].split(" ·")[0],
    executive_summary: `${c.name.split(" ")[0]} is a ${c.current_role} with ${c.experience_years} years of progressive impact across ${c.primary_skill} ecosystems. Profile shows strong alignment with the target role's seniority, technical depth, and ownership expectations. Recommended for next-round technical screen with focus on system design and cross-team collaboration scenarios.`,
    candidate_overview: c.professional_summary,
    strengths: c.ai_summary.strengths,
    weaknesses: c.ai_summary.concerns,
    skill_analysis: c.skill_groups
      .flatMap((g) => g.skills.slice(0, 2))
      .slice(0, 6)
      .map((s, i) => ({
        skill: s,
        level: (["expert", "advanced", "intermediate", "developing"] as const)[i % 4],
        evidence: `Used extensively at ${c.current_company} on platform-scale workloads. Strong artifacts in code review and architecture documents.`,
        score: Math.max(55, Math.min(98, Math.round(c.skill_score - i * 3))),
      })),
    experience_analysis: c.experience.slice(0, 3).map((e) => ({
      company: e.company,
      role: e.title,
      duration: `${e.start} — ${e.end}`,
      impact: e.achievements?.[0] ?? e.description,
    })),
    education_analysis: c.education.map((e) => ({
      school: e.institution,
      degree: e.degree,
      period: `${e.start} — ${e.end}`,
      relevance: "Strong fundamentals in distributed systems, directly transferable to the role's platform responsibilities.",
    })),
    risk_assessment: {
      level: idx % 5 === 0 ? "medium" : "low",
      factors: [
        "Compensation expectations near the top of the band.",
        "Notice period may delay onboarding by 30+ days.",
      ],
      mitigation: "Validate timeline expectations in screen, align comp early, and prepare a parallel pipeline if needed.",
    },
    interview_questions: [
      {
        category: "System Design",
        question: "Design a multi-tenant rate limiter for a public API serving 50k RPS.",
        rationale: "Tests distributed systems depth and pragmatic tradeoff reasoning.",
      },
      {
        category: "Technical",
        question: `Walk us through a production incident you led at ${c.current_company} and the postmortem you owned.`,
        rationale: "Signals operational maturity and structured incident handling.",
      },
      {
        category: "Behavioral",
        question: "Tell us about a time you disagreed with a senior leader on a technical direction.",
        rationale: "Probes conflict resolution and influence without authority.",
      },
      {
        category: "Culture",
        question: "How do you operate in an async-first organization with distributed teams?",
        rationale: "Assesses fit with documentation-first, written-communication culture.",
      },
    ],
    hiring_recommendation:
      c.match_score >= 80
        ? `Move forward to onsite. ${c.name.split(" ")[0]} is a top-decile candidate for this role, with strong technical depth and demonstrated leadership. Prioritize scheduling within the week to preserve momentum.`
        : c.match_score >= 65
          ? `Advance to a second technical screen. Strong baseline with a few open questions on recent architecture work — validate in the next loop before committing to onsite.`
          : `Decline politely with feedback. Profile does not match the seniority band for this role, but worth keeping warm for adjacent openings.`,
    overall_decision:
      c.match_score >= 80
        ? "Strong Hire — proceed to onsite loop"
        : c.match_score >= 65
          ? "Hire — proceed to additional screen"
          : c.match_score >= 55
            ? "Lean Hire — committee review required"
            : "No Hire — close out with feedback",
  } satisfies MockReport;
});

export function getMockReport(id: string): MockReport | undefined {
  return (
    MOCK_REPORTS.find((r) => r.id === id) ??
    MOCK_REPORTS.find((r) => r.candidate_id === id) ??
    MOCK_REPORTS.find((r) => r.candidate_id.endsWith(id))
  );
}
