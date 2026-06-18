def calculate_skill_match(
    candidate_skills,
    required_skills,
    preferred_skills
):

    candidate_skills = {
        skill.lower()
        for skill in candidate_skills
    }

    required_hits = 0

    for jd_skill in required_skills:

        jd_skill = jd_skill.lower()

        for candidate_skill in candidate_skills:

            if candidate_skill in jd_skill:
                required_hits += 1
                break

    preferred_hits = 0

    for jd_skill in preferred_skills:

        jd_skill = jd_skill.lower()

        for candidate_skill in candidate_skills:

            if candidate_skill in jd_skill:
                preferred_hits += 1
                break

    score = (
        required_hits * 10
        + preferred_hits * 5
    )

    return min(score, 100)