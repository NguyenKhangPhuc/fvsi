'use client'

/**
 * PURPOSE:
 * Full-screen loading overlay shown while any API call is running (LoaderContext.isOpenLoader).
 * It blocks interaction with the page so actions cannot be submitted twice.
 *
 * CONTEXT/PARENT FILE:
 * Rendered by LoaderProvider in 'app/context/LoaderContext.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - isOpen (boolean, Required): Whether the overlay is visible.
 */

import { tw } from '@/app/constants/design-tokens'

interface GlobalLoaderProps {
  isOpen: boolean
}

export default function GlobalLoader({ isOpen }: GlobalLoaderProps) {
  if (!isOpen) return null

  return (
    <div
      role="alert"
      aria-busy="true"
      aria-label="Loading"
      className={`fixed inset-0 z-[110] flex items-center justify-center backdrop-blur-sm ${tw.feedback.overlay}`}
    >
      <div
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-4 animate-spin ${tw.feedback.spinnerTrack} ${tw.feedback.spinnerHead}`}
      />
    </div>
  )
}
