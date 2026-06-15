def calculate_behavior_score(signals: dict) -> float:

    score = (
        signals["profile_completeness_score"] * 0.15
        + signals["github_activity_score"] * 0.20
        + signals["interview_completion_rate"] * 100 * 0.25
        + signals["offer_acceptance_rate"] * 100 * 0.20
        + signals["recruiter_response_rate"] * 100 * 0.20
    )

    return round(score, 2)