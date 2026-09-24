from fastapi import APIRouter
from typing import List
from app.models.civic_event import CivicEvent
from datetime import datetime

router = APIRouter()

@router.get("/events", response_model=List[CivicEvent])
def get_events():
    # Return mock real data based on shared contract
    return [
        CivicEvent(
            id="evt-001",
            title="Sample API Event",
            zone="Downtown",
            severity="medium",
            confidence=0.85,
            timestamp=datetime.utcnow(),
            contributingSignals=["traffic", "social"],
            spatialOverlap=True,
            temporalOverlap=False,
            explanation="This is a sample event generated from the backend."
        )
    ]
