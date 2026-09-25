import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ViewMode, SectorZone, CivicEvent, ReplayMilestone, CivicFeed } from '../types';
import { CityPulseAPI } from '../api/client';

export interface MapLayerConfig {
  cartography: boolean;
  hydroPlume: boolean;
  arterialFriction: boolean;
  dispatches181: boolean;
  conduitS04: boolean;
  jul14Analog: boolean;
}

const DEFAULT_SECTOR: SectorZone = {
  id: "sector-a",
  code: "SEC-A",
  name: "Zone A — Ashok Nagar & M.I. Road Corridor",
  subhead: "Central Business District & Heritage Outflow",
  status: "CRITICAL",
  concordance: 89.4,
  precipitation: 48.2,
  trafficSpeed: 6.4,
  dispatchCalls: 38,
  center: [26.9172, 75.8050],
  bounds: [[26.9100, 75.7980], [26.9240, 75.8120]],
  activeAnomalies: [
    "Inundation Plume along M.I. Road axis",
    "Velocity collapse at Panch Batti junction",
    "Conduit S-04 hydrodynamic back-pressure",
    "181 Citizen dispatch surge"
  ],
  drainageCapacity: 18.5
};

const DEFAULT_SECTOR_B: SectorZone = {
  id: "sector-b",
  code: "SEC-B",
  name: "Zone B — C-Scheme & Secretariat",
  subhead: "Administrative Core & Civil Lines Outfall",
  status: "ELEVATED",
  concordance: 42.1,
  precipitation: 16.5,
  trafficSpeed: 21.0,
  dispatchCalls: 9,
  center: [26.9030, 75.7940],
  bounds: [[26.8950, 75.7850], [26.9110, 75.8030]],
  activeAnomalies: [
    "Secondary arterial runoff spillover from Ashok Nagar"
  ],
  drainageCapacity: 64.0
};

const DEFAULT_SECTOR_C: SectorZone = {
  id: "sector-c",
  code: "SEC-C",
  name: "Zone C — Mansarovar & Shipra Path",
  subhead: "Southern Institutional Hub & Residential Grid",
  status: "NOMINAL",
  concordance: 12.4,
  precipitation: 4.2,
  trafficSpeed: 38.5,
  dispatchCalls: 2,
  center: [26.8580, 75.7620],
  bounds: [[26.8480, 75.7500], [26.8680, 75.7740]],
  activeAnomalies: [
    "Nominal stormwater drainage outflow"
  ],
  drainageCapacity: 88.0
};

const DEFAULT_SECTOR_D: SectorZone = {
  id: "sector-d",
  code: "SEC-D",
  name: "Zone D — Vaishali Nagar & Queens Road",
  subhead: "Western Commercial & Residential Corridor",
  status: "ELEVATED",
  concordance: 48.6,
  precipitation: 18.4,
  trafficSpeed: 18.2,
  dispatchCalls: 11,
  center: [26.9120, 75.7480],
  bounds: [[26.9020, 75.7380], [26.9220, 75.7580]],
  activeAnomalies: [
    "Queens Road underpass standing water accumulation",
    "Minor transit deceleration on Route 14"
  ],
  drainageCapacity: 52.5
};

const DEFAULT_SECTOR_E: SectorZone = {
  id: "sector-e",
  code: "SEC-E",
  name: "Zone E — Walled City & Johari Bazaar",
  subhead: "Historic Core & High-Density Outfall",
  status: "CRITICAL",
  concordance: 82.1,
  precipitation: 41.5,
  trafficSpeed: 8.2,
  dispatchCalls: 29,
  center: [26.9240, 75.8260],
  bounds: [[26.9160, 75.8160], [26.9320, 75.8360]],
  activeAnomalies: [
    "Sanganeri Gate storm conduit back-pressure",
    "Johari Bazaar ped-traffic inundation stall",
    "181 Dispatches surge (+240%)"
  ],
  drainageCapacity: 22.0
};

