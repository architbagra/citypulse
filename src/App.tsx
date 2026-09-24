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

const MainContent: React.FC = () => {
  const { viewMode, setViewMode } = useCityPulse();

  return (
    <div className="min-h-screen flex flex-col bg-[#f6fbf4] dark:bg-[#121815] text-[#181d19] dark:text-[#edf2eb] transition-colors font-sans">
      <Navigation />

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6">
        {viewMode === 'live' && <LiveView />}
        {viewMode === 'map' && <MapExploreView />}
        {viewMode === 'relationships' && <RelationshipsView />}
        {viewMode === 'replay' && <ReplayView />}
        {viewMode === 'sources' && <DataSourcesView />}
      </main>

      {/* Global Modals & Notifications */}
      <ForensicLedgerModal />
      <MunicipalAlertModal />
      <NotificationBanner />

      {/* Epistemic Footer (Fine printmaking substrate per design.md) */}
      <footer className="border-t border-[#c2c8c4]/60 bg-[#f0f5ee] dark:bg-[#18201c] py-6 mt-12 text-[#52606f] dark:text-[#b8c0bb] font-sans text-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#182923] dark:bg-[#d3e7de]"></span>
            <span className="font-serif italic text-sm font-medium text-[#182923] dark:text-[#edf2eb]">
              CityPulse Institute
            </span>
            <span className="text-[#c2c8c4]">·</span>
            <span>Civic Cartography & Intelligence Framework</span>
            <span className="text-[#c2c8c4]">·</span>
            <span className="font-semibold text-[#182923] dark:text-[#d3e7de]">Scientific Covenant: Correlation ≠ Causation</span>
          </div>

          <div className="flex items-center space-x-5 uppercase tracking-[0.06em] text-[11px] font-semibold">
            <button
              onClick={() => setViewMode('live')}
              className="hover:text-[#182923] dark:hover:text-white transition-colors"
            >
              01 Live
            </button>
            <button
              onClick={() => setViewMode('map')}
              className="hover:text-[#182923] dark:hover:text-white transition-colors"
            >
              02 Map
            </button>
            <button
              onClick={() => setViewMode('relationships')}
              className="hover:text-[#182923] dark:hover:text-white transition-colors"
            >
              03 Coupling
            </button>
            <button
              onClick={() => setViewMode('replay')}
              className="hover:text-[#182923] dark:hover:text-white transition-colors"
            >
              04 Replay
            </button>
            <button
              onClick={() => setViewMode('sources')}
              className="hover:text-[#182923] dark:hover:text-white transition-colors"
            >
              05 Feeds
            </button>
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
