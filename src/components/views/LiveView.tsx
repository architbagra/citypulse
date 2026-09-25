import React from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { CivicMap } from '../CivicMap';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDownRight,
  FileSearch,
  Send,
  ShieldCheck,
  Activity,
  Compass,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const LiveView: React.FC = () => {
  const {
    activeEvent,
    selectedZone,
    setIsForensicModalOpen,
    setIsMunicipalAlertModalOpen,
    setViewMode
  } = useCityPulse();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* 1. Critical Alert Banner */}
      <motion.div variants={itemVariants} className="relative glass-card border-l-4 border-l-red-500 p-6 lg:p-8 overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <AlertTriangle className="w-32 h-32 text-red-500" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center space-x-2 h-7 px-3 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-sans text-[11px] font-bold tracking-[0.08em] uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute"></span>
                <span className="w-2 h-2 rounded-full bg-red-500 relative"></span>
                <span>ELEVATED IN {selectedZone.name.split('·')[0]}</span>
              </span>
              <span className="font-mono text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-md">
                DECLARED AT {activeEvent.declaredAt}
              </span>
              <span className="font-sans text-xs text-amber-400 font-semibold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> PERSISTENCE: {activeEvent.persistenceMinutes} MIN
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-[40px] font-medium tracking-tight text-foreground text-gradient leading-tight">
              {activeEvent.title}
            </h1>

            <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-3xl">
              Simultaneous precipitation surge (48.2 mm/h), arterial velocity collapse (-61%), and citizen dispatch influx (+310%) locked across the M.I. Road drainage corridor.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsForensicModalOpen(true)}
              className="h-11 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold tracking-[0.08em] uppercase border border-white/10 flex items-center space-x-2 transition-all duration-300"
            >
              <FileSearch className="w-4 h-4 text-blue-400" />
              <span>FORENSIC LEDGER</span>
            </button>
            <button
              onClick={() => setIsMunicipalAlertModalOpen(true)}
              className="h-11 px-6 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-sans text-xs font-bold tracking-[0.08em] uppercase flex items-center space-x-2 transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.4)]"
            >
              <Send className="w-4 h-4" />
              <span>ISSUE ACTION ORDER</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Three Stream Telemetry Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stream 1: Meteorology */}
        <div className="glass-card p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs font-sans text-muted-foreground mb-4">
              <span className="flex items-center space-x-2 font-bold tracking-[0.08em] uppercase text-[10px] text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                <span>STREAM A · METEOROLOGY</span>
              </span>
              <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded">AWS-04</span>
            </div>

            <div className="space-y-2">
              <div className="font-serif text-4xl md:text-5xl text-foreground font-medium tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                48.2 <span className="text-xl font-sans text-muted-foreground font-normal">mm/h</span>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <span className="inline-flex items-center space-x-1 h-6 px-2.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-sans text-[11px] font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+220%</span>
                </span>
                <span className="text-xs text-muted-foreground font-sans">
                  vs. Baseline (15.0)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/10 text-[11px] font-sans flex items-center justify-between">
            <span className="text-muted-foreground">Tipping Bucket: Calibrated</span>
            <span className="text-blue-400 font-semibold flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> 98% Trust</span>
          </div>
        </div>

        {/* Stream 2: Velocity */}
        <div className="glass-card p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs font-sans text-muted-foreground mb-4">
              <span className="flex items-center space-x-2 font-bold tracking-[0.08em] uppercase text-[10px] text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse"></span>
                <span>STREAM B · MOBILITY</span>
              </span>
              <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded">LOOP D-12</span>
            </div>

            <div className="space-y-2">
              <div className="font-serif text-4xl md:text-5xl text-foreground font-medium tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                6.4 <span className="text-xl font-sans text-muted-foreground font-normal">km/h</span>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <span className="inline-flex items-center space-x-1 h-6 px-2.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-sans text-[11px] font-bold">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  <span>-61%</span>
                </span>
                <span className="text-xs text-muted-foreground font-sans">
                  vs. Free-Flow (32)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/10 text-[11px] font-sans flex items-center justify-between">
            <span className="text-muted-foreground">Occupancy: 91.8% (Gridlocked)</span>
            <span className="text-rose-400 font-semibold flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> 94% Trust</span>
          </div>
        </div>

        {/* Stream 3: Citizen Dispatches */}
        <div className="glass-card p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between text-xs font-sans text-muted-foreground mb-4">
              <span className="flex items-center space-x-2 font-bold tracking-[0.08em] uppercase text-[10px] text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                <span>STREAM C · CITIZEN DISPATCHES</span>
              </span>
              <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded">SAMPARK 181</span>
            </div>

            <div className="space-y-2">
              <div className="font-serif text-4xl md:text-5xl text-foreground font-medium tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
                38 <span className="text-xl font-sans text-muted-foreground font-normal">calls</span>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <span className="inline-flex items-center space-x-1 h-6 px-2.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-sans text-[11px] font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+310%</span>
                </span>
                <span className="text-xs text-muted-foreground font-sans">
                  Waterlogging & Stalls
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/10 text-[11px] font-sans flex items-center justify-between">
            <span className="text-muted-foreground">Cluster Radius: 250m</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> 91% Trust</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Spatial Observation Deck & Convergence Dynamics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Map Deck (8 cols) */}
        <div className="lg:col-span-8 glass-card p-6 flex flex-col space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Compass className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="font-serif text-xl font-medium text-foreground">
                Spatial Observation Deck
              </h2>
            </div>
            <button
              onClick={() => setViewMode('map')}
              className="h-9 px-4 rounded-lg bg-white/5 hover:bg-white/10 font-sans text-[10px] font-bold tracking-[0.08em] uppercase text-foreground border border-white/10 transition-all duration-300"
            >
              EXPANDED MAP EXPLORE →
            </button>
          </div>

          <div className="flex-1 rounded-xl overflow-hidden border border-white/10 relative">
             {/* Map overlays like glowing edges can be added here */}
             <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] z-10"></div>
             <CivicMap heightClass="h-[450px]" interactiveLens={true} showLayersBar={true} />
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs font-sans text-muted-foreground pt-2">
            <div className="flex items-center space-x-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span> Hydro Plume</span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span> Arterial Friction</span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span> 181 Dispatches</span>
            </div>
            <div className="font-medium">
              Civic Lens: <span className="font-bold text-blue-400 uppercase tracking-widest text-[10px]">HOVER CURSOR TO EXAMINE ACRES</span>
            </div>
          </div>
        </div>

        {/* Right Convergence Dynamics & Rigor Protocol (4 cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="glass-card p-6 flex-1 space-y-6">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground">
                Convergence Dynamics
              </h3>
            </div>

            <div className="space-y-5 font-sans text-xs">
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Four-Signal Overlap</span>
                  <span className="text-rose-400 font-mono font-bold text-[14px]">{activeEvent.concordanceScore}%</span>
                </div>
                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${activeEvent.concordanceScore}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Temporal Duration</span>
                  <span className="text-amber-400 font-mono font-bold">35m <span className="text-muted-foreground/60 text-[10px]">(Thr: 15m)</span></span>
                </div>
                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Drainage Capacity</span>
                  <span className="text-blue-400 font-mono font-bold">18.5% <span className="text-muted-foreground/60 text-[10px]">(Surcharged)</span></span>
                </div>
                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '18.5%' }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  />
                </div>
              </div>
            </div>

            {/* Scientific Rigor Protocol Box */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs space-y-2 shadow-inner mt-4">
              <div className="font-sans text-emerald-400 font-bold uppercase tracking-[0.08em] flex items-center space-x-2 text-[10px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Scientific Rigor Protocol</span>
              </div>
              <p className="text-muted-foreground font-sans leading-relaxed text-[11px]">
                Autonomous civic notices require <strong className="text-foreground">≥ 3 independent telemetry streams</strong> to maintain concordance &gt; 75% for ≥ 15 consecutive minutes before triggering municipal dispatch protocols.
              </p>
            </div>

            <button
              onClick={() => setViewMode('relationships')}
              className="w-full h-10 rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-sans text-[11px] font-bold tracking-[0.1em] uppercase border border-white/10 transition-all duration-300 text-center block mt-2"
            >
              EXPLORE COUPLING ENGINE →
            </button>
          </div>

          {/* Quick Municipal Action Card */}
          <div className="glass-card p-5 space-y-4 border-emerald-500/30 shadow-[0_4px_20px_rgba(16,185,129,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full"></div>
            <div className="flex items-center space-x-2 text-[11px] font-sans font-bold text-emerald-400 uppercase tracking-[0.1em] relative z-10">
              <Zap className="w-4 h-4" />
              <span>Municipal Corroboration</span>
            </div>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed relative z-10">
              Jaipur Smart Drainage SCADA reports Mobile Pump Unit #04 on standby at Paanch Batti Circle.
            </p>
            <button
              onClick={() => setIsMunicipalAlertModalOpen(true)}
              className="w-full h-10 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-sans text-xs font-bold tracking-[0.08em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.4)] relative z-10"
            >
              DISPATCH PUMP UNIT #04 NOW
            </button>
          </div>
        </div>
      </motion.div>

      {/* 4. Forensic Evidence Ledger */}
      <motion.div variants={itemVariants} className="glass-card p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="font-sans text-[10px] text-blue-400 uppercase tracking-[0.15em] font-bold mb-2 flex items-center gap-2">
              <FileSearch className="w-3.5 h-3.5"/> FORENSIC EVIDENCE LEDGER
            </div>
            <h2 className="font-serif text-2xl font-medium text-foreground">
              The 'Why?' Diagnostic Chain <span className="text-muted-foreground font-sans text-lg italic ml-2">5 Independent Confirmations</span>
            </h2>
          </div>
          <button
            onClick={() => setIsForensicModalOpen(true)}
            className="h-10 px-5 rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-sans text-[11px] font-bold tracking-[0.1em] uppercase border border-white/10 transition-all duration-300"
          >
            VIEW FULL AUDIT DOSSIER
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 pt-2">
          {activeEvent.diagnosticChain.map((step, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              key={step.step}
              className="p-5 bg-black/20 border border-white/5 rounded-xl space-y-3 relative group hover:border-blue-500/30 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">0{step.step}.</span>
                  <span className="text-muted-foreground">{step.timeOffset}</span>
                </div>
                <h3 className="font-serif text-[15px] font-medium text-foreground mb-2 leading-snug group-hover:text-blue-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-[12px] text-muted-foreground/80 font-sans leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-sans mt-2">
                <span className="text-foreground font-mono font-semibold bg-white/5 px-2 py-0.5 rounded">{step.metric}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold"><CheckCircle2 className="w-3 h-3"/> {(step.confidence * 100).toFixed(0)}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
