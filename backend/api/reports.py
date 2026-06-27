from fastapi import APIRouter, HTTPException

from backend.services.report_service import (
    get_candidate_report
)

router = APIRouter(
    prefix="",
    tags=["Reports"]
)


@router.get("/report/{candidate_id}")
def get_report(candidate_id: str):

    report = get_candidate_report(candidate_id)

    if report is None:
        raise HTTPException(
            status_code=404,
            detail=f"Candidate {candidate_id} not found"
        )

    return {
        "status": "success",
        "report": report
    }