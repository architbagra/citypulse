import React, { useState } from 'react';
import { SIGNAL_COUPLINGS } from '../../data/mock/relationships';
import { X, GitMerge, CheckCircle2 } from 'lucide-react';

interface CorrelationInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CorrelationInspectorModal: React.FC<CorrelationInspectorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedPair, setSelectedPair] = useState<string>('pair-1');

  if (!isOpen) return null;

  const currentPair = SIGNAL_COUPLINGS.find(p => p.id === selectedPair) || SIGNAL_COUPLINGS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#182923]/60 backdrop-blur-[12px] animate-in fade-in duration-200">
      <div className="bg-[#ffffff] border border-[#c2c8c4]/80 rounded-[0.25rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-print-lg flex flex-col text-[#181d19]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#eaefe8] flex items-center justify-between sticky top-0 bg-[#ffffff] z-10">
          <div className="flex items-center space-x-2.5">
            <GitMerge className="w-5 h-5 text-[#182923]" />
            <div>
              <span className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold block">
                BIVARIATE CROSS-CORRELATION WORKBENCH
              </span>
              <h2 className="font-serif text-xl font-medium text-[#182923]">
                Signal Coupling & Cross-Lag Telemetry
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#52606f] hover:text-[#182923] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Signal Pair Selector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#eaefe8] pb-3">
            {SIGNAL_COUPLINGS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPair(p.id)}
                className={`h-8 px-3 rounded-[0.25rem] font-sans text-xs uppercase tracking-[0.06em] transition-all flex items-center space-x-2 ${
                  p.id === selectedPair
                    ? 'bg-[#182923] text-white font-medium shadow-print'
                    : 'bg-[#f0f5ee] text-[#52606f] hover:text-[#182923] hover:bg-[#e5eae3]'
                }`}
              >
                <span>{p.code}</span>
                <span className="text-[10px] font-mono opacity-80">(r={p.correlationCoefficient})</span>
              </button>
            ))}
          </div>

          {/* Active Pair Deep Dive */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-serif text-xl font-medium text-[#182923]">
                {currentPair.name}
              </h3>
              <span className="h-6 px-2.5 rounded-full text-[10px] font-sans uppercase tracking-[0.06em] font-bold bg-[#eaefe8] text-[#182923] border border-[#182923]/15 flex items-center">
                {currentPair.couplingStrength}
              </span>
            </div>

            <p className="text-xs text-[#424845] font-sans leading-relaxed">
              {currentPair.description}
            </p>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
              <div className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-1">
                <div className="text-[10px] text-[#52606f] uppercase tracking-[0.06em]">PEARSON CORRELATION (r)</div>
                <div className={`text-2xl font-mono font-bold ${currentPair.correlationCoefficient < 0 ? 'text-[#8a2d2d]' : 'text-[#182923]'}`}>
                  {currentPair.correlationCoefficient}
                </div>
                <div className="text-[11px] text-[#52606f]">Synchronous coupling coefficient</div>
              </div>

              <div className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-1">
                <div className="text-[10px] text-[#52606f] uppercase tracking-[0.06em]">TEMPORAL OFFSET (τ)</div>
                <div className="text-2xl font-mono font-bold text-[#182923]">
                  {currentPair.temporalLag}
                </div>
                <div className="text-[11px] text-[#52606f]">Physical runoff conveyance delay</div>
              </div>

              <div className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-1">
                <div className="text-[10px] text-[#52606f] uppercase tracking-[0.06em]">OBSERVED MAGNITUDE</div>
                <div className="text-2xl font-mono font-bold text-[#182923]">
                  {currentPair.deltaText}
                </div>
                <div className="text-[11px] text-[#52606f]">Relative to dry-weather baseline</div>
              </div>
            </div>

            {/* Synthetic Sparkline Visualizer */}
            <div className="pt-2">
              <div className="text-[11px] font-sans text-[#52606f] uppercase tracking-[0.06em] font-semibold mb-2">
                Cross-Correlation Function R_xy(τ) across Temporal Lags (-30m to +30m)
              </div>
              <div className="h-28 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] flex items-end px-4 py-3 space-x-2 justify-between">
                {[-15, -10, -5, 0, 5, 7, 10, 15, 20, 25, 30].map((t, idx) => {
                  const isPeak = t === 7;
                  const height = isPeak ? 90 : Math.max(15, 80 - Math.abs(t - 7) * 4.5);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group">
                      <div
                        className={`w-full rounded-t-[0.125rem] transition-all ${
                          isPeak ? 'bg-[#7879f1]' : 'bg-[#182923]/40 group-hover:bg-[#182923]'
                        }`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="font-mono text-[9px] text-[#737875] mt-1.5">
                        {t > 0 ? `+${t}m` : `${t}m`}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="text-[11px] text-[#52606f] font-sans text-center mt-1.5">
                Maximum mathematical correlation locked at <strong>τ = +7.0 minutes</strong> (lag between rainfall onset and arterial friction onset).
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#eaefe8] bg-[#f0f5ee] flex justify-end">
          <button
            onClick={onClose}
            className="h-9 px-5 rounded-[0.25rem] bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-medium tracking-[0.06em] uppercase transition-all shadow-print"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
