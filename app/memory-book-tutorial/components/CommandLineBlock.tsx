'use client'

/**
 * PURPOSE:
 * Distinctive Terminal / Command Line component for rendering executable shell instructions.
 * Provides terminal window controls, shell prompt styling, syntax separation,
 * one-click clipboard copying with visual confirmation, and optional output view.
 *
 * CONTEXT/PARENT FILE:
 * Rendered by MemoryBookTutorialClient.tsx in app/memory-book-tutorial.
 */

import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import TerminalIcon from '@mui/icons-material/Terminal'
import { CommandSnippet } from '../data/tutorialSteps'

interface CommandLineBlockProps {
  snippet: CommandSnippet
}

export default function CommandLineBlock({ snippet }: CommandLineBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement('textarea')
      textarea.value = snippet.command
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full my-4 rounded-xl border border-slate-800 bg-[#090d16] text-slate-100 shadow-xl overflow-hidden font-mono">
      {/* ── Terminal Window Top Bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f172a] border-b border-slate-800/90 select-none">
        {/* Window controls & label */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/40" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 pl-2">
            <TerminalIcon sx={{ fontSize: 15, color: '#4bbca9' }} />
            <span className="font-semibold text-slate-300">
              {snippet.label || 'Terminal Command'}
            </span>
          </div>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy command to clipboard"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-sans font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#4bbca9]"
        >
          {copied ? (
            <>
              <CheckIcon sx={{ fontSize: 14, color: '#4bbca9' }} />
              <span className="text-[#4bbca9] text-[11px] font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <ContentCopyIcon sx={{ fontSize: 13 }} />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* ── Command Code Area ── */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed">
        {snippet.description && (
          <div className="mb-2 text-xs text-slate-400 font-sans italic select-none">
            # {snippet.description}
          </div>
        )}
        <div className="flex items-start gap-2.5">
          <span className="text-[#4bbca9] font-bold select-none text-sm pt-0.5">$</span>
          <pre className="font-mono text-slate-100 whitespace-pre-wrap break-all select-text font-normal flex-1">
            {snippet.command}
          </pre>
        </div>
      </div>

      {/* ── Output Box (if provided) ── */}
      {snippet.output && (
        <div className="border-t border-slate-800/80 bg-[#070b12] px-4 py-3 text-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans mb-1.5 select-none">
            Expected Terminal Output
          </div>
          <pre className="font-mono text-slate-300 whitespace-pre overflow-x-auto select-text leading-relaxed">
            {snippet.output}
          </pre>
        </div>
      )}
    </div>
  )
}
