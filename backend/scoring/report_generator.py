def generate_candidate_report(candidate):

    profile = candidate.get("profile", {})
    education = candidate.get("education", [])
    skills = candidate.get("skills", [])
    career = candidate.get("career_history", [])
    languages = candidate.get("languages", [])
    certs = candidate.get("certifications", [])
    signals = candidate.get("redrob_signals", {})

    skill_names = [
        s.get("name", "")
        for s in skills
    ]

    language_names = [
        l.get("language", "")
        for l in languages
    ]

    education_list = []

    for edu in education:
        education_list.append({
            "degree": edu.get("degree", ""),
            "institution": edu.get("institution", ""),
            "year": edu.get("year", "")
        })

    recommendation = "Suitable for recruiter review."

    if signals.get("profile_completeness_score", 0) < 60:
        recommendation = "Profile needs additional information before review."

    return {
        "candidate_id": candidate.get("candidate_id"),

        "name": profile.get("anonymized_name"),

        "headline": profile.get("headline"),

        "current_role": profile.get("current_title"),

        "company": profile.get("current_company"),

        "experience": profile.get("years_of_experience"),

        "country": profile.get("country"),

        "summary": profile.get("summary"),

        "skills": skill_names,

        "languages": language_names,

        "education": education_list,

        "certifications": certs,

        "career_history": career,

        "profile_score": signals.get(
            "profile_completeness_score",
            0
        ),

        "recommendation": recommendation
    }