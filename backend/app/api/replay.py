from fastapi import APIRouter
from typing import List
from app.models.replay import ReplayMilestone
from app.database.mongodb import get_database

router = APIRouter()

MOCK_REPLAY = [
    {
        "time": "13:00",
        "timestampMs": 1724052600000,
        "label": "13:00 Baseline",
        "isSpike": False,
        "precip": 0.2,
        "speed": 34.2,
        "calls": 1,
        "transitSpeed": 21.0,
        "eventState": "NOMINAL",
        "concordance": 6.2,
        "description": "Dry pavement conditions; normal midday arterial circulation."
    },
    {
        "time": "13:30",
        "timestampMs": 1724054400000,
        "label": "13:30 Velocity Dip",
        "isSpike": False,
        "precip": 36.8,
        "speed": 16.4,
        "calls": 12,
        "transitSpeed": 12.4,
        "eventState": "ELEVATED",
        "concordance": 52.0,
        "description": "Traffic slows significantly as standing water forms."
    },
    {
        "time": "14:00",
        "timestampMs": 1724056200000,
        "label": "14:00 [SPIKE] Event Declared",
        "isSpike": True,
        "precip": 48.2,
        "speed": 6.4,
        "calls": 38,
        "transitSpeed": 4.2,
        "eventState": "CRITICAL",
        "concordance": 89.4,
        "description": "Autonomous incident declaration issued."
    }
]

@router.get("/replay", response_model=List[ReplayMilestone])
async def get_replay():
    db = get_database()
    count = await db.replay.count_documents({})
    if count == 0:
        await db.replay.insert_many(MOCK_REPLAY)
        
    replay_cursor = db.replay.find({})
    replays = await replay_cursor.to_list(length=100)
    return [ReplayMilestone(**r) for r in replays]
