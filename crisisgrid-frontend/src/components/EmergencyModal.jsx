import React from 'react';
import { TypeBadge, SeverityBadge, StatusBadge } from './StatusBadge';
import { PriorityScoreMeter } from './PriorityBadge';
import { formatDateTime } from '../utils/formatters';
import { 
  X, MapPin, Users, HeartPulse, Package, Calendar, Clock, 
  ExternalLink, Edit3, Trash2, CheckSquare, AlertCircle 
} from 'lucide-react';

export function EmergencyModal({
  emergency,
  onClose,
  onEdit,
  onChangeStatus,
  onDelete,
}) {
  if (!emergency) return null;

  const mapsUrl = `https://www.google.com/maps?q=${emergency.latitude},${emergency.longitude}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-command-900 border border-command-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-command-900/95 border-b border-command-700/80 px-6 py-4 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
              INCIDENT #{emergency.id}
            </span>
            <StatusBadge status={emergency.status} />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-command-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Title & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <TypeBadge type={emergency.emergencyType} />
              <SeverityBadge severity={emergency.severity} />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              {emergency.title}
            </h2>
          </div>

          {/* Priority Score Meter */}
          <PriorityScoreMeter score={emergency.priorityScore} />

          {/* Description */}
          <div className="bg-command-950/70 rounded-xl p-4 border border-command-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-cyan-400" />
              Incident Description & Situation Report
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {emergency.description}
            </p>
          </div>

          {/* Core Grid Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location & GPS */}
            <div className="bg-command-950/70 p-4 rounded-xl border border-command-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  Coordinates / Location
                </div>
                <div className="font-mono text-sm text-slate-100 mt-1">
                  Lat: {emergency.latitude?.toFixed(6)}, Lng: {emergency.longitude?.toFixed(6)}
                </div>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <span>View on Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* People Impact */}
            <div className="bg-command-950/70 p-4 rounded-xl border border-command-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                Human Impact
              </div>
              <div className="font-mono text-2xl font-bold text-slate-100">
                {emergency.peopleAffected?.toLocaleString()}{' '}
                <span className="text-xs text-slate-400 font-normal font-sans">people affected</span>
              </div>
              <div className="mt-2">
                {emergency.medicalRequired ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/60">
                    <HeartPulse className="w-3.5 h-3.5" />
                    Immediate Medical Aid Required
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-command-850 px-2 py-0.5 rounded">
                    No Critical Medical Aid Reported
                  </span>
                )}
              </div>
            </div>

            {/* Required Resource */}
            <div className="bg-command-950/70 p-4 rounded-xl border border-command-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-400" />
                Required Response Resource
              </div>
              <div className="font-mono text-base font-bold text-amber-300 mt-1">
                {emergency.requiredResource?.replace('_', ' ')}
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-command-950/70 p-4 rounded-xl border border-command-800 space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Reported At:</span>
                <span className="font-mono text-slate-200">{formatDateTime(emergency.reportedAt)}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Last Updated:</span>
                <span className="font-mono text-slate-200">{formatDateTime(emergency.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 bg-command-950/95 border-t border-command-800 p-4 px-6 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
          <button
            onClick={() => onDelete(emergency)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/40 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete Incident
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onChangeStatus(emergency)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-command-800 text-cyan-300 hover:bg-command-700 border border-command-600 transition-colors"
            >
              <CheckSquare className="w-4 h-4" />
              Update Status
            </button>

            <button
              onClick={() => onEdit(emergency)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit Incident
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