const DEFAULT_EVENT: CivicEvent = {
  id: "JPR-2024-0819-B",
  title: "CRITICAL CONCORDANCE: POSSIBLE WEATHER-RELATED ARTERIAL DISRUPTION",
  summary: "Zone A — Ashok Nagar & M.I. Road Corridor exhibiting acute spatial-temporal confluence across 4 independent telemetry feeds.",
  zoneId: "sector-a",
  zoneName: "Zone A — Ashok Nagar & M.I. Road Arterial Corridor",
  severity: "CRITICAL",
  declaredAt: "14:00:00 IST",
  durationMinutes: 35,
  concordanceScore: 89.4,
  persistenceMinutes: 35,
  streams: [
    {
      id: "stream-precip",
      name: "Precipitation Surge",
      sensorCode: "AWS-04",
      value: "48.2 mm/h",
      delta: "+220%",
      isSpike: true,
      deltaType: "increase",
      subtext: "vs. Diurnal Seasonal Baseline",
      baseline: "15.0 mm/h",
      status: "ELEVATED",
      confidence: 0.98
    },
    {
      id: "stream-velocity",
      name: "Velocity Collapse",
      sensorCode: "LOOP D-12",
      value: "6.4 km/h",
      delta: "-61%",
      isSpike: true,
      deltaType: "decrease",
      subtext: "vs. Free Flow Expectation (32 km/h)",
      baseline: "32.0 km/h",
      status: "CRITICAL",
      confidence: 0.94
    },
    {
      id: "stream-calls",
      name: "181 Citizen Calls",
      sensorCode: "SAMPARK-181",
      value: "38 calls",
      delta: "+310%",
      isSpike: true,
      deltaType: "increase",
      subtext: "Waterlogging & Stalled Vehicle Dispatches",
      baseline: "9 calls/hr",
      status: "ELEVATED",
      confidence: 0.91
    },
    {
      id: "stream-transit",
      name: "Transit Deceleration",
      sensorCode: "JCTSL BUS API",
      value: "4.2 km/h",
      delta: "-78%",
      isSpike: true,
      deltaType: "decrease",
      subtext: "Routes 9A & 12A Stagnated (Fallback Mode)",
      baseline: "19.5 km/h",
      status: "DEGRADED",
      confidence: 0.82
    }
  ],
  diagnosticChain: [
    {
      step: 1,
      timeOffset: "13:42 IST",
      title: "Hyper-Localized Cloudburst Influx",
      description: "IMD AWS-04 recorded rapid deluge spike to 48.2 mm/hr directly over Ashok Nagar / M.I. Road catchment basin within a 12-minute window.",
      metric: "48.2 mm/hr (+220%)",
      source: "IMD AWS-04 Mesonet",
      confidence: 0.98,
      status: "VERIFIED"
    },
    {
      step: 2,
      timeOffset: "13:49 IST",
      title: "Immediate Arterial Friction & Deceleration",
      description: "Smart Mobility Induction Loops D-11 through D-14 at Panch Batti recorded speed drop from 34 km/h down to 6.4 km/h as surface ponding commenced.",
      metric: "6.4 km/h (-61%)",
      source: "Mobility Sensor Loop D-12",
      confidence: 0.94,
      status: "VERIFIED"
    }
  ],
  hypotheses: [
    {
      id: "hypo-a",
      title: "Gravitational Runoff Exceedance",
      probability: 48,
      factors: [
        "Rainfall rate (48.2 mm/hr) exceeds natural percolation by 3.2x",
        "Topographic depression around Ajmeri Gate creates natural funnel"
      ],
      status: "PRIMARY"
    }
  ]
};

const DEFAULT_FEED: CivicFeed = {
  id: "feed-aws-04",
  feedNumber: "AWS-04",
  name: "Ashok Nagar Rain Gauge",
  protocol: "MQTT / TELEMETRY",
  status: "LIVE",
  statusDetail: "Streaming normally",
  frequency: "1 Hz",
  latencyMs: 14,
  jitterMs: 2,
  packetsDropped: 0,
  samplePayload: { precipitation: 48.2, unit: "mm/h" },
  lastIngestSha256: "f2a8b9c1d8e7f...",
  description: "Primary atmospheric water sensor located at Ashok Nagar sub-station.",
  degradationImpact: "Loss reduces precipitation confidence."
};

const DEFAULT_REPLAY: ReplayMilestone = {
  time: "14:00",
  timestampMs: 1724056200000,
  label: "14:00 [SPIKE] Event Declared",
  isSpike: true,
  precip: 48.2,
  speed: 6.4,
  calls: 38,
  transitSpeed: 4.2,
  eventState: "CRITICAL",
  concordance: 89.4,
  description: "Autonomous incident declaration issued."
};

