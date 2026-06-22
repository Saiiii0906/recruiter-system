from pydantic import BaseModel


class RankingRequest(BaseModel):
    job_description: str