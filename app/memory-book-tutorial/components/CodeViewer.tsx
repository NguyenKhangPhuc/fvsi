'use client'

/**
 * PURPOSE:
 * Authentic IDE Code Viewer component for displaying starter and solution source code.
 * Features:
 * - Full AST syntax highlighting via lowlight (VS Code Dark+ theme tokens)
 * - Exact 2-space tabular indentation with faint vertical indent guides
 * - True monospace typography (JetBrains Mono) with non-collapsing empty lines
 * - Line numbers gutter with diff (+ / highlight) indicators for solutions
 * - IDE Chrome: file tab with official TS icon, breadcrumb path, and bottom status bar
 * - Copy Code with animated feedback and optional line-wrap toggle
 *
 * CONTEXT/PARENT FILE:
 * Rendered by MemoryBookTutorialClient.tsx for Task 1-8 coding exercises.
 */

import React, { useMemo, useState } from 'react'
import { createLowlight, common } from 'lowlight'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import WrapTextIcon from '@mui/icons-material/WrapText'

const lowlight = createLowlight(common)

interface CodeViewerProps {
  code: string
  filename: string
  badge?: string
  isSolution?: boolean
}

interface CodeToken {
  text: string
  className: string
}

interface ProcessedLine {
  indentCount: number
  remainder: number
  tokens: CodeToken[]
  isEmpty: boolean
  isDiffHighlight: boolean
}

/**
 * Maps highlight.js token classes to authentic VS Code Dark+ / One Dark colors.
 */
function getTokenStyle(className: string): React.CSSProperties {
  if (!className) return { color: '#d4d4d4' }

  // JSDoc and Comments
  if (className.includes('hljs-comment')) {
    return { color: '#6a9955', fontStyle: 'italic' }
  }
  if (className.includes('hljs-doctag')) {
    return { color: '#569cd6', fontStyle: 'italic', fontWeight: 600 }
  }

  // Keywords (export, async, function, const, let, return, try, catch, throw, etc.)
  if (className.includes('hljs-keyword')) {
    return { color: '#c586c0', fontWeight: 500 }
  }

  // Function calls and declarations
  if (className.includes('hljs-title function_')) {
    return { color: '#dcdcaa' }
  }

  // Types, Classes, Interfaces, Built-ins
  if (
    className.includes('hljs-title class_') ||
    className.includes('hljs-type') ||
    className.includes('hljs-built_in')
  ) {
    return { color: '#4ec9b0' }
  }

  // String literals
  if (className.includes('hljs-string')) {
    return { color: '#ce9178' }
  }

  // Object keys, properties, parameters, attributes
  if (
    className.includes('hljs-attr') ||
    className.includes('hljs-property') ||
    className.includes('hljs-params') ||
    className.includes('hljs-variable')
  ) {
    return { color: '#9cdcfe' }
  }

  // Literals and Booleans (null, undefined, true, false)
  if (className.includes('hljs-literal')) {
    return { color: '#569cd6' }
  }

  // Numbers
  if (className.includes('hljs-number')) {
    return { color: '#b5cea8' }
  }

  // Other titles
  if (className.includes('hljs-title')) {
    return { color: '#dcdcaa' }
  }

  return { color: '#d4d4d4' }
}

type LowlightRoot = ReturnType<typeof lowlight.highlight>
type LowlightNode =
  | LowlightRoot
  | LowlightRoot['children'][number]
  | { type: string; children?: unknown[]; value?: string; properties?: { className?: string[] } }

/**
 * Transforms a lowlight HAST tree into line-by-line processed token rows
 * with exact indentation metrics and solution diff detection.
 */
