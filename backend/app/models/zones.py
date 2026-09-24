from pydantic import BaseModel
from typing import List, Optional, Tuple

class SectorZone(BaseModel):
    id: str
    code: str
    name: str
    subhead: str
    status: str
    concordance: float
    precipitation: float
    trafficSpeed: float
    dispatchCalls: int
    center: Tuple[float, float]
    bounds: Optional[Tuple[Tuple[float, float], Tuple[float, float]]] = None
    activeAnomalies: List[str]
    drainageCapacity: float
