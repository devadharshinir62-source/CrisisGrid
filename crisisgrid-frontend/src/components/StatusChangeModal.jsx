import React, { useState } from 'react';
import { EMERGENCY_STATUSES } from '../constants/emergencyConstants';
import { X, CheckSquare, Loader2 } from 'lucide-react';

export function StatusChangeModal({
  isOpen,
  onClose,
  emergency,
  onUpdateStatus,
  isSubmitting = false,
}) {
  const [selectedStatus, setSelectedStatus] = useState(emergency?.status || 'REPORTED');

  React.useEffect(() => {
    if (emergency) {
      setSelectedStatus(emergency.status);
    }
  }, [emergency]);

  if (!isOpen || !emergency) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateStatus(emergency.id, selectedStatus);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-command-900 border border-command-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-command-900 border-b border-command-700/80 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100">
              Update Incident Status
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-command-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-xs text-slate-300">
            Updating status for incident <strong className="text-cyan-300">#{emergency.id}: {emergency.title}</strong>
          </div>

          <div className="space-y-2">
            {EMERGENCY_STATUSES.map((st) => {
              const isSelected = selectedStatus === st.value;
              return (
                <label
                  key={st.value}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                      : 'bg-command-950/60 border-command-800 text-slate-300 hover:border-command-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="emergencyStatus"
                      value={st.value}
                      checked={isSelected}
                      onChange={() => setSelectedStatus(st.value)}
                      className="text-cyan-500 bg-command-900 border-command-700 focus:ring-cyan-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold uppercase tracking-wider">{st.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${st.badgeClass}`}>
                    {st.value}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-command-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-slate-100 hover:bg-command-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Confirm Status Update</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
