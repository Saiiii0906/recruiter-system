from fastapi import APIRouter, HTTPException
from backend.services.candidate_service import (
    get_candidate_by_id,
    get_all_candidates,
)
router = APIRouter(
    prefix="",
    tags=["Candidates"]
)

@router.get("/candidates")
def get_candidates():
    return {
        "status": "success",
        "candidates": get_all_candidates()
    }

@router.get("/candidate/{candidate_id}")
def get_candidate(candidate_id: str):

    print("=" * 80)
    print("GET ENDPOINT HIT")
    print("Received:", candidate_id)

    candidate = get_candidate_by_id(candidate_id)

    print("Returned:", candidate)
    print("=" * 80)

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail=f"Candidate {candidate_id} not found"
        )

    return {
        "status": "success",
        "candidate": candidate
    }