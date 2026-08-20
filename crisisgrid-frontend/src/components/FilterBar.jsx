import React from 'react';
import { Search, Filter, X, ArrowUpDown, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { SEVERITIES, EMERGENCY_TYPES, EMERGENCY_STATUSES } from '../constants/emergencyConstants';

export function FilterBar({
  searchQuery,
  onSearchChange,
  severityFilter,
  onSeverityChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  onResetFilters,
  totalResults,
}) {
  const hasActiveFilters = searchQuery || severityFilter !== 'ALL' || typeFilter !== 'ALL' || statusFilter !== 'ALL';

  return (
    <div className="bg-command-900/90 border border-command-700/60 p-4 rounded-xl shadow-lg backdrop-blur-md flex flex-col gap-3">
      {/* Top row: Search and View Mode */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, description, location, resource..."
            className="w-full pl-10 pr-9 py-2 bg-command-950/80 border border-command-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* View Toggle and Sort Selector */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <div className="flex items-center gap-1.5 bg-command-950/80 border border-command-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-transparent border-none text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              <option value="priority-desc" className="bg-command-900 text-slate-100">Highest Priority</option>
              <option value="priority-asc" className="bg-command-900 text-slate-100">Lowest Priority</option>
              <option value="date-desc" className="bg-command-900 text-slate-100">Most Recent</option>
              <option value="date-asc" className="bg-command-900 text-slate-100">Oldest First</option>
              <option value="people-desc" className="bg-command-900 text-slate-100">Most Affected</option>
            </select>
          </div>

          <div className="flex items-center bg-command-950/80 border border-command-700 rounded-lg p-0.5">
            <button
              onClick={() => onViewModeChange('table')}
              title="Table View"
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-command-700 text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid View"
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-command-700 text-cyan-400' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row: Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-command-800">
        <span className="text-xs text-slate-400 flex items-center gap-1 font-medium mr-1">
          <Filter className="w-3.5 h-3.5 text-cyan-400" />
          Filters:
        </span>

        {/* Severity Filter */}
        <select
          value={severityFilter}
          onChange={(e) => onSeverityChange(e.target.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border bg-command-950/80 focus:outline-none transition-colors cursor-pointer ${
            severityFilter !== 'ALL'
              ? 'border-cyan-500 text-cyan-300 bg-cyan-950/40'
              : 'border-command-700 text-slate-300 hover:border-command-600'
          }`}
        >
          <option value="ALL" className="bg-command-900 text-slate-100">All Severities</option>
          {SEVERITIES.map((s) => (
            <option key={s.value} value={s.value} className="bg-command-900 text-slate-100">
              {s.label}
            </option>
          ))}
        </select>

        {/* Emergency Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border bg-command-950/80 focus:outline-none transition-colors cursor-pointer ${
            typeFilter !== 'ALL'
              ? 'border-cyan-500 text-cyan-300 bg-cyan-950/40'
              : 'border-command-700 text-slate-300 hover:border-command-600'
          }`}
        >
          <option value="ALL" className="bg-command-900 text-slate-100">All Hazard Types</option>
          {EMERGENCY_TYPES.map((t) => (
            <option key={t.value} value={t.value} className="bg-command-900 text-slate-100">
              {t.label}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border bg-command-950/80 focus:outline-none transition-colors cursor-pointer ${
            statusFilter !== 'ALL'
              ? 'border-cyan-500 text-cyan-300 bg-cyan-950/40'
              : 'border-command-700 text-slate-300 hover:border-command-600'
          }`}
        >
          <option value="ALL" className="bg-command-900 text-slate-100">All Statuses</option>
          {EMERGENCY_STATUSES.map((st) => (
            <option key={st.value} value={st.value} className="bg-command-900 text-slate-100">
              {st.label}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="ml-auto inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-2.5 py-1 rounded-md hover:bg-rose-950/30 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            Reset ({totalResults} matches)
          </button>
        )}
      </div>
    </div>
  );
}
