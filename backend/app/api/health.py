from fastapi import APIRouter
from datetime import datetime, timezone
from app.database.mongodb import db_instance

router = APIRouter()

@router.get("/health")
async def health_check():
    db_status = "connected (MongoDB)" if db_instance.is_mongo_connected else "active (In-Memory Fallback)"
    return {
        "status": "healthy",
        "service": "CityPulse Backend API",
        "database": db_status,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@router.get("/city/state")
async def get_city_state():
    return {
        "city": "Jaipur",
        "overallStatus": "ELEVATED_INUNDATION_RISK",
        "activeZone": "sector-a",
        "concordanceScore": 89.4,
        "activeFeedsCount": 4,
        "degradedFeedsCount": 1,
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    }
