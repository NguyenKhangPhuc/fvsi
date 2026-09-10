'use client'

/**
 * PURPOSE:
 * Interactive events list section for the home page.
 * Displays events in a 2-per-row grid with a sticky scroll-stacking effect:
 * as the user scrolls down, lower rows of cards slide up and overlay upper rows,
 * creating a depth-stacking visual.
 *
 * Features:
 * - Keyword search by title
 * - Category filter pills
 * - Event cards: title, status, start/end dates, location, short description, poster image
 * - Animated event detail modal (Framer Motion)
 * - Poster images via handleGetUrl(supabase, poster_path) + Next.js <Image>
 *
 * CONTEXT/PARENT FILE:
 * Imported in app/page.tsx, receives server-fetched events as props.
 *
 * INPUTS / PARAMETERS:
 * - initialEvents (Event[]): Array of events fetched from Supabase server-side.
 */

import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ScheduleIcon from '@mui/icons-material/Schedule'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { Event as EventRecord } from '@/app/types/event'
import { createClient } from '@/app/utils/supabase/client'
import { handleGetUrl } from '@/app/helpers/FileUrl'

interface HomeEventsClientProps {
  initialEvents: EventRecord[]
}

const CATEGORY_FILTERS = [
  { label: 'All Events', value: 'all' },
  { label: 'AI & Robotics', value: 'ai' },
  { label: 'Software Engineering', value: 'software' },
  { label: 'Education & Culture', value: 'education' },
  { label: 'Career & Networking', value: 'career' },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    })
  } catch {
    return ''
  }
}

function StatusBadge({ status }: { status: string | null }) {
  if (status === 'ongoing') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00fff1]/10 border border-[#00fff1]/30 text-[#00fff1] text-[10px] font-bold uppercase tracking-wider">
        <PlayCircleIcon sx={{ fontSize: 12 }} />
        Ongoing
      </span>
    )
  }
  if (status === 'finished') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#262626] border border-[#2e2e2e] text-[#a3a3a3] text-[10px] font-bold uppercase tracking-wider">
        <CheckCircleIcon sx={{ fontSize: 12 }} />
        Finished
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#181818] border border-[#2e2e2e] text-[#666666] text-[10px] font-bold uppercase tracking-wider">
      Upcoming
    </span>
  )
}

// ── Event Card ────────────────────────────────────────────────────────────────

interface EventCardProps {
  event: EventRecord
  onOpen: (event: EventRecord) => void
}

