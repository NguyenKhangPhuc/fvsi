'use client'

/**
 * PURPOSE:
 * Decomposed search and filter controls for the Users Management portal.
 * Provides keyword search (matching full_name or email), alphabetical sorting,
 * and quick-filter initial letter pills (A-Z).
 *
 * CONTEXT/PARENT FILE:
 * Rendered within 'app/users-management/UsersManagementClient.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - searchQuery (string): Current text search term.
 * - setSearchQuery ((q: string) => void): Search term updater.
 * - selectedLetter (string): Active A-Z letter filter ('all' or 'A'-'Z').
 * - setSelectedLetter ((l: string) => void): Letter filter updater.
 * - sortBy (string): Active sort key ('name_asc' | 'name_desc' | 'email_asc' | 'email_desc').
 * - setSortBy ((s: string) => void): Sort key updater.
 * - setCurrentPage ((p: number) => void): Page reset callback on filter changes.
 */

import SearchIcon from '@mui/icons-material/Search'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha'
import FilterListIcon from '@mui/icons-material/FilterList'

export type UserSortKey = 'name_asc' | 'name_desc' | 'email_asc' | 'email_desc'

interface UserFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedLetter: string
  setSelectedLetter: (letter: string) => void
  sortBy: UserSortKey
  setSortBy: (sortKey: UserSortKey) => void
  setCurrentPage: (page: number) => void
}

const ALPHABET = [
  'ALL',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
]

export default function UserFilters({
  searchQuery,
  setSearchQuery,
  selectedLetter,
  setSelectedLetter,
  sortBy,
  setSortBy,
  setCurrentPage,
}: UserFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter)
    setCurrentPage(1)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as UserSortKey)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedLetter('ALL')
    setSortBy('name_asc')
    setCurrentPage(1)
  }

  const hasActiveFilters = searchQuery.trim() !== '' || selectedLetter !== 'ALL' || sortBy !== 'name_asc'

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 lg:p-6 shadow-sm flex flex-col gap-4">
      {/* ── Row 1: Search Bar & Alphabetical Sort Dropdown ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar (Name or Email) */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <SearchIcon sx={{ fontSize: 18 }} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search users by full name or email address..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#4bbca9] focus:ring-2 focus:ring-[#4bbca9]/20 transition-all shadow-inner"
          />
        </div>

        {/* Alphabetical Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex items-center">
            <span className="absolute left-3 pointer-events-none text-slate-500">
              <SortByAlphaIcon sx={{ fontSize: 16 }} />
            </span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100/70 focus:outline-none focus:border-[#4bbca9] focus:ring-2 focus:ring-[#4bbca9]/20 transition-all appearance-none cursor-pointer"
            >
              <option value="name_asc">Name (A → Z)</option>
              <option value="name_desc">Name (Z → A)</option>
              <option value="email_asc">Email (A → Z)</option>
              <option value="email_desc">Email (Z → A)</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition-all cursor-pointer shrink-0"
              title="Reset all filters"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Row 2: Alphabet Quick-Filter Pills (A to Z) ── */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-wider shrink-0 mr-1">
          <FilterListIcon sx={{ fontSize: 14 }} />
          <span className="hidden sm:inline">Letter:</span>
        </div>
        {ALPHABET.map((letter) => {
          const isActive = selectedLetter === letter
          return (
            <button
              key={letter}
              onClick={() => handleLetterSelect(letter)}
              className={`h-7 px-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#4bbca9] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {letter}
            </button>
          )
        })}
      </div>
    </div>
  )
}
