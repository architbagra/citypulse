from fastapi import APIRouter
from app.database.mongodb import get_database

router = APIRouter()

MOCK_SOURCES = [
    {
        "id": "src-1",
        "category": "Meteorology",
        "name": "IMD AWS-04 Mesonet",
        "protocol": "MQTT / Telemetry",
        "cadence": "1 Hz",
        "status": "LIVE",
        "reliability": 0.98
    },
    {
        "id": "src-2",
        "category": "Roadway Mobility",
        "name": "Smart Mobility Loop D-12",
        "protocol": "REST / GeoJSON",
        "cadence": "5 sec",
        "status": "LIVE",
        "reliability": 0.94
    },
    {
        "id": "src-3",
        "category": "Citizen Telemetry",
        "name": "Sampark 181 Dispatch Cell",
        "protocol": "XML Ingest",
        "cadence": "1 min",
        "status": "LIVE",
        "reliability": 0.91
    },
    {
        "id": "src-4",
        "category": "Public Transit",
        "name": "JCTSL GTFS-RT Telemetry",
        "protocol": "Protobuf / HTTP",
        "cadence": "10 sec",
        "status": "DEGRADED",
        "reliability": 0.82
    }
]

@router.get("/sources")
async def get_sources():
    db = get_database()
    if await db.sources.count_documents({}) == 0:
        await db.sources.insert_many(MOCK_SOURCES)
    return await db.sources.find({}, {"_id": 0}).to_list(length=100)
