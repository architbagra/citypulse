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
        "name": "Zone A — Ashok Nagar & M.I. Road Corridor",
        "subhead": "Central Business District & Heritage Outflow",
        "status": "CRITICAL",
        "concordance": 89.4,
        "precipitation": 48.2,
        "trafficSpeed": 6.4,
        "dispatchCalls": 38,
        "center": [26.9172, 75.8050],
        "bounds": [[26.9100, 75.7980], [26.9240, 75.8120]],
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
        "name": "Zone B — C-Scheme & Secretariat",
        "subhead": "Administrative Core & Civil Lines Outfall",
        "status": "ELEVATED",
        "concordance": 42.1,
        "precipitation": 16.5,
        "trafficSpeed": 21.0,
        "dispatchCalls": 9,
        "center": [26.9030, 75.7940],
        "bounds": [[26.8950, 75.7850], [26.9110, 75.8030]],
        "activeAnomalies": [
            "Secondary arterial runoff spillover from Ashok Nagar"
        ],
        "drainageCapacity": 64.0
    },
    {
        "id": "sector-c",
        "code": "SEC-C",
        "name": "Zone C — Mansarovar & Shipra Path",
        "subhead": "Southern Institutional Hub & Residential Grid",
        "status": "NOMINAL",
        "concordance": 12.4,
        "precipitation": 4.2,
        "trafficSpeed": 38.5,
        "dispatchCalls": 2,
        "center": [26.8580, 75.7620],
        "bounds": [[26.8480, 75.7500], [26.8680, 75.7740]],
        "activeAnomalies": [
            "Nominal stormwater drainage outflow"
        ],
        "drainageCapacity": 88.0
    },
    {
        "id": "sector-d",
        "code": "SEC-D",
        "name": "Zone D — Vaishali Nagar & Queens Road",
        "subhead": "Western Commercial & Residential Corridor",
        "status": "ELEVATED",
        "concordance": 48.6,
        "precipitation": 18.4,
        "trafficSpeed": 18.2,
        "dispatchCalls": 11,
        "center": [26.9120, 75.7480],
        "bounds": [[26.9020, 75.7380], [26.9220, 75.7580]],
        "activeAnomalies": [
            "Queens Road underpass standing water accumulation",
            "Minor transit deceleration on Route 14"
        ],
        "drainageCapacity": 52.5
    },
    {
        "id": "sector-e",
        "code": "SEC-E",
        "name": "Zone E — Walled City & Johari Bazaar",
        "subhead": "Historic Core & High-Density Outfall",
        "status": "CRITICAL",
        "concordance": 82.1,
        "precipitation": 41.5,
        "trafficSpeed": 8.2,
        "dispatchCalls": 29,
        "center": [26.9240, 75.8260],
        "bounds": [[26.9160, 75.8160], [26.9320, 75.8360]],
        "activeAnomalies": [
            "Sanganeri Gate storm conduit back-pressure",
            "Johari Bazaar ped-traffic inundation stall",
            "181 Dispatches surge (+240%)"
        ],
        "drainageCapacity": 22.0
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
