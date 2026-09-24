from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class CivicEvent(BaseModel):
    id: str
    title: str
    zone: str
    severity: str
    confidence: float
    timestamp: datetime
    contributingSignals: List[str]
    spatialOverlap: bool
    temporalOverlap: bool
    explanation: str
