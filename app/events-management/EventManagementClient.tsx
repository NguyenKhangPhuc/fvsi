'use client'

/**
 * PURPOSE:
 * Client Component acting as the master controller for the Events Management portal.
 * Manages search filtering, status filtering, sorting, pagination state, and event status update actions.
 * Integrates decomposed EventFilters, EventTable, and Pagination components.
 *
 * CONTEXT/PARENT FILE:
 * Mounted inside 'app/events-management/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - events (Array<Event>, Required): Initial array of events fetched server-side.
 */

import { useState, useMemo } from 'react'
import { Event } from '@/app/types/event'
import { EVENT_STATUS } from '@/app/types/enum'
import { updateEventStatus } from '@/app/actions/events/put/updateEventStatus'
import { useLoader } from '@/app/context/LoaderContext'
import { useNotification } from '@/app/context/NotificationContext'
import BackButton from '@/app/components/BackButton'
import Pagination from '@/components/Pagination'
import EventFilters from './components/EventFilters'
import EventTable from './components/EventTable'
import Link from 'next/link'
import EventNoteIcon from '@mui/icons-material/EventNote'
import AddIcon from '@mui/icons-material/Add'

interface EventManagementClientProps {
  events: Array<Event>
}

const ITEMS_PER_PAGE = 10
type SortKey = 'date_desc' | 'date_asc'

export default function EventManagementClient({ events: initialEvents }: EventManagementClientProps) {
  const { showNotification } = useNotification()
  const { setIsOpenLoader } = useLoader()

  const [events, setEvents] = useState<Array<Event>>(initialEvents)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortKey>('date_desc')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [updatingEventId, setUpdatingEventId] = useState<string | null>(null)

  /**
   * BEHAVIORAL MECHANISM:
   * Updates an event's status via updateEventStatus server action and updates local state optimistically.
   *
   * PARAMETERS:
   * - eventId (string): Target event ID.
   * - newStatus (EVENT_STATUS): New status choice (ongoing | finished).
   *
   * RETURNS:
   * - Promise<void>
   */
  const handleStatusChange = async (eventId: string, newStatus: EVENT_STATUS): Promise<void> => {
    setUpdatingEventId(eventId)
    setIsOpenLoader(true)
    try {
      const { error } = await updateEventStatus(eventId, newStatus)
      if (error) {
        throw new Error(typeof error === 'string' ? error : 'Failed to update event status.')
      }

      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId ? { ...event, status: newStatus } : event
        )
      )
      showNotification('Event status updated successfully.')
    } catch (error) {
      if (error instanceof Error) {
        showNotification(error.message)
      } else {
        showNotification('Failed to update event status.')
      }
    } finally {
      setIsOpenLoader(false)
      setUpdatingEventId(null)
    }
  }

  // 1. Filter events by search query (title or description) and status filter
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const title = event.title?.toLowerCase() ?? ''
      const desc = event.short_description?.toLowerCase() ?? ''
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch = query === '' || title.includes(query) || desc.includes(query)

      const matchesStatus =
        statusFilter === '' ||
        event.status?.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [events, searchQuery, statusFilter])

  // 2. Sort events by created_at date
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : 0
      const timeB = b.created_at ? new Date(b.created_at).getTime() : 0

      if (sortBy === 'date_desc') {
        return timeB - timeA
      } else {
        return timeA - timeB
      }
    })
  }, [filteredEvents, sortBy])

  // 3. Pagination calculations
  const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedEvents = sortedEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <BackButton href="/" label="Back to Home" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Admin Portal // Event Controller
        </span>
      </div>

      {/* Page Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-1.5 h-14 bg-[#4bbca9] rounded-full shrink-0" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <EventNoteIcon sx={{ fontSize: 18, color: '#00a89d' }} />
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                ITEE Faculty Administration
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
              Events Management
            </h1>
            <p className="text-sm text-slate-600">
              Overview and manage all upcoming and concluded collaboration events.
            </p>
          </div>
        </div>

        {/* Header Actions & Metric Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/events/create"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4bbca9] hover:bg-[#3ea694] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer shrink-0"
          >
            <AddIcon sx={{ fontSize: 18 }} />
            <span>Create Event</span>
          </Link>

          <div className="px-4 py-2 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
            <span>Total Events: {events.length}</span>
          </div>
          {filteredEvents.length !== events.length && (
            <div className="px-4 py-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <span>Filtered: {sortedEvents.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <EventFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setCurrentPage={setCurrentPage}
      />

      {/* Events Table */}
      <EventTable
        paginatedEvents={paginatedEvents}
        startIndex={startIndex}
        handleStatusChange={handleStatusChange}
        updatingEventId={updatingEventId}
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
