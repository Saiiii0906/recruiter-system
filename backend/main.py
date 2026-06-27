from fastapi import FastAPI
from backend.api.ranking import router as ranking_router
from backend.api.candidates import router as candidate_router
from backend.api.reports import router as reports_router
from backend.api.analytics import router as analytics_router
import logging

logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)


app = FastAPI(
    title="Recruiter AI System",
    version="1.0.0"
)
app.include_router(ranking_router)
app.include_router(candidate_router)
app.include_router(reports_router)
app.include_router(analytics_router)

@app.get("/")
def home():
    return {
        "message": "Recruiter AI System Running"
    }

