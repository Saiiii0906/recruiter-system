def calculate_skill_match(
    candidate_skills: list,
    required_skills: list,
    preferred_skills: list
) -> float:

    candidate_skills = {
        skill.lower()
        for skill in candidate_skills
    }

    required_skills = {
        skill.lower()
        for skill in required_skills
    }

    preferred_skills = {
        skill.lower()
        for skill in preferred_skills
    }

    required_hits = len(
        candidate_skills.intersection(
            required_skills
        )
    )

    preferred_hits = len(
        candidate_skills.intersection(
            preferred_skills
        )
    )

    score = (
        required_hits * 10
        + preferred_hits * 5
    )

    return min(score, 100)