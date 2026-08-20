import React from 'react';
import { useEmergencies } from './hooks/useEmergencies';
import { Navbar } from './components/Navbar';
import { StatCards } from './components/StatCards';
import { FilterBar } from './components/FilterBar';
import { EmergencyTable } from './components/EmergencyTable';
import { EmergencyGrid } from './components/EmergencyGrid';
import { EmergencyModal } from './components/EmergencyModal';
import { EmergencyFormModal } from './components/EmergencyFormModal';
import { StatusChangeModal } from './components/StatusChangeModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ToastContainer } from './components/Toast';
import { LoadingSpinner, ErrorBanner } from './components/LoadingSpinner';
import { ShieldAlert, Plus, Radio } from 'lucide-react';

export default function App() {
  const {
    emergencies,
    allEmergencies,
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
  } = useEmergencies();

  const openCreateModal = () => {
    setEditingEmergency(null);
    setIsFormOpen(true);
  };

  const openEditModal = (emergency) => {
    setEditingEmergency(emergency);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (formData, id) => {
    if (id) {
      await handleUpdate(id, formData);
    } else {
      await handleCreate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-command-950 text-slate-100 flex flex-col selection:bg-rose-500/30 selection:text-rose-200">
      {/* Top Command Navbar */}
      <Navbar
        onNewEmergency={openCreateModal}
        onRefresh={() => fetchEmergencies(true)}
        isRefreshing={refreshing}
        autoRefresh={autoRefresh}
        onToggleAutoRefresh={() => setAutoRefresh((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Error Alert if backend is unreachable */}
        {error && (
          <ErrorBanner
            message={error}
            onRetry={() => fetchEmergencies(true)}
          />
        )}

        {/* Dashboard KPI Stat Cards */}
        <section aria-label="Crisis Statistics">
          <StatCards emergencies={allEmergencies} />
        </section>

        {/* Search & Filter Controls */}
        <section aria-label="Incident Filters">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            severityFilter={severityFilter}
            onSeverityChange={setSeverityFilter}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onResetFilters={resetFilters}
            totalResults={emergencies.length}
          />
        </section>

        {/* Incidents Telemetry List / Grid */}
        <section aria-label="Active Emergencies" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider">
                Emergency Incident Registry
              </h2>
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60 font-semibold">
                {emergencies.length} {emergencies.length === 1 ? 'incident' : 'incidents'}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Priority Sorted • Auto-Calculated Scores (0-100)
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : viewMode === 'table' ? (
            <EmergencyTable
              emergencies={emergencies}
              onView={(emergency) => setSelectedEmergency(emergency)}
              onEdit={openEditModal}
              onChangeStatus={(emergency) => setStatusChangingEmergency(emergency)}
              onDelete={(emergency) => setDeletingEmergency(emergency)}
            />
          ) : (
            <EmergencyGrid
              emergencies={emergencies}
              onView={(emergency) => setSelectedEmergency(emergency)}
              onEdit={openEditModal}
              onChangeStatus={(emergency) => setStatusChangingEmergency(emergency)}
              onDelete={(emergency) => setDeletingEmergency(emergency)}
            />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-command-900 bg-command-950 py-4 text-center text-xs text-slate-500">
        <p className="font-mono">
          CrisisGrid Emergency Response Platform • Connected to Spring Boot Backend on <span className="text-slate-400">http://localhost:8080</span>
        </p>
      </footer>

      {/* Modals & Overlays */}
      {/* 1. Emergency Details View Modal */}
      {selectedEmergency && (
        <EmergencyModal
          emergency={selectedEmergency}
          onClose={() => setSelectedEmergency(null)}
          onEdit={(emergency) => {
            setSelectedEmergency(null);
            openEditModal(emergency);
          }}
          onChangeStatus={(emergency) => {
            setSelectedEmergency(null);
            setStatusChangingEmergency(emergency);
          }}
          onDelete={(emergency) => {
            setSelectedEmergency(null);
            setDeletingEmergency(emergency);
          }}
        />
      )}

      {/* 2. Create & Edit Modal */}
      {isFormOpen && (
        <EmergencyFormModal
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingEmergency(null);
          }}
          onSubmit={handleFormSubmit}
          emergency={editingEmergency}
          isSubmitting={isSubmitting}
        />
      )}

      {/* 3. Quick Status Update Modal */}
      {statusChangingEmergency && (
        <StatusChangeModal
          isOpen={Boolean(statusChangingEmergency)}
          emergency={statusChangingEmergency}
          onClose={() => setStatusChangingEmergency(null)}
          onUpdateStatus={handleUpdateStatus}
          isSubmitting={isSubmitting}
        />
      )}

      {/* 4. Delete Confirmation Modal */}
      {deletingEmergency && (
        <DeleteConfirmModal
          isOpen={Boolean(deletingEmergency)}
          emergency={deletingEmergency}
          onClose={() => setDeletingEmergency(null)}
          onConfirm={handleDelete}
          isDeleting={isSubmitting}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
