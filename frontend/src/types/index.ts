export interface RankingResult {
  candidate_id: string;

  id: string;

  name: string;

  headline?: string;

  current_role?: string;

  current_company?: string;

  location: string;

  experience_years: number;

  profile_score?: number;

  skills?: string[];

  languages?: string[];

  semantic_score?: number;

  behavior_score?: number;

  skill_match_score?: number;

  final_score?: number;

  explanation?: string;
  match_score: number;

  skill_score: number;

  primary_skill: string;

  recommendation:| "strong_match" | "good_fit" | "consider" | "not_aligned";

  availability: string;

  avatar?: string;

  email?: string;

  phone?: string;

  linkedin?: string;

  github?: string;

  portfolio?: string;

  status?: string;
}

export interface RankResponse {
  results: RankingResult[];
  total?: number;
  job_description?: string;
}

export interface CareerTimelineItem {
  title?: string;
  company?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
}

export type CandidateStatus = "available" | "interviewing" | "shortlisted" | "rejected" | "hired";

export interface Candidate {
  id: string;
  candidate_id?: string;
  name: string;
  current_role: string;
  current_company: string;
  location: string;
  experience_years: number;
  match_score: number;
  semantic_score?: number;
  skill_score?: number;
  primary_skill: string;
  skills: string[];
  status: CandidateStatus;
  recommendation: string;
  availability?: string;
  avatar?: string;
  email?: string;
  education?: unknown[];
  languages?: string[];
  certifications?: string[];
  profile_completeness?: number;
  career_history?: CareerTimelineItem[];
}
export interface TopSkill {
  name: string;
  count: number;
}
export interface Analytics {
  total_candidates?: number;
  average_experience?: number;
  average_profile_score?: number;
  average_languages?: number;
  average_certifications?: number;
  top_skills?: TopSkill[];
  hiring_funnel?: Array<{ stage: string; count: number }>;
  experience_distribution?: Array<{ bucket: string; count: number }>;
  profile_score_distribution?: Array<{ bucket: string; count: number }>;
  recent_activity?: Array<{ id: string; type: string; message: string; created_at: string }>;
}

export interface Report {
  candidate_id: string;
  name: string;
  headline: string;
  current_role: string;
  company: string;
  experience: number;
  country: string;
  summary: string;
  skills: string[];
  languages: string[];
  education: {degree: string; institution: string; year: string;}[];
  certifications: unknown[];
  career_history: any[];
  profile_score: number;
  recommendation: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
