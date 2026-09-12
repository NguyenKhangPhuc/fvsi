'use client'

/**
 * PURPOSE:
 * Full-width hero banner for the Single Event Detail page (/events/[id]).
 * Features an ambient blurred background, centered contained event poster image,
 * status badge, location indicator, title, and short description.
 *
 * CONTEXT/PARENT FILE:
 * Rendered within 'app/events/[id]/SingleEventPage.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - event (Event, Required): The event database record.
 * - posterUrl (string | null): Resolved public URL of the event poster.
 */

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PlaceIcon from '@mui/icons-material/Place'
import PeopleIcon from '@mui/icons-material/People'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import { Event } from '@/app/types/event'
import { EVENT_STATUS } from '@/app/types/enum'

interface EventHeroProps {
  event: Event
  posterUrl: string | null
}

export default function EventHero({ event, posterUrl }: EventHeroProps) {
  const isOngoing =
    event.status?.toLowerCase() === EVENT_STATUS.ONGOING.toLowerCase() ||
    event.status?.toUpperCase() === 'ONGOING'

  const eventTitle =
    event.title ||
    event.short_description ||
    'Collaboration Event'

  const maxMembers = (event as any).member_per_groups ?? (event as any).max_group_members

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm mb-8 flex flex-col"
    >
      {/* Light Poster Showcase Area */}
      {posterUrl ? (
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] bg-gradient-to-br from-teal-50/70 via-slate-50 to-teal-100/30 flex items-center justify-center overflow-hidden border-b border-slate-100">
          {/* Subtle Ambient Blurred Light Backdrop */}
          <Image
            src={posterUrl}
            alt=""
            fill
            unoptimized
            aria-hidden="true"
            className="object-cover blur-3xl opacity-20 scale-110 pointer-events-none"
            priority
          />
          {/* Centered Contained Poster */}
          <div className="relative w-full h-full p-4 sm:p-6 md:p-8 flex items-center justify-center z-10 pointer-events-none">
            <Image
              src={posterUrl}
              alt={eventTitle}
              fill
              unoptimized
              className="object-contain drop-shadow-md rounded-xl"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[200px] sm:h-[260px] md:h-[300px] bg-gradient-to-br from-teal-50/50 via-white to-slate-50 flex flex-col items-center justify-center border-b border-slate-100 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <defs>
              <pattern id={`hero-grid-${event.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#00a89d" strokeDasharray="2 4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#hero-grid-${event.id})`} />
          </svg>
          <div className="relative z-10 flex flex-col items-center gap-2 text-slate-400">
            <div className="w-12 h-12 rounded-xl border border-teal-200/80 bg-white/90 shadow-2xs flex items-center justify-center text-[#3ea694]">
              <ConfirmationNumberIcon sx={{ fontSize: 24 }} />
            </div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              No Poster Banner Available
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Event organizers can upload a poster in Edit mode
            </span>
          </div>
        </div>
      )}

      {/* Hero Content Information (Light Theme) */}
      <div className="p-6 md:p-8 flex flex-col gap-3.5 bg-white">
        {/* Status & Meta Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className={`inline-flex items-center gap-2 text-xs px-3 py-1 font-bold rounded-lg border ${isOngoing
              ? 'bg-teal-50 border-teal-200 text-[#00a89d]'
              : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${isOngoing ? 'bg-[#4bbca9] animate-pulse' : 'bg-slate-400'
                }`}
            />
            <span>{isOngoing ? 'ONGOING' : 'FINISHED'}</span>
          </div>

          {maxMembers && (
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 font-semibold rounded-lg border bg-slate-50 border-slate-200/80 text-slate-700">
              <PeopleIcon sx={{ fontSize: 15, color: '#4bbca9' }} />
              <span>Max {maxMembers} Members / Group</span>
            </span>
          )}

          {event.location && (
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 font-semibold rounded-lg border bg-slate-50 border-slate-200/80 text-slate-700 truncate max-w-[280px]">
              <PlaceIcon sx={{ fontSize: 15, color: '#4bbca9' }} />
              <span className="truncate">{event.location}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-slate-950">
          {eventTitle}
        </h1>

        {/* Short Description */}
        {event.short_description && (
          <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3 max-w-3xl font-medium">
            {event.short_description}
          </p>
        )}
      </div>
    </motion.div>
  )
}
