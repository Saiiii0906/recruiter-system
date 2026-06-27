from fastapi import APIRouter

from backend.services.analytics_service import (
    get_dashboard_stats,
)

router = APIRouter(
    prefix="",
    tags=["Analytics"],
)


@router.get("/analytics")
def analytics():
    return {
        "status": "success",
        "analytics": get_dashboard_stats(),
    }