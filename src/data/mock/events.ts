import { CivicEvent } from '../../types';

export const PRIMARY_ACTIVE_EVENT: CivicEvent = {
  id: 'JPR-2024-0819-B',
  title: 'CRITICAL CONCORDANCE: POSSIBLE WEATHER-RELATED ARTERIAL DISRUPTION',
  summary: 'Zone A · Ashok Nagar & M.I. Road Arterial Corridor exhibiting acute spatial-temporal confluence across 4 independent telemetry feeds.',
  zoneId: 'sector-a',
  zoneName: 'Zone A · Ashok Nagar & M.I. Road Arterial Corridor',
  severity: 'CRITICAL',
  declaredAt: '14:00:00 IST',
  durationMinutes: 35,
  concordanceScore: 89.4,
  persistenceMinutes: 35,
  streams: [
    {
      id: 'stream-precip',
      name: 'Precipitation Surge',
      sensorCode: 'AWS-04',
      value: '48.2 mm/h',
      delta: '+220%',
      isSpike: true,
      deltaType: 'increase',
      subtext: 'vs. Diurnal Seasonal Baseline',
      baseline: '15.0 mm/h',
      status: 'ELEVATED',
      confidence: 0.98
    },
    {
      id: 'stream-velocity',
      name: 'Velocity Collapse',
      sensorCode: 'LOOP D-12',
      value: '6.4 km/h',
      delta: '-61%',
      isSpike: true,
      deltaType: 'decrease',
      subtext: 'vs. Free Flow Expectation (32 km/h)',
      baseline: '32.0 km/h',
      status: 'CRITICAL',
      confidence: 0.94
    },
    {
      id: 'stream-calls',
      name: '181 Citizen Calls',
      sensorCode: 'SAMPARK-181',
      value: '38 calls',
      delta: '+310%',
      isSpike: true,
      deltaType: 'increase',
      subtext: 'Waterlogging & Stalled Vehicle Dispatches',
      baseline: '9 calls/hr',
      status: 'ELEVATED',
      confidence: 0.91
    },
    {
      id: 'stream-transit',
      name: 'Transit Deceleration',
      sensorCode: 'JCTSL BUS API',
      value: '4.2 km/h',
      delta: '-78%',
      isSpike: true,
      deltaType: 'decrease',
      subtext: 'Routes 9A & 12A Stagnated (Fallback Mode)',
      baseline: '19.5 km/h',
      status: 'DEGRADED',
      confidence: 0.82
    }
  ],
  diagnosticChain: [
    {
      step: 1,
      timeOffset: '13:42 IST',
      title: 'Hyper-Localized Cloudburst Influx',
      description: 'IMD AWS-04 recorded rapid deluge spike to 48.2 mm/hr directly over Ashok Nagar / M.I. Road catchment basin within a 12-minute window.',
      metric: '48.2 mm/hr (+220%)',
      source: 'IMD AWS-04 Mesonet',
      confidence: 0.98,
      status: 'VERIFIED'
    },
    {
      step: 2,
      timeOffset: '13:49 IST',
      title: 'Immediate Arterial Friction & Deceleration',
      description: 'Smart Mobility Induction Loops D-11 through D-14 at Panch Batti recorded speed drop from 34 km/h down to 6.4 km/h as surface ponding commenced.',
      metric: '6.4 km/h (-61%)',
      source: 'Mobility Sensor Loop D-12',
      confidence: 0.94,
      status: 'VERIFIED'
    },
    {
      step: 3,
      timeOffset: '13:54 IST',
      title: 'Citizen Inundation & Breakdown Dispatch Surge',
      description: 'Rajasthan Sampark 181 portal received 38 geocoded distress calls reporting water levels rising over curb line and stranded two-wheelers.',
      metric: '38 Dispatches (+310%)',
      source: 'Citizenry Sampark 181',
      confidence: 0.91,
      status: 'VERIFIED'
    },
    {
      step: 4,
      timeOffset: '13:58 IST',
      title: 'Conduit S-04 Hydraulic Chokepoint Lock',
      description: 'Sub-surface hydraulic pressure sensor at Conduit S-04 reached 94% carrying threshold, indicating backwater effect from downstream collector.',
      metric: '94% Hydro Head',
      source: 'Jaipur Smart Drainage SCADA',
      confidence: 0.89,
      status: 'VERIFIED'
    },
    {
      step: 5,
      timeOffset: '14:00 IST',
      title: 'Public Transit Gridlock & Fallback Verification',
      description: 'JCTSL Bus Telemetry feed stalled; inductive loop corroboration confirmed 6 low-floor buses stationary between Panch Batti and Paanch Batti Circle.',
      metric: '4.2 km/h Crawl',
      source: 'JCTSL Synthetic Proxy',
      confidence: 0.82,
      status: 'SYNTHETIC'
    }
  ],
  hypotheses: [
    {
      id: 'hypo-a',
      title: 'Gravitational Runoff Exceedance',
      probability: 48,
      factors: [
        'Rainfall rate (48.2 mm/hr) exceeds natural percolation by 3.2x',
        'Topographic depression around Ajmeri Gate creates natural funnel',
        'Historical monsoon precedent: Jul 14 2024 matched this curve'
      ],
      status: 'PRIMARY'
    },
    {
      id: 'hypo-b',
      title: 'Storm Drain Siltation & Catch-Basin Choke',
      probability: 32,
      factors: [
        'Pre-monsoon desilting report flagged Conduit S-04 as 35% obstructed',
        'Citizen reports mention clogged surface grates near Panch Batti',
        'Flow velocity gradient flattened 15 minutes before peak surface water'
      ],
      status: 'SECONDARY'
    },
    {
      id: 'hypo-c',
      title: 'Upstream Sanganeri Conduit Bottleneck',
      probability: 20,
      factors: [
        'Downstream discharge point operating at maximum hydraulic head',
        'Gravity-fed outlet throttled due to high canal water level'
      ],
      status: 'CONTRIBUTORY'
    }
  ]
};
