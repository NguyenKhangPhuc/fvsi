'use client'

/**
 * PURPOSE:
 * Mobile and tablet navigation bar client component (below xl breakpoint).
 * Renders a compact floating light pill with logo, a hamburger/close toggle, and
 * a Framer Motion animated slide-down drawer with navigation links and auth actions.
 *
 * RBAC:
 * Shows Home, People, Events by default.
 * If initialUser?.role === 'admin', additionally displays Events Management and Users Management.
 *
 * CONTEXT/PARENT FILE:
 * Imported by NavbarServer.tsx, rendered inside a block div visible only below xl.
 *
 * INPUTS / PARAMETERS:
 * - initialUser (Profile | null): The authenticated initialUser's profile fetched server-side.
 */

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import GroupsIcon from '@mui/icons-material/Groups'
import EventIcon from '@mui/icons-material/Event'
import EventNoteIcon from '@mui/icons-material/EventNote'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { Database } from '@/app/types/database.types'
import { createClient } from '@/app/utils/supabase/client'

import { useState, useMemo, useEffect } from 'react'
import { signout } from '../actions/authentication/post/signout'

type Profile = Database['public']['Tables']['profiles']['Row']

interface NavbarMobileProps {
  initialUser: Profile | null
}

export default function NavbarMobile({ initialUser }: NavbarMobileProps) {
  const [isOpen, setIsOpen] = useState(false)
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

  const closeMenu = () => setIsOpen(false)

  // Navigation items: Home, People, Events always visible.
  // Admin role unlocks Events Management and Users Management.
  const navLinks = useMemo(() => {
    const links = [
      { label: 'Home', href: '/', Icon: HomeIcon },
      { label: 'People', href: '/#people', Icon: GroupsIcon },
      { label: 'Events', href: '/#events', Icon: EventIcon },
    ]

    if (initialUser?.role === 'admin') {
      links.push(
        { label: 'Events Management', href: '/events-management', Icon: EventNoteIcon },
        { label: 'Users Management', href: '/users-management', Icon: ManageAccountsIcon }
      )
    }

    return links
  }, [initialUser?.role])

  return (
    <>
      {/* ── Floating Pill ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm"
      >
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_24px_rgba(15,23,42,0.06)] rounded-xl px-4 h-14 flex items-center justify-between transition-all">
          {/* Brand */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[16px] font-bold text-slate-900 tracking-tight leading-none">FVSI</span>
              <span className="text-[9px] font-bold text-teal-700 uppercase tracking-wider leading-none mt-0.5">ITEE Faculty</span>
            </div>
          </Link>

          {/* Quick auth + Hamburger toggle */}
          <div className="flex items-center gap-2">
            {initialUser ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-slate-700 hover:text-red-600 bg-slate-100 border border-slate-200 rounded-lg transition-all cursor-pointer"
                title="Log Out"
              >
                <LogoutIcon sx={{ fontSize: 14 }} />
                <span>Log Out</span>
              </button>
            ) : (
              <Link
                href="/sign-up"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-[#4bbca9] rounded-lg shadow-2xs hover:bg-[#3ea694] transition-all"
              >
                <PersonAddIcon sx={{ fontSize: 14 }} />
                <span>Sign Up</span>
              </Link>
            )}

            {/* Hamburger toggle */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center hover:border-teal-500/50 transition-all cursor-pointer"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CloseIcon sx={{ fontSize: 18, color: '#0f172a' }} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuIcon sx={{ fontSize: 18, color: '#0f172a' }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Drawer Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Drawer */}
            <motion.nav
              key="drawer"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm bg-white/95 backdrop-blur-xl border border-slate-200 rounded-xl shadow-[0_8px_40px_rgba(15,23,42,0.15)] overflow-hidden"
            >
              {/* initialUser info (when signed in) */}
              {initialUser && (
                <div className="px-4 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center">
                    <PersonIcon sx={{ fontSize: 18, color: '#00a89d' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 truncate max-w-[180px]">
                      {initialUser.full_name ?? 'initialUser'}
                    </p>
                    <p className="text-xs text-slate-500 truncate max-w-[180px]">
                      {initialUser.email}
                    </p>
                    {initialUser.role && (
                      <span className="inline-block mt-0.5 text-[9px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 border border-teal-200 px-1.5 py-0.2 rounded">
                        {initialUser.role}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Nav links */}
              <ul className="py-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors font-medium"
                    >
                      <link.Icon sx={{ fontSize: 18, color: '#00a89d' }} />
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Auth section */}
              <div className="border-t border-slate-100 py-2 px-2 bg-slate-50/50">
                {initialUser ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogoutIcon sx={{ fontSize: 18 }} />
                    <span>Log Out</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 p-2">
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 border border-slate-200 hover:bg-slate-100 rounded-lg transition-all font-medium"
                    >
                      <LoginIcon sx={{ fontSize: 16 }} />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-bold text-white bg-[#4bbca9] rounded-lg shadow-[0_0_12px_rgba(75,188,169,0.35)] hover:shadow-[0_0_20px_rgba(75,188,169,0.5)] hover:bg-[#3ea694] transition-all"
                    >
                      <PersonAddIcon sx={{ fontSize: 16 }} />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
