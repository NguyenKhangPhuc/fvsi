/**
 * PURPOSE:
 * Server Component for the Events Management portal route (/events-management).
 * Fetches all event records from database using getAllEvents action and mounts EventManagementClient.
 *
 * CONTEXT/PARENT FILE:
 * Mounted at 'app/events-management/page.tsx'.
 * Follows design layout inspired by ITEE-SPOT with light theme design tokens.
 *
 * INPUTS / PARAMETERS:
 * None.
 */

import { getAllEvents } from '@/app/actions/events/get/getAllEvents'
import EventManagementClient from './EventManagementClient'

export default async function EventsManagementPage() {
  const { data: events, error } = await getAllEvents()

  if (error) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-[#f8fafc]">
        <div className="bg-white border border-red-200 rounded-xl p-8 max-w-md w-full text-center shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-red-600">Failed to load events</h2>
          <p className="text-sm text-slate-600">{error.message || 'An unexpected error occurred while fetching events.'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#f8fafc] py-8 px-4 lg:px-6">
      <div className="max-w-[1280px] mx-auto w-full">
        <EventManagementClient events={events || []} />
      </div>
    </div>
  )
}
