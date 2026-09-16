'use client'

/**
 * PURPOSE:
 * Simple back navigation button used on auth pages.
 * Navigates to the previous page in browser history or falls back to '/'.
 *
 * CONTEXT/PARENT FILE:
 * Imported by app/login/page.tsx, app/sign-up/page.tsx, app/forget-password/page.tsx, etc.
 */

import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface BackButtonProps {
  className?: string
  href?: string
  label?: string
}

export default function BackButton({ className = '' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 text-[10px] font-mono text-[#83958d] uppercase tracking-widest hover:text-[#00e0b3] transition-colors cursor-pointer ${className}`.trim()}
    >
      <ArrowBackIcon sx={{ fontSize: 14 }} />
      <span>Back</span>
    </button>
  )
}
