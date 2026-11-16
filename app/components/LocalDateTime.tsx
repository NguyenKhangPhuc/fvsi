'use client'

/**
 * PURPOSE:
 * Renders a UTC timestamp in the viewer's own timezone (date, time and timezone name).
 *
 * CONTEXT/PARENT FILE:
 * Used by 'app/events/[id]/components/EventSidebar.tsx' for the online watch session start time.
 *
 * BEHAVIORAL MECHANISM:
 * The server does not know the viewer's timezone, so the value is rendered only after hydration
 * (useSyncExternalStore returns false on the server and true on the client). This avoids a
 * hydration mismatch between server-rendered and browser-rendered text.
 *
 * INPUTS / PARAMETERS:
 * - value (string | null | undefined): ISO 8601 timestamp.
 * - dateClassName / timeClassName (string, Optional): Tailwind classes for the date and time lines.
 */

import { useSyncExternalStore } from 'react'

interface LocalDateTimeProps {
  value: string | null | undefined
  dateClassName?: string
  timeClassName?: string
}

const subscribe = () => () => {}

export default function LocalDateTime({ value, dateClassName, timeClassName }: LocalDateTimeProps) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  const date = value ? new Date(value) : null
  if (!isClient || !date || isNaN(date.getTime())) {
    return <span className={dateClassName}>–</span>
  }

  return (
    <>
      <span className={dateClassName}>
        {date.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
      </span>
      <span className={timeClassName}>
        {date.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        })}
      </span>
    </>
  )
}
