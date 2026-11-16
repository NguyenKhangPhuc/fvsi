'use client'

/**
 * PURPOSE:
 * Toast showing the message from NotificationContext (success and error feedback after API calls).
 * Full-width at the top on phones; a compact card at the top-right from the 'sm' breakpoint.
 *
 * CONTEXT/PARENT FILE:
 * Rendered by NotificationProvider in 'app/context/NotificationContext.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - content (string | null, Required): Message to show.
 * - isOpen (boolean, Required): Whether the toast is visible.
 */

import { tw } from '@/app/constants/design-tokens'

interface NotificationToastProps {
  content: string | null
  isOpen: boolean
}

export default function NotificationToast({ content, isOpen }: NotificationToastProps) {
  if (!isOpen || !content) return null

  return (
    <div className="fixed top-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:top-6 z-[120] pointer-events-none flex sm:justify-end">
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-auto flex items-stretch w-full sm:w-auto sm:min-w-[260px] sm:max-w-sm overflow-hidden rounded-xl border shadow-lg ${tw.feedback.toast}`}
      >
        <span className={`w-1.5 shrink-0 ${tw.feedback.toastAccent}`} />
        <p className="px-4 py-3 text-sm font-semibold leading-snug break-words">{content}</p>
      </div>
    </div>
  )
}
