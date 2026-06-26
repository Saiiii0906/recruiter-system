from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import HTTPException
import logging

logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)

from backend.services.ranking_service import (rank_candidates_service)
from backend.services.data_loader import (load_candidates)
from backend.feature_engineering.jd_processing.text_jd_parser import (extract_skills_from_jd)
from backend.services.candidate_service import (get_candidate_by_id)

app = FastAPI(
    title="Recruiter AI System",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Recruiter AI System Running"
    }
class RankingRequest(BaseModel):
    job_description: str

@app.get("/candidate/{candidate_id}")
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


@app.post("/rank-candidates")
def rank_candidates(request: RankingRequest):
    sample_df = load_candidates()
    logger.info(f"JD Features: {jd_features}")
    jd_text = request.job_description

    jd_features = extract_skills_from_jd(jd_text)

    results = rank_candidates_service(sample_df=sample_df,jd_text=jd_text,jd_features=jd_features,top_n=10)

    return {"status": "success","top_candidates": results}