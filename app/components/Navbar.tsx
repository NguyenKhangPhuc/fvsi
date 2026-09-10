'use client'

/**
 * PURPOSE:
 * Desktop navigation bar client component (xl and above).
 * Renders a floating dark glassmorphic pill with branding, navigation links,
 * and authentication controls (Sign In / Sign Up or signed-in user avatar).
 *
 * CONTEXT/PARENT FILE:
 * Imported by NavbarServer.tsx, rendered inside a hidden div visible only at xl+.
 *
 * INPUTS / PARAMETERS:
 * - initialUser (Profile | null): The authenticated user's profile fetched server-side.
 */

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LogoutIcon from '@mui/icons-material/Logout'
import { Database } from '@/app/types/database.types'
import { createClient } from '@/app/utils/supabase/client'
import { useState } from 'react'

type Profile = Database['public']['Tables']['profiles']['Row']

interface NavBarProps {
  initialUser: Profile | null
}

const navLinks = [
  { label: 'Home', href: '/', anchor: null },
  { label: 'People', href: '/#people', anchor: 'people' },
  { label: 'Events', href: '/#events', anchor: 'events' },
]

export default function NavBar({ initialUser }: NavBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isHome = pathname === '/'

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return false
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-[1280px]"
    >
      <div className="bg-[#121212]/90 backdrop-blur-xl border border-[#2e2e2e] shadow-[0_4px_24px_rgba(0,0,0,0.8)] rounded-xl px-6 h-16 flex items-center justify-between">
        {/* ── Brand ── */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00fff1] shadow-[0_0_8px_#00fff1]" />
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-white tracking-tight leading-none">VN · FI</span>
            <span className="text-[10px] font-bold text-[#00fff1] uppercase tracking-wider leading-none mt-0.5">ITEE Faculty</span>
          </div>
        </Link>

        {/* ── Nav Links ── */}
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                isActive(link.href)
                  ? 'bg-[#00fff1] text-black font-bold rounded-lg px-3 py-1.5 text-sm transition-all'
                  : 'text-sm text-[#a3a3a3] hover:text-white transition-colors'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Auth Controls ── */}
        <div className="flex items-center gap-3">
          {initialUser ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#202020] border border-[#2e2e2e] rounded-lg hover:border-[#00fff1]/50 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#00fff1]/20 border border-[#00fff1]/40 flex items-center justify-center">
                  <PersonIcon sx={{ fontSize: 16, color: '#00fff1' }} />
                </div>
                <span className="text-sm text-white font-medium max-w-[120px] truncate">
                  {initialUser.full_name ?? initialUser.email ?? 'User'}
                </span>
              </button>

              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-[#181818] border border-[#2e2e2e] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden"
                >
                  <button
                    onClick={() => { handleSignOut(); setDropdownOpen(false) }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-[#a3a3a3] hover:text-white hover:bg-[#202020] transition-colors"
                  >
                    <LogoutIcon sx={{ fontSize: 16 }} />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-[#a3a3a3] hover:text-white border border-[#2e2e2e] hover:border-[#00fff1]/50 rounded-lg transition-all"
              >
                <LoginIcon sx={{ fontSize: 16 }} />
                <span>Sign In</span>
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-black bg-[#00fff1] rounded-lg shadow-[0_0_16px_rgba(0,255,241,0.3)] hover:shadow-[0_0_24px_rgba(0,255,241,0.5)] transition-all"
              >
                <PersonAddIcon sx={{ fontSize: 16 }} />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}
