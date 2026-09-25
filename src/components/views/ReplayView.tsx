import React from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { CivicMap } from '../CivicMap';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Clock,
  Download,
  ShieldCheck,
  Layers
} from 'lucide-react';

export const ReplayView: React.FC = () => {
  const {
    replayIndex,
    setReplayIndex,
    isReplayPlaying,
    setIsReplayPlaying,
    replaySpeed,
    setReplaySpeed,
    currentReplayMilestone,
    replayTimeline,
    resetReplayToLive,
    activeEvent,
    exportGeoJsonLedger
  } = useCityPulse();

  const handleStepBack = () => {
    setReplayIndex(Math.max(0, replayIndex - 1));
  };

  const handleStepForward = () => {
    setReplayIndex(Math.min(replayTimeline.length - 1, replayIndex + 1));
  };

  const exportCsv = () => {
    const headers = ['Time', 'Rain_mm_h', 'Speed_km_h', 'Calls_181', 'Transit_km_h', 'Concordance_Pct', 'State', 'Notes'];
    const rows = replayTimeline.map(m => [
      m.time,
      m.precip,
      m.speed,
      m.calls,
      m.transitSpeed,
      m.concordance,
      m.eventState,
      `"${m.description}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `citypulse-replay-incident-${activeEvent.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      {/* 1. Replay Header with Controls */}
      <motion.div variants={itemVariants} className="glass-card p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden group border-l-4 border-l-blue-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-2 font-sans text-[10px] text-blue-400 uppercase tracking-[0.15em] font-bold mb-2">
            <Clock className="w-4 h-4" />
            <span>HISTORICAL INCIDENT #{activeEvent.id}</span>
            <span className="text-white/20">|</span>
            <span>CHRONOLOGICAL SYNTHESIS</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight text-gradient mb-2">
            Replay: The M.I. Road Flash Stagnation
          </h1>
          <p className="text-sm text-muted-foreground font-sans">
            Archival Replay Window: 13:00 to 14:30 IST <span className="mx-2 text-white/20">|</span> Synchronized across all 4 municipal feeds.
          </p>
        </div>

        {/* Playback Transport Controls */}
        <div className="flex flex-wrap items-center gap-4 relative z-10">
          <div className="flex items-center space-x-1 bg-black/40 p-1.5 rounded-xl border border-white/10 shadow-inner">
            <button
              onClick={handleStepBack}
              disabled={replayIndex === 0}
              className="p-2.5 text-muted-foreground hover:text-white disabled:opacity-30 transition-colors rounded-lg hover:bg-white/10"
              title="Step backward 5 min"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsReplayPlaying(!isReplayPlaying)}
              className="h-10 px-6 rounded-lg bg-blue-500 hover:bg-blue-400 text-black font-sans text-xs font-bold tracking-[0.1em] uppercase flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:ring-2 focus:ring-blue-400"
            >
              {isReplayPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isReplayPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>

            <button
              onClick={handleStepForward}
              disabled={replayIndex === replayTimeline.length - 1}
              className="p-2.5 text-muted-foreground hover:text-white disabled:opacity-30 transition-colors rounded-lg hover:bg-white/10"
              title="Step forward 5 min"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Buttons */}
          <div className="flex items-center space-x-1 bg-black/40 p-1.5 rounded-xl border border-white/10 font-mono text-[11px] shadow-inner">
            {([1, 2, 5] as const).map(s => (
              <button
                key={s}
                onClick={() => setReplaySpeed(s)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  replaySpeed === s
                    ? 'bg-blue-500 text-black font-bold shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                    : 'text-muted-foreground hover:text-white hover:bg-white/10'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Reset to Live */}
          <button
            onClick={resetReplayToLive}
            className="h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-foreground font-sans text-[11px] font-bold tracking-[0.1em] uppercase flex items-center space-x-2 border border-white/10 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span>RESET TO LIVE</span>
          </button>
        </div>
      </motion.div>

      {/* 2. Interactive Scrubber Timeline */}
      <motion.div variants={itemVariants} className="glass-card p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between text-xs font-sans gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-muted-foreground uppercase tracking-[0.1em] font-bold text-[10px]">BENCHMARK POSITION:</span>
            <strong className="text-blue-400 font-mono text-base px-2 py-1 bg-blue-500/10 rounded-md border border-blue-500/20">{currentReplayMilestone.time} IST</strong>
            <span className="text-white/20">|</span>
            <span className={`h-6 px-3 rounded-md text-[10px] font-bold tracking-[0.1em] uppercase flex items-center ${
              currentReplayMilestone.eventState === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
              currentReplayMilestone.eventState === 'ELEVATED' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {currentReplayMilestone.eventState} ({currentReplayMilestone.concordance}%)
            </span>
          </div>

          <div className="text-muted-foreground font-serif text-lg md:text-xl text-right">
            {currentReplayMilestone.label}
          </div>
        </div>

        {/* Milestone Tick Scrubber */}
        <div className="relative pt-4 pb-8">
          <input
            type="range"
            min={0}
            max={replayTimeline.length - 1}
            value={replayIndex}
            onChange={(e) => setReplayIndex(Number(e.target.value))}
            className="w-full h-2.5 bg-black/40 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all border border-white/5"
          />

          <div className="flex justify-between items-start mt-3">
            {replayTimeline.map((m, idx) => (
              <button
                key={idx}
                onClick={() => setReplayIndex(idx)}
                className={`flex flex-col items-center group focus:outline-none transition-colors duration-200 ${
                  idx === replayIndex ? 'text-blue-400' : 'text-muted-foreground/50 hover:text-white'
                }`}
              >
                <div className={`w-1.5 rounded-full transition-all duration-300 ${idx === replayIndex ? 'bg-blue-500 h-4 shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'bg-white/20 h-2 group-hover:bg-white/50 group-hover:h-3'}`}></div>
                <span className="font-mono text-[10px] mt-2 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity absolute translate-y-4">
                  {m.time}
                </span>
                {m.isSpike && (
                  <span className="text-[9px] font-sans text-rose-400 font-bold uppercase hidden lg:block absolute translate-y-8">
                    [SPIKE]
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Description of current point */}
        <motion.div 
          key={currentReplayMilestone.time}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl text-sm font-sans text-muted-foreground leading-relaxed"
        >
          <strong className="text-foreground">{currentReplayMilestone.label}:</strong> {currentReplayMilestone.description}
        </motion.div>
      </motion.div>

      {/* 3. Synchronized Four-Stream Signal Telemetry */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stream 1 */}
        <div className="glass-card p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-[0.1em]">
            AWS-04 PRECIPITATION
          </div>
          <div className="text-4xl font-serif font-medium text-foreground relative z-10">
            {currentReplayMilestone.precip} <span className="text-sm font-sans text-muted-foreground">mm/h</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              animate={{ width: `${Math.min(100, (currentReplayMilestone.precip / 50) * 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" 
            />
          </div>
        </div>

        {/* Stream 2 */}
        <div className="glass-card p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-[0.1em]">
            LOOP D-12 SPEED
          </div>
          <div className="text-4xl font-serif font-medium text-foreground relative z-10">
            {currentReplayMilestone.speed} <span className="text-sm font-sans text-muted-foreground">km/h</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              animate={{ width: `${Math.max(10, 100 - (currentReplayMilestone.speed / 35) * 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full" 
            />
          </div>
        </div>

        {/* Stream 3 */}
        <div className="glass-card p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-[0.1em]">
            181 SAMPARK CALLS
          </div>
          <div className="text-4xl font-serif font-medium text-foreground relative z-10">
            {currentReplayMilestone.calls} <span className="text-sm font-sans text-muted-foreground">calls</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              animate={{ width: `${Math.min(100, (currentReplayMilestone.calls / 45) * 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" 
            />
          </div>
        </div>

        {/* Stream 4 */}
        <div className="glass-card p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-[0.1em]">
            JCTSL TRANSIT SPEED
          </div>
          <div className="text-4xl font-serif font-medium text-foreground relative z-10">
            {currentReplayMilestone.transitSpeed} <span className="text-sm font-sans text-muted-foreground">km/h</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              animate={{ width: `${Math.max(10, 100 - (currentReplayMilestone.transitSpeed / 22) * 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" 
            />
          </div>
        </div>
      </motion.div>

      {/* 4. Spatial Perimeter Snapshot Map & Bayesian Causal Hypotheses */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Snapshot */}
        <div className="lg:col-span-7 glass-card p-6 lg:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground">
                Spatial Snapshot <span className="text-muted-foreground">· {currentReplayMilestone.time} IST</span>
              </h3>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground uppercase bg-white/5 px-2 py-1 rounded">
              Anchor: Zone A
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10 relative">
             <CivicMap heightClass="h-[360px]" compact={true} interactiveLens={true} />
             <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none"></div>
          </div>

          <p className="text-xs text-muted-foreground font-sans">
            Reflecting synchronized hydro plume radius and traffic queue length at timestamp <strong className="text-foreground">{currentReplayMilestone.time}</strong>.
          </p>
        </div>

        {/* Bayesian Causal Hypotheses Breakdown */}
        <div className="lg:col-span-5 glass-card p-6 lg:p-8 space-y-5">
          <div className="border-b border-white/10 pb-4">
            <div className="font-sans text-[10px] text-purple-400 uppercase tracking-[0.15em] font-bold mb-2">
              POSTERIOR PROBABILITY ENGINE
            </div>
            <h3 className="font-serif text-2xl font-medium text-foreground">
              Bayesian Breakdown
            </h3>
          </div>

          <div className="space-y-4">
            {activeEvent.hypotheses.map((hypo, idx) => (
              <div key={hypo.id} className="p-5 bg-black/20 border border-white/5 rounded-xl space-y-3 hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-bold text-foreground text-sm">{hypo.title}</span>
                  <span className="text-purple-400 font-mono font-bold text-sm bg-purple-500/10 px-2 py-0.5 rounded">{hypo.probability}%</span>
                </div>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${hypo.probability}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.2 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                  />
                </div>
                <ul className="text-xs text-muted-foreground/80 font-sans space-y-1.5 list-disc list-inside pt-2">
                  {hypo.factors.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 5. Footer Actions & Exports */}
      <motion.div variants={itemVariants} className="glass-card p-6 flex flex-wrap items-center justify-between gap-5 border-t-2 border-t-white/10">
        <div className="flex items-center space-x-3 text-xs font-sans text-muted-foreground bg-white/5 px-4 py-2 rounded-lg border border-white/5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Audited Replay Session <span className="mx-2">|</span> Hash <strong className="text-foreground font-mono">#JPR-8192-REPLAY</strong></span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportCsv}
            className="h-10 px-5 rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-sans text-[11px] font-bold tracking-[0.1em] uppercase border border-white/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>EXPORT CSV</span>
          </button>
          <button
            onClick={exportGeoJsonLedger}
            className="h-10 px-5 rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-sans text-[11px] font-bold tracking-[0.1em] uppercase border border-white/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>EXPORT GEOJSON</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
