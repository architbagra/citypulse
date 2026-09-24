from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models.civic_event import CivicEvent
from app.database.mongodb import get_database

router = APIRouter()

@router.get("/events", response_model=List[CivicEvent])
async def get_events():
    db = get_database()
    events_cursor = db.events.find({})
    events = await events_cursor.to_list(length=100)
    
    # Map MongoDB '_id' to string if it exists, or just use 'id'
    # Currently we just return them, Pydantic handles validation 
    # but we need to ensure 'id' exists. If 'id' is our primary key, it should be there.
    # In MongoDB `_id` is default, so we might need to map it if we use standard ObjectIds.
    # For now, assuming 'id' is stored directly as a field.
    return [CivicEvent(**event) for event in events]

@router.post("/events", response_model=CivicEvent, status_code=status.HTTP_201_CREATED)
async def create_event(event: CivicEvent):
    db = get_database()
    event_dict = event.dict()
    # You could also use event.id as _id:
    # event_dict["_id"] = event.id
    
    await db.events.insert_one(event_dict)
    return event

