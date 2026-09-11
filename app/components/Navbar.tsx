'use client'

/**
 * PURPOSE:
 * Desktop navigation bar client component (xl and above).
 * Renders a floating light glassmorphic pill with branding, navigation links,
 * and authentication controls (Sign In / Sign Up or signed-in user avatar).
 *
 * RBAC:
 * Displays Home, People, Events by default.
 * If initialUser?.role === 'admin', additionally shows Events Management and Users Management.
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
import { useState, useMemo } from 'react'

type Profile = Database['public']['Tables']['profiles']['Row']

interface NavBarProps {
  initialUser: Profile | null
}

export default function NavBar({ initialUser }: NavBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Navigation items: Home, People, Events always visible.
  // Admin role unlocks Events Management and Users Management.
  const navLinks = useMemo(() => {
    const links = [
      { label: 'Home', href: '/' },
      { label: 'People', href: '/#people' },
      { label: 'Events', href: '/#events' },
    ]

    if (initialUser?.role === 'admin') {
      links.push(
        { label: 'Events Management', href: '/events-management' },
        { label: 'Users Management', href: '/users-management' }
      )
    }

    return links
  }, [initialUser?.role])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return false
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-6 left-0 right-0 z-50 px-4 lg:px-6 max-w-[1280px] mx-auto w-full"
    >
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_24px_rgba(15,23,42,0.06)] rounded-xl px-6 h-16 flex items-center justify-between transition-all">
        {/* ── Brand ── */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00c2b2] shadow-[0_0_8px_#00c2b2]" />
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-slate-900 tracking-tight leading-none">VN · FI</span>
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider leading-none mt-1">ITEE Faculty</span>
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
                  ? 'bg-[#00c2b2] text-slate-900 font-bold rounded-lg px-3 py-1.5 text-sm transition-all shadow-sm'
                  : 'text-sm text-slate-600 hover:text-slate-950 font-medium transition-colors'
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
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg hover:border-teal-500/50 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center">
                  <PersonIcon sx={{ fontSize: 16, color: '#00a89d' }} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-slate-900 font-semibold max-w-[120px] truncate leading-tight">
                    {initialUser.full_name ?? initialUser.email ?? 'User'}
                  </span>
                  {initialUser.role && (
                    <span className="text-[9px] text-teal-700 uppercase font-bold tracking-wider leading-none">
                      {initialUser.role}
                    </span>
                  )}
                </div>
              </button>

              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-[0_8px_32px_rgba(15,23,42,0.12)] overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {initialUser.full_name ?? 'Account'}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {initialUser.email}
                    </p>
                  </div>
                  <button
                    onClick={() => { handleSignOut(); setDropdownOpen(false) }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:text-red-600 hover:bg-slate-50 transition-colors cursor-pointer"
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
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-slate-700 hover:text-slate-950 border border-slate-200 hover:bg-slate-50 rounded-lg transition-all font-medium"
              >
                <LoginIcon sx={{ fontSize: 16 }} />
                <span>Sign In</span>
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-900 bg-[#00c2b2] rounded-lg shadow-[0_0_16px_rgba(0,194,178,0.35)] hover:shadow-[0_0_24px_rgba(0,194,178,0.5)] hover:bg-[#00b4a6] transition-all"
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
