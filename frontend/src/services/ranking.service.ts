import { api } from "./api";
import type { RankingResult } from "@/types";

interface RankingApiResponse {
  status: string;
  top_candidates: RankingResult[];
}

function getRecommendation(score:number):"strong_match"| "good_fit"| "consider"| "not_aligned"{
  if(score>=80) return "strong_match";
  if(score>=60) return "good_fit";
  if(score>=40) return "consider";
  return "not_aligned";
}

export const rankingService = {
  async rank(jobDescription: string): Promise<any[]> {
    const { data } = await api.post<RankingApiResponse>(
      "/rank-candidates",
      {
        job_description: jobDescription,
      }
    );
    console.log("RAW RESPONSE:", data);
    console.log("TOP CANDIDATES:", data.top_candidates);


    return data.top_candidates.map((candidate) => ({
      ...candidate,
      match_score: candidate.final_score ?? 0,
      skill_score: candidate.skill_match_score ?? 0,
      primary_skill: candidate.skills?.[0] ?? "N/A",
      recommendation: getRecommendation(candidate.final_score ?? 0),
      availability:"Immediate",
      status: "Available",
      avatar: "",
      id: candidate.candidate_id,
    }));

  },
};