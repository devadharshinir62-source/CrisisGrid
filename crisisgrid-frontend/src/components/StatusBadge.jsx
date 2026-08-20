import React from 'react';
import { SEVERITIES, EMERGENCY_STATUSES, EMERGENCY_TYPES } from '../constants/emergencyConstants';
import { 
  Waves, Flame, Car, HeartPulse, Activity, Wind, Mountain, AlertTriangle, 
  ShieldAlert, Clock, CheckCircle2, AlertCircle, XCircle, Truck, UserCheck 
} from 'lucide-react';

const TYPE_ICONS = {
  FLOOD: Waves,
  FIRE: Flame,
  ACCIDENT: Car,
  MEDICAL: HeartPulse,
  EARTHQUAKE: Activity,
  CYCLONE: Wind,
  LANDSLIDE: Mountain,
  OTHER: AlertTriangle,
};

export function TypeBadge({ type }) {
  const Icon = TYPE_ICONS[type] || AlertTriangle;
  const match = EMERGENCY_TYPES.find(t => t.value === type);
  const label = match ? match.label : type;

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-command-800 text-slate-200 border border-command-700">
      <Icon className="w-3.5 h-3.5 text-cyan-400" />
      <span>{label}</span>
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const match = SEVERITIES.find(s => s.value === severity);
  const badgeClass = match ? match.badgeClass : 'bg-slate-800 text-slate-300 border-slate-700';
  const label = match ? match.label : severity;

  const isCritical = severity === 'CRITICAL';
  const isHigh = severity === 'HIGH';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider border ${badgeClass}`}>
      {(isCritical || isHigh) && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCritical ? 'bg-rose-400' : 'bg-orange-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isCritical ? 'bg-rose-500' : 'bg-orange-500'}`}></span>
        </span>
      )}
      {label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const match = EMERGENCY_STATUSES.find(s => s.value === status);
  const badgeClass = match ? match.badgeClass : 'bg-slate-800 text-slate-300 border-slate-700';
  const label = match ? match.label : status;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {label}
    </span>
  );
}
