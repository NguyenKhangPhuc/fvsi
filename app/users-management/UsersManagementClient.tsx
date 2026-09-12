'use client'

/**
 * PURPOSE:
 * Client Component acting as the master controller for the Users Management portal.
 * Manages user search, alphabetical filtering (A-Z) and sorting, pagination,
 * and user role updating actions using updateUserRoleByUserId.
 * Integrates decomposed UserFilters, UserTable, and Pagination components.
 *
 * CONTEXT/PARENT FILE:
 * Mounted inside 'app/users-management/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - users (Array<UserProfile>, Required): Initial array of user profiles fetched server-side via getAllUsers.
 */

import { useState, useMemo } from 'react'
import { PROFILE_ROLE } from '@/app/types/enum'
import { updateUserRoleByUserId } from '@/app/actions/profiles/put/updateUserRoleByUserId'
import { useLoader } from '@/app/context/LoaderContext'
import { useNotification } from '@/app/context/NotificationContext'
import BackButton from '@/app/components/BackButton'
import Pagination from '@/components/Pagination'
import UserFilters, { UserSortKey } from './components/UserFilters'
import UserTable, { UserProfile } from './components/UserTable'
import PeopleIcon from '@mui/icons-material/People'
import ShieldIcon from '@mui/icons-material/Shield'

interface UsersManagementClientProps {
  users: Array<UserProfile>
}

const ITEMS_PER_PAGE = 10

export default function UsersManagementClient({ users: initialUsers }: UsersManagementClientProps) {
  const { showNotification } = useNotification()
  const { setIsOpenLoader } = useLoader()

  const [users, setUsers] = useState<Array<UserProfile>>(initialUsers)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<UserSortKey>('name_asc')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null)

  /**
   * BEHAVIORAL MECHANISM:
   * Updates a user's role via updateUserRoleByUserId and updates local state optimistically.
   *
   * PARAMETERS:
   * - userId (string): Target user profile ID.
   * - newRole (PROFILE_ROLE): New role assignment (admin | student).
   *
   * RETURNS:
   * - Promise<void>
   */
  const handleRoleChange = async (userId: string, newRole: PROFILE_ROLE): Promise<void> => {
    setUpdatingUserId(userId)
    setIsOpenLoader(true)
    try {
      const { error } = await updateUserRoleByUserId(userId, newRole)
      if (error) {
        throw new Error(typeof error === 'string' ? error : 'Failed to update user role.')
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      )
      showNotification('User role updated successfully.')
    } catch (error) {
      if (error instanceof Error) {
        showNotification(error.message)
      } else {
        showNotification('Failed to update user role.')
      }
    } finally {
      setIsOpenLoader(false)
      setUpdatingUserId(null)
    }
  }

  // 1. Filter users by text search (full_name or email) and alphabetical letter
  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    const filterLetter = selectedLetter.toUpperCase()

    return users.filter((user) => {
      const fullName = user.full_name?.toLowerCase() ?? ''
      const email = user.email?.toLowerCase() ?? ''

      // Text search matching full_name or email
      const matchesSearch = query === '' || fullName.includes(query) || email.includes(query)

      // Alphabetical first-letter filter
      let matchesLetter = true
      if (filterLetter !== 'ALL') {
        const primaryInitial = user.full_name?.trim()?.charAt(0)?.toUpperCase()
        const fallbackInitial = user.email?.trim()?.charAt(0)?.toUpperCase()
        matchesLetter = (primaryInitial === filterLetter) || (!primaryInitial && fallbackInitial === filterLetter)
      }

      return matchesSearch && matchesLetter
    })
  }, [users, searchQuery, selectedLetter])

  // 2. Sort users based on selected sort key
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const nameA = (a.full_name || a.email || '').toLowerCase()
      const nameB = (b.full_name || b.email || '').toLowerCase()
      const emailA = (a.email || '').toLowerCase()
      const emailB = (b.email || '').toLowerCase()

      switch (sortBy) {
        case 'name_asc':
          return nameA.localeCompare(nameB)
        case 'name_desc':
          return nameB.localeCompare(nameA)
        case 'email_asc':
          return emailA.localeCompare(emailB)
        case 'email_desc':
          return emailB.localeCompare(emailA)
        default:
          return 0
      }
    })
  }, [filteredUsers, sortBy])

  // 3. Pagination calculations
  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const adminCount = useMemo(() => {
    return users.filter((u) => u.role === PROFILE_ROLE.ADMIN).length
  }, [users])

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <BackButton href="/" label="Back to Home" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Admin Portal // Users Controller
        </span>
      </div>

      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-1.5 h-14 bg-[#4bbca9] rounded-full shrink-0" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <PeopleIcon sx={{ fontSize: 18, color: '#4bbca9' }} />
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                ITEE Faculty Administration
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Users Management
            </h1>
            <p className="text-sm text-slate-600">
              Overview and manage registered faculty members, students, and administrative roles.
            </p>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-1.5">
            <PeopleIcon sx={{ fontSize: 16 }} />
            <span>Total Users: {users.length}</span>
          </div>

          <div className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5">
            <ShieldIcon sx={{ fontSize: 16, color: '#4bbca9' }} />
            <span>Admins: {adminCount}</span>
          </div>

          {filteredUsers.length !== users.length && (
            <div className="px-4 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
              <span>Filtered: {sortedUsers.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <UserFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setCurrentPage={setCurrentPage}
      />

      {/* Users Table */}
      <UserTable
        paginatedUsers={paginatedUsers}
        startIndex={startIndex}
        handleRoleChange={handleRoleChange}
        updatingUserId={updatingUserId}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
