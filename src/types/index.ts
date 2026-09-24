export type ViewMode = 'live' | 'map' | 'relationships' | 'replay' | 'sources';

export type SectorStatus = 'CRITICAL' | 'ELEVATED' | 'NOMINAL' | 'DEGRADED';

export interface SectorZone {
  id: string;
  code: string;
  name: string;
  subhead: string;
  status: SectorStatus;
  concordance: number; // percentage
  precipitation: number; // mm/h
  trafficSpeed: number; // km/h
  dispatchCalls: number; // count
  center: [number, number]; // [lat, lng]
  bounds?: [[number, number], [number, number]];
  activeAnomalies: string[];
  drainageCapacity: number; // %
}

export interface StreamTelemetry {
  id: string;
  name: string;
  sensorCode: string;
  value: string;
  delta: string;
  isSpike: boolean;
  deltaType: 'increase' | 'decrease';
  subtext: string;
  baseline: string;
  status: 'OPTIMAL' | 'DEGRADED' | 'ELEVATED' | 'CRITICAL';
  confidence: number;
}

export interface DiagnosticStep {
  step: number;
  timeOffset: string;
  title: string;
  description: string;
  metric: string;
  source: string;
  confidence: number;
  status: 'VERIFIED' | 'SYNTHETIC' | 'FLAGGED';
}

export interface BayesianHypothesis {
  id: string;
  title: string;
  probability: number; // e.g. 48 for 48%
  factors: string[];
  status: 'PRIMARY' | 'SECONDARY' | 'CONTRIBUTORY';
}

export interface CivicEvent {
  id: string;
  title: string;
  summary: string;
  zoneId: string;
  zoneName: string;
  severity: 'CRITICAL' | 'ELEVATED' | 'ADVISORY';
  declaredAt: string;
  durationMinutes: number;
  concordanceScore: number; // 89.4
  persistenceMinutes: number;
  streams: StreamTelemetry[];
  diagnosticChain: DiagnosticStep[];
  hypotheses: BayesianHypothesis[];
}

export interface CivicFeed {
  id: string;
  feedNumber: string;
  name: string;
  protocol: string;
  status: 'LIVE' | 'DEGRADED' | 'OFFLINE';
  statusDetail: string;
  frequency: string;
  latencyMs: number;
  jitterMs: number;
  packetsDropped: number;
  samplePayload: Record<string, any>;
  lastIngestSha256: string;
  description: string;
  degradationImpact: string;
}

export interface ReplayMilestone {
  time: string;
  timestampMs: number;
  label: string;
  isSpike?: boolean;
  precip: number;
  speed: number;
  calls: number;
  transitSpeed: number;
  eventState: string;
  concordance: number;
  description: string;
}

export interface MapLayerConfig {
  cartography: boolean;
  hydroPlume: boolean;
  arterialFriction: boolean;
  dispatches181: boolean;
  conduitS04: boolean;
  jul14Analog: boolean;
}
