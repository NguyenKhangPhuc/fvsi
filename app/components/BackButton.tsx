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
  href?: string
  label?: string
}

export default function BackButton({ href = '/', label = 'Back' }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#83958d] uppercase tracking-widest hover:text-[#00e0b3] transition-colors"
    >
      <ArrowBackIcon sx={{ fontSize: 14 }} />
      <span>{label}</span>
    </button>
  )
}
