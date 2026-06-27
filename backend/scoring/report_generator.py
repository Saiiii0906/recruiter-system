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

    education_text = ""

    if education:
        edu = education[0]
        education_text = (
            f"{edu.get('degree','')} "
            f"at "
            f"{edu.get('institution','')}"
        )

    current_company = ""

    if career:
        current_company = career[0].get("company", "")

    report = f"""
===========================
RECRUITER AI REPORT
===========================

Candidate ID:
{candidate.get("candidate_id")}

Name:
{profile.get("anonymized_name")}

Headline:
{profile.get("headline")}

Current Role:
{profile.get("current_title")}

Current Company:
{current_company}

Experience:
{profile.get("years_of_experience")} Years

Country:
{profile.get("country")}

Skills:
{", ".join(skill_names)}

Languages:
{", ".join(language_names)}

Education:
{education_text}

Certifications:
{len(certs)}

Profile Completeness:
{signals.get("profile_completeness_score","N/A")}

Recommendation:

✔ Candidate profile successfully retrieved.

Suitable for recruiter review.
"""

    return report