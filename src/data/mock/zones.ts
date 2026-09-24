import { SectorZone } from '../../types';

export const JAIPUR_SECTORS: SectorZone[] = [
  {
    id: 'sector-a',
    code: 'SEC-A',
    name: 'Zone A · Ashok Nagar & M.I. Road Arterial Corridor',
    subhead: 'Central Business District & Heritage Outflow',
    status: 'CRITICAL',
    concordance: 89.4,
    precipitation: 48.2,
    trafficSpeed: 6.4,
    dispatchCalls: 38,
    center: [26.9142, 75.8080],
    bounds: [
      [26.9100, 75.8020],
      [26.9200, 75.8150]
    ],
    activeAnomalies: [
      'Inundation Plume along M.I. Road axis',
      'Velocity collapse at Panch Batti junction',
      'Conduit S-04 hydrodynamic back-pressure',
      '181 Citizen dispatch surge'
    ],
    drainageCapacity: 18.5
  },
  {
    id: 'sector-b',
    code: 'SEC-B',
    name: 'Zone B · C-Scheme & Secretariat',
    subhead: 'Administrative Core & Civil Lines',
    status: 'ELEVATED',
    concordance: 42.1,
    precipitation: 16.5,
    trafficSpeed: 21.0,
    dispatchCalls: 9,
    center: [26.9060, 75.8010],
    bounds: [
      [26.9010, 75.7950],
      [26.9110, 75.8070]
    ],
    activeAnomalies: [
      'Secondary arterial runoff spillover from Ashok Nagar'
    ],
    drainageCapacity: 64.0
  },
  {
    id: 'sector-c',
    code: 'SEC-C',
    name: 'Zone C · Mansarovar & Metro Spine',
    subhead: 'South-West Residential & Commuter Belt',
    status: 'NOMINAL',
    concordance: 12.0,
    precipitation: 2.1,
    trafficSpeed: 38.4,
    dispatchCalls: 2,
    center: [26.8650, 75.7650],
    bounds: [
      [26.8550, 75.7550],
      [26.8750, 75.7750]
    ],
    activeAnomalies: [],
    drainageCapacity: 92.0
  },
  {
    id: 'sector-d',
    code: 'SEC-D',
    name: 'Zone D · Sanganer Confluence & Airport North',
    subhead: 'Industrial Drainage Outfall & Sanganeri Gate',
    status: 'NOMINAL',
    concordance: 14.5,
    precipitation: 4.8,
    trafficSpeed: 42.1,
    dispatchCalls: 3,
    center: [26.8200, 75.7800],
    bounds: [
      [26.8100, 75.7700],
      [26.8300, 75.7900]
    ],
    activeAnomalies: [],
    drainageCapacity: 88.0
  },
  {
    id: 'sector-e',
    code: 'SEC-E',
    name: 'Zone E · Malviya Nagar & JLN Marg',
    subhead: 'Institutional & Tech Spine',
    status: 'NOMINAL',
    concordance: 8.7,
    precipitation: 1.4,
    trafficSpeed: 45.0,
    dispatchCalls: 1,
    center: [26.8550, 75.8150],
    bounds: [
      [26.8450, 75.8050],
      [26.8650, 75.8250]
    ],
    activeAnomalies: [],
    drainageCapacity: 95.0
  }
];