function astToProcessedLines(ast: LowlightRoot, isSolution: boolean): ProcessedLine[] {
  const rawLines: CodeToken[][] = [[]]

  function walk(node: LowlightNode, currentClasses: string[] = []) {
    if (node.type === 'text' && 'value' in node && typeof node.value === 'string') {
      const parts = node.value.split('\n')
      for (let i = 0; i < parts.length; i++) {
        if (i > 0) {
          rawLines.push([])
        }
        if (parts[i].length > 0) {
          rawLines[rawLines.length - 1].push({
            text: parts[i],
            className: currentClasses.join(' '),
          })
        }
      }
    } else if (node.type === 'element' && 'children' in node) {
      const properties =
        'properties' in node ? (node.properties as { className?: string[] } | undefined) : undefined
      const classes = properties?.className || []
      const nextClasses = [...currentClasses, ...classes]
      const children = (Array.isArray(node.children) ? node.children : []) as LowlightNode[]
      for (const child of children) {
        walk(child, nextClasses)
      }
    } else if (node.type === 'root' && 'children' in node) {
      const children = (Array.isArray(node.children) ? node.children : []) as LowlightNode[]
      for (const child of children) {
        walk(child, currentClasses)
      }
    }
  }

  walk(ast)

  return rawLines.map((tokens) => {
    const fullText = tokens.map((t) => t.text).join('')
    const match = fullText.match(/^ +/)
    const leadingSpaces = match ? match[0].length : 0

    const indentCount = Math.floor(leadingSpaces / 2)
    const remainder = leadingSpaces % 2

    let toRemove = leadingSpaces
    const cleanTokens: CodeToken[] = []

    for (const token of tokens) {
      if (toRemove <= 0) {
        cleanTokens.push(token)
      } else if (token.text.length <= toRemove) {
        toRemove -= token.text.length
      } else {
        cleanTokens.push({
          text: token.text.slice(toRemove),
          className: token.className,
        })
        toRemove = 0
      }
    }

    const isDiffHighlight =
      isSolution &&
      (fullText.includes('data.description || null') ||
        fullText.includes('data.start_time || null') ||
        fullText.includes('data.end_time || null') ||
        fullText.includes('updatePayload') ||
        fullText.includes('updateCollection(updatePayload)') ||
        fullText.includes('poster_url: res.data?.poster_url') ||
        fullText.includes('collection_items: collection.collection_items') ||
        fullText.includes('onSuccess(updatedCollection)') ||
        fullText.includes('collection_id: collectionId') ||
        fullText.includes('order: data.order ?? 1') ||
        fullText.includes('createNewCollectionItem(payload)') ||
        fullText.includes('let newItem: CollectionItem = res.data') ||
        fullText.includes('updateCollectionItemPoster(newItem, posterFile)') ||
        fullText.includes('image_url: resPoster.data') ||
        fullText.includes('onSuccess(newItem)'))

    return {
      indentCount,
      remainder,
      tokens: cleanTokens,
      isEmpty: fullText.trim().length === 0,
      isDiffHighlight,
    }
  })
}

/**
 * Fallback line splitter if AST parsing fails.
 */
function fallbackToProcessedLines(code: string, isSolution: boolean): ProcessedLine[] {
  return code
    .trim()
    .split('\n')
    .map((line) => {
      const match = line.match(/^ +/)
      const leadingSpaces = match ? match[0].length : 0
      const trimmed = line.trimStart()

      return {
        indentCount: Math.floor(leadingSpaces / 2),
        remainder: leadingSpaces % 2,
        tokens: [{ text: trimmed, className: '' }],
        isEmpty: trimmed.length === 0,
        isDiffHighlight:
          isSolution &&
          (line.includes('data.description || null') ||
            line.includes('data.start_time || null') ||
            line.includes('data.end_time || null') ||
            line.includes('updatePayload') ||
            line.includes('updateCollection(updatePayload)') ||
            line.includes('poster_url: res.data?.poster_url') ||
            line.includes('collection_items: collection.collection_items') ||
            line.includes('onSuccess(updatedCollection)') ||
            line.includes('collection_id: collectionId') ||
            line.includes('order: data.order ?? 1') ||
            line.includes('createNewCollectionItem(payload)') ||
            line.includes('let newItem: CollectionItem = res.data') ||
            line.includes('updateCollectionItemPoster(newItem, posterFile)') ||
            line.includes('image_url: resPoster.data') ||
            line.includes('onSuccess(newItem)')),
      }
    })
}

