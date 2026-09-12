'use client'

/**
 * PURPOSE:
 * Renders the interactive database table for the Events Management portal.
 * Displays paginated event rows with index, title, start date time, end date time,
 * status select dropdown, created_at date, and edit tools linking to /events/[id].
 *
 * CONTEXT/PARENT FILE:
 * Mounted inside 'app/events-management/EventManagementClient.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - paginatedEvents (Array<Event>, Required): Slice of events for the current page.
 * - startIndex (number, Required): Zero-indexed offset for continuous numbering.
 * - handleStatusChange ((eventId: string, newStatus: EVENT_STATUS) => Promise<void>, Required): Callback to update event status.
 * - updatingEventId (string | null, Optional): ID of the event currently undergoing status update.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import EditIcon from '@mui/icons-material/Edit'
import ClearIcon from '@mui/icons-material/Clear';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { Event } from '@/app/types/event'
import { EVENT_STATUS } from '@/app/types/enum'

interface EventTableProps {
  paginatedEvents: Array<Event>
  startIndex: number
  handleStatusChange: (eventId: string, newStatus: EVENT_STATUS) => Promise<void>
  handleDeleteEvent: (eventId: string) => void
  updatingEventId?: string | null
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return '—'
  }
}

function formatTime(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

export default function EventTable({
  paginatedEvents,
  startIndex,
  handleStatusChange,
  handleDeleteEvent,
  updatingEventId,
}: EventTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          {/* Table Header */}
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 uppercase tracking-wider text-[11px] font-bold select-none">
              <th className="py-3.5 px-4 w-12 text-center">#</th>
              <th className="py-3.5 px-4 min-w-[220px]">Event Title</th>
              <th className="py-3.5 px-4 min-w-[150px]">Start Date Time</th>
              <th className="py-3.5 px-4 min-w-[150px]">End Date Time</th>
              <th className="py-3.5 px-4 min-w-[130px]">Status</th>
              <th className="py-3.5 px-4 min-w-[120px]">Created At</th>
              <th className="py-3.5 px-4 w-28 text-right">Tools</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {paginatedEvents.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-14 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">No events found</span>
                    <span className="text-xs text-slate-400">Try adjusting your search or filter options</span>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedEvents.map((event, idx) => {
                const isOngoing = event.status === EVENT_STATUS.ONGOING
                const isUpdating = updatingEventId === event.id

                return (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: idx * 0.015 }}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* 1. Index # */}
                    <td className="py-4 px-4 text-center font-mono text-xs text-slate-400 font-semibold">
                      {String(startIndex + idx + 1).padStart(2, '0')}
                    </td>

                    {/* 2. Event Title */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1">
                        <Link
                          href={`/events/${event.id}`}
                          className="font-bold text-slate-900 hover:text-teal-700 transition-colors line-clamp-1"
                        >
                          {event.title || 'Untitled Event'}
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span className="font-mono">ID: {event.id.slice(0, 8)}...</span>
                          {event.location && (
                            <>
                              <span>•</span>
                              <span className="truncate max-w-[160px] text-slate-600 font-medium">
                                {event.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 3. Start Date Time */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5 text-slate-700">
                        <span className="flex items-center gap-1.5 font-semibold text-xs">
                          <CalendarTodayIcon sx={{ fontSize: 13, color: '#00a89d' }} />
                          <span>{formatDate(event.start_date)}</span>
                        </span>
                        {event.start_date && (
                          <span className="flex items-center gap-1.5 text-[11px] text-slate-500 pl-5">
                            <ScheduleIcon sx={{ fontSize: 12 }} />
                            <span>{formatTime(event.start_date)}</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 4. End Date Time */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5 text-slate-700">
                        <span className="flex items-center gap-1.5 font-semibold text-xs">
                          <CalendarTodayIcon sx={{ fontSize: 13, color: '#00a89d' }} />
                          <span>{formatDate(event.end_date)}</span>
                        </span>
                        {event.end_date && (
                          <span className="flex items-center gap-1.5 text-[11px] text-slate-500 pl-5">
                            <ScheduleIcon sx={{ fontSize: 12 }} />
                            <span>{formatTime(event.end_date)}</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 5. Status Select */}
                    <td className="py-4 px-4">
                      <div className="relative inline-block">
                        <select
                          disabled={isUpdating}
                          value={event.status ?? EVENT_STATUS.ONGOING}
                          onChange={(e) =>
                            handleStatusChange(event.id, e.target.value as EVENT_STATUS)
                          }
                          className={`text-xs font-semibold py-1.5 px-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer transition-all ${isOngoing
                            ? 'bg-teal-50/80 text-teal-700 border-teal-200 hover:bg-teal-100/70'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/60'
                            } ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                          <option value={EVENT_STATUS.ONGOING}>Ongoing</option>
                          <option value={EVENT_STATUS.FINISHED}>Finished</option>
                        </select>
                      </div>
                    </td>

                    {/* 6. Created At */}
                    <td className="py-4 px-4 whitespace-nowrap text-slate-600 text-xs font-medium">
                      {formatDate(event.created_at)}
                    </td>

                    {/* 7. Tools */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/events/${event.id}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-[#4bbca9] hover:text-white hover:border-[#4bbca9] transition-all duration-200 shadow-2xs"
                        >
                          <EditIcon sx={{ fontSize: 14 }} />
                          <span>Edit</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(event.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 shadow-2xs cursor-pointer"
                          title="Delete event"
                        >
                          <ClearIcon sx={{ fontSize: 14 }} />
                          <span>Delete</span>
                        </button>
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
