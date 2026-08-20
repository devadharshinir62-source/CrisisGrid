import React from 'react';
import { TypeBadge, SeverityBadge, StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { formatDateTime, formatRelativeTime } from '../utils/formatters';
import { Eye, Edit3, Trash2, CheckSquare, Users, MapPin, HeartPulse, Clock, Package } from 'lucide-react';

export function EmergencyGrid({
  emergencies,
  onView,
  onEdit,
  onChangeStatus,
  onDelete,
}) {
  if (emergencies.length === 0) {
    return (
      <div className="bg-command-900/60 border border-command-700/50 rounded-xl p-12 text-center">
        <HeartPulse className="w-10 h-10 text-slate-500 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-200">No emergencies found</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
          No emergencies match your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {emergencies.map((emergency) => {
        const isCritical = emergency.severity === 'CRITICAL';
        const isHigh = emergency.severity === 'HIGH';

        return (
          <div
            key={emergency.id}
            onClick={() => onView(emergency)}
            className={`bg-command-900/80 border rounded-xl p-5 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-command-600 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between ${
              isCritical
                ? 'border-rose-800/80 bg-rose-950/20 glow-critical'
                : isHigh
                ? 'border-orange-800/60 bg-orange-950/15'
                : 'border-command-700/60'
            }`}
          >
            <div>
              {/* Header: Badges & Priority */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <TypeBadge type={emergency.emergencyType} />
                  <SeverityBadge severity={emergency.severity} />
                  <StatusBadge status={emergency.status} />
                </div>
                <PriorityBadge score={emergency.priorityScore} size="sm" />
              </div>

              {/* Title & Description */}
              <h4 className="text-base font-bold text-slate-100 hover:text-cyan-300 transition-colors mb-1.5 line-clamp-1">
                {emergency.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                {emergency.description}
              </p>

              {/* Metadata Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-4 bg-command-950/60 p-3 rounded-lg border border-command-800">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{emergency.peopleAffected} Affected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate">{emergency.requiredResource?.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                  <span className="truncate">{emergency.latitude?.toFixed(4)}, {emergency.longitude?.toFixed(4)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatRelativeTime(emergency.reportedAt)}</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div
              className="flex items-center justify-between pt-3 border-t border-command-800/80 text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1">
                {emergency.medicalRequired && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    MEDICAL AID NEEDED
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onChangeStatus(emergency)}
                  title="Update Status"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-command-700 transition-colors"
                >
                  <CheckSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onEdit(emergency)}
                  title="Edit"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-command-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(emergency)}
                  title="Delete"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-command-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
