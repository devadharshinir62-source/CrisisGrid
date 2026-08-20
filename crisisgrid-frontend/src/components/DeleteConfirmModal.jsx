import React from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';

export function DeleteConfirmModal({
  isOpen,
  onClose,
  emergency,
  onConfirm,
  isDeleting = false,
}) {
  if (!isOpen || !emergency) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-command-900 border border-rose-900/60 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-rose-950/40 border-b border-rose-900/50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-rose-300">
              Confirm Incident Deletion
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-command-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-200 leading-relaxed">
            Are you sure you want to permanently delete emergency incident{' '}
            <strong className="text-rose-400">#{emergency.id}: "{emergency.title}"</strong>?
          </p>
          <div className="bg-rose-950/20 border border-rose-900/40 p-3.5 rounded-xl text-xs text-rose-300">
            <strong>Warning:</strong> This action cannot be undone and will remove the incident record from the database.
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 px-6 bg-command-950/80 border-t border-command-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-slate-100 hover:bg-command-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(emergency.id)}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Incident</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
