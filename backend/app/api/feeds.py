from fastapi import APIRouter
from typing import List
from app.models.feeds import CivicFeed
from app.database.mongodb import get_database

router = APIRouter()

MOCK_FEEDS = [
    {
        "id": "feed-aws-04",
        "feedNumber": "AWS-04",
        "name": "Ashok Nagar Rain Gauge",
        "protocol": "MQTT / TELEMETRY",
        "status": "LIVE",
        "statusDetail": "Streaming normally",
        "frequency": "1 Hz",
        "latencyMs": 14,
        "jitterMs": 2,
        "packetsDropped": 0,
        "samplePayload": {"precipitation": 48.2, "unit": "mm/h"},
        "lastIngestSha256": "f2a8b9c1d...",
        "description": "Primary atmospheric water sensor located at Ashok Nagar sub-station.",
        "degradationImpact": "Loss reduces precipitation confidence."
    }
]

MOCK_DEGRADATION = [
  {
    "phase": "PHASE 1",
    "title": "Circuit Breaker Socket Isolation",
    "status": "COMPLETED",
    "time": "13:38:12 IST",
    "detail": "Detected 3 consecutive HTTP 504 timeouts from JCTSL GTFS server."
  }
]

@router.get("/feeds", response_model=List[CivicFeed])
async def get_feeds():
    db = get_database()
    count = await db.feeds.count_documents({})
    if count == 0:
        await db.feeds.insert_many(MOCK_FEEDS)
        
    feeds_cursor = db.feeds.find({})
    feeds = await feeds_cursor.to_list(length=100)
    return [CivicFeed(**feed) for feed in feeds]

@router.get("/feeds/degradation")
async def get_degradation():
    db = get_database()
    if await db.degradation.count_documents({}) == 0:
        await db.degradation.insert_many(MOCK_DEGRADATION)
    return await db.degradation.find({}, {"_id": 0}).to_list(length=100)
