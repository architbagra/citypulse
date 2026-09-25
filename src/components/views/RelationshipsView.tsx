import React, { useState, useEffect } from 'react';
import { useCityPulse } from '../../context/CityPulseContext';
import { CityPulseAPI } from '../../api/client';
import { CorrelationInspectorModal } from '../modals/CorrelationInspectorModal';
import { motion } from 'framer-motion';
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
      <CorrelationInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

      {/* Protocol 07 Header Banner */}
      <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-purple-500 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-purple-500/20 transition-all duration-700 pointer-events-none"></div>
        <div className="flex items-center space-x-4 relative z-10">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <GitMerge className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="font-sans text-[10px] text-purple-400 uppercase tracking-[0.15em] font-bold mb-1">
              Protocol 07: Empirical Causality Matrix
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground text-gradient">
              Cross-Modal Signal Concordance
            </h1>
          </div>
        </div>
        <button
          onClick={() => setIsInspectorOpen(true)}
          className="h-11 px-5 bg-white/5 hover:bg-white/10 text-white font-sans text-[11px] font-bold uppercase tracking-[0.1em] rounded-xl transition-all duration-300 border border-white/10 flex items-center space-x-2 relative z-10 shrink-0"
        >
          <Maximize2 className="w-4 h-4 text-purple-400" />
          <span>Launch Causal Inspector</span>
        </button>
      </motion.div>

      {/* Causal Coupling Analysis */}
      <motion.div variants={itemVariants} className="glass-card p-6 lg:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 border-b border-white/10 pb-5">
          <div>
            <h2 className="font-serif text-xl font-medium text-foreground">Primary Causal Couplings</h2>
            <p className="text-sm text-muted-foreground font-sans mt-1">
              Topographic constraints translating atmospheric inputs into hydrodynamic traffic failure.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-[11px] font-sans font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 shrink-0">
            <Activity className="w-4 h-4" />
            <span>Bayesian Evidence Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SIGNAL_COUPLINGS.map((coup) => {
            const isSelected = selectedCoupling === coup.id;
            return (
              <div
                key={coup.id}
                onClick={() => setSelectedCoupling(coup.id)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'border-purple-500/50 bg-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                    : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                {isSelected && <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>}
                
                <div className="mb-5 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="h-6 px-2.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground font-mono text-[11px] font-bold flex items-center">
                      {coup.code}
                    </span>
                    <span className="font-sans text-[10px] uppercase font-bold tracking-[0.1em] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                      {coup.couplingStrength}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-foreground mb-2 leading-snug group-hover:text-purple-300 transition-colors duration-300">
                    {coup.name}
                  </h3>

                  <p className="text-xs text-muted-foreground/80 font-sans leading-relaxed line-clamp-3">
                    {coup.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-[11px] font-sans relative z-10">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Correlation (r):</span>
                    <strong className={coup.correlationCoefficient < 0 ? 'text-rose-400 font-mono' : 'text-emerald-400 font-mono'}>
                      {coup.correlationCoefficient}
                    </strong>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Temporal Lag:</span>
                    <span className="text-foreground font-mono font-bold bg-white/5 px-1.5 rounded">{coup.temporalLag}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Observed Delta:</span>
                    <span className={coup.deltaType === 'up' ? 'text-rose-400 font-mono font-bold' : 'text-emerald-400 font-mono font-bold'}>
                      {coup.deltaText}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Empirical Ground Truth vs. Synthetic Causal Inference Table */}
      <motion.div variants={itemVariants} className="glass-card p-6 lg:p-8 space-y-5 overflow-hidden">
        <div>
          <div className="font-sans text-[10px] text-blue-400 uppercase tracking-[0.15em] font-bold mb-2">
            EPISTEMIC BOUNDS MATRIX
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-medium text-foreground">
            Empirical Ground Truth vs. Synthetic Causal Inference
          </h2>
          <p className="text-sm text-muted-foreground font-sans mt-1">
            Explicitly delineating calibrated physical sensor facts from algorithmic proxy extrapolation.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
          <table className="w-full text-left font-sans text-xs border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 font-sans text-[10px] text-muted-foreground uppercase tracking-[0.1em] bg-white/5">
                <th className="p-4 w-1/4 font-bold">Domain Stream</th>
                <th className="p-4 w-3/8 font-bold text-foreground">Direct Observational Facts (Ground Truth)</th>
                <th className="p-4 w-3/8 font-bold text-blue-400">Synthetic Interpretation (Derived Inference)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {EMPIRICAL_VS_SYNTHETIC_ROWS.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="p-4 font-sans font-semibold text-foreground align-top">
                    {row.category}
                    <div className="text-[10px] font-medium text-muted-foreground/70 font-mono mt-1 bg-white/5 inline-block px-1.5 rounded">{row.confidence}</div>
                  </td>
                  <td className="p-4 text-muted-foreground leading-relaxed align-top">
                    {row.directObservation}
                  </td>
                  <td className="p-4 text-muted-foreground/80 leading-relaxed align-top border-l border-white/5">
                    {row.syntheticInference}
                    <div className="mt-2 text-[10px] text-blue-400/70 font-sans italic flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3"/> Bound: {row.epistemicBound}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Historical Jaipur Monsoon Analogs & Recovery Trajectory */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historical Analogs */}
        <div className="glass-card p-6 lg:p-8 space-y-5">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <History className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl font-medium text-foreground">
              Historical Jaipur Analogs
            </h3>
          </div>

          <div className="space-y-4">
            {HISTORICAL_JAIPUR_ANALOGS.map((analog, idx) => (
              <div key={idx} className="p-5 bg-black/20 border border-white/5 hover:border-amber-500/30 transition-all duration-300 rounded-xl space-y-3 relative group">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-foreground font-serif font-medium text-[15px]">{analog.date} — {analog.eventTitle}</span>
                  <span className="h-6 px-2.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-mono text-[10px] font-bold flex items-center shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    {analog.similarityScore}% MATCH
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 font-mono text-[11px] text-muted-foreground py-2 border-y border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider mb-0.5">Peak</span>
                    <strong className="text-foreground">{analog.peakPrecip}</strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider mb-0.5">Min Spd</span>
                    <strong className="text-foreground">{analog.minSpeed}</strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider mb-0.5">Drain</span>
                    <strong className="text-foreground">{analog.drainTime}</strong>
                  </div>
                </div>
                <p className="text-[12px] text-muted-foreground/80 font-sans leading-relaxed">
                  Outcome: {analog.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Drainage Recovery Trajectory */}
        <div className="glass-card p-6 lg:p-8 space-y-5">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl font-medium text-foreground">
              Recovery Trajectory Curve
            </h3>
          </div>

          <p className="text-sm text-muted-foreground font-sans">
            Forecasted drainage clearance assuming Mobile Pump Unit #04 remains deployed and rainfall eases below 5 mm/h.
          </p>

          <div className="space-y-4 pt-2">
            {RECOVERY_TRAJECTORY_POINTS.map((pt, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-sans">
                  <span className="text-foreground font-medium">{pt.t}: <span className="text-muted-foreground">{pt.label}</span></span>
                  <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-1.5 rounded">{pt.level}% head</span>
                </div>
                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pt.level}%` }}
                    transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-[11px] font-sans text-muted-foreground/70 italic flex items-center gap-2 mt-4">
            <Settings2 className="w-4 h-4 text-emerald-400/50" />
            Modeled using Manning's equation for open channel flow with 35% siltation factor at Conduit S-04.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
