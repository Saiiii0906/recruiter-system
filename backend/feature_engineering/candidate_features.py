from backend.feature_engineering.profile_features import (
    build_semantic_profile
)

from backend.feature_engineering.skill_features import (
    extract_skill_names
)

from backend.feature_engineering.behaviour_features import (
    calculate_behavior_score
)


def build_candidate_features(candidate):

    profile = candidate["profile"]

    skills = candidate["skills"]

    return {
        "candidate_id": candidate["candidate_id"],
        "experience_years": profile["years_of_experience"],
        "skill_count": len(skills),
        "behavior_score": calculate_behavior_score(
            candidate["redrob_signals"]
        ),
        "semantic_profile": build_semantic_profile(profile),
        "skills": extract_skill_names(skills)
    }