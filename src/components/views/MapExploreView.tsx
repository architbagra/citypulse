import React from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { CivicMap } from '../CivicMap';
import { motion } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Top Banner Context */}
      <motion.div variants={itemVariants} className="glass-card flex flex-wrap items-center justify-between gap-4 px-6 py-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none"></div>
        <div className="flex items-center space-x-3 relative z-10">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Compass className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-bold text-foreground tracking-[0.1em] uppercase text-sm">
            GEOSPATIAL CARTOGRAPHY SUITE
          </span>
          <span className="text-white/20 px-2 font-mono">/</span>
          <span className="font-mono text-muted-foreground text-xs uppercase bg-white/5 px-2 py-1 rounded">Scale: 1:15,000</span>
        </div>

        <div className="flex items-center space-x-4 relative z-10">
          <button
            onClick={() => setCivicLensActive(!civicLensActive)}
            className={`h-9 px-4 rounded-lg text-xs font-sans uppercase tracking-[0.08em] border transition-all duration-300 flex items-center space-x-2 ${
              civicLensActive
                ? 'bg-emerald-500 text-black border-emerald-500 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:text-white hover:bg-white/10'
            }`}
          >
            <span>CIVIC LENS APERTURE:</span>
            <strong>{civicLensActive ? 'ACTIVE' : 'STANDBY'}</strong>
          </button>
        </div>
      </motion.div>

      {/* Main Map + Right Side Dossier Layout */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Full-Featured Map (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="glass-card p-2 relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none z-10 rounded-2xl"></div>
            <div className="rounded-xl overflow-hidden relative z-0">
              <CivicMap
                heightClass="h-[620px]"
                interactiveLens={true}
                showLayersBar={true}
              />
            </div>
          </div>

          <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-blue-400" />
              <span>Select any sector drafting beacon on the map to switch telemetry inspection dossier.</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <span>Active Layer Count: <strong className="text-foreground">5</strong></span>
              <span className="text-white/20">|</span>
              <span>Sensor Trust: <strong className="text-emerald-400 font-bold">92%</strong></span>
            </div>
          </div>
        </div>

        {/* Right Side Dossier Sheet (4 cols) */}
        <div className="lg:col-span-4 glass-card p-6 lg:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Dossier Header */}
            <div className="border-b border-white/10 pb-5">
              <div className="flex items-center justify-between text-xs font-sans mb-3">
                <span className="text-muted-foreground font-bold uppercase tracking-[0.1em]">{selectedZone.code} DOSSIER</span>
                <span className={`h-6 px-3 rounded-md text-[10px] font-bold tracking-[0.1em] uppercase flex items-center ${
                  selectedZone.status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  selectedZone.status === 'ELEVATED' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {selectedZone.status}
                </span>
              </div>
              <h2 className="font-serif text-3xl font-medium text-foreground leading-snug">
                {selectedZone.name}
              </h2>
              <p className="text-sm text-muted-foreground font-sans mt-2">
                {selectedZone.subhead}
              </p>
            </div>

            {/* 01. What Changed */}
            <div className="space-y-2 p-5 bg-black/20 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
              <div className="text-[10px] font-sans text-blue-400 uppercase tracking-[0.15em] font-bold">
                01. What Changed (Primary Influx)
              </div>
              <div className="text-3xl font-serif font-medium text-foreground">
                {selectedZone.precipitation} <span className="text-lg text-muted-foreground font-sans">mm/h</span>
              </div>
              <p className="text-xs text-muted-foreground/80 font-sans leading-relaxed">
                Hyper-localized cloudburst surge (+220% diurnal anomaly) recorded on AWS-04. Deluge rate exceeds natural soil infiltration by 3.2x.
              </p>
            </div>

            {/* 02. What Else Changed */}
            <div className="space-y-3 p-5 bg-black/20 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
              <div className="text-[10px] font-sans text-amber-400 uppercase tracking-[0.15em] font-bold">
                02. What Else Changed (Synchronous Stress)
              </div>
              <div className="space-y-2.5 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Arterial Speed (Loop D-12):</span>
                  <span className="text-rose-400 font-mono font-bold">{selectedZone.trafficSpeed} km/h (-61%)</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">181 Citizen Calls:</span>
                  <span className="text-foreground font-mono font-bold">{selectedZone.dispatchCalls} calls <span className="text-amber-400">(+310%)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Conduit S-04 Head:</span>
                  <span className="text-blue-400 font-mono font-bold">94% Surcharged</span>
                </div>
              </div>
            </div>

            {/* 03. Correlation Overlap */}
            <div className="space-y-2.5 p-5 bg-black/20 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-center text-[10px] font-sans">
                <span className="text-rose-400 uppercase tracking-[0.15em] font-bold">
                  03. Correlation Overlap
                </span>
                <span className="text-rose-400 font-mono font-bold">{selectedZone.concordance}% Lock</span>
              </div>
              <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedZone.concordance}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
                />
              </div>
              <p className="text-[11px] text-muted-foreground/80 font-sans pt-1">
                Spatial-temporal covariance meets automated civic alarm threshold (&gt; 75% for 15 min).
              </p>
            </div>

            {/* Municipal Dispatch Corroboration */}
            <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 shadow-[0_4px_20px_rgba(16,185,129,0.05)]">
              <div className="text-[10px] font-sans text-emerald-400 font-bold uppercase tracking-[0.15em] flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Municipal Dispatch Corroboration</span>
              </div>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                Jaipur Smart Drainage SCADA reports <strong className="text-foreground">Mobile Pump Unit #04</strong> staged on standby at Paanch Batti Circle with suction hoses primed.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-white/10 mt-6">
            <button
              onClick={() => setIsMunicipalAlertModalOpen(true)}
              className="w-full h-11 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-sans text-xs font-bold tracking-[0.1em] uppercase flex items-center justify-center space-x-2 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              <Send className="w-4 h-4" />
              <span>ISSUE MUNICIPAL ALERT</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsForensicModalOpen(true)}
                className="h-10 rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-sans text-[11px] font-bold tracking-[0.1em] uppercase border border-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FileSearch className="w-3.5 h-3.5 text-blue-400" />
                <span>INSPECT 'WHY?'</span>
              </button>
              <button
                onClick={exportGeoJsonLedger}
                className="h-10 rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-sans text-[11px] font-bold tracking-[0.1em] uppercase border border-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>EXPORT GEOJSON</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
