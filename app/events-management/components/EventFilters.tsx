'use client'

/**
 * PURPOSE:
 * Renders search bar and filter controls for the Events Management portal.
 * Provides keyword search, event status filtering, and created date sorting.
 *
 * CONTEXT/PARENT FILE:
 * Mounted inside 'app/events-management/EventManagementClient.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - searchQuery (string, Required): Current search keyword.
 * - setSearchQuery ((q: string) => void, Required): Handler to update search keyword.
 * - statusFilter (string, Required): Selected status filter choice.
 * - setStatusFilter ((s: string) => void, Required): Handler to update status filter.
 * - sortBy ('date_desc' | 'date_asc', Required): Current sorting order.
 * - setSortBy ((sort: 'date_desc' | 'date_asc') => void, Required): Handler to update sort order.
 * - setCurrentPage ((p: number) => void, Required): Handler to reset pagination on filter change.
 */

import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import SortIcon from '@mui/icons-material/Sort'

interface EventFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  sortBy: 'date_desc' | 'date_asc'
  setSortBy: (sort: 'date_desc' | 'date_asc') => void
  setCurrentPage: (page: number) => void
}

export default function EventFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  setCurrentPage,
}: EventFiltersProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center pointer-events-none">
          <SearchIcon sx={{ fontSize: 18 }} />
        </span>
        <input
          type="text"
          placeholder="Search events by title or description..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-medium rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white transition-all shadow-inner"
        />
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs font-semibold flex items-center gap-1">
            <FilterListIcon sx={{ fontSize: 16, color: '#00a89d' }} />
            <span>Status:</span>
          </span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer transition-colors"
          >
            <option value="">All Statuses</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="finished">Finished</option>
          </select>
        </div>

        {/* Sort By Created Date */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs font-semibold flex items-center gap-1">
            <SortIcon sx={{ fontSize: 16, color: '#00a89d' }} />
            <span>Sort:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as 'date_desc' | 'date_asc')
              setCurrentPage(1)
            }}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer transition-colors"
          >
            <option value="date_desc">Newest Created</option>
            <option value="date_asc">Oldest Created</option>
          </select>
        </div>
      </div>
    </div>
  )
}
