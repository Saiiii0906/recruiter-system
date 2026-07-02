// Executive analytics mock data for the SharanAI dashboard.

export interface FunnelStage {
  stage: string;
  count: number;
}

export interface NamedCount {
  name: string;
  count: number;
}

export interface Bucket {
  bucket: string;
  count: number;
}

export interface VelocityPoint {
  week: string;
  rankings: number;
  reports: number;
  shortlisted: number;
}

export interface MatchScorePoint {
  date: string;
  score: number;
}

export interface RankingHistoryEntry {
  id: string;
  job: string;
  candidates: number;
  top_score: number;
  generated: string;
}

export interface InsightItem {
  id: string;
  title: string;
  body: string;
  trend: "up" | "down" | "flat";
  delta: string;
  category: "trend" | "skill" | "location" | "tech" | "growth";
}

export interface MockAnalytics {
  totals: {
    total_candidates: number;
    avg_match_score: number;
    reports_generated: number;
    active_rankings: number;
  };
  hiring_funnel: FunnelStage[];
  top_skills: NamedCount[];
  top_companies: NamedCount[];
  country_distribution: NamedCount[];
  experience_distribution: Bucket[];
  profile_score_distribution: Bucket[];
  hiring_velocity: VelocityPoint[];
  match_score_trend: MatchScorePoint[];
  ranking_history: RankingHistoryEntry[];
  insights: InsightItem[];
}

export const MOCK_ANALYTICS: MockAnalytics = {
  totals: {
    total_candidates: 1284,
    avg_match_score: 76.4,
    reports_generated: 412,
    active_rankings: 18,
  },
  hiring_funnel: [
    { stage: "Sourced", count: 1284 },
    { stage: "Screened", count: 642 },
    { stage: "Ranked", count: 318 },
    { stage: "Shortlisted", count: 142 },
    { stage: "Interviewing", count: 58 },
    { stage: "Offer", count: 18 },
    { stage: "Hired", count: 11 },
  ],
  top_skills: [
    { name: "TypeScript", count: 412 },
    { name: "React", count: 388 },
    { name: "Python", count: 341 },
    { name: "Kubernetes", count: 274 },
    { name: "AWS", count: 263 },
    { name: "PostgreSQL", count: 219 },
    { name: "Go", count: 198 },
    { name: "Node.js", count: 184 },
    { name: "PyTorch", count: 142 },
    { name: "Terraform", count: 121 },
  ],
  top_companies: [
    { name: "Stripe", count: 41 },
    { name: "Linear", count: 38 },
    { name: "Vercel", count: 34 },
    { name: "Notion", count: 31 },
    { name: "Datadog", count: 28 },
    { name: "Cloudflare", count: 24 },
    { name: "Hugging Face", count: 19 },
    { name: "Razorpay", count: 17 },
  ],
  country_distribution: [
    { name: "India", count: 412 },
    { name: "United States", count: 298 },
    { name: "Germany", count: 142 },
    { name: "United Kingdom", count: 121 },
    { name: "Brazil", count: 84 },
    { name: "Singapore", count: 68 },
    { name: "Canada", count: 54 },
    { name: "Japan", count: 41 },
    { name: "Other", count: 64 },
  ],
  experience_distribution: [
    { bucket: "0-2y", count: 84 },
    { bucket: "3-5y", count: 312 },
    { bucket: "6-8y", count: 421 },
    { bucket: "9-12y", count: 298 },
    { bucket: "13y+", count: 169 },
  ],
  profile_score_distribution: [
    { bucket: "<50", count: 32 },
    { bucket: "50-60", count: 88 },
    { bucket: "60-70", count: 214 },
    { bucket: "70-80", count: 387 },
    { bucket: "80-90", count: 421 },
    { bucket: "90+", count: 142 },
  ],
  hiring_velocity: [
    { week: "W14", rankings: 8, reports: 22, shortlisted: 6 },
    { week: "W15", rankings: 11, reports: 28, shortlisted: 9 },
    { week: "W16", rankings: 9, reports: 31, shortlisted: 7 },
    { week: "W17", rankings: 14, reports: 38, shortlisted: 12 },
    { week: "W18", rankings: 12, reports: 34, shortlisted: 11 },
    { week: "W19", rankings: 16, reports: 42, shortlisted: 14 },
    { week: "W20", rankings: 18, reports: 47, shortlisted: 17 },
    { week: "W21", rankings: 21, reports: 52, shortlisted: 19 },
  ],
  match_score_trend: [
    { date: "Apr 01", score: 71.2 },
    { date: "Apr 15", score: 72.8 },
    { date: "May 01", score: 73.4 },
    { date: "May 15", score: 74.1 },
    { date: "Jun 01", score: 75.0 },
    { date: "Jun 15", score: 75.8 },
    { date: "Jun 29", score: 76.4 },
  ],
  ranking_history: [
    { id: "RNK-1042", job: "Senior Platform Engineer", candidates: 142, top_score: 94.2, generated: "2h ago" },
    { id: "RNK-1041", job: "Staff ML Engineer", candidates: 98, top_score: 91.7, generated: "5h ago" },
    { id: "RNK-1040", job: "Frontend Lead, EMEA", candidates: 121, top_score: 89.4, generated: "Yesterday" },
    { id: "RNK-1039", job: "Backend Engineer, LATAM", candidates: 76, top_score: 87.8, generated: "2 days ago" },
    { id: "RNK-1038", job: "Engineering Manager", candidates: 54, top_score: 90.1, generated: "3 days ago" },
  ],
  insights: [
    {
      id: "ins-1",
      title: "TypeScript demand is accelerating",
      body: "TypeScript appears in 34% of new ranking sessions this quarter — up from 22% last quarter. Consider expanding sourcing pipelines in EU and LATAM.",
      trend: "up",
      delta: "+12pt QoQ",
      category: "trend",
    },
    {
      id: "ins-2",
      title: "Platform engineering skill gap",
      body: "Kubernetes + Terraform combined match rate is just 18% across active pools. Targeted sourcing or upskilling could unblock 4 open roles.",
      trend: "down",
      delta: "-8% vs. target",
      category: "skill",
    },
    {
      id: "ins-3",
      title: "Bengaluru leads top-tier output",
      body: "31% of strong-hire recommendations originated from Bengaluru in the last 30 days, with the highest avg. match score (82.4).",
      trend: "up",
      delta: "+5pt MoM",
      category: "location",
    },
    {
      id: "ins-4",
      title: "Vector search & RAG rising fast",
      body: "Mentions of vector databases and RAG in job descriptions grew 3.4x QoQ — a leading indicator for the AI engineering hiring wave.",
      trend: "up",
      delta: "3.4x QoQ",
      category: "tech",
    },
    {
      id: "ins-5",
      title: "Rust adoption emerging",
      body: "Rust skills appear in 7% of new candidate profiles, up from 2% six months ago. Worth tracking for platform and infra roles.",
      trend: "up",
      delta: "+5pt 6mo",
      category: "growth",
    },
    {
      id: "ins-6",
      title: "Avg. time-to-shortlist improving",
      body: "Median time from ranking to shortlist dropped from 6.2 to 4.1 days after enabling Aurora AI suggestions in the ranking view.",
      trend: "up",
      delta: "-34%",
      category: "trend",
    },
  ],
};
