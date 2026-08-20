import React from 'react';
import { TypeBadge, SeverityBadge, StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { formatDateTime, formatRelativeTime } from '../utils/formatters';
import { Eye, Edit3, Trash2, CheckSquare, Users, HeartPulse, MoreVertical } from 'lucide-react';

export function EmergencyTable({
  emergencies,
  onView,
  onEdit,
  onChangeStatus,
  onDelete,
}) {
  if (emergencies.length === 0) {
    return (
      <div className="bg-command-900/60 border border-command-700/50 rounded-xl p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-command-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <HeartPulse className="w-6 h-6 text-slate-500" />
        </div>
        <h3 className="text-base font-semibold text-slate-200">No emergencies found</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
          No emergencies match your current search filters or none have been reported yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-command-900/80 border border-command-700/60 rounded-xl shadow-xl overflow-hidden backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-command-700/80 bg-command-950/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Emergency Incident</th>
              <th className="py-3 px-4">Hazard Type</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Impact</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Resource</th>
              <th className="py-3 px-4">Reported</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-command-800/60 text-sm">
            {emergencies.map((emergency) => {
              const isCritical = emergency.severity === 'CRITICAL';
              const isHigh = emergency.severity === 'HIGH';

              return (
                <tr
                  key={emergency.id}
                  className={`group transition-colors duration-150 hover:bg-command-800/50 cursor-pointer ${
                    isCritical ? 'bg-rose-950/15' : isHigh ? 'bg-orange-950/10' : ''
                  }`}
                  onClick={() => onView(emergency)}
                >
                  {/* Priority */}
                  <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                    <PriorityBadge score={emergency.priorityScore} />
                  </td>

                  {/* Title & Description preview */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      {emergency.title}
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {emergency.description}
                    </div>
                  </td>

                  {/* Hazard Type */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <TypeBadge type={emergency.emergencyType} />
                  </td>

                  {/* Severity */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <SeverityBadge severity={emergency.severity} />
                  </td>

                  {/* People Affected & Medical */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 font-mono font-medium text-xs text-slate-200">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        {emergency.peopleAffected}
                      </span>
                      {emergency.medicalRequired && (
                        <span
                          title="Medical Aid Required"
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        >
                          MED
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={emergency.status} />
                  </td>

                  {/* Required Resource */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-300 font-mono">
                    {emergency.requiredResource?.replace('_', ' ')}
                  </td>

                  {/* Reported Time */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-400">
                    <div>{formatRelativeTime(emergency.reportedAt)}</div>
                    <div className="text-[10px] text-slate-500">{formatDateTime(emergency.reportedAt)}</div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onView(emergency)}
                        title="View Full Details"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-command-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onChangeStatus(emergency)}
                        title="Quick Status Update"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-command-700 transition-colors"
                      >
                        <CheckSquare className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onEdit(emergency)}
                        title="Edit Incident"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-command-700 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDelete(emergency)}
                        title="Delete Incident"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-command-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
