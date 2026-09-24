import React from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { CivicMap } from '../CivicMap';
import { REPLAY_TIMELINE } from '../../data/mock/replay';
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
    resetReplayToLive,
    activeEvent,
    exportGeoJsonLedger
  } = useCityPulse();

  const handleStepBack = () => {
    setReplayIndex(Math.max(0, replayIndex - 1));
  };

  const handleStepForward = () => {
    setReplayIndex(Math.min(REPLAY_TIMELINE.length - 1, replayIndex + 1));
  };

  const exportCsv = () => {
    const headers = ['Time', 'Rain_mm_h', 'Speed_km_h', 'Calls_181', 'Transit_km_h', 'Concordance_Pct', 'State', 'Notes'];
    const rows = REPLAY_TIMELINE.map(m => [
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Replay Header with Controls (Paper Substrate per design.md) */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 lg:p-7 shadow-print flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative">
        <div className="absolute top-2 right-2 font-mono text-[10px] text-[#737875]/30 select-none">+</div>
        <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#737875]/30 select-none">+</div>

        <div>
          <div className="flex items-center space-x-2 font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-1.5">
            <Clock className="w-4 h-4 text-[#7879f1]" />
            <span>HISTORICAL INCIDENT #{activeEvent.id}</span>
            <span className="text-[#c2c8c4]">/</span>
            <span>CHRONOLOGICAL SYNTHESIS</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#182923] tracking-tight">
            Replay: The M.I. Road Flash Stagnation
          </h1>
          <p className="text-xs text-[#52606f] font-sans mt-1">
            Archival Replay Window: 13:00 to 14:30 IST · Synchronized across all 4 municipal feeds.
          </p>
        </div>

        {/* Playback Transport Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1 bg-[#f0f5ee] p-1 rounded-[0.25rem] border border-[#c2c8c4]/60">
            <button
              onClick={handleStepBack}
              disabled={replayIndex === 0}
              className="p-2 text-[#52606f] hover:text-[#182923] disabled:opacity-30 transition-colors"
              title="Step backward 5 min"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsReplayPlaying(!isReplayPlaying)}
              className="h-8 px-4 rounded-[0.25rem] bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-semibold tracking-[0.06em] uppercase flex items-center space-x-2 transition-all shadow-print focus:ring-2 focus:ring-[#7879f1]"
            >
              {isReplayPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isReplayPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>

            <button
              onClick={handleStepForward}
              disabled={replayIndex === REPLAY_TIMELINE.length - 1}
              className="p-2 text-[#52606f] hover:text-[#182923] disabled:opacity-30 transition-colors"
              title="Step forward 5 min"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Speed Buttons */}
          <div className="flex items-center space-x-1 bg-[#f0f5ee] p-1 rounded-[0.25rem] border border-[#c2c8c4]/60 font-mono text-xs">
            {([1, 2, 5] as const).map(s => (
              <button
                key={s}
                onClick={() => setReplaySpeed(s)}
                className={`px-2.5 py-1 rounded-[0.125rem] transition-colors ${
                  replaySpeed === s
                    ? 'bg-[#182923] text-white font-semibold'
                    : 'text-[#52606f] hover:text-[#182923]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Reset to Live */}
          <button
            onClick={resetReplayToLive}
            className="h-8 px-3 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-xs font-semibold tracking-[0.06em] uppercase flex items-center space-x-1.5 border border-[#182923]/15 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#50625b]" />
            <span>RESET TO LIVE</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Scrubber Timeline */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-4 shadow-print">
        <div className="flex items-center justify-between text-xs font-sans">
          <div className="flex items-center space-x-2">
            <span className="text-[#52606f] uppercase tracking-[0.06em] font-semibold text-[11px]">BENCHMARK POSITION:</span>
            <strong className="text-[#182923] font-mono text-sm">{currentReplayMilestone.time} IST</strong>
            <span className="text-[#c2c8c4]">·</span>
            <span className={`h-5 px-2 rounded-full text-[10px] font-bold tracking-[0.06em] uppercase flex items-center ${
              currentReplayMilestone.eventState === 'CRITICAL' ? 'bg-[#ffdad6] text-[#8a2d2d] border border-[#c25e5e]/30' :
              currentReplayMilestone.eventState === 'ELEVATED' ? 'bg-[#eaefe8] text-[#bfa15f] border border-[#bfa15f]/30' :
              'bg-[#eaefe8] text-[#50625b] border border-[#50625b]/30'
            }`}>
              {currentReplayMilestone.eventState} ({currentReplayMilestone.concordance}%)
            </span>
          </div>

          <div className="text-[#52606f] hidden sm:block font-serif text-sm">
            {currentReplayMilestone.label}
          </div>
        </div>

        {/* Milestone Tick Scrubber */}
        <div className="relative pt-2 pb-6">
          <input
            type="range"
            min={0}
            max={REPLAY_TIMELINE.length - 1}
            value={replayIndex}
            onChange={(e) => setReplayIndex(Number(e.target.value))}
            className="w-full h-2 bg-[#eaefe8] rounded-full appearance-none cursor-pointer accent-[#182923]"
          />

          <div className="flex justify-between items-start mt-2">
            {REPLAY_TIMELINE.map((m, idx) => (
              <button
                key={idx}
                onClick={() => setReplayIndex(idx)}
                className={`flex flex-col items-center group focus:outline-none ${
                  idx === replayIndex ? 'text-[#182923]' : 'text-[#737875] hover:text-[#182923]'
                }`}
              >
                <div className={`w-1.5 h-3 rounded-full ${idx === replayIndex ? 'bg-[#182923] h-4' : 'bg-[#c2c8c4]'}`}></div>
                <span className="font-mono text-[10px] mt-1 hidden md:block">
                  {m.time}
                </span>
                {m.isSpike && (
                  <span className="text-[9px] font-sans text-[#8a2d2d] font-bold uppercase hidden lg:block">
                    [SPIKE]
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Description of current point */}
        <div className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] text-xs font-sans text-[#424845] leading-relaxed">
          <strong className="text-[#182923]">{currentReplayMilestone.label}:</strong> {currentReplayMilestone.description}
        </div>
      </div>

      {/* 3. Synchronized Four-Stream Signal Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Stream 1 */}
        <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-5 space-y-2 shadow-print">
          <div className="text-[11px] font-sans font-semibold text-[#52606f] uppercase tracking-[0.06em]">
            AWS-04 PRECIPITATION
          </div>
          <div className="text-3xl font-serif font-medium text-[#182923]">
            {currentReplayMilestone.precip} <span className="text-xs font-sans text-[#52606f]">mm/h</span>
          </div>
          <div className="w-full h-1.5 bg-[#eaefe8] rounded-full overflow-hidden">
            <div className="h-full bg-[#7879f1] rounded-full" style={{ width: `${Math.min(100, (currentReplayMilestone.precip / 50) * 100)}%` }}></div>
          </div>
        </div>

        {/* Stream 2 */}
        <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-5 space-y-2 shadow-print">
          <div className="text-[11px] font-sans font-semibold text-[#52606f] uppercase tracking-[0.06em]">
            LOOP D-12 SPEED
          </div>
          <div className="text-3xl font-serif font-medium text-[#182923]">
            {currentReplayMilestone.speed} <span className="text-xs font-sans text-[#52606f]">km/h</span>
          </div>
          <div className="w-full h-1.5 bg-[#eaefe8] rounded-full overflow-hidden">
            <div className="h-full bg-[#c25e5e] rounded-full" style={{ width: `${Math.max(10, 100 - (currentReplayMilestone.speed / 35) * 100)}%` }}></div>
          </div>
        </div>

        {/* Stream 3 */}
        <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-5 space-y-2 shadow-print">
          <div className="text-[11px] font-sans font-semibold text-[#52606f] uppercase tracking-[0.06em]">
            181 SAMPARK CALLS
          </div>
          <div className="text-3xl font-serif font-medium text-[#182923]">
            {currentReplayMilestone.calls} <span className="text-xs font-sans text-[#52606f]">calls</span>
          </div>
          <div className="w-full h-1.5 bg-[#eaefe8] rounded-full overflow-hidden">
            <div className="h-full bg-[#bfa15f] rounded-full" style={{ width: `${Math.min(100, (currentReplayMilestone.calls / 45) * 100)}%` }}></div>
          </div>
        </div>

        {/* Stream 4 */}
        <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-5 space-y-2 shadow-print">
          <div className="text-[11px] font-sans font-semibold text-[#52606f] uppercase tracking-[0.06em]">
            JCTSL TRANSIT SPEED
          </div>
          <div className="text-3xl font-serif font-medium text-[#182923]">
            {currentReplayMilestone.transitSpeed} <span className="text-xs font-sans text-[#52606f]">km/h</span>
          </div>
          <div className="w-full h-1.5 bg-[#eaefe8] rounded-full overflow-hidden">
            <div className="h-full bg-[#52606f] rounded-full" style={{ width: `${Math.max(10, 100 - (currentReplayMilestone.transitSpeed / 22) * 100)}%` }}></div>
          </div>
        </div>
      </div>

      {/* 4. Spatial Perimeter Snapshot Map & Bayesian Causal Hypotheses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Snapshot */}
        <div className="lg:col-span-7 bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-3 shadow-print">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#182923]" />
              <h3 className="font-serif text-base font-medium text-[#182923]">
                Spatial Perimeter Snapshot · {currentReplayMilestone.time} IST
              </h3>
            </div>
            <span className="font-mono text-xs text-[#52606f]">
              Epistemic Anchor: Zone A
            </span>
          </div>

          <CivicMap heightClass="h-[360px]" compact={true} interactiveLens={true} />

          <p className="text-xs text-[#52606f] font-sans">
            Reflecting synchronized hydro plume radius and traffic queue length at timestamp {currentReplayMilestone.time}.
          </p>
        </div>

        {/* Bayesian Causal Hypotheses Breakdown */}
        <div className="lg:col-span-5 bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-4 shadow-print">
          <div className="border-b border-[#eaefe8] pb-3">
            <div className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-1">
              POSTERIOR PROBABILITY ENGINE
            </div>
            <h3 className="font-serif text-lg font-medium text-[#182923]">
              Causal Hypotheses Bayesian Breakdown
            </h3>
          </div>

          <div className="space-y-3.5">
            {activeEvent.hypotheses.map(hypo => (
              <div key={hypo.id} className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-2">
                <div className="flex justify-between items-center text-xs font-sans">
                  <span className="font-semibold text-[#182923]">{hypo.title}</span>
                  <span className="text-[#182923] font-mono font-bold">{hypo.probability}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#eaefe8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#182923] rounded-full" style={{ width: `${hypo.probability}%` }}></div>
                </div>
                <ul className="text-[11px] text-[#52606f] font-sans space-y-1 list-disc list-inside pt-1">
                  {hypo.factors.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Footer Actions & Exports */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-5 shadow-print flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-sans text-[#52606f]">
          <ShieldCheck className="w-4 h-4 text-[#50625b]" />
          <span>Audited Replay Session · Hash #JPR-8192-REPLAY</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={exportCsv}
            className="h-9 px-4 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-xs font-semibold tracking-[0.06em] uppercase border border-[#182923]/15 transition-all flex items-center space-x-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT TIMELINE CSV</span>
          </button>
          <button
            onClick={exportGeoJsonLedger}
            className="h-9 px-4 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-xs font-semibold tracking-[0.06em] uppercase border border-[#182923]/15 transition-all flex items-center space-x-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT AUDITED GEOJSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};
