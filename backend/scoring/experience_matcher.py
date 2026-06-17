def calculate_experience_match(
    candidate_years: float,
    min_years: float = 5,
    ideal_years: float = 7
) -> float:

    if candidate_years < min_years:
        return 20

    if min_years <= candidate_years <= ideal_years:
        return 100

    return 80