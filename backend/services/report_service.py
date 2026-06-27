from backend.services.candidate_service import (
    get_candidate_by_id
)

from backend.scoring.report_generator import (
    generate_candidate_report
)


def get_candidate_report(candidate_id: str):
    """
    Generate a recruiter report for a candidate.
    """

    candidate = get_candidate_by_id(candidate_id)

    if candidate is None:
        return None

    return generate_candidate_report(candidate)