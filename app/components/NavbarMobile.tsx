'use client'

/**
 * PURPOSE:
 * Mobile and tablet navigation bar client component (below xl breakpoint).
 * Renders a compact floating pill with logo, a hamburger/close toggle, and
 * a Framer Motion animated slide-down drawer with navigation links and auth actions.
 *
 * CONTEXT/PARENT FILE:
 * Imported by NavbarServer.tsx, rendered inside a block div visible only below xl.
 *
 * INPUTS / PARAMETERS:
 * - initialUser (Profile | null): The authenticated user's profile fetched server-side.
 */

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
import { Database } from '@/app/types/database.types'
import { createClient } from '@/app/utils/supabase/client'

type Profile = Database['public']['Tables']['profiles']['Row']

interface NavbarMobileProps {
  initialUser: Profile | null
}

const navLinks = [
  { label: 'Home', href: '/', Icon: HomeIcon },
  { label: 'People', href: '/#people', Icon: GroupsIcon },
  { label: 'Events', href: '/#events', Icon: EventIcon },
]

export default function NavbarMobile({ initialUser }: NavbarMobileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setIsOpen(false)
    router.push('/')
    router.refresh()
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* ── Floating Pill ── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm"
      >
        <div className="bg-[#121212]/90 backdrop-blur-xl border border-[#2e2e2e] shadow-[0_4px_24px_rgba(0,0,0,0.8)] rounded-xl px-4 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00fff1] shadow-[0_0_6px_#00fff1]" />
            <div className="flex flex-col">
              <span className="text-[16px] font-bold text-white tracking-tight leading-none">VN · FI</span>
              <span className="text-[9px] font-bold text-[#00fff1] uppercase tracking-wider leading-none mt-0.5">ITEE Faculty</span>
            </div>
          </Link>

          {/* Hamburger toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="w-9 h-9 rounded-lg bg-[#202020] border border-[#2e2e2e] flex items-center justify-center hover:border-[#00fff1]/50 transition-all"
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
                  <CloseIcon sx={{ fontSize: 18, color: '#00fff1' }} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon sx={{ fontSize: 18, color: 'white' }} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
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
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Drawer */}
            <motion.nav
              key="drawer"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm bg-[#121212]/95 backdrop-blur-xl border border-[#2e2e2e] rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* User info (when signed in) */}
              {initialUser && (
                <div className="px-4 py-4 border-b border-[#2e2e2e] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00fff1]/20 border border-[#00fff1]/40 flex items-center justify-center">
                    <PersonIcon sx={{ fontSize: 18, color: '#00fff1' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white truncate max-w-[180px]">
                      {initialUser.full_name ?? 'User'}
                    </p>
                    <p className="text-xs text-[#a3a3a3] truncate max-w-[180px]">
                      {initialUser.email}
                    </p>
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
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#a3a3a3] hover:text-white hover:bg-[#202020] transition-colors"
                    >
                      <link.Icon sx={{ fontSize: 18, color: '#00fff1' }} />
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Auth section */}
              <div className="border-t border-[#2e2e2e] py-2 px-2">
                {initialUser ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#a3a3a3] hover:text-red-400 hover:bg-[#202020] rounded-lg transition-colors"
                  >
                    <LogoutIcon sx={{ fontSize: 18 }} />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 p-2">
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm text-[#a3a3a3] border border-[#2e2e2e] hover:text-white hover:border-[#00fff1]/50 rounded-lg transition-all"
                    >
                      <LoginIcon sx={{ fontSize: 16 }} />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-bold text-black bg-[#00fff1] rounded-lg shadow-[0_0_12px_rgba(0,255,241,0.3)] hover:shadow-[0_0_20px_rgba(0,255,241,0.5)] transition-all"
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
