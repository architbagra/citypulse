from fastapi import APIRouter
from typing import List, Dict, Any
from app.database.mongodb import get_database

router = APIRouter()

MOCK_CAUSES = [
    {
        "id": "coup-1",
        "name": "Stream A \u2014 Primary Precipitation",
        "code": "AWS-04 RAIN GAUGE",
        "badge": "TRIGGER EVENT (+48.2mm/h)",
        "correlationCoefficient": 0.98,
        "temporalLag": "T=0 (Baseline)",
        "couplingStrength": "DIRECT DRIVER (PRIMARY)",
        "deltaText": "+48.2 mm/h",
        "deltaType": "up",
        "description": "Sudden localized micro-burst centered over Ashok Nagar.",
        "spatialCoincidence": "Centered on SEC-A (100% overlap)"
    }
]

@router.get("/relationships/causes")
async def get_causes():
    db = get_database()
    count = await db.causes.count_documents({})
    if count == 0:
        await db.causes.insert_many(MOCK_CAUSES)
        
    causes_cursor = db.causes.find({}, {"_id": 0})
    causes = await causes_cursor.to_list(length=100)
    return causes
