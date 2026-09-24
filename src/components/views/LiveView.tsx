import React from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { CivicMap } from '../CivicMap';
import {
  ArrowUpRight,
  ArrowDownRight,
  FileSearch,
  Send,
  ShieldCheck,
  Activity,
  Compass,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const LiveView: React.FC = () => {
  const {
    activeEvent,
    selectedZone,
    setIsForensicModalOpen,
    setIsMunicipalAlertModalOpen,
    setViewMode
  } = useCityPulse();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Critical Concordance Editorial Banner (Archival Paper with Terracotta Border) */}
      <div className="relative bg-[#ffffff] border border-[#c25e5e]/40 rounded-[0.25rem] shadow-print p-6 lg:p-7 text-[#181d19]">
        {/* Registration Mark */}
        <div className="absolute top-2 right-2 font-mono text-[10px] text-[#737875]/40 select-none">+</div>
        <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#737875]/40 select-none">+</div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 h-6 px-2.5 rounded-full bg-[#ffdad6] text-[#8a2d2d] font-sans text-[10px] font-bold tracking-[0.06em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c25e5e] animate-ping"></span>
                <span>ELEVATED IN {selectedZone.name.split('·')[0]}</span>
              </span>
              <span className="font-mono text-xs text-[#52606f]">
                DECLARED AT {activeEvent.declaredAt}
              </span>
              <span className="text-[#c2c8c4]">·</span>
              <span className="font-sans text-xs text-[#bfa15f] font-semibold">
                PERSISTENCE: {activeEvent.persistenceMinutes} MIN
              </span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl lg:text-[34px] font-normal tracking-[-0.015em] text-[#182923] leading-tight">
              {activeEvent.title}
            </h1>

            <p className="font-sans text-sm text-[#424845] leading-relaxed max-w-3xl">
              Simultaneous precipitation surge (48.2 mm/h), arterial velocity collapse (-61%), and citizen dispatch influx (+310%) locked across the M.I. Road drainage corridor.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsForensicModalOpen(true)}
              className="h-10 px-4 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-xs font-semibold tracking-[0.06em] uppercase border border-[#182923]/20 flex items-center space-x-2 transition-all"
            >
              <FileSearch className="w-4 h-4 text-[#52606f]" />
              <span>INSPECT FORENSIC LEDGER</span>
            </button>
            <button
              onClick={() => setIsMunicipalAlertModalOpen(true)}
              className="h-10 px-5 rounded-[0.25rem] bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-medium tracking-[0.06em] uppercase flex items-center space-x-2 transition-all shadow-print focus:ring-2 focus:ring-[#7879f1] focus:ring-offset-2"
            >
              <Send className="w-4 h-4" />
              <span>ISSUE ACTION ORDER</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Three Stream Telemetry Cards (Raised Paper Substrates per design.md) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Stream 1: Meteorology */}
        <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-3 shadow-print hover:border-[#182923]/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-sans text-[#52606f] mb-2">
              <span className="flex items-center space-x-1.5 font-semibold tracking-[0.06em] uppercase text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#7879f1]"></span>
                <span>STREAM A · METEOROLOGY</span>
              </span>
              <span className="font-mono text-[11px] text-[#737875]">AWS-04</span>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-3xl md:text-4xl text-[#182923] font-medium tracking-tight">
                48.2 <span className="text-base font-sans text-[#52606f] font-normal">mm/h</span>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <span className="inline-flex items-center space-x-1 h-5 px-2 rounded-full bg-[#ffdad6] text-[#8a2d2d] font-sans text-[10px] font-bold">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+220%</span>
                </span>
                <span className="text-xs text-[#52606f] font-sans">
                  vs. Diurnal Baseline (15.0 mm/h)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#eaefe8] text-[11px] font-sans text-[#52606f] flex items-center justify-between">
            <span>Tipping Bucket: Calibrated</span>
            <span className="text-[#182923] font-semibold">98% Sensor Trust</span>
          </div>
        </div>

        {/* Stream 2: Velocity */}
        <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-3 shadow-print hover:border-[#182923]/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-sans text-[#52606f] mb-2">
              <span className="flex items-center space-x-1.5 font-semibold tracking-[0.06em] uppercase text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#c25e5e] animate-pulse"></span>
                <span>STREAM B · ROADWAY MOBILITY</span>
              </span>
              <span className="font-mono text-[11px] text-[#737875]">LOOP D-12</span>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-3xl md:text-4xl text-[#182923] font-medium tracking-tight">
                6.4 <span className="text-base font-sans text-[#52606f] font-normal">km/h</span>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <span className="inline-flex items-center space-x-1 h-5 px-2 rounded-full bg-[#ffdad6] text-[#8a2d2d] font-sans text-[10px] font-bold">
                  <ArrowDownRight className="w-3 h-3" />
                  <span>-61%</span>
                </span>
                <span className="text-xs text-[#52606f] font-sans">
                  vs. Free-Flow (32 km/h)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#eaefe8] text-[11px] font-sans text-[#52606f] flex items-center justify-between">
            <span>Occupancy: 91.8% (Gridlocked)</span>
            <span className="text-[#8a2d2d] font-semibold">94% Sensor Trust</span>
          </div>
        </div>

        {/* Stream 3: Citizen Dispatches */}
        <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-3 shadow-print hover:border-[#182923]/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-sans text-[#52606f] mb-2">
              <span className="flex items-center space-x-1.5 font-semibold tracking-[0.06em] uppercase text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#bfa15f]"></span>
                <span>STREAM C · CITIZEN DISPATCHES</span>
              </span>
              <span className="font-mono text-[11px] text-[#737875]">SAMPARK 181</span>
            </div>

            <div className="space-y-1">
              <div className="font-serif text-3xl md:text-4xl text-[#182923] font-medium tracking-tight">
                38 <span className="text-base font-sans text-[#52606f] font-normal">calls</span>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <span className="inline-flex items-center space-x-1 h-5 px-2 rounded-full bg-[#eaefe8] text-[#182923] border border-[#182923]/20 font-sans text-[10px] font-bold">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+310%</span>
                </span>
                <span className="text-xs text-[#52606f] font-sans">
                  Waterlogging & Vehicle Stalls
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#eaefe8] text-[11px] font-sans text-[#52606f] flex items-center justify-between">
            <span>Cluster Radius: 250m Perimeter</span>
            <span className="text-[#182923] font-semibold">91% Citizen Trust</span>
          </div>
        </div>
      </div>

      {/* 3. Spatial Observation Deck & Convergence Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Map Deck (8 cols) */}
        <div className="lg:col-span-8 bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-4 shadow-print">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-[#182923]" />
              <h2 className="font-serif text-lg font-medium text-[#182923]">
                Spatial Observation Deck · Central Jaipur Grid
              </h2>
            </div>
            <button
              onClick={() => setViewMode('map')}
              className="h-8 px-3 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] font-sans text-[11px] tracking-[0.06em] uppercase text-[#182923] border border-[#182923]/15 transition-all"
            >
              EXPANDED MAP EXPLORE →
            </button>
          </div>

          <CivicMap heightClass="h-[450px]" interactiveLens={true} showLayersBar={true} />

          <div className="flex flex-wrap items-center justify-between text-xs font-sans text-[#52606f] pt-1">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#7879f1]"></span>
              <span>Hydro Plume (0.65 km²)</span>
              <span className="text-[#c2c8c4]">·</span>
              <span className="w-2 h-2 rounded-full bg-[#c25e5e]"></span>
              <span>Arterial Friction</span>
              <span className="text-[#c2c8c4]">·</span>
              <span className="w-2 h-2 rounded-full bg-[#bfa15f]"></span>
              <span>181 Dispatches (38)</span>
            </div>
            <div className="text-[#181d19] font-medium">
              Civic Lens: <span className="font-semibold text-[#182923]">HOVER CURSOR TO EXAMINE ACRES</span>
            </div>
          </div>
        </div>

        {/* Right Convergence Dynamics & Rigor Protocol (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-5 shadow-print">
            <div className="flex items-center space-x-2 border-b border-[#eaefe8] pb-3">
              <Activity className="w-4 h-4 text-[#182923]" />
              <h3 className="font-serif text-base font-medium text-[#182923]">
                Convergence Dynamics
              </h3>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div>
                <div className="flex justify-between text-[#52606f] mb-1.5">
                  <span>Four-Signal Overlap Lock</span>
                  <span className="text-[#8a2d2d] font-mono font-bold">{activeEvent.concordanceScore}%</span>
                </div>
                <div className="w-full h-2 bg-[#eaefe8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c25e5e] transition-all duration-500 rounded-full" style={{ width: `${activeEvent.concordanceScore}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#52606f] mb-1.5">
                  <span>Temporal Duration</span>
                  <span className="text-[#182923] font-mono font-semibold">35 min (Threshold: 15m)</span>
                </div>
                <div className="w-full h-2 bg-[#eaefe8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#bfa15f] rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#52606f] mb-1.5">
                  <span>Drainage Capacity</span>
                  <span className="text-[#52606f] font-mono font-semibold">18.5% (Surcharged)</span>
                </div>
                <div className="w-full h-2 bg-[#eaefe8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#7879f1] rounded-full" style={{ width: '18.5%' }}></div>
                </div>
              </div>
            </div>

            {/* Scientific Rigor Protocol Box */}
            <div className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] text-xs space-y-1.5">
              <div className="font-sans text-[#182923] font-semibold uppercase tracking-[0.06em] flex items-center space-x-1.5 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#50625b]" />
                <span>Scientific Rigor Protocol</span>
              </div>
              <p className="text-[#424845] font-sans leading-relaxed text-[12px]">
                Autonomous civic notices require <strong>≥ 3 independent telemetry streams</strong> to maintain concordance &gt; 75% for ≥ 15 consecutive minutes before triggering municipal dispatch protocols.
              </p>
            </div>

            <button
              onClick={() => setViewMode('relationships')}
              className="w-full h-9 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-xs font-semibold tracking-[0.06em] uppercase border border-[#182923]/20 transition-all text-center block"
            >
              EXPLORE COUPLING ENGINE →
            </button>
          </div>

          {/* Quick Municipal Action Card */}
          <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-3 shadow-print">
            <div className="flex items-center space-x-2 text-xs font-sans font-semibold text-[#182923] uppercase tracking-[0.06em]">
              <Zap className="w-4 h-4 text-[#c25e5e]" />
              <span>Municipal Corroboration</span>
            </div>
            <p className="text-xs text-[#52606f] font-sans leading-relaxed">
              Jaipur Smart Drainage SCADA reports Mobile Pump Unit #04 on standby at Paanch Batti Circle.
            </p>
            <button
              onClick={() => setIsMunicipalAlertModalOpen(true)}
              className="w-full h-9 rounded-[0.25rem] bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-medium tracking-[0.06em] uppercase transition-all shadow-print"
            >
              DISPATCH PUMP UNIT #04 NOW
            </button>
          </div>
        </div>
      </div>

      {/* 4. Forensic Evidence Ledger: The 'Why?' Diagnostic Chain */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-5 shadow-print">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eaefe8] pb-4">
          <div>
            <div className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-1">
              FORENSIC EVIDENCE LEDGER
            </div>
            <h2 className="font-serif text-xl font-medium text-[#182923]">
              The 'Why?' Diagnostic Chain — 5 Independent Confirmations
            </h2>
          </div>
          <button
            onClick={() => setIsForensicModalOpen(true)}
            className="h-8 px-3 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-xs font-semibold tracking-[0.06em] uppercase border border-[#182923]/15 transition-all"
          >
            VIEW FULL AUDIT DOSSIER
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-1">
          {activeEvent.diagnosticChain.map(step => (
            <div
              key={step.step}
              className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-2 relative group hover:border-[#182923]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-[#182923] font-bold">0{step.step}.</span>
                  <span className="text-[#52606f]">{step.timeOffset}</span>
                </div>
                <h3 className="font-serif text-sm font-medium text-[#182923] mb-1 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[12px] text-[#424845] font-sans leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  {step.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#dfe4dd] flex items-center justify-between text-[11px] font-sans">
                <span className="text-[#182923] font-mono font-semibold">{step.metric}</span>
                <span className="text-[#52606f]">{(step.confidence * 100).toFixed(0)}% trust</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Epistemic Honesty Guarantee */}
      <div className="p-4 bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] shadow-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-[#52606f]">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#50625b] shrink-0" />
          <span>EPISTEMIC HONESTY GUARANTEE: Inferences are derived solely from calibrated physical sensors with documented degradation penalties.</span>
        </div>
        <button
          onClick={() => setViewMode('sources')}
          className="text-[#182923] hover:underline font-semibold uppercase tracking-[0.06em] text-[11px] shrink-0"
        >
          INSPECT DATA SOURCE LEDGER →
        </button>
      </div>
    </div>
  );
};
