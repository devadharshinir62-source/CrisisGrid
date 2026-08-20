import { useState, useEffect, useCallback, useMemo } from 'react';
import { emergencyApi } from '../api/emergencyApi';

export function useEmergencies() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('priority-desc');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Modal states
  const [selectedEmergency, setSelectedEmergency] = useState(null); // for details view
  const [editingEmergency, setEditingEmergency] = useState(null); // for edit modal
  const [statusChangingEmergency, setStatusChangingEmergency] = useState(null); // for quick status modal
  const [deletingEmergency, setDeletingEmergency] = useState(null); // for delete confirmation
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast Helpers
  const addToast = useCallback((message, type = 'info', title = '') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch Emergencies from Backend
  const fetchEmergencies = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else if (emergencies.length === 0) {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await emergencyApi.getAll();
      setEmergencies(Array.isArray(data) ? data : []);
      if (isManualRefresh) {
        addToast('Telemetry synchronized with CrisisGrid server', 'success', 'Updated');
      }
    } catch (err) {
      const errMsg = err.message || 'Failed to connect to backend server';
      setError(errMsg);
      if (isManualRefresh) {
        addToast(errMsg, 'error', 'Fetch Error');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [emergencies.length, addToast]);

  // Initial Load
  useEffect(() => {
    fetchEmergencies();
  }, [fetchEmergencies]);

  // Auto-refresh interval
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchEmergencies(false);
    }, 15000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchEmergencies]);

  // CRUD: Create
  const handleCreate = async (formData) => {
    setIsSubmitting(true);
    try {
      const created = await emergencyApi.create(formData);
      setEmergencies((prev) => [created, ...prev]);
      setIsFormOpen(false);
      addToast(
        `Incident #${created.id} recorded with priority score ${created.priorityScore}/100`,
        'success',
        'Emergency Reported'
      );
      return created;
    } catch (err) {
      addToast(err.message, 'error', 'Submission Failed');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // CRUD: Update
  const handleUpdate = async (id, formData) => {
    setIsSubmitting(true);
    try {
      const updated = await emergencyApi.update(id, formData);
      setEmergencies((prev) => prev.map((e) => (e.id === id ? updated : e)));
      if (selectedEmergency?.id === id) {
        setSelectedEmergency(updated);
      }
      setEditingEmergency(null);
      setIsFormOpen(false);
      addToast(`Incident #${id} updated successfully`, 'success', 'Incident Updated');
      return updated;
    } catch (err) {
      addToast(err.message, 'error', 'Update Failed');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // CRUD: Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    setIsSubmitting(true);
    try {
      const updated = await emergencyApi.updateStatus(id, newStatus);
      setEmergencies((prev) => prev.map((e) => (e.id === id ? updated : e)));
      if (selectedEmergency?.id === id) {
        setSelectedEmergency(updated);
      }
      setStatusChangingEmergency(null);
      addToast(`Incident #${id} status changed to ${newStatus}`, 'success', 'Status Updated');
      return updated;
    } catch (err) {
      addToast(err.message, 'error', 'Status Update Failed');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // CRUD: Delete
  const handleDelete = async (id) => {
    setIsSubmitting(true);
    try {
      await emergencyApi.delete(id);
      setEmergencies((prev) => prev.filter((e) => e.id !== id));
      if (selectedEmergency?.id === id) {
        setSelectedEmergency(null);
      }
      setDeletingEmergency(null);
      addToast(`Incident #${id} deleted from command center`, 'success', 'Incident Removed');
    } catch (err) {
      addToast(err.message, 'error', 'Delete Failed');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtering & Sorting (Client-side over cached telemetry)
  const filteredEmergencies = useMemo(() => {
    return emergencies.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = item.title?.toLowerCase().includes(q);
        const descMatch = item.description?.toLowerCase().includes(q);
        const typeMatch = item.emergencyType?.toLowerCase().includes(q);
        const resourceMatch = item.requiredResource?.toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !typeMatch && !resourceMatch) {
          return false;
        }
      }

      // Severity
      if (severityFilter !== 'ALL' && item.severity !== severityFilter) {
        return false;
      }

      // Type
      if (typeFilter !== 'ALL' && item.emergencyType !== typeFilter) {
        return false;
      }

      // Status
      if (statusFilter !== 'ALL' && item.status !== statusFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'priority-asc':
          return (a.priorityScore || 0) - (b.priorityScore || 0);
        case 'date-desc':
          return new Date(b.reportedAt || 0) - new Date(a.reportedAt || 0);
        case 'date-asc':
          return new Date(a.reportedAt || 0) - new Date(b.reportedAt || 0);
        case 'people-desc':
          return (b.peopleAffected || 0) - (a.peopleAffected || 0);
        case 'priority-desc':
        default:
          return (b.priorityScore || 0) - (a.priorityScore || 0);
      }
    });
  }, [emergencies, searchQuery, severityFilter, typeFilter, statusFilter, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSeverityFilter('ALL');
    setTypeFilter('ALL');
    setStatusFilter('ALL');
    setSortBy('priority-desc');
  };

  return {
    emergencies: filteredEmergencies,
    allEmergencies: emergencies,
    loading,
    refreshing,
    error,
    toasts,
    autoRefresh,
    searchQuery,
    severityFilter,
    typeFilter,
    statusFilter,
    sortBy,
    viewMode,
    selectedEmergency,
    editingEmergency,
    statusChangingEmergency,
    deletingEmergency,
    isFormOpen,
    isSubmitting,
    // Setters & Actions
    setAutoRefresh,
    setSearchQuery,
    setSeverityFilter,
    setTypeFilter,
    setStatusFilter,
    setSortBy,
    setViewMode,
    setSelectedEmergency,
    setEditingEmergency,
    setStatusChangingEmergency,
    setDeletingEmergency,
    setIsFormOpen,
    resetFilters,
    fetchEmergencies,
    handleCreate,
    handleUpdate,
    handleUpdateStatus,
    handleDelete,
    dismissToast,
  };
}
