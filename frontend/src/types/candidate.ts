export interface Candidate {
  id: string;
  name: string;
  title: string;
  email: string;
  location?: string;
  avatarUrl?: string;
  matchScore?: number;
  skills: string[];
  experienceYears?: number;
}

export interface RankingSession {
  id: string;
  jobDescription: string;
  createdAt: string;
  candidateCount: number;
  topScore: number;
}

export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}