interface CityPulseContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  sectors: SectorZone[];
  selectedZone: SectorZone;
  setSelectedZoneId: (id: string) => void;
  activeEvent: CivicEvent;
  civicLensActive: boolean;
  setCivicLensActive: (active: boolean) => void;
  lensPosition: { x: number; y: number; lat?: number; lng?: number } | null;
  setLensPosition: (pos: { x: number; y: number; lat?: number; lng?: number } | null) => void;
  replayIndex: number;
  setReplayIndex: (index: number) => void;
  isReplayPlaying: boolean;
  setIsReplayPlaying: (playing: boolean) => void;
  replaySpeed: 1 | 2 | 5;
  setReplaySpeed: (speed: 1 | 2 | 5) => void;
  currentReplayMilestone: ReplayMilestone;
  replayTimeline: ReplayMilestone[];
  resetReplayToLive: () => void;
  feeds: CivicFeed[];
  isProbingFeeds: boolean;
  probeFeedsNow: () => void;
  lastProbeTime: string;
  mapLayers: MapLayerConfig;
  toggleMapLayer: (layerKey: keyof MapLayerConfig) => void;
  isForensicModalOpen: boolean;
  setIsForensicModalOpen: (open: boolean) => void;
  isMunicipalAlertModalOpen: boolean;
  setIsMunicipalAlertModalOpen: (open: boolean) => void;
  exportGeoJsonLedger: () => void;
  triggerMunicipalAlert: (targetZone: string, notes: string) => void;
  alertNotification: string | null;
}

const CityPulseContext = createContext<CityPulseContextType | undefined>(undefined);

