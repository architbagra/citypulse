/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CityPulseProvider, useCityPulse } from './context/CityPulseContext';
import { Navigation } from './components/Navigation';
import { LiveView } from './components/views/LiveView';
import { MapExploreView } from './components/views/MapExploreView';
import { RelationshipsView } from './components/views/RelationshipsView';
import { ReplayView } from './components/views/ReplayView';
import { DataSourcesView } from './components/views/DataSourcesView';
import { ForensicLedgerModal } from './components/modals/ForensicLedgerModal';
import { MunicipalAlertModal } from './components/modals/MunicipalAlertModal';
import { NotificationBanner } from './components/NotificationBanner';
import { motion, AnimatePresence } from 'framer-motion';

const MainContent: React.FC = () => {
  const { viewMode, setViewMode } = useCityPulse();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-soft"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <Navigation />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-8 relative z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full"
          >
            {viewMode === 'live' && <LiveView />}
            {viewMode === 'map' && <MapExploreView />}
            {viewMode === 'relationships' && <RelationshipsView />}
            {viewMode === 'replay' && <ReplayView />}
            {viewMode === 'sources' && <DataSourcesView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Modals & Notifications */}
      <ForensicLedgerModal />
      <MunicipalAlertModal />
      <NotificationBanner />

      {/* Premium Footer */}
      <footer className="glass-panel border-t border-white/5 py-8 mt-12 text-muted-foreground font-sans text-xs relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="relative flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 relative"></span>
            </div>
            <span className="font-serif italic text-sm font-medium text-foreground">
              CityPulse Institute
            </span>
            <span className="text-white/20">|</span>
            <span className="tracking-wide uppercase text-[10px] font-semibold">Civic Cartography & Intelligence</span>
            <span className="text-white/20">|</span>
            <span className="font-semibold text-emerald-400">Correlation ≠ Causation</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 uppercase tracking-[0.1em] text-[10px] font-bold">
            {['live', 'map', 'relationships', 'replay', 'sources'].map((mode, idx) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`transition-all duration-300 hover:text-foreground ${viewMode === mode ? 'text-primary' : 'text-muted-foreground'}`}
              >
                0{idx + 1} {mode === 'relationships' ? 'Coupling' : mode === 'sources' ? 'Feeds' : mode}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CityPulseProvider>
      <MainContent />
    </CityPulseProvider>
  );
}
