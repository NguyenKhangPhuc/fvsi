'use client'

/**
 * PURPOSE:
 * Renders the Overview & Specification panel for the Single Event Detail page.
 * Displays rich-text content in read-only mode using RichTextEditor.
 * Strictly view-only with zero action buttons.
 *
 * CONTEXT/PARENT FILE:
 * Rendered within 'app/events/[id]/SingleEventPage.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - content (any): The rich-text specification JSON or raw string.
 */

import React from 'react'
import { motion } from 'framer-motion'
import DescriptionIcon from '@mui/icons-material/Description'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import RichTextEditor from '@/app/components/RichTextEditor'

interface EventOverviewProps {
  content: any
}

const isContentEmpty = (raw: any): boolean => {
  if (!raw) return true
  if (typeof raw === 'string') {
    const trimmed = raw.trim()
    if (!trimmed || trimmed === '[]' || trimmed === '""') return true
    try {
      const parsed = JSON.parse(trimmed)
      return isContentEmpty(parsed)
    } catch {
      return trimmed.length === 0
    }
  }
  if (Array.isArray(raw)) {
    if (raw.length === 0) return true
    return raw.every((node) => {
      if (!node) return true
      if (Array.isArray(node.children)) {
        return node.children.every(
          (child: any) => !child.text || child.text.trim() === ''
        )
      }
      return false
    })
  }
  return false
}

export default function EventOverview({ content }: EventOverviewProps) {
  const hasContent = !isContentEmpty(content)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#3ea694]">
          <DescriptionIcon sx={{ fontSize: 18 }} />
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Overview &amp; Specification
          </h2>
          <p className="text-[11px] text-slate-500">
            Detailed information, requirements, and schedule guidelines.
          </p>
        </div>
      </div>

      {/* Rich-Text Content Body */}
      <div className="p-6">
        {hasContent ? (
          <RichTextEditor
            value={content}
            readOnly={true}
            className="min-h-[200px] w-full text-slate-800"
          />
        ) : (
          <div className="min-h-[180px] flex flex-col items-center justify-center bg-slate-50/50 border border-dashed border-slate-200 rounded-lg p-8 text-center">
            <ArticleOutlinedIcon sx={{ fontSize: 36, color: '#cbd5e1' }} />
            <p className="text-xs font-semibold text-slate-600 mt-2 uppercase tracking-wide">
              No specification content provided
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              The organizer has not published extended guidelines for this event yet.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
