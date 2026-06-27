from collections import Counter

from backend.services.data_loader import load_candidates


def get_dashboard_stats():

    df = load_candidates()

    total_candidates = len(df)

    avg_experience = round(
        df["profile"].apply(
            lambda x: x.get("years_of_experience", 0)
        ).mean(),
        2,
    )

    avg_profile_score = round(
        df["redrob_signals"].apply(
            lambda x: x.get(
                "profile_completeness_score",
                0,
            )
        ).mean(),
        2,
    )

    skill_counter = Counter()

    company_counter = Counter()

    country_counter = Counter()

    total_languages = 0

    total_certifications = 0

    for _, row in df.iterrows():

        # Skills
        for skill in row.get("skills", []):
            skill_counter[skill.get("name", "")] += 1

        # Companies
        for company in row.get("career_history", []):
            company_counter[company.get("company", "")] += 1

        # Countries
        profile = row.get("profile", {})

        country_counter[
            profile.get("country", "Unknown")
        ] += 1

        total_languages += len(
            row.get("languages", [])
        )

        total_certifications += len(
            row.get("certifications", [])
        )

    return {
        "total_candidates": total_candidates,

        "average_experience": avg_experience,

        "average_profile_score": avg_profile_score,

        "average_languages": round(
            total_languages / total_candidates,
            2,
        ),

        "average_certifications": round(
            total_certifications / total_candidates,
            2,
        ),

        "top_skills":
            skill_counter.most_common(10),

        "top_companies":
            company_counter.most_common(10),

        "countries":
            dict(country_counter),
    }