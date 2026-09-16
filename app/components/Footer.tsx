/**
 * PURPOSE:
 * Site-wide Footer component for the UniOulu ICT Study Paths app (Light Theme).
 * Shows the academic nexus summary, People and Events navigation links,
 * and legal links (Terms & Conditions, Privacy Policy).
 *
 * CONTEXT/PARENT FILE:
 * Imported and rendered at the bottom of app/layout.tsx.
 */

import Image from 'next/image'
import Link from 'next/link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import GroupsIcon from '@mui/icons-material/Groups'
import EventIcon from '@mui/icons-material/Event'
import GavelIcon from '@mui/icons-material/Gavel'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-slate-200 py-16 mt-16 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-slate-200">

          {/* Brand & Description */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-auto flex items-center shrink-0">
                <Image
                  src="/unioulu-logo.png"
                  alt="UniOulu ICT Study Paths Logo"
                  width={64}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="text-[18px] font-bold text-slate-950">UniOulu ICT Study Paths</span>
            </div>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Empowering transformative bilateral research, engineering symposiums, and doctoral exchanges between the Faculty of ITEE at University of Oulu and premier academic institutes across Việt Nam.
            </p>
            <div className="flex items-start gap-2 text-teal-700">
              <LocationOnIcon sx={{ fontSize: 18, marginTop: '2px', flexShrink: 0, color: '#00a89d' }} />
              <span className="text-xs text-slate-600">
                University of Oulu, Pentti Kaiteran katu 1, 90570 Oulu, Finland
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Navigate</span>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#people"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 transition-colors"
                >
                  <GroupsIcon sx={{ fontSize: 16, color: '#00a89d' }} />
                  <span>People</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#events"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 transition-colors"
                >
                  <EventIcon sx={{ fontSize: 16, color: '#00a89d' }} />
                  <span>Events</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Legal</span>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 transition-colors"
                >
                  <GavelIcon sx={{ fontSize: 16, color: '#00a89d' }} />
                  <span>Terms &amp; Conditions</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-700 transition-colors"
                >
                  <PrivacyTipIcon sx={{ fontSize: 16, color: '#00a89d' }} />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            © 2025 Faculty of ITEE, University of Oulu &amp; Vietnam Academic Consortia. All rights reserved.
          </span>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-teal-700 font-mono text-[11px] tracking-wider uppercase font-semibold">
              UNIOULU ICT STUDY PATHS
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
