'use client'

/**
 * PURPOSE:
 * Livestream clock for an event, based on its session 1 start_date and end_date (UTC instants):
 * - before start_date: a live countdown ("Livestream starts in 2d 03h 15m 42s");
 * - from start_date until end_date: "Livestream is ongoing";
 * - after end_date (or when there is no start_date): renders nothing.
 *
 * CONTEXT/PARENT FILE:
 * Used by 'app/events/[id]/components/EventHero.tsx' (size "md") and
 * 'app/components/HomeEventsClient.tsx' event cards (size "sm").
 *
 * BEHAVIORAL MECHANISM:
 * - The countdown is computed from absolute instants, so it is correct in any viewer timezone.
 * - The phase is evaluated once on mount. If the event has already ended (or has no start), no timer
 *   is created at all. While counting down it ticks once per second; once live it sleeps with a single
 *   timeout until end_date, then clears itself. Nothing is rendered on the server (no hydration mismatch).
 *
 * INPUTS / PARAMETERS:
 * - startDate / endDate (string | null | undefined): Stored UTC ISO timestamps of session 1.
 * - size ('sm' | 'md', Optional): Compact card size or larger hero size. Defaults to 'md'.
 */

import { useEffect, useState } from 'react'
import { getLivestreamPhase } from '@/app/helpers/dateTime'
import { tw } from '@/app/constants/design-tokens'

interface LivestreamClockProps {
  startDate: string | null | undefined
  endDate: string | null | undefined
  size?: 'sm' | 'md'
}

/** setTimeout cannot exceed ~24.8 days; longer waits are simply re-evaluated. */
const MAX_TIMEOUT_MS = 2_147_483_647

function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${days > 0 ? `${days}d ` : ''}${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
}

export default function LivestreamClock({ startDate, endDate, size = 'md' }: LivestreamClockProps) {
  const [nowMs, setNowMs] = useState<number | null>(null)

  useEffect(() => {
    const startMs = startDate ? new Date(startDate).getTime() : NaN
    const endMs = endDate ? new Date(endDate).getTime() : NaN
    let timer: ReturnType<typeof setTimeout> | undefined

    const tick = () => {
      const now = Date.now()
      setNowMs(now)
      const phase = getLivestreamPhase(startDate, endDate, now)
      if (phase === 'countdown') {
        timer = setTimeout(tick, 1000 - (now % 1000))
      } else if (phase === 'live') {
        timer = setTimeout(tick, Math.min(endMs - now, MAX_TIMEOUT_MS))
      }
      // 'none': ended or not applicable — no further checks.
    }

    // Skip any work for events that are already over or have no usable start.
    if (isNaN(startMs) && isNaN(endMs)) return
    tick()
    return () => clearTimeout(timer)
  }, [startDate, endDate])

  if (nowMs === null) return null
  const phase = getLivestreamPhase(startDate, endDate, nowMs)
  if (phase === 'none') return null

  const sizing =
    size === 'sm' ? 'px-2.5 py-1.5 text-[11px] gap-1.5' : 'px-4 py-2.5 text-xs md:text-sm gap-2'

  if (phase === 'live') {
    return (
      <div
        role="status"
        className={`inline-flex items-center w-fit max-w-full rounded-lg border font-bold uppercase tracking-wider ${sizing} ${tw.clock.live}`}
      >
        <span className={`w-2 h-2 rounded-full shrink-0 animate-pulse ${tw.clock.liveDot}`} />
        <span>Livestream is ongoing</span>
      </div>
    )
  }

  const startMs = new Date(startDate as string).getTime()
  return (
    <div
      role="timer"
      aria-live="off"
      className={`inline-flex flex-wrap items-center w-fit max-w-full rounded-lg border font-bold ${sizing} ${tw.clock.countdown}`}
    >
      <span className="uppercase tracking-wider">Livestream starts in</span>
      <span className="font-mono tabular-nums">{formatRemaining(startMs - nowMs)}</span>
    </div>
  )
}
