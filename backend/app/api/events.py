from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models.civic_event import CivicEvent
from app.database.mongodb import get_database
import json

router = APIRouter()

MOCK_EVENT = {
  "id": "JPR-2024-0819-B",
  "title": "CRITICAL CONCORDANCE: POSSIBLE WEATHER-RELATED ARTERIAL DISRUPTION",
  "summary": "Zone A — Ashok Nagar & M.I. Road Arterial Corridor exhibiting acute spatial-temporal confluence across 4 independent telemetry feeds.",
  "zoneId": "sector-a",
  "zoneName": "Zone A — Ashok Nagar & M.I. Road Arterial Corridor",
  "severity": "CRITICAL",
  "declaredAt": "14:00:00 IST",
  "durationMinutes": 35,
  "concordanceScore": 89.4,
  "persistenceMinutes": 35,
  "streams": [
    {
      "id": "stream-precip",
      "name": "Precipitation Surge",
      "sensorCode": "AWS-04",
      "value": "48.2 mm/h",
      "delta": "+220%",
      "isSpike": True,
      "deltaType": "increase",
      "subtext": "vs. Diurnal Seasonal Baseline",
      "baseline": "15.0 mm/h",
      "status": "ELEVATED",
      "confidence": 0.98
    },
    {
      "id": "stream-velocity",
      "name": "Velocity Collapse",
      "sensorCode": "LOOP D-12",
      "value": "6.4 km/h",
      "delta": "-61%",
      "isSpike": True,
      "deltaType": "decrease",
      "subtext": "vs. Free Flow Expectation (32 km/h)",
      "baseline": "32.0 km/h",
      "status": "CRITICAL",
      "confidence": 0.94
    },
    {
      "id": "stream-calls",
      "name": "181 Citizen Calls",
      "sensorCode": "SAMPARK-181",
      "value": "38 calls",
      "delta": "+310%",
      "isSpike": True,
      "deltaType": "increase",
      "subtext": "Waterlogging & Stalled Vehicle Dispatches",
      "baseline": "9 calls/hr",
      "status": "ELEVATED",
      "confidence": 0.91
    },
    {
      "id": "stream-transit",
      "name": "Transit Deceleration",
      "sensorCode": "JCTSL BUS API",
      "value": "4.2 km/h",
      "delta": "-78%",
      "isSpike": True,
      "deltaType": "decrease",
      "subtext": "Routes 9A & 12A Stagnated (Fallback Mode)",
      "baseline": "19.5 km/h",
      "status": "DEGRADED",
      "confidence": 0.82
    }
  ],
  "diagnosticChain": [
    {
      "step": 1,
      "timeOffset": "13:42 IST",
      "title": "Hyper-Localized Cloudburst Influx",
      "description": "IMD AWS-04 recorded rapid deluge spike to 48.2 mm/hr directly over Ashok Nagar / M.I. Road catchment basin within a 12-minute window.",
      "metric": "48.2 mm/hr (+220%)",
      "source": "IMD AWS-04 Mesonet",
      "confidence": 0.98,
      "status": "VERIFIED"
    },
    {
      "step": 2,
      "timeOffset": "13:49 IST",
      "title": "Immediate Arterial Friction & Deceleration",
      "description": "Smart Mobility Induction Loops D-11 through D-14 at Panch Batti recorded speed drop from 34 km/h down to 6.4 km/h as surface ponding commenced.",
      "metric": "6.4 km/h (-61%)",
      "source": "Mobility Sensor Loop D-12",
      "confidence": 0.94,
      "status": "VERIFIED"
    }
  ],
  "hypotheses": [
    {
      "id": "hypo-a",
      "title": "Gravitational Runoff Exceedance",
      "probability": 48,
      "factors": [
        "Rainfall rate (48.2 mm/hr) exceeds natural percolation by 3.2x",
        "Topographic depression around Ajmeri Gate creates natural funnel"
      ],
      "status": "PRIMARY"
    }
  ]
}

@router.get("/events", response_model=List[CivicEvent])
async def get_events():
    db = get_database()
    count = await db.events.count_documents({})
    if count == 0:
        await db.events.insert_one(MOCK_EVENT)
        
    events_cursor = db.events.find({})
    events = await events_cursor.to_list(length=100)
    
    return [CivicEvent(**event) for event in events]

@router.post("/events", response_model=CivicEvent, status_code=status.HTTP_201_CREATED)
async def create_event(event: CivicEvent):
    db = get_database()
    event_dict = event.dict()
    
    await db.events.insert_one(event_dict)
    return event

