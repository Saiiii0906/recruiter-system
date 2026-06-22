def generate_candidate_report(candidate_row):

    report = f"""
Candidate ID: {candidate_row['candidate_id']}

Final Score: {candidate_row['final_score']}

Semantic Score: {candidate_row['semantic_score']}

Skill Match Score: {candidate_row['skill_match_score']}

Experience Years: {candidate_row['experience_years']}

Why shortlisted:
{candidate_row['explanation']}

Recommendation:
Proceed to recruiter screening.
"""

    return report