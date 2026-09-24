import { CivicFeed } from '../../types';

export const CIVIC_FEEDS: CivicFeed[] = [
  {
    id: 'feed-01',
    feedNumber: 'FEED 01',
    name: 'Meteorology · IMD Weather Mesonet',
    protocol: 'REST / GeoJSON Polling (10s)',
    status: 'LIVE',
    statusDetail: '200 OK · Nominal Cadence',
    frequency: '10 sec',
    latencyMs: 142,
    jitterMs: 12,
    packetsDropped: 0,
    samplePayload: {
      station_id: "IMD-AWS-04",
      latitude: 26.9142,
      longitude: 75.8080,
      precipitation_rate_mm_hr: 48.2,
      accumulated_daily_mm: 72.4,
      relative_humidity: 94.2,
      barometric_pressure_hpa: 1004.2,
      timestamp_utc: "2026-09-24T08:30:00Z"
    },
    lastIngestSha256: '9a7f4c12d8e05b382901aaec9f41b9e28d7c4a1b8e23f048d21b7e61a49c30f1',
    description: 'High-density automated weather station (AWS) array across Jaipur Municipal Corporation boundaries.',
    degradationImpact: 'If offline, falls back to Doppler Radar extrapolation with -0.15 epistemic confidence penalty.'
  },
  {
    id: 'feed-02',
    feedNumber: 'FEED 02',
    name: 'Mobility · Smart Sensor Grid (Loop & Radar)',
    protocol: 'MQTT / Protocol Buffers (5s)',
    status: 'LIVE',
    statusDetail: '200 OK · Nominal Cadence',
    frequency: '5 sec',
    latencyMs: 88,
    jitterMs: 6,
    packetsDropped: 2,
    samplePayload: {
      loop_id: "LOOP-D-12",
      junction_name: "Panch Batti / M.I. Road",
      average_speed_kmh: 6.4,
      occupancy_pct: 91.8,
      vehicle_count_5m: 142,
      queue_length_meters: 320,
      timestamp_utc: "2026-09-24T08:30:05Z"
    },
    lastIngestSha256: '4f8812cbb0923e11a24d557f9208a0e371b83d1c479e0234a5d891b2c6499e12',
    description: 'In-pavement inductive loops and overhead radar sensors deployed by Jaipur Traffic Police & Smart City Ltd.',
    degradationImpact: 'If offline, falls back to Google Maps Distance Matrix API or historical time-of-day speed curves.'
  },
  {
    id: 'feed-03',
    feedNumber: 'FEED 03',
    name: 'Citizenry · Sampark 181 & 311 Municipal Portal',
    protocol: 'Webhook / Event-Driven WebSocket',
    status: 'LIVE',
    statusDetail: '200 OK · Streaming',
    frequency: 'Streaming',
    latencyMs: 210,
    jitterMs: 18,
    packetsDropped: 0,
    samplePayload: {
      ticket_id: "SMP-2024-81920",
      category: "CIVIC_WATERLOGGING_SEVERITY_3",
      reported_location: "Near Raj Mandir Cinema, M.I. Road",
      geo: [26.9152, 75.8078],
      caller_verified: true,
      sentiment_urgency: "HIGH",
      timestamp_utc: "2026-09-24T08:29:48Z"
    },
    lastIngestSha256: 'b3378901ae2b4c568912ef001847cbb592a3df41920a8c41238914b7e8894210',
    description: 'Centralized government grievance helpline (Rajasthan Sampark 181) and smart civic app dispatches.',
    degradationImpact: 'If offline, citizen signal is suspended; platform relies strictly on hardware telemetry.'
  },
  {
    id: 'feed-04',
    feedNumber: 'FEED 04',
    name: 'Public Transit · JCTSL Bus Fleet Telemetry',
    protocol: 'GTFS-Realtime (30s Polling)',
    status: 'OFFLINE',
    statusDetail: 'HTTP 504 Gateway Timeout · Protocol Alert',
    frequency: '30 sec (Stalled)',
    latencyMs: 12400,
    jitterMs: 4200,
    packetsDropped: 84,
    samplePayload: {
      route_id: "JCTSL-9A",
      bus_id: "RJ-14-PC-8921",
      last_known_speed: 4.2,
      last_gps_fix: "2026-09-24T08:08:12Z",
      status: "PACKET_TIMEOUT_ERROR_504",
      proxy_estimated_speed: 4.2
    },
    lastIngestSha256: 'c01198f123bc891042aa331ef89410bd2847a119854e89120bcdef4561239841',
    description: 'City bus GPS tracking network managed by Jaipur City Transport Services Limited.',
    degradationImpact: 'Currently in Phase 2 Inductive Loop Proxy Synthesis. Epistemic transparency penalty -0.08 applied.'
  }
];

export const DEGRADATION_PROTOCOL_STEPS = [
  {
    phase: 'PHASE 1',
    title: 'Circuit Breaker Socket Isolation',
    status: 'COMPLETED',
    time: '13:38:12 IST',
    detail: 'Detected 3 consecutive HTTP 504 timeouts from JCTSL GTFS server. Automated circuit breaker isolated feed to prevent blocking the ingestion pipeline.'
  },
  {
    phase: 'PHASE 2',
    title: 'Inductive Loop Proxy Synthesis',
    status: 'ACTIVE NOW',
    time: '13:38:15 IST',
    detail: 'Corridor speed is synthetically reconstructed using physical road induction loops (Loop D-12) & historical transit deceleration curves.'
  },
  {
    phase: 'PHASE 3',
    title: 'Epistemic Transparency Penalty',
    status: 'ENFORCED',
    time: '13:38:15 IST',
    detail: 'Overall model concordance penalised by -0.08. Uncertainty bounds widened on all transit-derived downstream inferences.'
  },
  {
    phase: 'PHASE 4',
    title: 'Civic Disclaimer Broadcast',
    status: 'BROADCASTING',
    time: '13:38:16 IST',
    detail: 'Public and municipal dashboards annotated with clear epistemic banner: "Transit metrics are synthetic estimates based on traffic loops."'
  }
];
