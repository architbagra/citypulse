import React from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { CivicMap } from '../CivicMap';
import {
  FileSearch,
  Download,
  Send,
  AlertTriangle,
  Compass,
  Info
} from 'lucide-react';

export const MapExploreView: React.FC = () => {
  const {
    selectedZone,
    setIsForensicModalOpen,
    setIsMunicipalAlertModalOpen,
    exportGeoJsonLedger,
    civicLensActive,
    setCivicLensActive
  } = useCityPulse();

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Top Banner Context (Archival Benchmarks) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] px-5 py-3.5 shadow-print text-xs font-sans">
        <div className="flex items-center space-x-2.5">
          <Compass className="w-4 h-4 text-[#182923]" />
          <span className="font-semibold text-[#182923] tracking-[0.06em] uppercase">
            GEOSPATIAL CARTOGRAPHY SUITE · JAIPUR SECTORS A–E
          </span>
          <span className="text-[#c2c8c4] font-mono">/</span>
          <span className="font-mono text-[#52606f]">CARTOGRAPHIC SCALE: 1:15,000</span>
        </div>

        <div className="flex items-center space-x-3 text-[#52606f]">
          <button
            onClick={() => setCivicLensActive(!civicLensActive)}
            className={`h-7 px-3 rounded-full text-[11px] font-sans uppercase tracking-[0.06em] border transition-all flex items-center space-x-1.5 ${
              civicLensActive
                ? 'bg-[#182923] text-white border-[#182923] font-semibold shadow-print'
                : 'bg-[#ffffff] border-[#c2c8c4] text-[#52606f] hover:text-[#182923]'
            }`}
          >
            <span>CIVIC LENS APERTURE:</span>
            <strong>{civicLensActive ? 'ACTIVE' : 'STANDBY'}</strong>
          </button>
        </div>
      </div>

      {/* Main Map + Right Side Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Full-Featured Map (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          <div className="relative">
            <CivicMap
              heightClass="h-[620px]"
              interactiveLens={true}
              showLayersBar={true}
            />
          </div>

          <div className="p-3.5 bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] shadow-print flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-[#52606f]">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-[#7879f1]" />
              <span>Select any sector drafting beacon on the map to switch telemetry inspection dossier.</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <span>Active Layer Count: <strong className="text-[#182923]">5</strong></span>
              <span className="text-[#c2c8c4]">·</span>
              <span>Sensor Trust: <strong className="text-[#50625b]">92%</strong></span>
            </div>
          </div>
        </div>

        {/* Right Side Dossier Sheet (4 cols, Pure White Card per design.md) */}
        <div className="lg:col-span-4 bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 shadow-print flex flex-col justify-between space-y-5">
          <div className="space-y-5">
            {/* Dossier Header */}
            <div className="border-b border-[#eaefe8] pb-4">
              <div className="flex items-center justify-between text-xs font-sans mb-1.5">
                <span className="text-[#52606f] font-semibold uppercase tracking-[0.08em]">{selectedZone.code} DOSSIER</span>
                <span className={`h-5 px-2 rounded-full text-[10px] font-bold tracking-[0.06em] uppercase flex items-center ${
                  selectedZone.status === 'CRITICAL' ? 'bg-[#ffdad6] text-[#8a2d2d] border border-[#c25e5e]/30' :
                  selectedZone.status === 'ELEVATED' ? 'bg-[#eaefe8] text-[#bfa15f] border border-[#bfa15f]/30' :
                  'bg-[#eaefe8] text-[#50625b] border border-[#50625b]/30'
                }`}>
                  {selectedZone.status}
                </span>
              </div>
              <h2 className="font-serif text-xl font-medium text-[#182923] leading-snug">
                {selectedZone.name}
              </h2>
              <p className="text-xs text-[#52606f] font-sans mt-1">
                {selectedZone.subhead}
              </p>
            </div>

            {/* 01. What Changed */}
            <div className="space-y-1.5 p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem]">
              <div className="text-[11px] font-sans text-[#182923] uppercase tracking-[0.08em] font-semibold">
                01. What Changed (Primary Influx)
              </div>
              <div className="text-2xl font-serif font-medium text-[#182923]">
                {selectedZone.precipitation} mm/h
              </div>
              <p className="text-xs text-[#424845] font-sans leading-relaxed">
                Hyper-localized cloudburst surge (+220% diurnal anomaly) recorded on AWS-04. Deluge rate exceeds natural soil infiltration by 3.2x.
              </p>
            </div>

            {/* 02. What Else Changed */}
            <div className="space-y-2.5 p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem]">
              <div className="text-[11px] font-sans text-[#182923] uppercase tracking-[0.08em] font-semibold">
                02. What Else Changed (Synchronous Stress)
              </div>
              <div className="space-y-2 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-[#dfe4dd] pb-1.5">
                  <span className="text-[#52606f]">Arterial Speed (Loop D-12):</span>
                  <span className="text-[#8a2d2d] font-mono font-bold">{selectedZone.trafficSpeed} km/h (-61%)</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#dfe4dd] pb-1.5">
                  <span className="text-[#52606f]">181 Citizen Calls:</span>
                  <span className="text-[#182923] font-mono font-bold">{selectedZone.dispatchCalls} calls (+310%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#52606f]">Conduit S-04 Head:</span>
                  <span className="text-[#3a4856] font-mono font-semibold">94% Surcharged</span>
                </div>
              </div>
            </div>

            {/* 03. Correlation Overlap */}
            <div className="space-y-1.5 p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem]">
              <div className="flex justify-between items-center text-[11px] font-sans">
                <span className="text-[#8a2d2d] uppercase tracking-[0.08em] font-semibold">
                  03. Correlation Overlap
                </span>
                <span className="text-[#8a2d2d] font-mono font-bold">{selectedZone.concordance}% Lock</span>
              </div>
              <div className="w-full h-2 bg-[#eaefe8] rounded-full overflow-hidden">
                <div className="h-full bg-[#c25e5e] rounded-full" style={{ width: `${selectedZone.concordance}%` }}></div>
              </div>
              <p className="text-[11px] text-[#52606f] font-sans pt-1">
                Spatial-temporal covariance meets automated civic alarm threshold (&gt; 75% for 15 min).
              </p>
            </div>

            {/* Municipal Dispatch Corroboration */}
            <div className="p-4 bg-[#ffffff] border border-[#c25e5e]/30 rounded-[0.25rem] space-y-1.5 shadow-print">
              <div className="text-[11px] font-sans text-[#8a2d2d] font-bold uppercase tracking-[0.08em] flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#c25e5e]" />
                <span>Municipal Dispatch Corroboration</span>
              </div>
              <p className="text-xs text-[#424845] font-sans leading-relaxed">
                Jaipur Smart Drainage SCADA reports <strong>Mobile Pump Unit #04</strong> staged on standby at Paanch Batti Circle with suction hoses primed.
              </p>
            </div>
          </div>

          {/* Action Buttons (Strict styling per design.md) */}
          <div className="space-y-2.5 pt-3 border-t border-[#eaefe8]">
            <button
              onClick={() => setIsMunicipalAlertModalOpen(true)}
              className="w-full h-10 rounded-[0.25rem] bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-medium tracking-[0.06em] uppercase flex items-center justify-center space-x-2 transition-all shadow-print focus:ring-2 focus:ring-[#7879f1] focus:ring-offset-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ISSUE MUNICIPAL ALERT</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsForensicModalOpen(true)}
                className="h-9 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-[11px] font-semibold tracking-[0.06em] uppercase border border-[#182923]/15 transition-all flex items-center justify-center space-x-1.5"
              >
                <FileSearch className="w-3.5 h-3.5 text-[#52606f]" />
                <span>INSPECT 'WHY?'</span>
              </button>
              <button
                onClick={exportGeoJsonLedger}
                className="h-9 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-[11px] font-semibold tracking-[0.06em] uppercase border border-[#182923]/15 transition-all flex items-center justify-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#52606f]" />
                <span>EXPORT GEOJSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
