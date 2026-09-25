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
    <header className="sticky top-0 z-50 w-full glass-panel border-b-0 border-white/10 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 relative">
        {/* Left Zone: Brand and Subtitle */}
        <div className="flex items-center space-x-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping absolute"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 relative"></span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="font-serif italic font-semibold tracking-tight text-2xl text-foreground text-gradient">
                CityPulse
              </span>
              <span className="font-sans text-[10px] tracking-[0.15em] text-muted-foreground uppercase font-bold">
                INSTITUTE
              </span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-3 font-sans text-[11px] text-muted-foreground border-l border-white/10 pl-4 h-8">
            <span className="font-bold tracking-wider text-foreground">JAIPUR BASIN</span>
            <span className="text-white/20">|</span>
            <span className="font-medium tracking-wide">CIVIC CARTOGRAPHY</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2 py-0.5 rounded text-[10px]">ZONE A</span>
          </div>
        </div>

        {/* Center Zone: Five Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map(item => {
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`group relative px-4 py-2 flex items-center space-x-2 text-xs font-sans tracking-[0.08em] uppercase transition-all duration-300 rounded-lg overflow-hidden ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 rounded-lg"></div>
                )}
                <span className={`text-[10px] font-mono transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-muted-foreground group-hover:text-blue-400/70'}`}>
                  {item.number}
                </span>
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-blue-500 rounded-t-md shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Status Chip, Civic Lens & Theme Controls */}
        <div className="flex items-center space-x-3 shrink-0">
          {/* Status Chip */}
          <div className="hidden xl:flex items-center space-x-2 h-7 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 font-sans text-[10px] tracking-[0.08em] text-blue-400 uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            <span>SYSTEM NOMINAL</span>
          </div>

          {/* Civic Lens Toggle */}
          <button
            onClick={() => setCivicLensActive(!civicLensActive)}
            title="Toggle Civic Lens reticle inspector"
            className={`h-8 px-3 rounded-md flex items-center space-x-2 font-sans text-[11px] tracking-[0.08em] uppercase transition-all duration-300 ${
              civicLensActive
                ? 'bg-blue-500 text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                : 'bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white'
            }`}
          >
            <Crosshair className={`w-3.5 h-3.5 ${civicLensActive ? 'text-white' : 'text-muted-foreground'}`} />
            <span className="hidden sm:inline">LENS</span>
          </button>

          {/* Theme Toggle (Optional since we default dark, but kept for logic) */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-white flex items-center justify-center transition-all duration-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Live Clock / Benchmark */}
          <div className="hidden sm:flex items-center font-mono text-[11px] text-white bg-black/40 border border-white/10 px-3 py-1.5 rounded-md shadow-inner">
            {viewMode === 'replay' ? (
              <span className="text-amber-400 font-semibold flex items-center gap-2">
                <RotateCcw className="w-3 h-3 animate-spin-slow" /> 
                {currentReplayMilestone.time}
              </span>
            ) : (
              <span className="tracking-wider">{timeStr}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
