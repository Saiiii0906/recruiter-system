def calculate_behavior_match(
    behavior_score: float
) -> float:

    return min(
        max(behavior_score, 0),
        100
    )