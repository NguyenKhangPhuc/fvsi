/**
 * PURPOSE:
 * Server Component for the Users Management portal route (/users-management).
 * Fetches all user profile records using the getAllUsers server action and renders UsersManagementClient.
 *
 * CONTEXT/PARENT FILE:
 * Route: 'app/users-management/page.tsx'.
 * Follows the design layout and rhythm of 'app/events-management/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * None.
 */

import { getAllUsers } from '@/app/actions/profiles/get/getAllUsers'
import UsersManagementClient from './UsersManagementClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users Management | ITEE Collaborative Portal',
  description: 'Manage registered user accounts and administrative roles.',
}

export default async function UsersManagementPage() {
  const { data: users, error } = await getAllUsers()

  if (error) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[#f8fafc]">
        <div className="bg-white border border-red-200 rounded-xl p-8 max-w-md w-full text-center shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-red-600">Failed to load users</h2>
          <p className="text-sm text-slate-600">
            {typeof error === 'string' ? error : 'An unexpected error occurred while fetching users.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#f8fafc] py-8 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto w-full">
        <UsersManagementClient users={users || []} />
      </div>
    </div>
  )
}
