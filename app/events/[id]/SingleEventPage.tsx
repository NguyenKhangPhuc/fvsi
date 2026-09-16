'use client'

/**
 * PURPOSE:
 * Primary client-side orchestrator for the Single Event Detail page (/events/[id]).
 * Implements the layout inspired by polar-spot: Back navigation, full-width EventHero banner,
 * and 12-column body (Overview + Location on left, Detail Specification Sidebar on right).
 * Strictly view-only mode with zero action buttons.
 *
 * CONTEXT/PARENT FILE:
 * Mounted within 'app/events/[id]/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - event (Event, Required): Single event record fetched server-side.
 */

import React from 'react'
import { Event } from '@/app/types/event'
import { createClient } from '@/app/utils/supabase/client'
import { handleGetUrl } from '@/app/helpers/FileUrl'
import BackButton from '@/app/components/BackButton'
import EventHero from './components/EventHero'
import EventOverview from './components/EventOverview'
import EventLocation from './components/EventLocation'
import EventSidebar from './components/EventSidebar'

interface SingleEventPageProps {
  event: Event
}

export default function SingleEventPage({ event }: SingleEventPageProps) {
  const supabase = createClient()

  const getPosterUrl = (posterPath: string | null | undefined): string | null => {
    if (!posterPath) return null
    if (
      posterPath.startsWith('http://') ||
      posterPath.startsWith('https://') ||
      posterPath.startsWith('/')
    ) {
      return posterPath
    }
    return handleGetUrl(supabase, posterPath)
  }

  const posterUrl = getPosterUrl(event.poster_path)

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <BackButton />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Event Overview // View Mode
        </span>
      </div>

      {/* Full-width Event Hero Banner */}
      <EventHero event={event} posterUrl={posterUrl} />

      {/* Main 2-Column Responsive Body Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Overview */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <EventOverview content={event.content} />
        </div>

        {/* Right Column (5 cols): Technical Specification Sidebar & Location */}
        <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
          <EventSidebar event={event} />
          <EventLocation location={event.location} />
        </div>
      </div>
    </div>
  )
}
