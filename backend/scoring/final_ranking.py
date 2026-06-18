def calculate_final_score(
    semantic_score,
    experience_years,
    behavior_score,
    skill_match_score,
):
    skill_score = skill_match_score
    
    experience_score = max(0,min(experience_years * 5,100))

    final_score = (semantic_score * 0.50 + experience_score * 0.20 + behavior_score * 0.15 + skill_match_score * 0.15)

    return round(final_score, 2)