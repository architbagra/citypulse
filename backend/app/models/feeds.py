from pydantic import BaseModel
from typing import Dict, Any

class CivicFeed(BaseModel):
    id: str
    feedNumber: str
    name: str
    protocol: str
    status: str
    statusDetail: str
    frequency: str
    latencyMs: int
    jitterMs: int
    packetsDropped: int
    samplePayload: Dict[str, Any]
    lastIngestSha256: str
    description: str
    degradationImpact: str
