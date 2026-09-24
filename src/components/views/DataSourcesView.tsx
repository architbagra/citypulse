import React, { useState } from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { DEGRADATION_PROTOCOL_STEPS } from '../../data/mock/feeds';
import {
  Database,
  RefreshCw,
  Code
} from 'lucide-react';

export const DataSourcesView: React.FC = () => {
  const { feeds, isProbingFeeds, probeFeedsNow, lastProbeTime } = useCityPulse();
  const [selectedFeedId, setSelectedFeedId] = useState<string>('feed-04');
  const [showPayload, setShowPayload] = useState<boolean>(true);

  const selectedFeed = feeds.find(f => f.id === selectedFeedId) || feeds[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner: Civic Feed Ledger & Protocol Sentinel (Archival Paper per design.md) */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 lg:p-7 shadow-print flex flex-col md:flex-row md:items-center justify-between gap-5 relative">
        <div className="absolute top-2 right-2 font-mono text-[10px] text-[#737875]/30 select-none">+</div>
        <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#737875]/30 select-none">+</div>

        <div>
          <div className="flex items-center space-x-2 font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-1.5">
            <Database className="w-4 h-4 text-[#7879f1]" />
            <span>SECTION 01 · THE CIVIC FEED LEDGER</span>
            <span className="text-[#c2c8c4]">/</span>
            <span>EPISTEMIC TELEMETRY</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#182923] tracking-tight">
            Epistemic Telemetry & Graceful Degradation
          </h1>
          <p className="text-xs text-[#52606f] font-sans mt-1">
            Auditing 4 heterogeneous municipal streams for packet integrity, latency variance, and automated fallback triggers.
          </p>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-sans text-[#737875] uppercase tracking-[0.06em]">Last Sentinel Probe</div>
            <div className="text-xs font-mono text-[#182923] font-semibold">{lastProbeTime}</div>
          </div>
          <button
            onClick={probeFeedsNow}
            disabled={isProbingFeeds}
            className="h-10 px-5 rounded-[0.25rem] bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-medium tracking-[0.06em] uppercase flex items-center space-x-2 transition-all disabled:opacity-50 shadow-print focus:ring-2 focus:ring-[#7879f1] focus:ring-offset-2"
          >
            <RefreshCw className={`w-4 h-4 ${isProbingFeeds ? 'animate-spin' : ''}`} />
            <span>{isProbingFeeds ? 'PROBING TELEMETRY...' : 'PROBE FEEDS NOW'}</span>
          </button>
        </div>
      </div>

      {/* 4 Feeds Grid (Raised Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {feeds.map(feed => {
          const isOffline = feed.status === 'OFFLINE';
          const isSelected = feed.id === selectedFeedId;

          return (
            <div
              key={feed.id}
              onClick={() => setSelectedFeedId(feed.id)}
              className={`p-6 bg-[#ffffff] border rounded-[0.25rem] cursor-pointer transition-all flex flex-col justify-between space-y-4 shadow-print ${
                isSelected
                  ? 'border-[#182923] ring-1 ring-[#182923]'
                  : isOffline
                  ? 'border-[#c25e5e]/40 hover:border-[#c25e5e]'
                  : 'border-[#c2c8c4]/60 hover:border-[#182923]/40'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="font-mono text-[#52606f] font-semibold">{feed.feedNumber}</span>
                  <span className={`h-5 px-2 rounded-full text-[10px] font-sans uppercase tracking-[0.06em] font-bold flex items-center space-x-1 ${
                    isOffline
                      ? 'bg-[#ffdad6] text-[#8a2d2d] border border-[#c25e5e]/30'
                      : 'bg-[#eaefe8] text-[#50625b] border border-[#50625b]/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-[#c25e5e] animate-pulse' : 'bg-[#50625b]'}`}></span>
                    <span>{feed.status}</span>
                  </span>
                </div>

                <h3 className="font-serif text-base font-medium text-[#182923] leading-snug">
                  {feed.name}
                </h3>

                <p className="text-xs text-[#52606f] font-sans leading-relaxed">
                  {feed.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#eaefe8] space-y-1.5 font-sans text-xs">
                <div className="flex justify-between text-[#52606f]">
                  <span>Latency / Jitter:</span>
                  <strong className={isOffline ? 'text-[#8a2d2d] font-mono' : 'text-[#182923] font-mono'}>
                    {feed.latencyMs}ms / ±{feed.jitterMs}ms
                  </strong>
                </div>
                <div className="flex justify-between text-[#52606f]">
                  <span>Cadence:</span>
                  <span className="text-[#181d19] font-mono text-[11px]">{feed.frequency}</span>
                </div>
                <div className="flex justify-between text-[#52606f]">
                  <span>Packets Dropped:</span>
                  <span className={feed.packetsDropped > 0 ? 'text-[#8a2d2d] font-mono font-bold' : 'text-[#50625b] font-mono'}>
                    {feed.packetsDropped}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Feed Inspector & Raw Payload Viewer */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-5 shadow-print">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eaefe8] pb-3">
          <div>
            <div className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-1">
              PAYLOAD SENTINEL & PROTOCOL INSPECTOR
            </div>
            <h2 className="font-serif text-xl font-medium text-[#182923]">
              {selectedFeed.feedNumber} · {selectedFeed.name}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPayload(!showPayload)}
              className="h-8 px-3 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#182923] font-sans text-xs font-semibold tracking-[0.06em] uppercase border border-[#182923]/15 transition-all flex items-center space-x-1.5"
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showPayload ? 'HIDE RAW PAYLOAD' : 'VIEW RAW JSON'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-3 font-sans text-xs">
            <div className="p-3.5 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-1">
              <div className="text-[#52606f] text-[10px] uppercase tracking-[0.06em]">INGEST PROTOCOL</div>
              <div className="text-[#182923] font-bold font-mono">{selectedFeed.protocol}</div>
            </div>

            <div className="p-3.5 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-1">
              <div className="text-[#52606f] text-[10px] uppercase tracking-[0.06em]">STATUS DIAGNOSTIC</div>
              <div className={selectedFeed.status === 'OFFLINE' ? 'text-[#8a2d2d] font-semibold' : 'text-[#50625b] font-semibold'}>
                {selectedFeed.statusDetail}
              </div>
            </div>

            <div className="p-3.5 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-1">
              <div className="text-[#52606f] text-[10px] uppercase tracking-[0.06em]">DEGRADATION IMPACT</div>
              <div className="text-[#424845] leading-relaxed">{selectedFeed.degradationImpact}</div>
            </div>

            <div className="p-3.5 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-1 overflow-x-auto">
              <div className="text-[#52606f] text-[10px] uppercase tracking-[0.06em]">SHA-256 TELEMETRY DIGEST</div>
              <div className="text-[#182923] text-[11px] font-mono break-all">{selectedFeed.lastIngestSha256}</div>
            </div>
          </div>

          {showPayload && (
            <div className="bg-[#182923] text-[#edf2eb] rounded-[0.25rem] p-4 font-mono text-xs overflow-x-auto max-h-72 shadow-inner">
              <div className="text-[#b7cbc2] text-[10px] mb-2 uppercase border-b border-[#3a4856]/40 pb-1">
                Parsed Inbound Telemetry Payload
              </div>
              <pre className="text-[#d5e4f6] leading-relaxed">
                {JSON.stringify(selectedFeed.samplePayload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Section 02: Graceful Degradation Protocol Architecture */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-5 shadow-print">
        <div className="border-b border-[#eaefe8] pb-3">
          <div className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-1">
            SECTION 02 · RECOVERY PROTOCOL
          </div>
          <h2 className="font-serif text-xl font-medium text-[#182923]">
            Graceful Degradation Protocol Architecture
          </h2>
          <p className="text-xs text-[#52606f] font-sans mt-0.5">
            Deterministic 4-phase failure tolerance executed when municipal feeds stall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {DEGRADATION_PROTOCOL_STEPS.map((step, idx) => (
            <div
              key={idx}
              className={`p-5 bg-[#f0f5ee] border rounded-[0.25rem] space-y-3 relative ${
                step.status === 'ACTIVE NOW'
                  ? 'border-[#182923] ring-1 ring-[#182923] shadow-print'
                  : 'border-[#c2c8c4]/60'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-sans">
                <span className="font-bold text-[#182923] uppercase tracking-[0.06em]">{step.phase}</span>
                <span className={`h-5 px-2 rounded-full text-[9px] font-bold uppercase tracking-[0.06em] flex items-center ${
                  step.status === 'ACTIVE NOW'
                    ? 'bg-[#182923] text-white'
                    : step.status === 'COMPLETED'
                    ? 'bg-[#eaefe8] text-[#50625b]'
                    : 'bg-[#dfe4dd] text-[#52606f]'
                }`}>
                  {step.status}
                </span>
              </div>

              <h3 className="font-serif text-sm font-medium text-[#182923] leading-snug">
                {step.title}
              </h3>

              <p className="text-xs text-[#424845] font-sans leading-relaxed">
                {step.detail}
              </p>

              <div className="pt-2 border-t border-[#dfe4dd] text-[10px] font-mono text-[#737875]">
                Triggered at: {step.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 03: Ingest Sentinel & Verification Ledger */}
      {/* Design.md List & Data Records: strictly 1px horizontal hairlines, no alternating banded stripes */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-4 shadow-print">
        <div className="border-b border-[#eaefe8] pb-3">
          <div className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-1">
            SECTION 03 · SENTINEL LEDGER
          </div>
          <h2 className="font-serif text-lg font-medium text-[#182923]">
            Ingest Sentinel & Verification Ledger
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#c2c8c4]/60 text-[10px] text-[#52606f] uppercase tracking-[0.08em] bg-[#f0f5ee]">
                <th className="p-3.5 font-semibold">Feed Identifier</th>
                <th className="p-3.5 font-semibold">Protocol</th>
                <th className="p-3.5 font-semibold">Ingest Status</th>
                <th className="p-3.5 font-semibold">Latency</th>
                <th className="p-3.5 font-semibold">Cryptographic Checksum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaefe8]">
              {feeds.map(feed => (
                <tr
                  key={feed.id}
                  className="hover:bg-[#f7f9f6] border-l-2 border-l-transparent hover:border-l-[#7879f1] transition-all"
                >
                  <td className="p-3.5 font-semibold text-[#182923]">{feed.name}</td>
                  <td className="p-3.5 font-mono text-[#52606f]">{feed.protocol.split(' ')[0]}</td>
                  <td className="p-3.5">
                    <span className={`h-5 px-2 rounded-full text-[10px] font-bold uppercase tracking-[0.06em] inline-flex items-center ${
                      feed.status === 'LIVE' ? 'bg-[#eaefe8] text-[#50625b]' : 'bg-[#ffdad6] text-[#8a2d2d]'
                    }`}>
                      {feed.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-[#182923]">{feed.latencyMs} ms</td>
                  <td className="p-3.5 font-mono text-[#737875] text-[11px]">{feed.lastIngestSha256.substring(0, 24)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
