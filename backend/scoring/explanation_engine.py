def generate_candidate_explanation(
    candidate_id,
    semantic_score,
    skill_match_score,
    experience_years,
):
    
    reasons = []

    if semantic_score >= 40:
        reasons.append(
            "Strong semantic alignment with JD"
        )

    if skill_match_score >= 20:
        reasons.append(
            "Matched multiple required skills"
        )

    if 5 <= experience_years <= 9:
        reasons.append(
            "Experience falls within target range"
        )

    return {
        "candidate_id": candidate_id,
        "reasons": reasons
    }