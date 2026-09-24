import { ReplayMilestone } from '../../types';

export const REPLAY_TIMELINE: ReplayMilestone[] = [
  {
    time: '13:00',
    timestampMs: 1724052600000,
    label: '13:00 Baseline',
    precip: 0.2,
    speed: 34.2,
    calls: 1,
    transitSpeed: 21.0,
    eventState: 'NOMINAL',
    concordance: 6.2,
    description: 'Dry pavement conditions; normal midday arterial circulation across Ashok Nagar corridor.'
  },
  {
    time: '13:10',
    timestampMs: 1724053200000,
    label: '13:10 Pre-frontal gust',
    precip: 4.8,
    speed: 31.0,
    calls: 1,
    transitSpeed: 19.8,
    eventState: 'NOMINAL',
    concordance: 12.1,
    description: 'First drizzle registered on AWS-04; traffic flow unchanged.'
  },
  {
    time: '13:15',
    timestampMs: 1724053500000,
    label: '13:15 Ridge Rain',
    precip: 14.2,
    speed: 28.5,
    calls: 3,
    transitSpeed: 18.2,
    eventState: 'ADVISORY',
    concordance: 22.4,
    description: 'Rain band crosses Nahargarh ridge southward into central basin.'
  },
  {
    time: '13:25',
    timestampMs: 1724054100000,
    label: '13:25 Inflow intensification',
    precip: 26.5,
    speed: 22.1,
    calls: 6,
    transitSpeed: 15.6,
    eventState: 'ADVISORY',
    concordance: 36.8,
    description: 'Precipitation intensity jumps; minor curb ponding near Ajmeri gate.'
  },
  {
    time: '13:30',
    timestampMs: 1724054400000,
    label: '13:30 Velocity Dip',
    precip: 36.8,
    speed: 16.4,
    calls: 12,
    transitSpeed: 12.4,
    eventState: 'ELEVATED',
    concordance: 52.0,
    description: 'Traffic slows significantly as standing water forms in low-lying intersections.'
  },
  {
    time: '13:40',
    timestampMs: 1724055000000,
    label: '13:40 Conduit S-04 Pressure Surge',
    precip: 45.1,
    speed: 10.2,
    calls: 21,
    transitSpeed: 7.8,
    eventState: 'ELEVATED',
    concordance: 71.4,
    description: 'Storm drain telemetry hits 88% surcharge; outflow slowed by canal backflow.'
  },
  {
    time: '13:45',
    timestampMs: 1724055300000,
    label: '13:45 181 Clusters',
    precip: 47.9,
    speed: 8.5,
    calls: 31,
    transitSpeed: 5.5,
    eventState: 'CRITICAL',
    concordance: 81.6,
    description: 'Spike in citizen calls reporting stranded vehicles near Panch Batti.'
  },
  {
    time: '14:00',
    timestampMs: 1724056200000,
    label: '14:00 [SPIKE] Event Declared',
    isSpike: true,
    precip: 48.2,
    speed: 6.4,
    calls: 38,
    transitSpeed: 4.2,
    eventState: 'CRITICAL',
    concordance: 89.4,
    description: 'Four-signal spatial-temporal lock confirmed. Autonomous incident declaration issued.'
  },
  {
    time: '14:15',
    timestampMs: 1724057100000,
    label: '14:15 Peak Stagnation',
    precip: 42.0,
    speed: 5.8,
    calls: 42,
    transitSpeed: 3.9,
    eventState: 'CRITICAL',
    concordance: 91.2,
    description: 'Arterial paralysis across 1.4 km corridor; emergency pump deployment dispatched.'
  },
  {
    time: '14:30',
    timestampMs: 1724058000000,
    label: '14:30 Elevated Drainage Plateau',
    precip: 22.4,
    speed: 9.1,
    calls: 29,
    transitSpeed: 6.5,
    eventState: 'ELEVATED',
    concordance: 84.0,
    description: 'Rain intensity eases; municipal pumps activate; slow hydrodynamic recovery begins.'
  }
];
