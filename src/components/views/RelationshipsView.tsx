import React, { useState, useEffect } from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { CityPulseAPI } from '../../api/client';
import { CorrelationInspectorModal } from '../modals/CorrelationInspectorModal';
import {
  GitMerge,
  ShieldAlert,
  History,
  TrendingDown,
  Activity,
  Maximize2,
  Network, 
  ArrowRight, 
  Zap, 
  Target, 
  Beaker, 
  Clock, 
  GitCommit, 
  Settings2, 
  BarChart2
} from 'lucide-react';

export const RelationshipsView: React.FC = () => {
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const { activeEvent } = useCityPulse();
  const [selectedCoupling, setSelectedCoupling] = useState<string | null>(null);

  const [SIGNAL_COUPLINGS, setSignalCouplings] = useState<any[]>([]);
  const [EMPIRICAL_VS_SYNTHETIC_ROWS, setEmpirical] = useState<any[]>([]);
  const [HISTORICAL_JAIPUR_ANALOGS, setHistorical] = useState<any[]>([]);
  const [RECOVERY_TRAJECTORY_POINTS, setRecovery] = useState<any[]>([]);

  useEffect(() => {
    CityPulseAPI.getRelationshipsCauses().then(data => setSignalCouplings(data)).catch(console.error);
    CityPulseAPI.getRelationshipsEmpirical().then(data => setEmpirical(data)).catch(console.error);
    CityPulseAPI.getRelationshipsHistorical().then(data => setHistorical(data)).catch(console.error);
    CityPulseAPI.getRelationshipsRecovery().then(data => setRecovery(data)).catch(console.error);
  }, []);

  const currentCouplingData = SIGNAL_COUPLINGS.find(c => c.id === selectedCoupling);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <CorrelationInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

      {/* Protocol 07 Header Banner (Archival White Card with Print Shadow) */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-5 flex items-center justify-between shadow-print">
        <div className="flex items-center space-x-4">
          <div className="p-2.5 bg-[#f0f5ee] border border-[#eaefe8] rounded-[0.25rem]">
            <GitMerge className="w-5 h-5 text-[#3a4856]" />
          </div>
          <div>
            <div className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold mb-0.5">
              Protocol 07: Empirical Causality Matrix
            </div>
            <h1 className="font-serif text-xl font-medium text-[#182923]">
              Cross-Modal Signal Concordance
            </h1>
          </div>
        </div>
        <button
          onClick={() => setIsInspectorOpen(true)}
          className="h-9 px-4 bg-[#182923] hover:bg-[#2b4138] text-white font-sans text-xs font-semibold rounded-[0.25rem] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex items-center space-x-2 border border-transparent focus:ring-2 focus:ring-[#7879f1] focus:ring-offset-1 focus:outline-none"
        >
          <Maximize2 className="w-3.5 h-3.5 opacity-80" />
          <span>Launch Causal Inspector</span>
        </button>
      </div>

      {/* Causal Coupling Analysis */}
      <div className="bg-[#ffffff] border border-[#c2c8c4]/60 rounded-[0.25rem] p-6 shadow-print">
        <div className="flex items-center justify-between mb-6 border-b border-[#eaefe8] pb-4">
          <div>
            <h2 className="font-serif text-lg font-medium text-[#182923]">Primary Causal Couplings</h2>
            <p className="text-xs text-[#52606f] font-sans mt-1">
              Topographic constraints translating atmospheric inputs into hydrodynamic traffic failure.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-sans text-[#52606f] bg-[#f0f5ee] px-3 py-1.5 rounded-[0.25rem] border border-[#dfe4dd]">
            <Activity className="w-3.5 h-3.5 text-[#3a4856]" />
            <span>Bayesian Evidence Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {SIGNAL_COUPLINGS.map((coup) => (
            <div
              key={coup.id}
              onClick={() => setSelectedCoupling(coup.id)}
              className={`p-5 rounded-[0.25rem] border transition-all cursor-pointer ${
                selectedCoupling === coup.id
                  ? 'border-[#7879f1] bg-[#f7f9f6] shadow-sm'
                  : 'border-[#eaefe8] bg-[#fdfdfc] hover:border-[#c2c8c4] hover:bg-[#fcfdfc]'
              }`}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="h-5 px-2 rounded-[0.25rem] bg-[#f0f5ee] border border-[#dfe4dd] text-[#3a4856] font-mono text-[10px] font-bold flex items-center">
                    {coup.code}
                  </span>
                  <span className="font-sans text-[10px] uppercase font-bold tracking-wider text-[#7879f1]">
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
                  <span className="text-[#182923] font-serif font-medium text-sm">{analog.date} — {analog.eventTitle}</span>
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
