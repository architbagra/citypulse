from fastapi import APIRouter
from typing import List, Dict, Any
from app.database.mongodb import get_database

router = APIRouter()

MOCK_CAUSES = [
    {
        "id": "coup-1",
        "name": "Stream A — Precipitation Surge",
        "code": "IMD AWS-04",
        "badge": "LEAD DRIVER (+220%)",
        "correlationCoefficient": 0.88,
        "temporalLag": "0 min (Reference Baseline)",
        "couplingStrength": "STRONG CONCORDANCE",
        "deltaText": "+220%",
        "deltaType": "up",
        "description": "Direct atmospheric sensor measurement; initiates hydrodynamic loading sequence across Zone A.",
        "spatialCoincidence": "96.2% localized over Ashok Nagar grid"
    }
]

MOCK_EMPIRICAL = [
    {
        "category": "ATMOSPHERIC INPUT",
        "directObservation": "48.2 mm/hr rain rate registered at AWS-04 sensor tipping bucket.",
        "syntheticInference": "Hyper-localized convective cell trapped against Nahargarh ridge.",
        "confidence": "98% (High Sensor Trust)",
        "epistemicBound": "Observed rain is physical ground truth."
    }
]

MOCK_HISTORICAL = [
    {
        "date": "14 JUL 2024",
        "eventTitle": "M.I. Road Monsoon Cloudburst",
        "peakPrecip": "52.4 mm/h",
        "minSpeed": "4.8 km/h",
        "drainTime": "1 hr 45 min",
        "similarityScore": 94.2,
        "outcome": "Emergency submersible pumps deployed."
    }
]

MOCK_RECOVERY = [
    { "t": "T+00 (Now)", "level": 100, "label": "Peak Inundation (18.5% capacity remaining)" },
    { "t": "T+15m", "level": 88, "label": "Pump Unit #04 spinning up" }
]

@router.get("/relationships/causes")
async def get_causes():
    db = get_database()
    if await db.causes.count_documents({}) == 0:
        await db.causes.insert_many(MOCK_CAUSES)
    return await db.causes.find({}, {"_id": 0}).to_list(length=100)

@router.get("/relationships/empirical")
async def get_empirical():
    db = get_database()
    if await db.empirical.count_documents({}) == 0:
        await db.empirical.insert_many(MOCK_EMPIRICAL)
    return await db.empirical.find({}, {"_id": 0}).to_list(length=100)

@router.get("/relationships/historical")
async def get_historical():
    db = get_database()
    if await db.historical.count_documents({}) == 0:
        await db.historical.insert_many(MOCK_HISTORICAL)
    return await db.historical.find({}, {"_id": 0}).to_list(length=100)

@router.get("/relationships/recovery")
async def get_recovery():
    db = get_database()
    if await db.recovery.count_documents({}) == 0:
        await db.recovery.insert_many(MOCK_RECOVERY)
    return await db.recovery.find({}, {"_id": 0}).to_list(length=100)

