from backend.services.candidate_service import (get_candidate_by_id)
from backend.scoring.report_generator import (generate_candidate_report)
from backend.services.candidate_service import get_all_candidates

def get_candidate_report(candidate_id: str):
    """Generate a recruiter report for a candidate."""
    candidate = get_candidate_by_id(candidate_id)
    if candidate is None:
        return None
    return generate_candidate_report(candidate)

def get_all_reports():
    """Generate lightweight reports for every candidate."""
    candidates = get_all_candidates()
    reports = []
    for candidate in candidates:
        report = generate_candidate_report(candidate)
        reports.append({
            "candidate_id": report["candidate_id"],
            "name": report["name"],
            "headline": report["headline"],
            "current_role": report["current_role"],
            "company": report["company"],
            "profile_score": report["profile_score"],
            "recommendation": report["recommendation"],
        })
    return reports