import React, { useState, useEffect } from 'react';
import { useCityPulse } from '../context/CityPulseContext';
import { ViewMode } from '../types';
import { Radio, Compass, GitMerge, RotateCcw, Database, Sun, Moon, Crosshair } from 'lucide-react';

export const Navigation: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    theme,
    toggleTheme,
    civicLensActive,
    setCivicLensActive,
    currentReplayMilestone
  } = useCityPulse();

  const [timeStr, setTimeStr] = useState<string>('14:00:00 IST');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { mode: ViewMode; label: string; number: string; icon: React.ReactNode }[] = [
    { mode: 'live', label: 'LIVE', number: '01', icon: <Radio className="w-3 h-3" /> },
    { mode: 'map', label: 'MAP EXPLORE', number: '02', icon: <Compass className="w-3 h-3" /> },
    { mode: 'relationships', label: 'RELATIONSHIPS', number: '03', icon: <GitMerge className="w-3 h-3" /> },
    { mode: 'replay', label: 'REPLAY', number: '04', icon: <RotateCcw className="w-3 h-3" /> },
    { mode: 'sources', label: 'DATA SOURCES', number: '05', icon: <Database className="w-3 h-3" /> }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#182923] text-[#edf2eb] border-b border-[#3a4856]/30 shadow-print transition-colors">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left Zone: Brand and Subtitle */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="relative flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#c25e5e] animate-ping absolute"></span>
              <span className="w-2 h-2 rounded-full bg-[#c25e5e]"></span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif italic font-medium tracking-tight text-xl text-white">
                CityPulse
              </span>
              <span className="font-sans text-[10px] tracking-[0.1em] text-[#b7cbc2] uppercase font-semibold">
                INSTITUTE
              </span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-2 font-sans text-[11px] text-[#b7cbc2] border-l border-[#3a4856]/40 pl-3">
            <span className="font-semibold tracking-wider">JAIPUR BASIN</span>
            <span className="text-[#52606f]">·</span>
            <span>CIVIC CARTOGRAPHY & TELEMETRY</span>
            <span className="text-[#52606f]">·</span>
            <span className="text-[#bfa15f] font-mono font-medium">ZONE A REGISTERED</span>
          </div>
        </div>

        {/* Center Zone: Five Navigation Tabs */}
        <nav className="flex items-center overflow-x-auto py-1 scrollbar-none space-x-1">
          {navItems.map(item => {
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`relative px-3 py-1.5 flex items-center space-x-1.5 text-xs font-sans tracking-[0.06em] uppercase transition-all whitespace-nowrap rounded-[0.25rem] ${
                  isActive
                    ? 'text-white bg-[#243b33] font-semibold border border-[#394a44]'
                    : 'text-[#b7cbc2] hover:text-white hover:bg-[#20342d] border border-transparent'
                }`}
              >
                <span className={`text-[10px] font-mono ${isActive ? 'text-[#7879f1]' : 'text-[#737875]'}`}>
                  {item.number} /
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#7879f1] rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Status Chip, Civic Lens & Theme Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Status Chip (pill radius per design.md) */}
          <div className="hidden xl:flex items-center space-x-1.5 h-6 px-2.5 rounded-full bg-[#ffdad6]/15 border border-[#c25e5e]/40 font-sans text-[10px] tracking-[0.06em] text-[#ffdad6] uppercase font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c25e5e] animate-pulse"></span>
            <span>CONCORDANCE 89.4%</span>
          </div>

          {/* Civic Lens Toggle */}
          <button
            onClick={() => setCivicLensActive(!civicLensActive)}
            title="Toggle Civic Lens reticle inspector"
            className={`h-7 px-2.5 rounded-full flex items-center space-x-1.5 font-sans text-[11px] tracking-[0.06em] uppercase border transition-all ${
              civicLensActive
                ? 'bg-[#ffffff] text-[#182923] border-[#7879f1] shadow-print font-bold'
                : 'bg-[#182923] border-[#3a4856]/60 text-[#b7cbc2] hover:text-white hover:border-[#7879f1]/50'
            }`}
          >
            <Crosshair className={`w-3.5 h-3.5 ${civicLensActive ? 'text-[#7879f1]' : 'text-[#b7cbc2]'}`} />
            <span className="hidden sm:inline">LENS</span>
            <span className={`text-[9px] px-1 rounded-full ${civicLensActive ? 'bg-[#7879f1] text-white' : 'text-[#737875]'}`}>
              {civicLensActive ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light substrate"
            className="w-7 h-7 rounded-[0.25rem] bg-[#243b33] hover:bg-[#2c473d] border border-[#394a44] text-[#b7cbc2] hover:text-white flex items-center justify-center transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#bfa15f]" /> : <Moon className="w-3.5 h-3.5 text-[#b7cbc2]" />}
          </button>

          {/* Live Clock / Benchmark */}
          <div className="hidden sm:block font-mono text-[11px] text-[#b7cbc2] bg-[#243b33] border border-[#394a44] px-2.5 py-1 rounded-[0.25rem]">
            {viewMode === 'replay' ? (
              <span className="text-[#bfa15f]">REPLAY {currentReplayMilestone.time}</span>
            ) : (
              <span>{timeStr}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
