import React, { useState } from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import {
  SIGNAL_COUPLINGS,
  EMPIRICAL_VS_SYNTHETIC_ROWS,
  HISTORICAL_JAIPUR_ANALOGS,
  RECOVERY_TRAJECTORY_POINTS
} from '../../data/mock/relationships';
import { CorrelationInspectorModal } from '../modals/CorrelationInspectorModal';
import {
  GitMerge,
  ShieldAlert,
  History,
  TrendingDown,
  Activity,
  Maximize2
} from 'lucide-react';

export const RelationshipsView: React.FC = () => {
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const { activeEvent } = useCityPulse();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <CorrelationInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

      {/* Protocol 07 Header Banner (Archival White Card with Print Shadow) */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 lg:p-7 shadow-print flex flex-col md:flex-row md:items-center justify-between gap-5 relative">
        <div className="absolute top-2 right-2 font-mono text-[10px] text-[#737875]/30 select-none">+</div>
        <div className="absolute bottom-2 left-2 font-mono text-[10px] text-[#737875]/30 select-none">+</div>

        <div>
          <div className="flex items-center space-x-2 font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-1.5">
            <GitMerge className="w-4 h-4 text-[#7879f1]" />
            <span>PROTOCOL 07 · CROSS-SENSOR TELEMETRY</span>
            <span className="text-[#c2c8c4]">/</span>
            <span>SPATIAL-TEMPORAL CONCORDANCE ENGINE</span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-medium text-[#182923] tracking-tight">
            Signal Relationships & Epistemic Bounds
          </h1>
          <p className="text-xs text-[#52606f] font-sans mt-1">
            Confluence Node: Conduit Lock Alpha · Ashok Nagar & M.I. Road Corridor (Zone A)
          </p>
        </div>

        <button
          onClick={() => setIsInspectorOpen(true)}
          className="h-10 px-5 rounded-[0.25rem] bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-medium tracking-[0.06em] uppercase flex items-center space-x-2 transition-all shrink-0 shadow-print focus:ring-2 focus:ring-[#7879f1] focus:ring-offset-2"
        >
          <Maximize2 className="w-4 h-4" />
          <span>EXPAND CORRELATION INSPECTOR</span>
        </button>
      </div>

      {/* Scientific Covenant Pill Banner */}
      <div className="p-5 bg-[#ffffff] border border-[#bfa15f]/40 rounded-[0.25rem] shadow-print flex items-start space-x-3.5 text-xs">
        <ShieldAlert className="w-5 h-5 text-[#bfa15f] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-sans text-[#182923] font-bold uppercase tracking-[0.08em] text-[11px]">
            SCIENTIFIC COVENANT: CORRELATION ≠ CAUSATION
          </div>
          <p className="text-[#424845] font-sans leading-relaxed text-[13px]">
            CityPulse quantifies mathematical coincidence across independent municipal streams. High correlation (89.4%) signals synchronized municipal distress, but causal attribution (e.g., choked catch-basins vs. sheer cloudburst volume) requires physical on-site audit.
          </p>
        </div>
      </div>

      {/* 4-Signal Coupling Breakdown (Cards with 1px border and print shadows) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-medium text-[#182923] flex items-center space-x-2">
            <Activity className="w-4 h-4 text-[#7879f1]" />
            <span>Four-Signal Coupling Breakdown</span>
          </h2>
          <span className="font-sans text-xs text-[#52606f]">
            Composite Overlap: <strong className="text-[#8a2d2d] font-mono">89.4%</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SIGNAL_COUPLINGS.map(coup => (
            <div
              key={coup.id}
              className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-4 shadow-print hover:border-[#182923]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-sans mb-2">
                  <span className="font-mono text-[#52606f] font-semibold">{coup.code}</span>
                  <span className="h-5 px-2 rounded-full text-[9px] font-sans uppercase tracking-[0.06em] font-bold bg-[#eaefe8] text-[#182923] border border-[#182923]/15 flex items-center">
                    {coup.couplingStrength}
                  </span>
                </div>

                <h3 className="font-serif text-base font-medium text-[#182923] mb-1.5 leading-snug">
                  {coup.name}
                </h3>

                <p className="text-xs text-[#52606f] font-sans leading-relaxed mb-3">
                  {coup.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#eaefe8] space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-[#52606f]">
                  <span>Correlation (r):</span>
                  <strong className={coup.correlationCoefficient < 0 ? 'text-[#8a2d2d] font-mono' : 'text-[#182923] font-mono'}>
                    {coup.correlationCoefficient}
                  </strong>
                </div>
                <div className="flex justify-between text-[#52606f]">
                  <span>Temporal Lag:</span>
                  <span className="text-[#181d19] font-mono text-[11px]">{coup.temporalLag}</span>
                </div>
                <div className="flex justify-between text-[#52606f]">
                  <span>Observed Delta:</span>
                  <span className={coup.deltaType === 'up' ? 'text-[#182923] font-mono font-bold' : 'text-[#8a2d2d] font-mono font-bold'}>
                    {coup.deltaText}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empirical Ground Truth vs. Synthetic Causal Inference Table */}
      {/* Design.md List & Data Records: strictly 1px horizontal hairlines, no alternating banded stripes, hover shifts to #f7f9f6 with 2px left border in #7879f1 */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-4 shadow-print">
        <div>
          <div className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-1">
            EPISTEMIC BOUNDS MATRIX
          </div>
          <h2 className="font-serif text-xl font-medium text-[#182923]">
            Empirical Ground Truth vs. Synthetic Causal Inference
          </h2>
          <p className="text-xs text-[#52606f] font-sans">
            Explicitly delineating calibrated physical sensor facts from algorithmic proxy extrapolation.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#c2c8c4]/60 font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] bg-[#f0f5ee]">
                <th className="p-3.5 w-1/5 font-semibold">Domain Stream</th>
                <th className="p-3.5 w-2/5 font-semibold text-[#182923]">Direct Observational Facts (Ground Truth)</th>
                <th className="p-3.5 w-2/5 font-semibold text-[#3a4856]">Synthetic Interpretation (Derived Inference)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaefe8]">
              {EMPIRICAL_VS_SYNTHETIC_ROWS.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#f7f9f6] border-l-2 border-l-transparent hover:border-l-[#7879f1] transition-all"
                >
                  <td className="p-3.5 font-sans font-semibold text-[#182923] align-top">
                    {row.category}
                    <div className="text-[11px] font-normal text-[#737875] font-mono mt-1">{row.confidence}</div>
                  </td>
                  <td className="p-3.5 text-[#181d19] leading-relaxed align-top">
                    {row.directObservation}
                  </td>
                  <td className="p-3.5 text-[#424845] leading-relaxed align-top">
                    {row.syntheticInference}
                    <div className="mt-1 text-[11px] text-[#52606f] font-sans italic">
                      Epistemic Bound: {row.epistemicBound}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Jaipur Monsoon Analogs & Recovery Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historical Analogs */}
        <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-4 shadow-print">
          <div className="flex items-center space-x-2 border-b border-[#eaefe8] pb-3">
            <History className="w-4 h-4 text-[#182923]" />
            <h3 className="font-serif text-lg font-medium text-[#182923]">
              Historical Jaipur Monsoon Analogs
            </h3>
          </div>

          <div className="space-y-3.5">
            {HISTORICAL_JAIPUR_ANALOGS.map((analog, idx) => (
              <div key={idx} className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#182923] font-serif font-medium text-sm">{analog.date} · {analog.eventTitle}</span>
                  <span className="h-5 px-2 rounded-full bg-[#e1dfff] text-[#0a006b] font-mono text-[10px] font-bold flex items-center">
                    {analog.similarityScore}% MATCH
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-[#52606f] py-1 border-y border-[#dfe4dd]">
                  <div>Peak: <strong className="text-[#182923]">{analog.peakPrecip}</strong></div>
                  <div>Min Spd: <strong className="text-[#182923]">{analog.minSpeed}</strong></div>
                  <div>Drain: <strong className="text-[#182923]">{analog.drainTime}</strong></div>
                </div>
                <p className="text-xs text-[#424845] font-sans leading-relaxed">
                  Historical Outcome: {analog.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Drainage Recovery Trajectory */}
        <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 space-y-4 shadow-print">
          <div className="flex items-center space-x-2 border-b border-[#eaefe8] pb-3">
            <TrendingDown className="w-4 h-4 text-[#182923]" />
            <h3 className="font-serif text-lg font-medium text-[#182923]">
              Estimated Hydrodynamic Recovery Curve
            </h3>
          </div>

          <p className="text-xs text-[#52606f] font-sans">
            Forecasted drainage clearance assuming Mobile Pump Unit #04 remains deployed and rainfall eases below 5 mm/h.
          </p>

          <div className="space-y-3.5 pt-2">
            {RECOVERY_TRAJECTORY_POINTS.map((pt, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-[#181d19] font-medium">{pt.t}: {pt.label}</span>
                  <span className="text-[#3a4856] font-mono font-semibold">{pt.level}% head</span>
                </div>
                <div className="w-full h-2 bg-[#eaefe8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7879f1] rounded-full transition-all"
                    style={{ width: `${pt.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] text-[11px] font-sans text-[#52606f]">
            Modeled using Manning's equation for open channel flow with 35% siltation factor at Conduit S-04.
          </div>
        </div>
      </div>
    </div>
  );
};
