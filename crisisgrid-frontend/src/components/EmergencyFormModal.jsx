import React, { useState, useEffect } from 'react';
import { EMERGENCY_TYPES, SEVERITIES, REQUIRED_RESOURCES } from '../constants/emergencyConstants';
import { X, AlertTriangle, Save, PlusCircle, Loader2 } from 'lucide-react';

export function EmergencyFormModal({
  isOpen,
  onClose,
  onSubmit,
  emergency = null, // if present, edit mode; otherwise create mode
  isSubmitting = false,
}) {
  const isEdit = Boolean(emergency && emergency.id);

  const initialFormState = {
    title: '',
    description: '',
    emergencyType: 'FLOOD',
    severity: 'HIGH',
    latitude: '',
    longitude: '',
    peopleAffected: 0,
    medicalRequired: false,
    requiredResource: 'RESCUE_TEAM',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (emergency) {
        setFormData({
          title: emergency.title || '',
          description: emergency.description || '',
          emergencyType: emergency.emergencyType || 'FLOOD',
          severity: emergency.severity || 'HIGH',
          latitude: emergency.latitude !== undefined ? emergency.latitude : '',
          longitude: emergency.longitude !== undefined ? emergency.longitude : '',
          peopleAffected: emergency.peopleAffected !== undefined ? emergency.peopleAffected : 0,
          medicalRequired: Boolean(emergency.medicalRequired),
          requiredResource: emergency.requiredResource || 'RESCUE_TEAM',
        });
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
    }
  }, [isOpen, emergency]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Title is required';
    } else if (formData.title.length > 150) {
      errs.title = 'Title cannot exceed 150 characters';
    }

    if (!formData.description.trim()) {
      errs.description = 'Description is required';
    } else if (formData.description.length > 2000) {
      errs.description = 'Description cannot exceed 2000 characters';
    }

    const lat = Number(formData.latitude);
    if (formData.latitude === '' || isNaN(lat)) {
      errs.latitude = 'Latitude is required (number)';
    } else if (lat < -90 || lat > 90) {
      errs.latitude = 'Latitude must be between -90 and 90';
    }

    const lng = Number(formData.longitude);
    if (formData.longitude === '' || isNaN(lng)) {
      errs.longitude = 'Longitude is required (number)';
    } else if (lng < -180 || lng > 180) {
      errs.longitude = 'Longitude must be between -180 and 180';
    }

    const people = Number(formData.peopleAffected);
    if (formData.peopleAffected === '' || isNaN(people) || people < 0) {
      errs.peopleAffected = 'People affected must be 0 or greater';
    }

    if (!formData.emergencyType) {
      errs.emergencyType = 'Emergency type is required';
    }

    if (!formData.severity) {
      errs.severity = 'Severity is required';
    }

    if (!formData.requiredResource) {
      errs.requiredResource = 'Required resource is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      peopleAffected: parseInt(formData.peopleAffected, 10),
      medicalRequired: Boolean(formData.medicalRequired),
    };

    onSubmit(payload, isEdit ? emergency.id : null);
  };

  const fillQuickPreset = () => {
    setFormData({
      title: 'Flooding in Velachery Main Road',
      description: 'Several residents are stranded due to sudden water logging and require immediate rescue.',
      emergencyType: 'FLOOD',
      severity: 'HIGH',
      latitude: 12.9815,
      longitude: 80.2180,
      peopleAffected: 35,
      medicalRequired: true,
      requiredResource: 'RESCUE_TEAM',
    });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-command-900 border border-command-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-command-900/95 border-b border-command-700/80 px-6 py-4 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            {isEdit ? (
              <Save className="w-5 h-5 text-cyan-400" />
            ) : (
              <PlusCircle className="w-5 h-5 text-cyan-400" />
            )}
            <h2 className="text-lg font-bold text-slate-100">
              {isEdit ? `Edit Incident #${emergency.id}` : 'Report New Emergency Incident'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {!isEdit && (
              <button
                type="button"
                onClick={fillQuickPreset}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
              >
                Load Sample Data
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-command-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Incident Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Flooding in Velachery"
              maxLength={150}
              className={`w-full px-3.5 py-2 bg-command-950/80 border rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                errors.title ? 'border-rose-500 focus:ring-rose-500' : 'border-command-700 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Situation Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide complete description, landmark details, condition of casualties, etc."
              maxLength={2000}
              className={`w-full px-3.5 py-2 bg-command-950/80 border rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                errors.description ? 'border-rose-500 focus:ring-rose-500' : 'border-command-700 focus:border-cyan-500 focus:ring-cyan-500'
              }`}
            />
            {errors.description && <p className="text-xs text-rose-400 mt-1">{errors.description}</p>}
          </div>

          {/* Type, Severity & Resource Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Hazard Type <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.emergencyType}
                onChange={(e) => setFormData({ ...formData, emergencyType: e.target.value })}
                className="w-full px-3.5 py-2 bg-command-950/80 border border-command-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {EMERGENCY_TYPES.map((t) => (
                  <option key={t.value} value={t.value} className="bg-command-900 text-slate-100">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Severity Level <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="w-full px-3.5 py-2 bg-command-950/80 border border-command-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {SEVERITIES.map((s) => (
                  <option key={s.value} value={s.value} className="bg-command-900 text-slate-100">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Required Resource */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Required Resource <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.requiredResource}
                onChange={(e) => setFormData({ ...formData, requiredResource: e.target.value })}
                className="w-full px-3.5 py-2 bg-command-950/80 border border-command-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {REQUIRED_RESOURCES.map((r) => (
                  <option key={r.value} value={r.value} className="bg-command-900 text-slate-100">
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Coordinates & People Affected */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Latitude */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Latitude (-90 to 90) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="e.g. 12.9815"
                className={`w-full px-3.5 py-2 bg-command-950/80 border rounded-lg text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.latitude ? 'border-rose-500 focus:ring-rose-500' : 'border-command-700 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
              {errors.latitude && <p className="text-xs text-rose-400 mt-1">{errors.latitude}</p>}
            </div>

            {/* Longitude */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Longitude (-180 to 180) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="e.g. 80.2180"
                className={`w-full px-3.5 py-2 bg-command-950/80 border rounded-lg text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.longitude ? 'border-rose-500 focus:ring-rose-500' : 'border-command-700 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
              {errors.longitude && <p className="text-xs text-rose-400 mt-1">{errors.longitude}</p>}
            </div>

            {/* People Affected */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                People Affected <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.peopleAffected}
                onChange={(e) => setFormData({ ...formData, peopleAffected: e.target.value })}
                placeholder="0"
                className={`w-full px-3.5 py-2 bg-command-950/80 border rounded-lg text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${
                  errors.peopleAffected ? 'border-rose-500 focus:ring-rose-500' : 'border-command-700 focus:border-cyan-500 focus:ring-cyan-500'
                }`}
              />
              {errors.peopleAffected && <p className="text-xs text-rose-400 mt-1">{errors.peopleAffected}</p>}
            </div>
          </div>

          {/* Medical Required Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-command-950/70 border border-command-800 cursor-pointer hover:border-command-700 transition-colors">
              <input
                type="checkbox"
                checked={formData.medicalRequired}
                onChange={(e) => setFormData({ ...formData, medicalRequired: e.target.checked })}
                className="w-4 h-4 rounded text-rose-500 bg-command-900 border-command-700 focus:ring-rose-500 cursor-pointer"
              />
              <div>
                <span className="text-xs font-bold text-slate-200 block">
                  Critical Medical Assistance Required
                </span>
                <span className="text-[11px] text-slate-400">
                  Check if casualties require immediate ambulances, trauma kits, or emergency medical teams.
                </span>
              </div>
            </label>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-command-800 flex items-center justify-end gap-3">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-950 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Incident...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEdit ? 'Save Changes' : 'Submit Emergency Report'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
