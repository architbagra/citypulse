from pydantic import BaseModel
from typing import List, Optional

class StreamTelemetry(BaseModel):
    id: str
    name: str
    sensorCode: str
    value: str
    delta: str
    isSpike: bool
    deltaType: str
    subtext: str
    baseline: str
    status: str
    confidence: float

class DiagnosticStep(BaseModel):
    step: int
    timeOffset: str
    title: str
    description: str
    metric: str
    source: str
    confidence: float
    status: str

class BayesianHypothesis(BaseModel):
    id: str
    title: str
    probability: int
    factors: List[str]
    status: str

class CivicEvent(BaseModel):
    id: str
    title: str
    summary: str
    zoneId: str
    zoneName: str
    severity: str
    declaredAt: str
    durationMinutes: int
    concordanceScore: float
    persistenceMinutes: int
    streams: List[StreamTelemetry]
    diagnosticChain: List[DiagnosticStep]
    hypotheses: List[BayesianHypothesis]