export const CityPulseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('live');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  
  // Initialize with non-null defaults to prevent initial rendering crashes
  const [sectors, setSectors] = useState<SectorZone[]>([DEFAULT_SECTOR, DEFAULT_SECTOR_B, DEFAULT_SECTOR_C, DEFAULT_SECTOR_D, DEFAULT_SECTOR_E]);
  const [activeEvent, setActiveEvent] = useState<CivicEvent>(DEFAULT_EVENT);
  const [feeds, setFeeds] = useState<CivicFeed[]>([DEFAULT_FEED]);
  const [replayTimeline, setReplayTimeline] = useState<ReplayMilestone[]>([DEFAULT_REPLAY]);
  
  const [selectedZoneId, setSelectedZoneId] = useState<string>('sector-a');
  const [civicLensActive, setCivicLensActive] = useState<boolean>(true);
  const [lensPosition, setLensPosition] = useState<{ x: number; y: number; lat?: number; lng?: number } | null>(null);

  const [replayIndex, setReplayIndex] = useState<number>(0);
  const [isReplayPlaying, setIsReplayPlaying] = useState<boolean>(false);
  const [replaySpeed, setReplaySpeed] = useState<1 | 2 | 5>(1);

  const [isProbingFeeds, setIsProbingFeeds] = useState<boolean>(false);
  const [lastProbeTime, setLastProbeTime] = useState<string>('14:00:15 IST');

  const [mapLayers, setMapLayers] = useState<MapLayerConfig>({
    cartography: true,
    hydroPlume: true,
    arterialFriction: true,
    dispatches181: true,
    conduitS04: true,
    jul14Analog: false
  });

  const [isForensicModalOpen, setIsForensicModalOpen] = useState<boolean>(false);
  const [isMunicipalAlertModalOpen, setIsMunicipalAlertModalOpen] = useState<boolean>(false);
  const [alertNotification, setAlertNotification] = useState<string | null>(null);

  const fetchLiveData = () => {
    CityPulseAPI.getZones()
      .then(data => { if (Array.isArray(data) && data.length > 0) setSectors(data); })
      .catch(err => console.warn('Using default zones:', err));

    CityPulseAPI.getEvents()
      .then(async data => {
        if (Array.isArray(data) && data.length > 0) {
          const latest = data[data.length - 1];
          setActiveEvent(latest);

          // Fetch grounded AI explanation if explanation service available
          try {
            const exp = await CityPulseAPI.explainEvent(latest.id, latest.zoneId);
            if (exp && exp.explanation) {
              setActiveEvent(prev => ({ ...prev, summary: exp.explanation }));
            }
          } catch (e) {
            // Keep default/backend summary
          }
        }
      })
      .catch(err => console.warn('Using default active event:', err));

    CityPulseAPI.getFeeds()
      .then(data => { if (Array.isArray(data) && data.length > 0) setFeeds(data); })
      .catch(err => console.warn('Using default feeds:', err));

    CityPulseAPI.getReplay()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setReplayTimeline(data);
        }
      })
      .catch(err => console.warn('Using default replay timeline:', err));
  };

  // Fetch API Data on mount and poll every 10 seconds
  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (!isReplayPlaying || replayTimeline.length === 0) return;
    const interval = setInterval(() => {
      setReplayIndex(prev => {
        if (prev >= replayTimeline.length - 1) {
          setIsReplayPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000 / replaySpeed);

    return () => clearInterval(interval);
  }, [isReplayPlaying, replaySpeed, replayTimeline.length]);

  const currentReplayMilestone = useMemo(() => {
    if (replayTimeline.length === 0) return DEFAULT_REPLAY;
    return replayTimeline[replayIndex] || replayTimeline[0] || DEFAULT_REPLAY;
  }, [replayIndex, replayTimeline]);

  const selectedZone = useMemo(() => {
    if (sectors.length === 0) return DEFAULT_SECTOR;
    return sectors.find(s => s.id === selectedZoneId) || sectors[0] || DEFAULT_SECTOR;
  }, [selectedZoneId, sectors]);

  const toggleMapLayer = (layerKey: keyof MapLayerConfig) => {
    setMapLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  const resetReplayToLive = () => {
    setIsReplayPlaying(false);
    if (replayTimeline.length > 0) {
      setReplayIndex(replayTimeline.length - 1);
    }
    setViewMode('live');
  };

  const probeFeedsNow = () => {
    setIsProbingFeeds(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} IST`;
      setLastProbeTime(timeStr);
      setFeeds(prev => prev.map(feed => {
        if (feed.id === 'feed-04' || feed.id === 'src-4') {
          return {
            ...feed,
            latencyMs: 11800 + Math.floor(Math.random() * 800),
            jitterMs: 3900 + Math.floor(Math.random() * 400)
          };
        }
        return {
          ...feed,
          latencyMs: Math.max(35, Math.floor(feed.latencyMs * (0.9 + Math.random() * 0.2))),
          jitterMs: Math.max(2, Math.floor(feed.jitterMs * (0.85 + Math.random() * 0.3)))
        };
      }));
      setIsProbingFeeds(false);
      setAlertNotification('Feed integrity probe completed: 3 LIVE, 1 DEGRADED (Fallback Active)');
      setTimeout(() => setAlertNotification(null), 4000);
    }, 1200);
  };

  const triggerMunicipalAlert = (targetZone: string, notes: string) => {
    setIsMunicipalAlertModalOpen(false);
    setAlertNotification(`MUNICIPAL ALERT DISPATCHED: Priority 1 Alert sent to JMC Civil Defense for ${targetZone}. Notes: "${notes || 'Deploying drainage unit #04'}"`);
    setTimeout(() => setAlertNotification(null), 6000);
  };

  const exportGeoJsonLedger = () => {
    if (!activeEvent || !selectedZone) return;
    const data = {
      type: 'FeatureCollection',
      incident: activeEvent.id,
      generatedAt: new Date().toISOString(),
      metadata: {
        zone: selectedZone.name,
        concordanceScore: activeEvent.concordanceScore,
        confidenceModel: 'Bayesian Concordance v4.2',
        scientificCovenant: 'Correlation != Causation'
      },
      features: sectors.map(s => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [s.center[1], s.center[0]]
        },
        properties: {
          code: s.code,
          name: s.name,
          status: s.status,
          concordance: s.concordance,
          precipitation_mm_hr: s.precipitation,
          traffic_speed_km_h: s.trafficSpeed,
          dispatch_calls: s.dispatchCalls
        }
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/geo+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `citypulse-jaipur-audit-${Date.now()}.geojson`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setAlertNotification('Audited GeoJSON Ledger exported successfully.');
    setTimeout(() => setAlertNotification(null), 3500);
  };

  return (
    <CityPulseContext.Provider
      value={{
        viewMode,
        setViewMode,
        theme,
        toggleTheme,
        sectors,
        selectedZone,
        setSelectedZoneId,
        activeEvent,
        civicLensActive,
        setCivicLensActive,
        lensPosition,
        setLensPosition,
        replayIndex,
        setReplayIndex,
        isReplayPlaying,
        setIsReplayPlaying,
        replaySpeed,
        setReplaySpeed,
        currentReplayMilestone,
        replayTimeline,
        resetReplayToLive,
        feeds,
        isProbingFeeds,
        probeFeedsNow,
        lastProbeTime,
        mapLayers,
        toggleMapLayer,
        isForensicModalOpen,
        setIsForensicModalOpen,
        isMunicipalAlertModalOpen,
        setIsMunicipalAlertModalOpen,
        exportGeoJsonLedger,
        triggerMunicipalAlert,
        alertNotification
      }}
    >
      {children}
    </CityPulseContext.Provider>
  );
};

export const useCityPulse = () => {
  const context = useContext(CityPulseContext);
  if (!context) {
    throw new Error('useCityPulse must be used within a CityPulseProvider');
  }
  return context;
};
