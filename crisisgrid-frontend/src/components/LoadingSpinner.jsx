import React from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';

export function LoadingSpinner({ text = 'Connecting to CrisisGrid Network...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
        <ShieldAlert className="w-5 h-5 text-cyan-400 absolute" />
      </div>
      <p className="text-sm font-medium text-slate-300 font-mono animate-pulse">{text}</p>
      <p className="text-xs text-slate-500 mt-1">Retrieving latest incident telemetry</p>
    </div>
  );
}

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="bg-rose-950/40 border border-rose-800/80 rounded-xl p-5 my-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-rose-300">Backend Communication Error</h4>
          <p className="text-xs text-rose-200/80 mt-0.5">{message}</p>
          <p className="text-[11px] text-slate-400 mt-1">
            Ensure Spring Boot backend is active on <code className="text-cyan-400">http://localhost:8080</code>
          </p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer self-end sm:self-auto"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}
