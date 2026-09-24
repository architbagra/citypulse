from pydantic import BaseModel
from typing import Optional

class ReplayMilestone(BaseModel):
    time: str
    timestampMs: int
    label: str
    isSpike: Optional[bool] = False
    precip: float
    speed: float
    calls: int
    transitSpeed: float
    eventState: str
    concordance: float
    description: str