export default function CodeViewer({
  code,
  filename,
  badge,
  isSolution = false,
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false)
  const [wrapLines, setWrapLines] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
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

  // Parse code into syntax-highlighted tokens with indentation guides
  const processedLines = useMemo(() => {
    try {
      const ast = lowlight.highlight('typescript', code.trim())
      return astToProcessedLines(ast, isSolution)
    } catch (err) {
      console.warn('AST highlight fallback:', err)
      return fallbackToProcessedLines(code, isSolution)
    }
  }, [code, isSolution])

  return (
    <div className="w-full my-4 rounded-xl border border-slate-800 bg-[#0d1117] text-slate-100 shadow-2xl overflow-hidden font-mono text-xs sm:text-[13px]">
      {/* ── Editor Chrome Window Top Bar ── */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#090d16] border-b border-slate-800 select-none">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-1.5 pr-1">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40" />
          </div>

          {/* Active File Tab */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0d1117] border-t-2 border-[#4bbca9] border-x border-slate-800/90 rounded-t-md text-xs">
            <span className="bg-[#3178c6] text-white text-[10px] font-bold px-1 py-0.5 rounded-xs tracking-tight">
              TS
            </span>
            <span className="font-semibold text-slate-200">{filename}</span>
            {badge && (
              <span
                className={`ml-1 px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider font-sans ${
                  isSolution
                    ? 'bg-teal-950/80 text-[#4bbca9] border border-teal-700/60'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                {badge}
              </span>
            )}
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Wrap Lines Toggle */}
          <button
            type="button"
            onClick={() => setWrapLines(!wrapLines)}
            title={wrapLines ? 'Disable line wrap' : 'Enable line wrap'}
            className={`hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md font-sans transition-all cursor-pointer border ${
              wrapLines
                ? 'bg-teal-950/70 text-[#4bbca9] border-teal-700/60'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700/80'
            }`}
          >
            <WrapTextIcon sx={{ fontSize: 13 }} />
            <span className="text-[11px]">Wrap</span>
          </button>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-sans font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#4bbca9]"
          >
            {copied ? (
              <>
                <CheckIcon sx={{ fontSize: 14, color: '#4bbca9' }} />
                <span className="text-[#4bbca9] text-[11px] font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <ContentCopyIcon sx={{ fontSize: 13 }} />
                <span className="text-[11px]">Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Breadcrumb Bar ── */}
      <div className="px-4 py-1.5 bg-[#0b0f19] border-b border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5 select-none font-mono">
        <span className="text-slate-500">components</span>
        <span className="text-slate-600">›</span>
        <span className="text-slate-500">tasks</span>
        <span className="text-slate-600">›</span>
        <span className="text-teal-400 font-semibold">{filename}</span>
        {isSolution && (
          <span className="ml-auto text-[10px] text-[#4bbca9] font-sans font-semibold bg-teal-950/60 px-2 py-0.2 rounded border border-teal-800/50">
            Reference Solution
          </span>
        )}
      </div>

      {/* ── Editor Code Area with Line Numbers & Indent Guides ── */}
      <div
        className="overflow-x-auto max-h-[580px] py-3 text-xs sm:text-[13px] leading-6 scrollbar-thin bg-[#0d1117]"
        style={{
          tabSize: 2,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <div className="min-w-fit">
          {processedLines.map((line, idx) => {
            return (
              <div
                key={idx}
                className={`flex items-start group min-w-fit transition-colors ${
                  line.isDiffHighlight
                    ? 'bg-teal-950/40 border-l-2 border-[#4bbca9]'
                    : 'hover:bg-slate-800/40 border-l-2 border-transparent'
                }`}
              >
                {/* Gutter / Line Number */}
                <div
                  className={`w-12 shrink-0 pr-3 text-right select-none text-xs leading-6 border-r border-slate-800/80 font-mono ${
                    line.isDiffHighlight
                      ? 'text-[#4bbca9] font-bold'
                      : 'text-slate-500 group-hover:text-slate-400'
                  }`}
                >
                  {line.isDiffHighlight ? (
                    <span className="inline-flex items-center justify-end gap-1">
                      <span className="text-[#4bbca9] text-[10px]">+</span>
                      <span>{idx + 1}</span>
                    </span>
                  ) : (
                    idx + 1
                  )}
                </div>

                {/* Code Content Line */}
                <div
                  className={`pl-3 sm:pl-4 pr-6 flex-1 font-mono text-xs sm:text-[13px] leading-6 select-text ${
                    wrapLines ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'
                  }`}
                >
                  {/* Indent Guide Columns (Every 2 leading spaces) */}
                  {Array.from({ length: line.indentCount }).map((_, i) => (
                    <span
                      key={i}
                      className="inline-block border-l border-slate-700/50 group-hover:border-slate-600/70 transition-colors select-none"
                      style={{ width: '2ch', boxSizing: 'border-box' }}
                    >
                      &nbsp;&nbsp;
                    </span>
                  ))}

                  {/* Remainder space (for 1 extra space e.g. JSDoc asterisks) */}
                  {line.remainder > 0 && <span className="select-none">&nbsp;</span>}

                  {/* Tokens or Empty Row Spacer */}
                  {line.isEmpty ? (
                    <span className="select-none inline-block">&nbsp;</span>
                  ) : (
                    line.tokens.map((token, tIdx) => {
                      const style = getTokenStyle(token.className)

                      // Special styling for TODO labels
                      if (token.text.includes('TODO:')) {
                        const parts = token.text.split('TODO:')
                        return (
                          <span key={tIdx} style={style}>
                            {parts[0]}
                            <span className="px-1.5 py-0.2 mx-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 text-[11px] not-italic">
                              TODO:
                            </span>
                            {parts[1]}
                          </span>
                        )
                      }

                      return (
                        <span key={tIdx} style={style}>
                          {token.text}
                        </span>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Editor Status Bar ── */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-1 bg-[#090d16] border-t border-slate-800 text-[11px] text-slate-400 font-mono select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#4bbca9]" />
            TypeScript
          </span>
          <span className="text-slate-600">|</span>
          <span>Ln {processedLines.length}, Col 1</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>Spaces: 2</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline">LF</span>
        </div>
      </div>
    </div>
  )
}
