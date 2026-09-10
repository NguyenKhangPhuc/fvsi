/**
 * PURPOSE:
 * Site-wide Footer component for the VN-FI Collaboration app.
 * Shows the academic nexus summary, People and Events navigation links,
 * and legal links (Terms & Conditions, Privacy Policy).
 *
 * CONTEXT/PARENT FILE:
 * Imported and rendered at the bottom of app/layout.tsx.
 */

import Link from 'next/link'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import GroupsIcon from '@mui/icons-material/Groups'
import EventIcon from '@mui/icons-material/Event'
import GavelIcon from '@mui/icons-material/Gavel'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#262626] py-16 mt-16">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[#222222]">

          {/* Brand & Description */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#00fff1] shadow-[0_0_10px_#00fff1]" />
              <span className="text-[18px] font-bold text-white">Việt Nam - Finland Academic Nexus</span>
            </div>
            <p className="text-sm text-[#a3a3a3] max-w-sm leading-relaxed">
              Empowering transformative bilateral research, engineering symposiums, and doctoral exchanges between the ITEE Faculty at University of Oulu and premier academic institutes across Việt Nam.
            </p>
            <div className="flex items-start gap-2 text-[#00fff1]">
              <LocationOnIcon sx={{ fontSize: 18, marginTop: '2px', flexShrink: 0 }} />
              <span className="text-xs text-[#a3a3a3]">
                University of Oulu, Pentti Kaiteran katu 1, 90570 Oulu, Finland
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#00fff1] uppercase tracking-widest">Navigate</span>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#people"
                  className="flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                >
                  <GroupsIcon sx={{ fontSize: 16, color: '#00fff1' }} />
                  <span>People</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#events"
                  className="flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                >
                  <EventIcon sx={{ fontSize: 16, color: '#00fff1' }} />
                  <span>Events</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#00fff1] uppercase tracking-widest">Legal</span>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                >
                  <GavelIcon sx={{ fontSize: 16, color: '#00fff1' }} />
                  <span>Terms &amp; Conditions</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors"
                >
                  <PrivacyTipIcon sx={{ fontSize: 16, color: '#00fff1' }} />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#a3a3a3]">
          <span>
            © 2025 ITEE Faculty, University of Oulu &amp; Vietnam Academic Consortia. All rights reserved.
          </span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00fff1] animate-pulse" />
            <span className="text-[#00fff1] font-mono">VN · FI ACADEMIC BRIDGE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
