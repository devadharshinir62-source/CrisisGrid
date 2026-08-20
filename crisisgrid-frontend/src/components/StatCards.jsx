import React from 'react';
import { AlertCircle, AlertTriangle, Users, CheckCircle2, HeartPulse, Flame } from 'lucide-react';

export function StatCards({ emergencies = [] }) {
  const total = emergencies.length;
  const critical = emergencies.filter(e => e.severity === 'CRITICAL').length;
  const high = emergencies.filter(e => e.severity === 'HIGH').length;
  const totalPeopleAffected = emergencies.reduce((sum, e) => sum + (Number(e.peopleAffected) || 0), 0);
  const verified = emergencies.filter(e => e.status === 'VERIFIED').length;
  const medicalRequiredCount = emergencies.filter(e => e.medicalRequired).length;

  const stats = [
    {
      label: 'Total Incidents',
      value: total,
      subtext: 'Active in system',
      icon: AlertCircle,
      textColor: 'text-slate-100',
      bgColor: 'bg-command-900/90',
      borderColor: 'border-command-700/60',
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    },
    {
      label: 'Critical Severity',
      value: critical,
      subtext: 'Immediate action required',
      icon: Flame,
      textColor: 'text-rose-400',
      bgColor: 'bg-rose-950/30',
      borderColor: 'border-rose-900/60',
      iconBg: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
      glow: critical > 0 ? 'glow-critical ring-1 ring-rose-500/40' : '',
      badge: critical > 0 ? `${critical} CRITICAL` : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse',
    },
    {
      label: 'High Severity',
      value: high,
      subtext: 'Elevated urgency',
      icon: AlertTriangle,
      textColor: 'text-orange-400',
      bgColor: 'bg-orange-950/20',
      borderColor: 'border-orange-900/50',
      iconBg: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    },
    {
      label: 'People Affected',
      value: totalPeopleAffected.toLocaleString(),
      subtext: `${medicalRequiredCount} need medical aid`,
      icon: Users,
      textColor: 'text-cyan-300',
      bgColor: 'bg-cyan-950/20',
      borderColor: 'border-cyan-900/50',
      iconBg: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    },
    {
      label: 'Verified Status',
      value: verified,
      subtext: `${total > 0 ? Math.round((verified / total) * 100) : 0}% of all reports`,
      icon: CheckCircle2,
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-950/20',
      borderColor: 'border-emerald-900/50',
      iconBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-200 hover:border-command-600 ${stat.bgColor} ${stat.borderColor} ${stat.glow || ''}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.label}
              </span>
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className={`font-mono text-3xl font-extrabold tracking-tight ${stat.textColor}`}>
                {stat.value}
              </span>
              {stat.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-slate-400 font-medium">
              {stat.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
