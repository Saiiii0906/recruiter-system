from dataclasses import dataclass


@dataclass
class JDFeatures:

    required_skills: list
    preferred_skills: list

    years_of_experience: str

    seniority_level: str

    domain_expertise: list

    behavioral_traits: list

    keywords: list