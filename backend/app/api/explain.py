from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
from app.services.llm_explainer import generate_grounded_explanation

router = APIRouter()

class ExplainRequest(BaseModel):
    eventId: Optional[str] = "JPR-2024-0819-B"
    zoneId: Optional[str] = "sector-a"
    evidence: Optional[Dict[str, Any]] = None

@router.post("/explain")
async def explain_event(req: ExplainRequest):
    evidence = req.evidence or {
        "precipitation_mm_h": 48.2,
        "traffic_speed_km_h": 6.4,
        "citizen_calls": 38,
        "time_window": "13:30-14:00 IST",
        "concordance_score": 89.4
    }
    explanation = generate_grounded_explanation(
        event_id=req.eventId or "JPR-2024-0819-B",
        zone_name="Zone A — Ashok Nagar & M.I. Road Arterial Corridor",
        evidence=evidence
    )
    return explanation
