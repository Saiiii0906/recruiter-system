from fastapi import FastAPI
from pydantic import BaseModel

from backend.services.ranking_service import (rank_candidates_service)
from backend.services.data_loader import (load_candidates)

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


@app.post("/rank-candidates")
def rank_candidates(request: RankingRequest):
    sample_df = load_candidates()

    jd_text = request.job_description

    jd_features = {"required_skills": [],"preferred_skills": []}

    results = rank_candidates_service(sample_df=sample_df,jd_text=jd_text,jd_features=jd_features,top_n=10)

    return {"status": "success","top_candidates": results}