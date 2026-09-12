'use client'

/**
 * PURPOSE:
 * Renders the Location panel for the Single Event Detail page.
 * Displays venue address with clean light theme card styling.
 *
 * CONTEXT/PARENT FILE:
 * Rendered within 'app/events/[id]/SingleEventPage.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - location (string | null | undefined): Physical venue address string.
 */

import React from 'react'
import { motion } from 'framer-motion'
import PlaceIcon from '@mui/icons-material/Place'

interface EventLocationProps {
  location: string | null | undefined
}

export default function EventLocation({ location }: EventLocationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#3ea694]">
          <PlaceIcon sx={{ fontSize: 18 }} />
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Location
          </h2>
          <p className="text-[11px] text-slate-500">
            Venue, campus building, or physical hall.
          </p>
        </div>
      </div>

      {/* Location Body */}
      <div className="p-6">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Physical Venue / Address
        </span>
        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
          {location || 'No physical location specified.'}
        </p>
      </div>
    </motion.div>
  )
}
