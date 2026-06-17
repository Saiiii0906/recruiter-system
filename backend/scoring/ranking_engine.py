from backend.scoring.skill_matcher import (
    calculate_skill_match
)

from backend.scoring.experience_matcher import (
    calculate_experience_match
)

from backend.scoring.behavior_matcher import (
    calculate_behavior_match
)

from backend.scoring.semantic_matcher import (
    calculate_semantic_match
)


def rank_candidate(
    candidate_features,
    jd_features
):

    skill_score = calculate_skill_match(
        candidate_features["skills"],
        jd_features["required_skills"],
        jd_features["preferred_skills"]
    )

    experience_score = calculate_experience_match(
        candidate_features["experience_years"]
    )

    behavior_score = calculate_behavior_match(
        candidate_features["behavior_score"]
    )

    semantic_score = calculate_semantic_match()

    final_score = (
        0.40 * skill_score
        + 0.25 * experience_score
        + 0.20 * behavior_score
        + 0.15 * semantic_score
    )

    return {
        "skill_score": skill_score,
        "experience_score": experience_score,
        "behavior_score": behavior_score,
        "semantic_score": semantic_score,
        "final_score": round(final_score, 2)
    }