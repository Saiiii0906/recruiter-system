import pandas as pd

from backend.scoring.batch_ranker import rank_top_candidates


def rank_candidates_service(sample_df, jd_text, jd_features, top_n=10):

    ranked = rank_top_candidates(
        sample_df=sample_df,
        jd_text=jd_text,
        jd_features=jd_features,
        top_n=top_n
    )

    enriched_results = []

    for _, row in ranked.iterrows():

        candidate = sample_df[
            sample_df["candidate_id"] == row["candidate_id"]
        ].iloc[0]

        profile = candidate.get("profile", {})
        career = candidate.get("career_history", [])
        skills = candidate.get("skills", [])
        languages = candidate.get("languages", [])
        education = candidate.get("education", [])
        redrob = candidate.get("redrob_signals", {})

        current_job = career[0] if len(career) else {}

        enriched_results.append({

            "candidate_id": row["candidate_id"],

            "name": profile.get("anonymized_name"),

            "headline": profile.get("headline"),

            "current_role": current_job.get("title"),

            "current_company": current_job.get("company"),

            "location": profile.get("location"),

            "experience_years": row["experience_years"],

            "profile_score": redrob.get("profile_completeness_score"),

            "skills": [
                s.get("name")
                for s in skills
            ],

            "languages": [
                l.get("language")
                for l in languages
            ],

            "education": education,

            "semantic_score": row["semantic_score"],

            "behavior_score": row["behavior_score"],

            "skill_match_score": row["skill_match_score"],

            "final_score": row["final_score"],

            "explanation": row["explanation"]

        })

    return enriched_results