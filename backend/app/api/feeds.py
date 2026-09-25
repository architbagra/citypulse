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
        "statusDetail": "Streaming normally (1 Hz cadence)",
        "frequency": "1 Hz",
        "latencyMs": 14,
        "jitterMs": 2,
        "packetsDropped": 0,
        "samplePayload": {"precipitation": 48.2, "unit": "mm/h", "sensor_id": "AWS-04", "status": "LIVE"},
        "lastIngestSha256": "f2a8b9c1d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1",
        "description": "Primary atmospheric water sensor located at Ashok Nagar sub-station.",
        "degradationImpact": "Loss reduces precipitation confidence score by 35%."
    },
    {
        "id": "feed-loop-d12",
        "feedNumber": "LOOP D-12",
        "name": "Smart Mobility Loop D-12",
        "protocol": "REST / GEOJSON",
        "status": "LIVE",
        "statusDetail": "Streaming normally (5 sec cadence)",
        "frequency": "0.2 Hz",
        "latencyMs": 42,
        "jitterMs": 5,
        "packetsDropped": 0,
        "samplePayload": {"speed_km_h": 6.4, "occupancy_pct": 91.8, "sensor_id": "LOOP-D-12", "status": "LIVE"},
        "lastIngestSha256": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
        "description": "Induction loop speed and occupancy sensor at Panch Batti arterial intersection.",
        "degradationImpact": "Loss forces fallback to transit speed interpolation."
    },
    {
        "id": "feed-sampark-181",
        "feedNumber": "SAMPARK 181",
        "name": "Sampark 181 Dispatch Cell",
        "protocol": "XML INGEST / REST",
        "status": "LIVE",
        "statusDetail": "Batch sync nominal (1 min interval)",
        "frequency": "0.016 Hz",
        "latencyMs": 120,
        "jitterMs": 18,
        "packetsDropped": 0,
        "samplePayload": {"complaint_count": 38, "categories": ["waterlogging", "stalled_vehicle"], "status": "LIVE"},
        "lastIngestSha256": "9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e",
        "description": "Rajasthan 181 citizen grievance portal dispatch queue for municipal dispatches.",
        "degradationImpact": "Loss disables citizen complaint density anomaly validation."
    },
    {
        "id": "feed-jcts-bus",
        "feedNumber": "JCTSL BUS API",
        "name": "JCTSL GTFS-RT Bus Telemetry",
        "protocol": "PROTOBUF / HTTP",
        "status": "DEGRADED",
        "statusDetail": "HTTP 504 Gateway Timeout (Circuit Breaker Active)",
        "frequency": "0.1 Hz",
        "latencyMs": 11840,
        "jitterMs": 3920,
        "packetsDropped": 12,
        "samplePayload": {"route_9a_speed_kmh": 4.2, "health": "DEGRADED (SYNTHETIC PROXY)", "error": "HTTP 504 Gateway Timeout"},
        "lastIngestSha256": "7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b",
        "description": "Jaipur City Transport Services Limited real-time bus GTFS feed.",
        "degradationImpact": "Switched to synthetic proxy velocity penalty based on induction loops."
    }
]

MOCK_DEGRADATION = [
  {
    "phase": "PHASE 1",
    "title": "Circuit Breaker Socket Isolation",
    "status": "COMPLETED",
    "time": "13:38:12 IST",
    "detail": "Detected 3 consecutive HTTP 504 timeouts from JCTSL GTFS server. Socket isolated."
  },
  {
    "phase": "PHASE 2",
    "title": "Synthetic Proxy Weight Substitution",
    "status": "COMPLETED",
    "time": "13:38:15 IST",
    "detail": "Substituted live GTFS transit speed with induction loop traffic velocity (-2.5 km/h penalty)."
  },
  {
    "phase": "PHASE 3",
    "title": "Bayesian Confidence Score Adjustment",
    "status": "COMPLETED",
    "time": "13:38:18 IST",
    "detail": "Adjusted multi-stream concordance confidence weight for public transit stream from 0.90 to 0.82."
  },
  {
    "phase": "PHASE 4",
    "title": "Automated Sentinel Re-Probe Loop",
    "status": "ACTIVE NOW",
    "time": "14:00:00 IST",
    "detail": "Pinging JCTSL backup gateway endpoint every 30 seconds for automatic recovery."
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
