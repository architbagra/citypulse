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

interface CityPulseContextType {
  // Global
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  // Core Data
  sectors: SectorZone[];
  selectedZone: SectorZone | null;
  setSelectedZoneId: (id: string) => void;
  activeEvent: CivicEvent | null;
  // Map State
  civicLensActive: boolean;
  setCivicLensActive: (active: boolean) => void;
  lensPosition: { x: number; y: number; lat?: number; lng?: number } | null;
  setLensPosition: (pos: { x: number; y: number; lat?: number; lng?: number } | null) => void;
  // Replay
  replayIndex: number;
  setReplayIndex: (index: number) => void;
  isReplayPlaying: boolean;
  setIsReplayPlaying: (playing: boolean) => void;
  replaySpeed: 1 | 2 | 5;
  setReplaySpeed: (speed: 1 | 2 | 5) => void;
  currentReplayMilestone: ReplayMilestone | null;
  replayTimeline: ReplayMilestone[];
  resetReplayToLive: () => void;
  // Feeds
  feeds: CivicFeed[];
  isProbingFeeds: boolean;
  probeFeedsNow: () => void;
  lastProbeTime: string;
  // Map Layers
  mapLayers: MapLayerConfig;
  toggleMapLayer: (layerKey: keyof MapLayerConfig) => void;
  // Modals & Panels
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
  
  // Data State
  const [sectors, setSectors] = useState<SectorZone[]>([]);
  const [activeEvent, setActiveEvent] = useState<CivicEvent | null>(null);
  const [feeds, setFeeds] = useState<CivicFeed[]>([]);
  const [replayTimeline, setReplayTimeline] = useState<ReplayMilestone[]>([]);
  
  const [selectedZoneId, setSelectedZoneId] = useState<string>('sector-a');
  const [civicLensActive, setCivicLensActive] = useState<boolean>(true);
  const [lensPosition, setLensPosition] = useState<{ x: number; y: number; lat?: number; lng?: number } | null>(null);

  // Replay state
  const [replayIndex, setReplayIndex] = useState<number>(0);
  const [isReplayPlaying, setIsReplayPlaying] = useState<boolean>(false);
  const [replaySpeed, setReplaySpeed] = useState<1 | 2 | 5>(1);

  // Feeds & Probing
  const [isProbingFeeds, setIsProbingFeeds] = useState<boolean>(false);
  const [lastProbeTime, setLastProbeTime] = useState<string>('14:00:15 IST');

  // Map layers
  const [mapLayers, setMapLayers] = useState<MapLayerConfig>({
    cartography: true,
    hydroPlume: true,
    arterialFriction: true,
    dispatches181: true,
    conduitS04: true,
    jul14Analog: false
  });

  // Modals
  const [isForensicModalOpen, setIsForensicModalOpen] = useState<boolean>(false);
  const [isMunicipalAlertModalOpen, setIsMunicipalAlertModalOpen] = useState<boolean>(false);
  const [alertNotification, setAlertNotification] = useState<string | null>(null);

  // Fetch API Data on mount
  useEffect(() => {
    CityPulseAPI.getZones().then(data => setSectors(data)).catch(console.error);
    CityPulseAPI.getEvents().then(data => setActiveEvent(data[0] || null)).catch(console.error);
    CityPulseAPI.getFeeds().then(data => setFeeds(data)).catch(console.error);
    CityPulseAPI.getReplay().then(data => {
      setReplayTimeline(data);
      if (data.length > 0) setReplayIndex(data.length - 3 >= 0 ? data.length - 3 : 0);
    }).catch(console.error);
  }, []);

  // Toggle theme class on document element
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

  // Replay playback loop
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
    if (replayTimeline.length === 0) return null;
    return replayTimeline[replayIndex] || replayTimeline[0];
  }, [replayIndex, replayTimeline]);

  const selectedZone = useMemo(() => {
    if (sectors.length === 0) return null;
    return sectors.find(s => s.id === selectedZoneId) || sectors[0];
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
        if (feed.id === 'feed-04') {
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
