'use client'

/**
 * PURPOSE:
 * Desktop navigation bar client component (xl and above).
 * Renders a floating light glassmorphic pill with branding, navigation links,
 * and authentication controls (Sign In / Sign Up or signed-in initialUser avatar).
 *
 * RBAC:
 * Displays Home, People, Events by default.
 * If initialUser?.role === 'admin', additionally shows Events Management and Users Management.
 *
 * CONTEXT/PARENT FILE:
 * Imported by NavbarServer.tsx, rendered inside a hidden div visible only at xl+.
 *
 * INPUTS / PARAMETERS:
 * - initialUser (Profile | null): The authenticated initialUser's profile fetched server-side.
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
import { useState, useMemo, useEffect } from 'react'
import { signout } from '../actions/authentication/post/signout'

type Profile = Database['public']['Tables']['profiles']['Row']

interface NavBarProps {
  initialUser: Profile | null
}

export default function NavBar({ initialUser }: NavBarProps) {
  const pathname = usePathname()
  const router = useRouter()


  const handleLogout = async () => {
    try {
      await signout()
    } catch (error) {
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        // showNotification(error.message)
      }
    }
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
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-slate-900 tracking-tight leading-none">FVSI</span>
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
                  ? '!bg-[#4bbca9] !text-white font-bold rounded-lg px-3 py-1.5 text-sm transition-all shadow-sm'
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
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
                <div className="w-7 h-7 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center">
                  <PersonIcon sx={{ fontSize: 16, color: '#00a89d' }} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-slate-900 font-semibold max-w-[120px] truncate leading-tight">
                    {initialUser.full_name ?? initialUser.email ?? 'initialUser'}
                  </span>
                  {initialUser.role && (
                    <span className="text-[9px] text-teal-700 uppercase font-bold tracking-wider leading-none">
                      {initialUser.role}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-red-600 bg-white border border-slate-200 hover:bg-red-50 hover:border-red-200 rounded-lg transition-all cursor-pointer shadow-2xs"
                title="Log Out"
              >
                <LogoutIcon sx={{ fontSize: 16 }} />
                <span>Log Out</span>
              </button>
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
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-[#4bbca9] rounded-lg shadow-[0_0_16px_rgba(75,188,169,0.35)] hover:shadow-[0_0_24px_rgba(75,188,169,0.5)] hover:bg-[#3ea694] transition-all"
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
