export interface SignalCoupling {
  id: string;
  name: string;
  code: string;
  badge: string;
  correlationCoefficient: number;
  temporalLag: string;
  couplingStrength: string;
  deltaText: string;
  deltaType: 'up' | 'down';
  description: string;
  spatialCoincidence: string;
}

export const SIGNAL_COUPLINGS: SignalCoupling[] = [
  {
    id: 'coup-1',
    name: 'Stream A · Precipitation Surge',
    code: 'IMD AWS-04',
    badge: 'LEAD DRIVER (+220%)',
    correlationCoefficient: 0.88,
    temporalLag: '0 min (Reference Baseline)',
    couplingStrength: 'STRONG CONCORDANCE',
    deltaText: '+220%',
    deltaType: 'up',
    description: 'Direct atmospheric sensor measurement; initiates hydrodynamic loading sequence across Zone A.',
    spatialCoincidence: '96.2% localized over Ashok Nagar grid'
  },
  {
    id: 'coup-2',
    name: 'Stream B · Velocity Collapse',
    code: 'INDUCTIVE LOOP D-12',
    badge: 'RESPONSE ARTIFACT (-61%)',
    correlationCoefficient: -0.92,
    temporalLag: '+7 min postcipitation onset',
    couplingStrength: 'INVERSE LOCK (STRONG)',
    deltaText: '-61%',
    deltaType: 'down',
    description: 'Road sensor speed metrics plunge from 34 km/h to 6.4 km/h once water accumulation crosses 25mm threshold.',
    spatialCoincidence: 'Co-located within 40m of Conduit S-04'
  },
  {
    id: 'coup-3',
    name: 'Stream C · 181 Inundation Dispatches',
    code: 'SAMPARK HELPLINE',
    badge: 'HUMAN SENSOR (+310%)',
    correlationCoefficient: 0.84,
    temporalLag: '+12 min postcipitation onset',
    couplingStrength: 'MODERATE-HIGH CONCORDANCE',
    deltaText: '+310%',
    deltaType: 'up',
    description: 'Citizen complaint volume clusters along the low-point arterial basin at Panch Batti and Paanch Batti Circle.',
    spatialCoincidence: '38 calls within 250m perimeter'
  },
  {
    id: 'coup-4',
    name: 'Stream D · Transit Deceleration',
    code: 'JCTSL PROXY SYNTHESIS',
    badge: 'SYNTHETIC ESTIMATE (-78%)',
    correlationCoefficient: 0.79,
    temporalLag: '+14 min postcipitation onset',
    couplingStrength: 'DEGRADED FALLBACK LOCK',
    deltaText: '-78%',
    deltaType: 'down',
    description: 'Synthetically reconstructed bus fleet velocity; cross-validated against inductive loop spatial queue length.',
    spatialCoincidence: 'Route 9A corridor alignment'
  }
];

export const EMPIRICAL_VS_SYNTHETIC_ROWS = [
  {
    category: 'ATMOSPHERIC INPUT',
    directObservation: '48.2 mm/hr rain rate registered at AWS-04 sensor tipping bucket (uncalibrated mechanical count).',
    syntheticInference: 'Hyper-localized convective cell trapped against Nahargarh ridge funneling into Ashok Nagar.',
    confidence: '98% (High Sensor Trust)',
    epistemicBound: 'Observed rain is physical ground truth; spatial extent between sensors is interpolated.'
  },
  {
    category: 'ROADWAY KINETICS',
    directObservation: 'Inductive Loop D-12 occupancy jumped from 14% to 92%; passage speed dropped to 6.4 km/h.',
    syntheticInference: 'Standing surface water depth ≥ 12cm causing drivers to brake and stall in low carriage lanes.',
    confidence: '94% (Loop Calibration OK)',
    epistemicBound: 'Loop measures magnetic disruption; water depth is an inferred hydraulic proxy.'
  },
  {
    category: 'MUNICIPAL STRESS',
    directObservation: '38 geocoded citizen calls logged on Rajasthan Sampark 181 in 20 minutes.',
    syntheticInference: 'Catch-basin grates choked with urban debris, blocking gravity drainage into Conduit S-04.',
    confidence: '91% (Caller Geolocation Validated)',
    epistemicBound: 'Caller reports reflect human perception; exact hydrodynamic blockage requires physical probe.'
  },
  {
    category: 'TRANSIT OPERATIONS',
    directObservation: 'JCTSL GPS API unreachable (HTTP 504); last fixed positions show 6 buses stationary.',
    syntheticInference: 'Complete arterial paralysis holding fleet captive; scheduled headway broken across Zone A.',
    confidence: '82% (Degraded Fallback Penalty Enforced)',
    epistemicBound: 'Estimated from Loop D-12 speed proxy; actual bus onboard engine states unverified.'
  }
];

export const HISTORICAL_JAIPUR_ANALOGS = [
  {
    date: '14 JUL 2024',
    eventTitle: 'M.I. Road Monsoon Cloudburst',
    peakPrecip: '52.4 mm/h',
    minSpeed: '4.8 km/h',
    drainTime: '1 hr 45 min',
    similarityScore: 94.2,
    outcome: 'Emergency submersible pumps deployed at Panch Batti cleared water in 105 mins.'
  },
  {
    date: '02 AUG 2023',
    eventTitle: 'Ashok Nagar Sump Overflow',
    peakPrecip: '44.0 mm/h',
    minSpeed: '7.2 km/h',
    drainTime: '2 hr 10 min',
    similarityScore: 88.6,
    outcome: 'Downstream canal backflow caused prolonged pooling until sluice gate Alpha opened.'
  },
  {
    date: '28 JUL 2022',
    eventTitle: 'Central Jaipur Flash Deluge',
    peakPrecip: '61.0 mm/h',
    minSpeed: '3.1 km/h',
    drainTime: '3 hr 15 min',
    similarityScore: 79.1,
    outcome: 'Complete arterial shutdown; traffic diversion via Sansar Chandra Road enforced.'
  }
];

export const RECOVERY_TRAJECTORY_POINTS = [
  { t: 'T+00 (Now)', level: 100, label: 'Peak Inundation (18.5% capacity remaining)' },
  { t: 'T+15m', level: 88, label: 'Pump Unit #04 spinning up' },
  { t: 'T+30m', level: 68, label: 'Gravity runoff into secondary stormwater canal' },
  { t: 'T+45m', level: 44, label: 'Curb line exposure at Panch Batti' },
  { t: 'T+60m', level: 25, label: 'Traffic flow recovery above 18 km/h' },
  { t: 'T+90m', level: 8, label: 'Nominal baseline restored' }
];