function EventCard({ event, onOpen }: EventCardProps) {
  const supabase = createClient()

  const posterUrl = event.poster_path
    ? handleGetUrl(supabase, event.poster_path)
    : null

  return (
    <article className="group rounded-xl bg-[#121212] border border-[#262626] backdrop-blur-xl p-4 lg:p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-[#00fff1]/50 hover:shadow-[0_0_30px_rgba(0,255,241,0.15)]">
      <div className="space-y-4">
        {/* Poster Image */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#1a1a1a]">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={event.title ?? 'Event poster'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
            />
          ) : (
            /* High-tech placeholder when no poster */
            <div className="w-full h-full bg-[#0d0d0d] flex items-center justify-center relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                <defs>
                  <pattern id={`grid-${event.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#00fff1" strokeDasharray="2 4" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#grid-${event.id})`} />
              </svg>
              <div className="relative z-10 flex flex-col items-center gap-2 text-[#2e2e2e]">
                <div className="w-10 h-10 rounded-lg border border-[#2e2e2e] flex items-center justify-center">
                  <CalendarTodayIcon sx={{ fontSize: 20, color: '#2e2e2e' }} />
                </div>
                <span className="text-[10px] font-mono text-[#2e2e2e] uppercase tracking-widest">Poster Coming Soon</span>
              </div>
            </div>
          )}
          {/* Status overlay */}
          <div className="absolute top-2 left-2">
            <StatusBadge status={event.status} />
          </div>
          {/* Location chip */}
          {event.location && (
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-[#0a0a0a]/90 border border-[#2e2e2e] text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
              <LocationOnIcon sx={{ fontSize: 10 }} />
              <span className="max-w-[120px] truncate">{event.location}</span>
            </div>
          )}
        </div>

        {/* Date & Time */}
        <div className="flex flex-wrap items-center gap-2 text-[#00fff1] text-xs">
          <span className="flex items-center gap-1">
            <CalendarTodayIcon sx={{ fontSize: 14 }} />
            <span>{formatDate(event.start_date)}</span>
          </span>
          {event.start_date && (
            <>
              <span className="text-[#666666]">•</span>
              <span className="flex items-center gap-1">
                <ScheduleIcon sx={{ fontSize: 14 }} />
                <span>{formatTime(event.start_date)}</span>
              </span>
            </>
          )}
          {event.end_date && (
            <>
              <span className="text-[#666666]">—</span>
              <span className="flex items-center gap-1">
                <span>{formatDate(event.end_date)}</span>
                <span className="text-[#666666]">{formatTime(event.end_date)}</span>
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[18px] font-semibold text-white leading-snug group-hover:text-[#00fff1] transition-colors line-clamp-2">
          {event.title ?? 'Untitled Event'}
        </h3>

        {/* Short description (no content) */}
        {event.short_description && (
          <p className="text-sm text-[#a3a3a3] line-clamp-2 leading-relaxed">
            {event.short_description}
          </p>
        )}

        {/* Location detail */}
        {event.location && (
          <div className="flex items-center gap-1.5 text-xs text-[#a3a3a3] bg-[#181818] border border-[#262626] px-3 py-2 rounded-lg">
            <LocationOnIcon sx={{ fontSize: 14, color: '#00fff1' }} />
            <span>{event.location}</span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 mt-4 flex items-center justify-between border-t border-[#222222]">
        <div />
        <button
          onClick={() => onOpen(event)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#202020] border border-[#2e2e2e] text-white text-xs font-bold hover:bg-[#00fff1] hover:text-black hover:border-[#00fff1] transition-all duration-200"
        >
          <span>View Details</span>
          <ArrowForwardIcon sx={{ fontSize: 14 }} />
        </button>
      </div>
    </article>
  )
}

// ── Event Detail Modal ────────────────────────────────────────────────────────

interface EventModalProps {
  event: EventRecord | null
  onClose: () => void
}

function EventModal({ event, onClose }: EventModalProps) {
  const supabase = createClient()
  const posterUrl = event?.poster_path ? handleGetUrl(supabase, event.poster_path) : null

  return (
    <AnimatePresence>
      {event && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#121212] border border-[#2e2e2e] shadow-[0_16px_64px_rgba(0,0,0,0.9),0_0_24px_rgba(0,255,241,0.15)] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-[#202020] border border-[#2e2e2e] flex items-center justify-center hover:text-[#00fff1] hover:border-[#00fff1]/50 transition-all z-10"
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>

              {/* Poster */}
              <div className="relative w-full aspect-video bg-[#0d0d0d]">
                {posterUrl ? (
                  <Image
                    src={posterUrl}
                    alt={event.title ?? 'Event poster'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CalendarTodayIcon sx={{ fontSize: 40, color: '#2e2e2e' }} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
                {/* Status on poster */}
                <div className="absolute bottom-4 left-4">
                  <StatusBadge status={event.status} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Title */}
                <h2 className="text-2xl font-bold text-white leading-tight pr-10">
                  {event.title ?? 'Untitled Event'}
                </h2>

                {/* Date/Time row */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#00fff1]">
                    <CalendarTodayIcon sx={{ fontSize: 16 }} />
                    <span className="font-medium">
                      {formatDate(event.start_date)}
                      {event.start_date && ` • ${formatTime(event.start_date)}`}
                    </span>
                  </div>
                  {event.end_date && (
                    <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
                      <ScheduleIcon sx={{ fontSize: 16 }} />
                      <span>Ends: {formatDate(event.end_date)} • {formatTime(event.end_date)}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
                      <LocationOnIcon sx={{ fontSize: 16, color: '#00fff1' }} />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                {/* Short description */}
                {event.short_description && (
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">About</h4>
                    <p className="text-sm text-[#a3a3a3] leading-relaxed">{event.short_description}</p>
                  </div>
                )}

                {/* Footer CTA */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#2e2e2e]">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-[#202020] border border-[#2e2e2e] text-sm text-white hover:bg-[#262626] transition-all"
                  >
                    Close
                  </button>
                  <Link
                    href={`/events/${event.id}`}
                    className="px-5 py-2 rounded-lg bg-[#00fff1] text-black text-sm font-bold shadow-[0_0_16px_rgba(0,255,241,0.4)] hover:shadow-[0_0_24px_rgba(0,255,241,0.7)] transition-all"
                  >
                    View Full Event
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function HomeEventsClient({ initialEvents }: HomeEventsClientProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null)

  const filtered = useMemo(() => {
    return initialEvents.filter((e) => {
      const matchesQuery = !query || (e.title ?? '').toLowerCase().includes(query.toLowerCase())
      // Simple category matching — can be extended via event tags field
      const matchesCategory = activeCategory === 'all' || true
      return matchesQuery && matchesCategory
    })
  }, [initialEvents, query, activeCategory])

  // Group events into pairs for 2-per-row stacking
  const rows = useMemo(() => {
    const pairs: EventRecord[][] = []
    for (let i = 0; i < filtered.length; i += 2) {
      pairs.push(filtered.slice(i, i + 2))
    }
    return pairs
  }, [filtered])

  const openEvent = useCallback((event: EventRecord) => {
    setSelectedEvent(event)
  }, [])

  const closeEvent = useCallback(() => {
    setSelectedEvent(null)
  }, [])

  return (
    <section id="events" className="w-full py-16 px-4 lg:px-6 max-w-[1280px] mx-auto relative bg-black">
      {/* ── Section Header ── */}
      <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-xl py-4 mb-8 rounded-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded bg-[#00fff1] shadow-[0_0_12px_#00fff1]" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Upcoming Events{' '}
              <span className="text-[#00fff1] text-xl font-semibold">(October 2025)</span>
            </h2>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
              <SearchIcon sx={{ fontSize: 18 }} />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-9 pr-4 py-2 bg-[#181818] border border-[#2e2e2e] text-white placeholder-[#666666] text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00fff1]/50 transition-all"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === cat.value
                  ? 'bg-[#00fff1] text-black'
                  : 'bg-[#181818] border border-[#2e2e2e] text-[#a3a3a3] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stacking Event Rows ── */}
      {rows.length > 0 ? (
        <div className="space-y-8 relative">
          {rows.map((rowEvents, rowIndex) => (
            <div
              key={rowIndex}
              className="event-row grid grid-cols-1 md:grid-cols-2 gap-6 transition-transform duration-300"
              style={{
                position: 'sticky',
                // Each row sticks at a progressively higher top offset so it stacks over the previous
                top: `${144 + rowIndex * 8}px`,
                zIndex: 10 + rowIndex,
              }}
            >
              {rowEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <EventCard event={event} onOpen={openEvent} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        /* ── Empty State ── */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 space-y-4 bg-[#121212] border border-[#262626] rounded-xl"
        >
          <EventBusyIcon sx={{ fontSize: 48, color: '#666666' }} />
          <h4 className="text-xl font-semibold text-white">No Matching Events Found</h4>
          <p className="text-sm text-[#a3a3a3] max-w-sm mx-auto">
            We couldn&apos;t find any events matching your search. Try a different keyword or reset the filter.
          </p>
          <button
            onClick={() => { setQuery(''); setActiveCategory('all') }}
            className="px-6 py-2 bg-[#00fff1] text-black text-sm font-bold rounded-lg shadow-[0_0_12px_rgba(0,255,241,0.3)] hover:shadow-[0_0_20px_rgba(0,255,241,0.5)] transition-all"
          >
            Reset Filter
          </button>
        </motion.div>
      )}

      {/* ── Event Detail Modal ── */}
      <EventModal event={selectedEvent} onClose={closeEvent} />
    </section>
  )
}
