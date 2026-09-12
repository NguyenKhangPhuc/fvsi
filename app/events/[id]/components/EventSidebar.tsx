'use client'

/**
 * PURPOSE:
 * Renders the Technical Specification sidebar for the Single Event Detail page.
 * Displays structured metadata (Status, Group Capacity, Start/End Timelines, Created At).
 * Strictly view-only with zero action buttons.
 *
 * CONTEXT/PARENT FILE:
 * Rendered within 'app/events/[id]/SingleEventPage.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - event (Event, Required): The event database record.
 */

import React from 'react'
import { motion } from 'framer-motion'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'
import { Event } from '@/app/types/event'
import { EVENT_STATUS } from '@/app/types/enum'

interface EventSidebarProps {
  event: Event
}

export default function EventSidebar({ event }: EventSidebarProps) {
  const isOngoing =
    event.status?.toLowerCase() === EVENT_STATUS.ONGOING.toLowerCase() ||
    event.status?.toUpperCase() === 'ONGOING'

  const maxMembers = (event as any).member_per_groups ?? (event as any).max_group_members

  const fmtDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return 'N/A'
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return 'N/A'
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
  }

  const fmtTime = (dateStr: string | null | undefined): string => {
    if (!dateStr) return 'N/A'
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return 'N/A'
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className="w-full flex flex-col gap-6"
    >
      {/* Detail Specification Panel */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <InfoOutlinedIcon sx={{ fontSize: 18, color: '#4bbca9' }} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Detail Specification
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            ID: {event.id.slice(0, 8)}
          </span>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Status & Capacity Row */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Status
              </span>
              <div className="flex items-center gap-1.5">
                {isOngoing ? (
                  <>
                    <HourglassEmptyIcon sx={{ fontSize: 16, color: '#4bbca9' }} />
                    <span className="text-xs font-bold text-teal-700 uppercase">
                      Ongoing
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: '#64748b' }} />
                    <span className="text-xs font-bold text-slate-600 uppercase">
                      Finished
                    </span>
                  </>
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Group Capacity
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <PeopleOutlinedIcon sx={{ fontSize: 16, color: '#4bbca9' }} />
                <span>{maxMembers ? `${maxMembers} members / group` : 'Open'}</span>
              </div>
            </div>
          </div>

          {/* Execution Timeline (Start & End Dates) */}
          <div className="flex flex-col gap-3 pb-4 border-b border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Execution Timeline
            </span>

            {/* Start Date */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <CalendarTodayIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                <span>Start:</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 block">
                  {fmtDate(event.start_date)}
                </span>
                {event.start_date && (
                  <span className="text-[11px] text-slate-500 font-mono">
                    {fmtTime(event.start_date)}
                  </span>
                )}
              </div>
            </div>

            {/* End Date */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <AccessTimeIcon sx={{ fontSize: 14, color: '#94a3b8' }} />
                <span>End:</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 block">
                  {fmtDate(event.end_date)}
                </span>
                {event.end_date && (
                  <span className="text-[11px] text-slate-500 font-mono">
                    {fmtTime(event.end_date)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Event Creation Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span className="text-[11px] font-medium text-slate-400">Created:</span>
            <span className="text-xs font-mono font-medium text-slate-700">
              {fmtDate(event.created_at)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
