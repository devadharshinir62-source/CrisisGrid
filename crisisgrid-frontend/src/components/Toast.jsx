import React from 'react';
import { CheckCircle2, AlertTriangle, X, Info } from 'lucide-react';

export function ToastContainer({ toasts = [], onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-start gap-3 animate-in slide-in-from-right duration-200 ${
              isError
                ? 'bg-rose-950/90 border-rose-800 text-rose-100'
                : isSuccess
                ? 'bg-emerald-950/90 border-emerald-800 text-emerald-100'
                : 'bg-command-900/90 border-command-700 text-slate-100'
            }`}
          >
            {isError ? (
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            ) : isSuccess ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1 text-xs">
              {toast.title && <div className="font-bold mb-0.5">{toast.title}</div>}
              <div className="text-slate-200 leading-snug">{toast.message}</div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-200 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
