from backend.feature_engineering.jd_processing.jd_schema import (
    JDFeatures
)


def build_jd_features(
    jd_json: dict
):

    return JDFeatures(

        required_skills=jd_json.get(
            "required_skills",
            []
        ),

        preferred_skills=jd_json.get(
            "preferred_skills",
            []
        ),

        years_of_experience=jd_json.get(
            "years_of_experience",
            {}
        ),

        seniority_level=jd_json.get(
            "seniority_level",
            {}
        ),

        domain_expertise=jd_json.get(
            "domain_expertise",
            []
        ),

        behavioral_traits=jd_json.get(
            "behavioral_traits",
            []
        ),

        keywords=jd_json.get(
            "keywords",
            []
        )
    )


def extract_jd_features(jd_json):

    return {
        "required_skills":
            jd_json.get(
                "required_skills",
                []
            ),

        "preferred_skills":
            jd_json.get(
                "preferred_skills",
                []
            ),

        "industry":
            jd_json.get(
                "industry",
                ""
            ),

        "behavioral_traits":
            jd_json.get(
                "behavioral_traits",
                []
            ),

        "keywords":
            jd_json.get(
                "keywords",
                []
            )
    }