import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useCityPulse } from '../context/CityPulseContext';
import { Layers, Crosshair, MapPin } from 'lucide-react';

interface CivicMapProps {
  compact?: boolean;
  interactiveLens?: boolean;
  showLayersBar?: boolean;
  heightClass?: string;
  onZoneSelect?: (zoneId: string) => void;
}

export const CivicMap: React.FC<CivicMapProps> = ({
  compact = false,
  interactiveLens = true,
  showLayersBar = false,
  heightClass = 'h-[480px]',
  onZoneSelect
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);

  const {
    theme,
    sectors,
    selectedZone,
    setSelectedZoneId,
    civicLensActive,
    mapLayers,
    toggleMapLayer,
    currentReplayMilestone,
    viewMode
  } = useCityPulse();

  const [mousePos, setMousePos] = useState<{ x: number; y: number; lat: number; lng: number } | null>(null);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Ashok Nagar / M.I. Road, Jaipur
    const map = L.map(mapContainerRef.current, {
      center: [26.9142, 75.8080],
      zoom: compact ? 13 : 14,
      zoomControl: !compact,
      attributionControl: false
    });

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 18,
      className: 'dark-leaflet-tiles',
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    layerGroupRef.current = layerGroup;

    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      const point = map.latLngToContainerPoint(e.latlng);
      setMousePos({
        x: point.x,
        y: point.y,
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });

      // Find nearest sector
      let closest = sectors[0];
      let minDistance = 9999;
      sectors.forEach(sec => {
        const d = Math.hypot(sec.center[0] - e.latlng.lat, sec.center[1] - e.latlng.lng);
        if (d < minDistance) {
          minDistance = d;
          closest = sec;
        }
      });
      if (minDistance < 0.035) {
        setHoveredSector(closest.name);
      } else {
        setHoveredSector(null);
      }
    });

    map.on('mouseout', () => {
      setMousePos(null);
      setHoveredSector(null);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update tile theme when theme changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      }
    });
  }, [theme]);

  // Redraw overlays per design.md mineral palette
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;
    const group = layerGroupRef.current;
    group.clearLayers();

    // 1. Hydro Plume Overlay (Analytical periwinkle wash & mineral slate boundary)
    if (mapLayers.hydroPlume) {
      const plumeIntensity = viewMode === 'replay' ? currentReplayMilestone.precip / 50 : 0.85;
      const plumeCircle = L.circle([26.9142, 75.8080], {
        radius: 650,
        color: '#7879f1',
        weight: 1.5,
        opacity: 0.75,
        fillColor: '#7879f1',
        fillOpacity: 0.18 * plumeIntensity,
        dashArray: '3, 4'
      });
      plumeCircle.bindTooltip('Hydro Plume · Surcharged Catchment Basin', { className: 'font-sans text-xs' });
      group.addLayer(plumeCircle);

      // Core deep ponding
      const corePond = L.circle([26.9148, 75.8085], {
        radius: 280,
        color: '#3a4856',
        weight: 1.5,
        fillColor: '#3a4856',
        fillOpacity: 0.28 * plumeIntensity
      });
      group.addLayer(corePond);
    }

    // 2. Arterial Friction Overlay (M.I. Road corridor: muted terracotta rose #c25e5e)
    if (mapLayers.arterialFriction) {
      const miRoadCoords: [number, number][] = [
        [26.9110, 75.8005],
        [26.9135, 75.8055],
        [26.9150, 75.8090],
        [26.9175, 75.8140],
        [26.9190, 75.8175]
      ];

      const frictionPolyline = L.polyline(miRoadCoords, {
        color: '#c25e5e',
        weight: 5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: viewMode === 'replay' && currentReplayMilestone.speed < 10 ? '4, 4' : undefined
      });
      frictionPolyline.bindTooltip('Arterial Friction Corridor · M.I. Road (6.4 km/h)', { className: 'font-sans text-xs' });
      group.addLayer(frictionPolyline);

      // Sansar Chandra Road Secondary Stagnation
      const sansarCoords: [number, number][] = [
        [26.9150, 75.8090],
        [26.9210, 75.8070],
        [26.9250, 75.8050]
      ];
      const sansarLine = L.polyline(sansarCoords, {
        color: '#bfa15f',
        weight: 3.5,
        opacity: 0.85
      });
      group.addLayer(sansarLine);
    }

    // 3. Conduit S-04 Hydraulic Chokepoint
    if (mapLayers.conduitS04) {
      const conduitIcon = L.divIcon({
        className: 'custom-conduit-icon',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute w-7 h-7 rounded-full bg-[#7879f1]/25 animate-ping"></span>
            <div class="w-5 h-5 rounded-[0.25rem] bg-[#182923] border border-[#7879f1] flex items-center justify-center shadow-print">
              <div class="w-1.5 h-1.5 rounded-full bg-[#7879f1]"></div>
            </div>
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#ffffff] text-[#182923] border border-[#3a4856]/20 text-[9px] font-mono whitespace-nowrap shadow-print rounded-[0.125rem]">
              CONDUIT S-04 (94%)
            </div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const conduitMarker = L.marker([26.9138, 75.8072], { icon: conduitIcon });
      conduitMarker.bindPopup(`
        <div class="p-2 font-sans text-xs text-[#181d19]">
          <div class="font-bold text-[#182923] font-serif text-sm mb-1">Conduit S-04 · Sub-surface SCADA Node</div>
          <div>Hydrostatic Head: <span class="font-mono font-semibold text-[#c25e5e]">94.2% (Surcharged)</span></div>
          <div>Gravity Outfall: Sanganeri Canal</div>
          <div>Debris Siltation Index: <span class="text-[#bfa15f] font-semibold">Elevated</span></div>
        </div>
      `);
      group.addLayer(conduitMarker);
    }

    // 4. 181 Citizen Inundation Dispatches (Pill badges per design.md)
    if (mapLayers.dispatches181) {
      const dispatchPoints = [
        { lat: 26.9149, lng: 75.8082, calls: 14 },
        { lat: 26.9125, lng: 75.8048, calls: 9 },
        { lat: 26.9168, lng: 75.8115, calls: 11 },
        { lat: 26.9185, lng: 75.8152, calls: 4 }
      ];

      dispatchPoints.forEach(pt => {
        const pinIcon = L.divIcon({
          className: 'dispatch-pin',
          html: `
            <div class="flex items-center justify-center">
              <div class="h-5 px-2 rounded-full bg-[#ffdad6] text-[#8a2d2d] text-[10px] font-sans font-bold shadow-print border border-[#c25e5e]/30 flex items-center">
                181: ${pt.calls}
              </div>
            </div>
          `,
          iconSize: [44, 20],
          iconAnchor: [22, 10]
        });

        const pinMarker = L.marker([pt.lat, pt.lng], { icon: pinIcon });
        group.addLayer(pinMarker);
      });
    }

    // 5. July 14 Analog Ghost Contour
    if (mapLayers.jul14Analog) {
      const analogPolygon = L.polygon([
        [26.9115, 75.8020],
        [26.9160, 75.8050],
        [26.9180, 75.8130],
        [26.9150, 75.8150],
        [26.9105, 75.8080]
      ], {
        color: '#52606f',
        weight: 1.5,
        fillColor: '#52606f',
        fillOpacity: 0.12,
        dashArray: '4, 4'
      });
      analogPolygon.bindTooltip('Jul 14 2024 Analog Footprint (94.2% match)', { className: 'font-sans text-xs' });
      group.addLayer(analogPolygon);
    }

    // 6. Sector Beacons (Drafting cards with 1px border and print shadows)
    sectors.forEach(sec => {
      const isSelected = sec.id === selectedZone.id;
      const isCrit = sec.status === 'CRITICAL';
      const isElev = sec.status === 'ELEVATED';

      const dotColor = isCrit ? 'bg-[#c25e5e]' : isElev ? 'bg-[#bfa15f]' : 'bg-[#50625b]';
      const badgeBg = isSelected
        ? 'bg-[#182923] text-white border-[#182923] shadow-print-lg'
        : 'bg-[#ffffff] text-[#181d19] border-[#c2c8c4]/80 hover:border-[#182923] shadow-print';

      const secIcon = L.divIcon({
        className: 'sec-marker',
        html: `
          <div class="relative cursor-pointer group">
            ${isCrit ? '<div class="absolute -inset-1 rounded-[0.25rem] bg-[#c25e5e]/25 animate-ping"></div>' : ''}
            <div class="flex items-center space-x-1.5 px-2.5 py-1 rounded-[0.25rem] border ${badgeBg} transition-all">
              <span class="w-2 h-2 rounded-full ${dotColor}"></span>
              <span class="font-sans text-[11px] font-bold tracking-wider uppercase">${sec.code}</span>
              ${sec.concordance > 30 ? `<span class="font-mono text-[10px] opacity-70">(${sec.concordance}%)</span>` : ''}
            </div>
          </div>
        `,
        iconSize: [85, 26],
        iconAnchor: [42, 13]
      });

      const m = L.marker(sec.center, { icon: secIcon });
      m.on('click', () => {
        setSelectedZoneId(sec.id);
        if (onZoneSelect) onZoneSelect(sec.id);
      });
      group.addLayer(m);
    });

  }, [sectors, selectedZone, mapLayers, theme, viewMode, currentReplayMilestone]);

  return (
    <div className={`relative w-full ${heightClass} bg-[#eaefe8] overflow-hidden border border-[#c2c8c4]/60 rounded-[0.25rem] shadow-print select-none group`}>
      {/* Map Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Telemetry Ticker (Drafting card with registration marks) */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center space-x-2.5 bg-[#ffffff] border border-[#c2c8c4]/80 px-3 py-1.5 rounded-[0.25rem] pointer-events-auto shadow-print">
          <span className="w-2 h-2 rounded-full bg-[#c25e5e] animate-pulse"></span>
          <span className="font-sans text-xs font-semibold text-[#182923] uppercase tracking-[0.06em]">
            JAIPUR ARTERIAL GRID
          </span>
          <span className="text-[#c2c8c4] font-mono">/</span>
          <span className="font-sans text-xs text-[#8a2d2d] font-bold">
            ZONE A CRITICAL (89.4%)
          </span>
          <span className="text-[#c2c8c4] font-mono">/</span>
          <span className="font-mono text-[11px] text-[#52606f]">
            26.9142° N, 75.8080° E
          </span>
        </div>

        {/* Sectors Quick Bar (Pill buttons per design.md) */}
        <div className="hidden md:flex items-center space-x-1.5 bg-[#ffffff] border border-[#c2c8c4]/80 p-1 rounded-full pointer-events-auto shadow-print">
          {sectors.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedZoneId(s.id);
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.panTo(s.center);
                }
              }}
              className={`h-6 px-2.5 rounded-full font-sans text-[10px] tracking-[0.06em] uppercase transition-all flex items-center space-x-1 ${
                s.id === selectedZone.id
                  ? 'bg-[#182923] text-white font-bold'
                  : 'text-[#52606f] hover:text-[#182923] hover:bg-[#f0f5ee]'
              }`}
            >
              <span>{s.code}:</span>
              <span className="font-mono">{s.status === 'CRITICAL' ? '89%' : s.status === 'ELEVATED' ? '42%' : 'NOM'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Layer selector pills if enabled (Floating paper substrate) */}
      {showLayersBar && (
        <div className="absolute bottom-4 left-3 right-3 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 bg-[#ffffff] border border-[#c2c8c4]/80 p-1.5 rounded-full pointer-events-auto shadow-print-lg">
            <div className="flex items-center space-x-1 px-2.5 text-[10px] font-sans font-semibold text-[#52606f] uppercase tracking-[0.08em] border-r border-[#c2c8c4]/60 pr-2 mr-0.5">
              <Layers className="w-3 h-3 text-[#182923]" />
              <span>LAYERS:</span>
            </div>

            <button
              onClick={() => toggleMapLayer('cartography')}
              className={`h-6 px-2.5 rounded-full font-sans text-[10px] uppercase tracking-[0.06em] transition-colors ${
                mapLayers.cartography
                  ? 'bg-[#182923] text-white font-medium'
                  : 'text-[#52606f] hover:bg-[#f0f5ee]'
              }`}
            >
              CARTOGRAPHY
            </button>

            <button
              onClick={() => toggleMapLayer('hydroPlume')}
              className={`h-6 px-2.5 rounded-full font-sans text-[10px] uppercase tracking-[0.06em] transition-colors ${
                mapLayers.hydroPlume
                  ? 'bg-[#d5e4f6] text-[#3a4856] font-semibold border border-[#7879f1]/30'
                  : 'text-[#52606f] hover:bg-[#f0f5ee]'
              }`}
            >
              HYDRO PLUME
            </button>

            <button
              onClick={() => toggleMapLayer('arterialFriction')}
              className={`h-6 px-2.5 rounded-full font-sans text-[10px] uppercase tracking-[0.06em] transition-colors ${
                mapLayers.arterialFriction
                  ? 'bg-[#ffdad6] text-[#8a2d2d] font-semibold border border-[#c25e5e]/30'
                  : 'text-[#52606f] hover:bg-[#f0f5ee]'
              }`}
            >
              ARTERIAL FRICTION
            </button>

            <button
              onClick={() => toggleMapLayer('dispatches181')}
              className={`h-6 px-2.5 rounded-full font-sans text-[10px] uppercase tracking-[0.06em] transition-colors ${
                mapLayers.dispatches181
                  ? 'bg-[#eaefe8] text-[#182923] font-semibold border border-[#182923]/20'
                  : 'text-[#52606f] hover:bg-[#f0f5ee]'
              }`}
            >
              181 DISPATCHES
            </button>

            <button
              onClick={() => toggleMapLayer('conduitS04')}
              className={`h-6 px-2.5 rounded-full font-sans text-[10px] uppercase tracking-[0.06em] transition-colors ${
                mapLayers.conduitS04
                  ? 'bg-[#e1dfff] text-[#05004c] font-semibold border border-[#7879f1]/30'
                  : 'text-[#52606f] hover:bg-[#f0f5ee]'
              }`}
            >
              CONDUIT S-04
            </button>

            <button
              onClick={() => toggleMapLayer('jul14Analog')}
              className={`h-6 px-2.5 rounded-full font-sans text-[10px] uppercase tracking-[0.06em] transition-colors ${
                mapLayers.jul14Analog
                  ? 'bg-[#f0f5ee] text-[#182923] font-semibold border border-[#3a4856]/30'
                  : 'text-[#52606f] hover:bg-[#f0f5ee]'
              }`}
            >
              JUL 14 '24 ANALOG
            </button>
          </div>
        </div>
      )}

      {/* Civic Lens (Tactile Inspector Overlay per design.md) */}
      {civicLensActive && interactiveLens && mousePos && (
        <div
          className="pointer-events-none absolute z-20 transition-transform duration-75"
          style={{
            transform: `translate(${mousePos.x - 85}px, ${mousePos.y - 85}px)`
          }}
        >
          {/* Tactile Lens Circular Mask with hairline registration ticks */}
          <div className="relative w-[170px] h-[170px] rounded-full border border-[#182923]/40 bg-[#ffffff]/10 backdrop-blur-[2px] shadow-print-lg flex items-center justify-center">
            {/* Fine coordinate axes hairline */}
            <div className="absolute w-full h-[1px] bg-[#3a4856]/20"></div>
            <div className="absolute h-full w-[1px] bg-[#3a4856]/20"></div>

            {/* Inner focus reticle ring with periwinkle highlight */}
            <div className="w-10 h-10 rounded-full border border-[#7879f1] border-dashed animate-spin" style={{ animationDuration: '16s' }}></div>

            {/* Floating Inspector Card anchored to coordinates */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#ffffff] border border-[#c2c8c4] text-[#182923] font-sans text-[10px] whitespace-nowrap shadow-print rounded-[0.25rem] flex items-center space-x-1.5">
              <span className="font-bold tracking-wider uppercase text-[#182923]">
                {hoveredSector ? hoveredSector.split('·')[0] : 'CIVIC LENS'}
              </span>
              <span className="text-[#737875]">·</span>
              <span className="font-mono text-[#7879f1] font-semibold">R=250m</span>
            </div>

            {/* Micro Coordinates Benchmark */}
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#182923] text-[#edf2eb] font-mono text-[9px] whitespace-nowrap rounded-[0.125rem] shadow-print">
              {mousePos.lat.toFixed(4)}°N, {mousePos.lng.toFixed(4)}°E
            </div>
          </div>
        </div>
      )}

      {/* Fallback Static Lens Indicator if mouse isn't hovering */}
      {civicLensActive && interactiveLens && !mousePos && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative w-[150px] h-[150px] rounded-full border border-[#182923]/30 bg-[#ffffff]/10 shadow-print flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border border-[#7879f1]/60"></div>
            <div className="absolute -top-7 px-2.5 py-1 bg-[#ffffff] border border-[#c2c8c4] text-[#182923] font-sans text-[10px] tracking-wider uppercase shadow-print rounded-[0.25rem]">
              CIVIC LENS ACTIVE (HOVER TO PROBE)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
