import React from 'react';
import { getPriorityMeta } from '../utils/formatters';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export function PriorityBadge({ score, showBar = true, size = 'md' }) {
  const safeScore = Number(score) || 0;
  const meta = getPriorityMeta(safeScore);

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 font-mono font-bold text-xs px-2 py-0.5 rounded border ${meta.bgColor} ${meta.textColor} ${meta.borderColor}`}>
        {meta.pulse && <ShieldAlert className="w-3 h-3 animate-pulse text-rose-500" />}
        {safeScore}/100
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full max-w-[140px]">
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 font-mono font-bold text-xs ${meta.textColor}`}>
          {meta.pulse && <ShieldAlert className="w-3.5 h-3.5 text-rose-500 animate-bounce" />}
          {safeScore}
          <span className="text-[10px] text-slate-500 font-normal">/100</span>
        </span>
        <span className={`text-[10px] font-semibold tracking-wider uppercase ${meta.textColor}`}>
          {meta.level}
        </span>
      </div>

      {showBar && (
        <div className="w-full bg-command-900 h-1.5 rounded-full overflow-hidden border border-command-700/50">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${meta.barColor} transition-all duration-500`}
            style={{ width: `${Math.min(100, Math.max(5, safeScore))}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function PriorityScoreMeter({ score }) {
  const safeScore = Number(score) || 0;
  const meta = getPriorityMeta(safeScore);

  return (
    <div className={`p-4 rounded-xl border ${meta.bgColor} ${meta.borderColor} flex items-center justify-between`}>
      <div>
        <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
          Calculated Priority Score
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`font-mono text-3xl font-extrabold ${meta.textColor}`}>
            {safeScore}
          </span>
          <span className="text-sm text-slate-400">/ 100</span>
          <span className={`ml-2 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${meta.bgColor} ${meta.textColor} ${meta.borderColor}`}>
            {meta.level} PRIORITY
          </span>
        </div>
      </div>
      <div className="w-32">
        <div className="text-[11px] text-slate-400 mb-1 text-right">Emergency Urgency</div>
        <div className="w-full bg-command-900 h-2.5 rounded-full overflow-hidden border border-command-700">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${meta.barColor}`}
            style={{ width: `${Math.min(100, Math.max(5, safeScore))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
