from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.ranking_service import (
    rank_candidates_service
)

from backend.services.data_loader import (
    load_candidates
)

from backend.feature_engineering.jd_processing.text_jd_parser import (
    extract_skills_from_jd
)

router = APIRouter(
    prefix="",
    tags=["Ranking"]
)


class RankingRequest(BaseModel):
    job_description: str


@router.post("/rank-candidates")
def rank_candidates(request: RankingRequest):

    sample_df = load_candidates()

    jd_text = request.job_description

    jd_features = extract_skills_from_jd(jd_text)

    print("JD Features:")
    print(jd_features)

    results = rank_candidates_service(
        sample_df=sample_df,
        jd_text=jd_text,
        jd_features=jd_features,
        top_n=10
    )

    return {
        "status": "success",
        "top_candidates": results
    }