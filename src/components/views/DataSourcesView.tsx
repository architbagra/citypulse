import React, { useState, useEffect } from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { CityPulseAPI } from '../../api/client';
import { motion } from 'framer-motion';
import {
  Database,
  RefreshCw,
  Code
} from 'lucide-react';

export const DataSourcesView: React.FC = () => {
  const { feeds, isProbingFeeds, probeFeedsNow, lastProbeTime } = useCityPulse();
  const [selectedFeedId, setSelectedFeedId] = useState<string>('feed-04');
  const [showPayload, setShowPayload] = useState<boolean>(true);
  const [DEGRADATION_PROTOCOL_STEPS, setDegradation] = useState<any[]>([]);

  useEffect(() => {
    CityPulseAPI.getFeedsDegradation().then(data => setDegradation(data)).catch(console.error);
  }, []);

  const selectedFeed = feeds.find(f => f.id === selectedFeedId) || feeds[0];

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
      {/* Top Banner: Civic Feed Ledger & Protocol Sentinel */}
      <motion.div variants={itemVariants} className="glass-card p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group border-l-4 border-l-blue-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 font-sans text-[10px] text-blue-400 uppercase tracking-[0.15em] font-bold mb-2">
            <Database className="w-4 h-4" />
            <span>SECTION 01 <span className="mx-2 text-white/20">|</span> THE CIVIC FEED LEDGER</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight text-gradient mb-2">
            Epistemic Telemetry & Graceful Degradation
          </h1>
          <p className="text-sm text-muted-foreground font-sans">
            Auditing 4 heterogeneous municipal streams for packet integrity, latency variance, and automated fallback triggers.
          </p>
        </div>

        <div className="flex items-center space-x-5 shrink-0 relative z-10">
          <div className="text-right hidden sm:block bg-black/20 p-2.5 rounded-xl border border-white/5">
            <div className="text-[9px] font-sans text-muted-foreground uppercase tracking-[0.1em] mb-1">Last Sentinel Probe</div>
            <div className="text-xs font-mono text-emerald-400 font-bold">{lastProbeTime}</div>
          </div>
          <button
            onClick={probeFeedsNow}
            disabled={isProbingFeeds}
            className="h-12 px-6 rounded-xl bg-blue-500 hover:bg-blue-400 text-black font-sans text-xs font-bold tracking-[0.1em] uppercase flex items-center space-x-2 transition-all duration-300 disabled:opacity-50 shadow-[0_0_15px_rgba(59,130,246,0.3)] focus:ring-2 focus:ring-blue-400"
          >
            <RefreshCw className={`w-4 h-4 ${isProbingFeeds ? 'animate-spin' : ''}`} />
            <span>{isProbingFeeds ? 'PROBING TELEMETRY...' : 'PROBE FEEDS NOW'}</span>
          </button>
        </div>
      </motion.div>

      {/* 4 Feeds Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {feeds.map(feed => {
          const isOffline = feed.status === 'OFFLINE';
          const isSelected = feed.id === selectedFeedId;

          return (
            <div
              key={feed.id}
              onClick={() => setSelectedFeedId(feed.id)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 relative overflow-hidden group ${
                isSelected
                  ? 'border-blue-500/50 bg-white/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                  : isOffline
                  ? 'border-rose-500/30 bg-black/40 hover:border-rose-500/50'
                  : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              {isSelected && <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>}
              {isOffline && <div className="absolute inset-0 bg-rose-500/5 pointer-events-none"></div>}

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="font-mono text-muted-foreground font-bold bg-white/5 px-2 py-0.5 rounded">{feed.feedNumber}</span>
                  <span className={`h-6 px-3 rounded-full text-[9px] font-sans uppercase tracking-[0.1em] font-bold flex items-center space-x-1.5 border shadow-sm ${
                    isOffline
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,1)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]'}`}></span>
                    <span>{feed.status}</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg font-medium text-foreground leading-snug group-hover:text-blue-300 transition-colors">
                  {feed.name}
                </h3>

                <p className="text-xs text-muted-foreground/80 font-sans leading-relaxed line-clamp-2">
                  {feed.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2 font-sans text-xs relative z-10">
                <div className="flex justify-between text-muted-foreground">
                  <span>Latency / Jitter:</span>
                  <strong className={isOffline ? 'text-rose-400 font-mono' : 'text-emerald-400 font-mono'}>
                    {feed.latencyMs}ms / ±{feed.jitterMs}ms
                  </strong>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Cadence:</span>
                  <span className="text-foreground font-mono text-[11px] bg-white/5 px-1.5 rounded">{feed.frequency}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Packets Dropped:</span>
                  <span className={feed.packetsDropped > 0 ? 'text-rose-400 font-mono font-bold' : 'text-emerald-400 font-mono font-bold'}>
                    {feed.packetsDropped}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Selected Feed Inspector & Raw Payload Viewer */}
      <motion.div variants={itemVariants} className="glass-card p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="font-sans text-[10px] text-purple-400 uppercase tracking-[0.15em] font-bold mb-2">
              PAYLOAD SENTINEL & PROTOCOL INSPECTOR
            </div>
            <h2 className="font-serif text-2xl font-medium text-foreground flex items-center gap-3">
              <span className="text-muted-foreground font-mono text-sm bg-white/5 px-2 py-1 rounded">{selectedFeed.feedNumber}</span> 
              {selectedFeed.name}
            </h2>
          </div>

          <button
            onClick={() => setShowPayload(!showPayload)}
            className="h-10 px-5 rounded-lg bg-white/5 hover:bg-white/10 text-foreground font-sans text-[11px] font-bold tracking-[0.1em] uppercase border border-white/10 transition-all duration-300 flex items-center justify-center space-x-2 shrink-0"
          >
            <Code className="w-4 h-4 text-purple-400" />
            <span>{showPayload ? 'HIDE RAW PAYLOAD' : 'VIEW RAW JSON'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 font-sans text-xs">
            <div className="p-4 bg-black/20 border border-white/5 rounded-xl space-y-1.5 hover:bg-white/5 transition-colors">
              <div className="text-muted-foreground text-[10px] uppercase tracking-[0.1em] font-bold">INGEST PROTOCOL</div>
              <div className="text-foreground font-bold font-mono text-sm">{selectedFeed.protocol}</div>
            </div>

            <div className="p-4 bg-black/20 border border-white/5 rounded-xl space-y-1.5 hover:bg-white/5 transition-colors">
              <div className="text-muted-foreground text-[10px] uppercase tracking-[0.1em] font-bold">STATUS DIAGNOSTIC</div>
              <div className={selectedFeed.status === 'OFFLINE' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {selectedFeed.statusDetail}
              </div>
            </div>

            <div className="p-4 bg-black/20 border border-white/5 rounded-xl space-y-1.5 hover:bg-white/5 transition-colors">
              <div className="text-muted-foreground text-[10px] uppercase tracking-[0.1em] font-bold">DEGRADATION IMPACT</div>
              <div className="text-muted-foreground/90 leading-relaxed text-[13px]">{selectedFeed.degradationImpact}</div>
            </div>

            <div className="p-4 bg-black/20 border border-white/5 rounded-xl space-y-1.5 overflow-x-auto hover:bg-white/5 transition-colors">
              <div className="text-muted-foreground text-[10px] uppercase tracking-[0.1em] font-bold">SHA-256 TELEMETRY DIGEST</div>
              <div className="text-blue-400/80 text-[11px] font-mono break-all">{selectedFeed.lastIngestSha256}</div>
            </div>
          </div>

          {showPayload && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/60 border border-white/10 rounded-xl p-5 font-mono text-xs overflow-x-auto max-h-[400px] shadow-inner relative group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <div className="text-muted-foreground text-[10px] mb-3 uppercase tracking-wider font-bold flex items-center gap-2">
                <Code className="w-3 h-3"/> Parsed Inbound Telemetry Payload
              </div>
              <pre className="text-emerald-400/90 leading-relaxed">
                {JSON.stringify(selectedFeed.samplePayload, null, 2)}
              </pre>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Section 02: Graceful Degradation Protocol Architecture */}
      <motion.div variants={itemVariants} className="glass-card p-6 lg:p-8 space-y-6">
        <div className="border-b border-white/10 pb-5">
          <div className="font-sans text-[10px] text-amber-400 uppercase tracking-[0.15em] font-bold mb-2">
            SECTION 02 <span className="mx-2 text-white/20">|</span> RECOVERY PROTOCOL
          </div>
          <h2 className="font-serif text-2xl font-medium text-foreground">
            Graceful Degradation Architecture
          </h2>
          <p className="text-sm text-muted-foreground font-sans mt-1.5">
            Deterministic 4-phase failure tolerance executed when municipal feeds stall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEGRADATION_PROTOCOL_STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl space-y-4 relative transition-all duration-300 ${
                step.status === 'ACTIVE NOW'
                  ? 'bg-amber-500/10 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-black/20 border border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-sans">
                <span className={`font-bold uppercase tracking-[0.1em] ${step.status === 'ACTIVE NOW' ? 'text-amber-400' : 'text-foreground'}`}>{step.phase}</span>
                <span className={`h-6 px-2.5 rounded-md text-[9px] font-bold uppercase tracking-[0.1em] flex items-center border ${
                  step.status === 'ACTIVE NOW'
                    ? 'bg-amber-500 text-black border-amber-500'
                    : step.status === 'COMPLETED'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-white/5 text-muted-foreground border-white/10'
                }`}>
                  {step.status}
                </span>
              </div>

              <h3 className="font-serif text-base font-medium text-foreground leading-snug">
                {step.title}
              </h3>

              <p className="text-xs text-muted-foreground/80 font-sans leading-relaxed">
                {step.detail}
              </p>

              <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-muted-foreground/60">
                Triggered at: <span className="text-foreground">{step.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Section 03: Ingest Sentinel & Verification Ledger */}
      <motion.div variants={itemVariants} className="glass-card p-6 lg:p-8 space-y-6 overflow-hidden">
        <div className="border-b border-white/10 pb-5">
          <div className="font-sans text-[10px] text-emerald-400 uppercase tracking-[0.15em] font-bold mb-2">
            SECTION 03 <span className="mx-2 text-white/20">|</span> SENTINEL LEDGER
          </div>
          <h2 className="font-serif text-2xl font-medium text-foreground">
            Verification Ledger
          </h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
          <table className="w-full text-left font-sans text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 text-[10px] text-muted-foreground uppercase tracking-[0.1em] bg-white/5">
                <th className="p-4 font-bold">Feed Identifier</th>
                <th className="p-4 font-bold">Protocol</th>
                <th className="p-4 font-bold">Ingest Status</th>
                <th className="p-4 font-bold">Latency</th>
                <th className="p-4 font-bold">Cryptographic Checksum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {feeds.map(feed => (
                <tr
                  key={feed.id}
                  className="hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="p-4 font-semibold text-foreground">{feed.name}</td>
                  <td className="p-4 font-mono text-muted-foreground bg-black/20"><span className="bg-white/5 px-2 py-1 rounded">{feed.protocol.split(' ')[0]}</span></td>
                  <td className="p-4">
                    <span className={`h-6 px-3 rounded-md text-[10px] font-bold uppercase tracking-[0.1em] inline-flex items-center border ${
                      feed.status === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    }`}>
                      {feed.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-foreground">{feed.latencyMs} ms</td>
                  <td className="p-4 font-mono text-blue-400/70 text-[11px]">{feed.lastIngestSha256.substring(0, 24)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};
