from fastapi import APIRouter
from typing import List
from app.models.zones import SectorZone
from app.database.mongodb import get_database

router = APIRouter()

# Some initial mock data to seed if DB is empty
MOCK_ZONES = [
    {
        "id": "sector-a",
        "code": "SEC-A",
        "name": "Zone A \u2014 Ashok Nagar & M.I. Road Arterial Corridor",
        "subhead": "Central Business District & Heritage Outflow",
        "status": "CRITICAL",
        "concordance": 89.4,
        "precipitation": 48.2,
        "trafficSpeed": 6.4,
        "dispatchCalls": 38,
        "center": [26.9142, 75.8080],
        "bounds": [[26.9100, 75.8020], [26.9200, 75.8150]],
        "activeAnomalies": [
            "Inundation Plume along M.I. Road axis",
            "Velocity collapse at Panch Batti junction",
            "Conduit S-04 hydrodynamic back-pressure",
            "181 Citizen dispatch surge"
        ],
        "drainageCapacity": 18.5
    },
    {
        "id": "sector-b",
        "code": "SEC-B",
        "name": "Zone B \u2014 C-Scheme & Secretariat",
        "subhead": "Administrative Core & Civil Lines",
        "status": "ELEVATED",
        "concordance": 42.1,
        "precipitation": 16.5,
        "trafficSpeed": 21.0,
        "dispatchCalls": 9,
        "center": [26.9060, 75.8010],
        "bounds": [[26.9010, 75.7950], [26.9110, 75.8070]],
        "activeAnomalies": [
            "Secondary arterial runoff spillover from Ashok Nagar"
        ],
        "drainageCapacity": 64.0
    }
]

@router.get("/zones", response_model=List[SectorZone])
async def get_zones():
    db = get_database()
    count = await db.zones.count_documents({})
    if count == 0:
        await db.zones.insert_many(MOCK_ZONES)
        
    zones_cursor = db.zones.find({})
    zones = await zones_cursor.to_list(length=100)
    return [SectorZone(**zone) for zone in zones]
