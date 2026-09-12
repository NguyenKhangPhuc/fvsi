'use client'

/**
 * PURPOSE:
 * Interactive table rendering paginated user accounts with administrative role selection.
 * Displays 4 specific columns: Index (#), Full Name, Email, and Role.
 * Directly triggers role updates via updateUserRoleByUserId on selection change.
 *
 * CONTEXT/PARENT FILE:
 * Mounted in 'app/users-management/UsersManagementClient.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - paginatedUsers (Array<Profile>): Current page array of user profiles.
 * - startIndex (number): Base offset index for continuous two-digit continuous numbering.
 * - handleRoleChange ((userId: string, newRole: PROFILE_ROLE) => Promise<void>): Callback to change a user's role.
 * - updatingUserId (string | null): ID of the user record currently performing a network update.
 */

import { motion } from 'framer-motion'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import SchoolIcon from '@mui/icons-material/School'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import { PROFILE_ROLE } from '@/app/types/enum'
import { Database } from '@/app/types/database.types'

export type UserProfile = Database['public']['Tables']['profiles']['Row']

interface UserTableProps {
  paginatedUsers: Array<UserProfile>
  startIndex: number
  handleRoleChange: (userId: string, newRole: PROFILE_ROLE) => Promise<void>
  updatingUserId?: string | null
}

export default function UserTable({
  paginatedUsers,
  startIndex,
  handleRoleChange,
  updatingUserId,
}: UserTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          {/* Table Header */}
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[11px] font-bold select-none">
              <th className="py-3.5 px-4 w-14 text-center">#</th>
              <th className="py-3.5 px-4 min-w-[220px]">Full Name</th>
              <th className="py-3.5 px-4 min-w-[240px]">Email Address</th>
              <th className="py-3.5 px-4 w-44 text-right">Role Assignment</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-16 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <PeopleOutlinedIcon sx={{ fontSize: 36, color: '#cbd5e1' }} />
                    <p className="text-sm font-semibold text-slate-600">No users found</p>
                    <p className="text-xs text-slate-400">Try adjusting your search query or letter filter.</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, index) => {
                const isUpdating = updatingUserId === user.id
                const rowNum = String(startIndex + index + 1).padStart(2, '0')
                const currentRole = user.role ?? PROFILE_ROLE.STUDENT
                const isAdmin = currentRole === PROFILE_ROLE.ADMIN

                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.02 }}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* 1. STT (#) */}
                    <td className="py-4 px-4 text-center font-mono text-slate-400 text-xs font-semibold whitespace-nowrap">
                      {rowNum}
                    </td>

                    {/* 2. Full Name */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                            isAdmin
                              ? 'bg-teal-50 border-teal-200 text-[#3ea694]'
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          {user.full_name ? (
                            user.full_name.charAt(0).toUpperCase()
                          ) : (
                            <PersonIcon sx={{ fontSize: 18 }} />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-sm leading-snug">
                            {user.full_name || 'Unnamed User'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 truncate max-w-[160px]" title={user.id}>
                            ID: {user.id.slice(0, 8)}...
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* 3. Email */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-700 text-xs font-medium">
                        <EmailIcon sx={{ fontSize: 15, color: '#94a3b8' }} />
                        <span>{user.email || '—'}</span>
                      </div>
                    </td>

                    {/* 4. Role Assignment */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        {isUpdating && (
                          <div className="w-3 h-3 border-2 border-[#4bbca9] border-t-transparent rounded-full animate-spin" />
                        )}
                        <div className="relative inline-block">
                          <select
                            disabled={isUpdating}
                            value={currentRole}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value as PROFILE_ROLE)
                            }
                            className={`pl-8 pr-3 py-1.5 rounded-lg text-xs font-bold transition-all border outline-none cursor-pointer appearance-none shadow-2xs ${
                              isAdmin
                                ? 'bg-teal-50/80 border-teal-200 text-[#3ea694] hover:bg-teal-100/70 focus:border-[#4bbca9]'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 focus:border-slate-300'
                            }`}
                          >
                            <option value={PROFILE_ROLE.STUDENT}>Student</option>
                            <option value={PROFILE_ROLE.ADMIN}>Admin</option>
                          </select>

                          {/* Role Icon inside dropdown */}
                          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                            {isAdmin ? (
                              <AdminPanelSettingsIcon sx={{ fontSize: 14, color: '#4bbca9' }} />
                            ) : (
                              <SchoolIcon sx={{ fontSize: 14, color: '#64748b' }} />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
