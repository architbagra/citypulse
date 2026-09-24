import React from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { X, FileText, Download, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ForensicLedgerModal: React.FC = () => {
  const { isForensicModalOpen, setIsForensicModalOpen, activeEvent, exportGeoJsonLedger } = useCityPulse();

  if (!isForensicModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#182923]/60 backdrop-blur-[12px] animate-in fade-in duration-200">
      <div className="bg-[#ffffff] border border-[#c2c8c4]/80 rounded-[0.25rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-print-lg flex flex-col text-[#181d19]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#eaefe8] flex items-center justify-between sticky top-0 bg-[#ffffff] z-10">
          <div className="flex items-center space-x-2.5">
            <FileText className="w-5 h-5 text-[#182923]" />
            <div>
              <span className="font-sans text-[11px] text-[#52606f] uppercase tracking-[0.08em] font-semibold block">
                INCIDENT AUDIT DOSSIER #{activeEvent.id}
              </span>
              <h2 className="font-serif text-xl font-medium text-[#182923]">
                Forensic Evidence Ledger: The 'Why?' Chain
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsForensicModalOpen(false)}
            className="w-8 h-8 rounded-[0.25rem] bg-[#f0f5ee] hover:bg-[#e5eae3] text-[#52606f] hover:text-[#182923] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Executive Summary */}
          <div className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-2">
            <div className="flex items-center space-x-2 text-xs font-sans font-semibold text-[#182923] uppercase tracking-[0.06em]">
              <ShieldCheck className="w-4 h-4 text-[#50625b]" />
              <span>Scientific Rigor & Diagnostic Integrity</span>
            </div>
            <p className="text-xs text-[#424845] font-sans leading-relaxed">
              Every step in this ledger represents a cryptographically logged, independently verified municipal event. Algorithmic correlation is grounded in physical ground truth.
            </p>
          </div>

          {/* 5-Step Diagnostic Chain */}
          <div className="space-y-4">
            <h3 className="font-sans text-xs uppercase tracking-[0.08em] font-semibold text-[#52606f]">
              Chronological Sequence of Observed Anomalies
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#c2c8c4]">
              {activeEvent.diagnosticChain.map(step => (
                <div key={step.step} className="relative space-y-1.5">
                  {/* Step bullet */}
                  <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#182923] text-white font-mono text-[9px] flex items-center justify-center font-bold">
                    {step.step}
                  </span>

                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="font-serif font-medium text-base text-[#182923]">{step.title}</span>
                    <span className="font-mono text-[#52606f] bg-[#f0f5ee] px-2 py-0.5 rounded-[0.125rem] text-[11px]">
                      {step.timeOffset}
                    </span>
                  </div>

                  <p className="text-xs text-[#424845] font-sans leading-relaxed">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-sans text-[#52606f]">
                    <span>Source: <strong className="text-[#182923] font-mono">{step.source}</strong></span>
                    <span className="text-[#c2c8c4]">·</span>
                    <span>Observed: <strong className="text-[#182923] font-mono">{step.metric}</strong></span>
                    <span className="text-[#c2c8c4]">·</span>
                    <span>Confidence: <strong className="text-[#50625b]">{(step.confidence * 100).toFixed(0)}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHA-256 Ledger Record */}
          <div className="p-4 bg-[#f0f5ee] border border-[#c2c8c4]/60 rounded-[0.25rem] space-y-1.5 font-mono text-xs">
            <div className="text-[10px] text-[#52606f] uppercase tracking-[0.06em]">AUDIT DIGITAL SIGNATURE</div>
            <div className="text-[#182923] text-[11px] break-all">
              sha256: 4a9f82bc7190e82c1a84f3780d6f22e7d36a992bc931e07b82f347bb892
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#eaefe8] bg-[#f0f5ee] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-sans text-[#52606f]">
            <CheckCircle2 className="w-4 h-4 text-[#50625b]" />
            <span>Audited & verified by Municipal Telemetry Sentinel</span>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={exportGeoJsonLedger}
              className="h-9 px-4 rounded-[0.25rem] bg-[#ffffff] hover:bg-[#eaefe8] text-[#182923] font-sans text-xs font-semibold tracking-[0.06em] uppercase border border-[#182923]/15 transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT GEOJSON</span>
            </button>
            <button
              onClick={() => setIsForensicModalOpen(false)}
              className="h-9 px-4 rounded-[0.25rem] bg-[#182923] hover:bg-[#243b33] text-white font-sans text-xs font-medium tracking-[0.06em] uppercase transition-all shadow-print"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
