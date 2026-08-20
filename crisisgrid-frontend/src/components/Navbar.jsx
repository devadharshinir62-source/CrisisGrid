import React, { useState, useEffect } from 'react';
import { ShieldAlert, RefreshCw, Plus, Radio, Activity } from 'lucide-react';

export function Navbar({
  onNewEmergency,
  onRefresh,
  isRefreshing = false,
  lastUpdated = null,
  autoRefresh = false,
  onToggleAutoRefresh,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-40 bg-command-900/90 border-b border-command-700/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg shadow-rose-950 text-white font-bold">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                CrisisGrid
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 tracking-wider">
                Command Center
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Emergency Response & Resource Coordination
            </p>
          </div>
        </div>

        {/* Live System Clock & Status */}
        <div className="hidden md:flex items-center gap-4 bg-command-950/70 border border-command-850 px-3.5 py-1.5 rounded-xl text-xs">
          <div className="flex items-center gap-2 border-r border-command-800 pr-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300 font-mono font-medium">LIVE GRID ONLINE</span>
          </div>
          <div className="font-mono text-slate-200">
            <span className="text-slate-400 mr-1.5">{formattedDate}</span>
            <span className="font-bold text-cyan-300">{formattedTime}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Auto Refresh Toggle */}
          <button
            onClick={onToggleAutoRefresh}
            title={autoRefresh ? 'Auto-refresh active (15s)' : 'Enable auto-refresh'}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              autoRefresh
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                : 'bg-command-950/80 border-command-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-pulse text-cyan-400' : ''}`} />
            <span>Auto (15s)</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh Incidents"
            className="p-2 bg-command-800 hover:bg-command-700 text-slate-200 rounded-lg border border-command-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Report Emergency Action */}
          <button
            onClick={onNewEmergency}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white shadow-lg shadow-rose-950 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Report Incident</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
}
