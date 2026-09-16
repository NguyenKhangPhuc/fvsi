'use client'

/**
 * PURPOSE:
 * Client Component rendering the Terms & Conditions legal document with Framer Motion animations.
 * Strictly adheres to redesign-skill guidelines and centralized design tokens.
 *
 * CONTEXT/PARENT FILE:
 * Mounted by 'app/terms-and-conditions/page.tsx'.
 */

import { motion } from 'framer-motion'
import Link from 'next/link'
import GavelIcon from '@mui/icons-material/Gavel'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import SecurityIcon from '@mui/icons-material/Security'
import StorageIcon from '@mui/icons-material/Storage'
import ShieldIcon from '@mui/icons-material/Shield'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import BackButton from '@/app/components/BackButton'

const SECTIONS = [
  { id: 'internal-use', title: '1. Internal Use Advisory' },
  { id: 'collected-info', title: '2. User Authentication & Collected Data' },
  { id: 'supabase-gdpr', title: '3. Supabase Cloud & GDPR Compliance' },
  { id: 'intellectual-property', title: '4. Intellectual Property' },
  { id: 'acceptable-use', title: '5. Acceptable Use & Account Security' },
  { id: 'liability', title: '6. Limitation of Liability' },
  { id: 'governing-law', title: '7. Governing Law & Jurisdiction' },
  { id: 'contact', title: '8. Contact Information' },
]

export default function TermsAndConditionsClient() {
  return (
    <div className="relative min-h-screen w-full bg-[#f8fafc] text-slate-900 pb-20 select-none">
      {/* ── Background Matrix Pattern ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="terms-grid-matrix" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00a89d" strokeDasharray="3 5" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#terms-grid-matrix)" />
          <circle cx="15%" cy="20%" r="300" fill="none" stroke="#00a89d" strokeWidth="1" opacity="0.25" />
          <circle cx="85%" cy="75%" r="380" fill="none" stroke="#008f85" strokeWidth="1" strokeDasharray="4 8" opacity="0.2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation / Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <BackButton href="/" label="Return to Home" />
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Effective Date: March 2025
          </span>
        </div>

        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
                <GavelIcon sx={{ fontSize: 16, color: '#00a89d' }} />
                <span>Legal Agreement</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Terms &amp; Conditions
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Please read these terms carefully before accessing or using the UniOulu ICT Study Paths Collaborative Platform.
              </p>
            </div>

            {/* Quick Summary Pill Box */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 max-w-sm shrink-0 flex items-start gap-3">
              <WarningAmberIcon sx={{ fontSize: 24, color: '#d97706', shrink: 0, mt: 0.5 }} />
              <div className="text-xs leading-relaxed">
                <span className="font-bold block text-amber-950 mb-0.5">Notice to Public Visitors:</span>
                This platform is tailored for internal administrative coordination. General public attendees do not need to register or log in to browse events.
              </div>
            </div>
          </div>

          {/* Quick Anchor Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-wide">Jump to:</span>
            {SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-3 py-1 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-slate-700 hover:text-teal-800 text-xs font-medium transition-all"
              >
                {sec.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Document Body (Structured Sections) ── */}
        <div className="space-y-6">
          {/* Section 1: Internal Use Advisory */}
          <motion.section
            id="internal-use"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#00a89d]">
                <WarningAmberIcon sx={{ fontSize: 20 }} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-950">
                1. Internal Use Advisory
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3">
              <p>
                The UniOulu ICT Study Paths web application is primarily designed and operated for <strong>internal administrative, research synchronization, and event coordination purposes</strong> between the Faculty of Information Technology and Electrical Engineering (ITEE) at the University of Oulu, Finland, and academic consortium partners in Vietnam.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-2">
                <p className="font-semibold text-slate-900">
                  Recommendation Regarding Authentication:
                </p>
                <p className="text-sm text-slate-600">
                  Public visitors, conference attendees, and general community members are <strong>not required and not recommended to create an account or sign in</strong>. All public event agendas, schedules, merchandise highlights, and speaker directories are freely accessible without authentication.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 2: User Authentication & Collected Data */}
          <motion.section
            id="collected-info"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#00a89d]">
                <InfoOutlinedIcon sx={{ fontSize: 20 }} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-950">
                2. User Authentication &amp; Collected Information
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3">
              <p>
                If you choose to authenticate onto the platform (via native email registration or third-party OAuth providers including Google or GitHub), you explicitly acknowledge that the system collects and maintains specific identifiers:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700 font-medium">
                <li><strong>Full Name:</strong> Provided directly or retrieved via OAuth identity claims to associate created events and author contributions.</li>
                <li><strong>Email Address:</strong> Used strictly for account identification, role verification, and critical service notifications.</li>
                <li><strong>IP Address (Internet Protocol):</strong> Recorded by network firewalls and application gateways to mitigate abuse, detect unauthorized intrusion, and fulfill audit requirements.</li>
                <li><strong>Access Logs &amp; Audit Telemetry:</strong> Connection timestamps, authentication events, HTTP request methods, and session metadata required for operational integrity.</li>
              </ul>
              <p className="text-xs text-slate-500 italic mt-2">
                For detailed disclosures on data processing procedures, refer to our comprehensive <Link href="/privacy-policy" className="text-teal-700 underline font-semibold hover:text-teal-800">Privacy Policy</Link>.
              </p>
            </div>
          </motion.section>

          {/* Section 3: Supabase Cloud & GDPR Compliance */}
          <motion.section
            id="supabase-gdpr"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#00a89d]">
                <StorageIcon sx={{ fontSize: 20 }} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-950">
                3. Supabase Cloud Infrastructure &amp; GDPR Compliance
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3">
              <p>
                The platform relies on <strong>Supabase Cloud</strong> as its cloud-hosted PostgreSQL database and authentication infrastructure. Supabase Cloud adheres to stringent European security certifications and full compliance with the <strong>General Data Protection Regulation (GDPR)</strong> (EU) 2016/679.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Encrypted In Transit &amp; At Rest</span>
                  <span className="text-xs text-slate-600">All data transferred between client browsers and server instances uses TLS 1.3 encryption; database disks are encrypted using AES-256 standards.</span>
                </div>
                <div className="p-4 rounded-xl bg-[#f8fafc] border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Row Level Security (RLS)</span>
                  <span className="text-xs text-slate-600">Database tables enforce granular Row Level Security policies preventing unauthorized cross-user modifications and data exfiltration.</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Intellectual Property */}
          <motion.section
            id="intellectual-property"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#00a89d]">
                <ShieldIcon sx={{ fontSize: 20 }} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-950">
                4. Intellectual Property &amp; University Trademarks
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2">
              <p>
                All visual identities, emblems, photographs, event curricula, software artifacts, and institutional merchandise featured on this portal are protected by international copyright, trademark, and intellectual property conventions.
              </p>
              <p>
                Trademarks of the University of Oulu, the Faculty of ITEE, and collaborating Vietnamese academic universities may not be reproduced, altered, or redistributed for commercial exploitation without prior formal written consent from authorized institutional liaisons.
              </p>
            </div>
          </motion.section>

          {/* Section 5: Acceptable Use & Account Security */}
          <motion.section
            id="acceptable-use"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#00a89d]">
                <SecurityIcon sx={{ fontSize: 20 }} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-950">
                5. Acceptable Use &amp; Account Security
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2">
              <p>Users who obtain administrative or contributor credentials agree to:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                <li>Safeguard their login credentials and not share authenticated accounts with unauthorized individuals.</li>
                <li>Refrain from reverse-engineering, vulnerability scanning, automated scraping, or conducting denial-of-service attacks.</li>
                <li>Publish only truthful, non-infringing academic agendas and authorized event posters.</li>
              </ul>
              <p className="text-xs text-slate-500 mt-2">
                We reserve the immediate right to suspend or terminate accounts that engage in malicious activity or violate these conditions.
              </p>
            </div>
          </motion.section>

          {/* Section 6: Limitation of Liability */}
          <motion.section
            id="liability"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              This portal is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis for non-commercial academic coordination. While the Faculty of ITEE endeavors to maintain platform availability and accurate event schedules, we accept no liability for incidental interruptions, inadvertent scheduling inaccuracies, or third-party telecommunication failures.
            </p>
          </motion.section>

          {/* Section 7: Governing Law & Jurisdiction */}
          <motion.section
            id="governing-law"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 mb-3">
              7. Governing Law &amp; Jurisdiction
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              These Terms &amp; Conditions are governed by and construed in accordance with the substantive laws of <strong>Finland</strong> and applicable <strong>European Union directives</strong>, without giving effect to any conflict of law principles. Any legal dispute shall be submitted to the exclusive jurisdiction of the District Court of Oulu, Finland.
            </p>
          </motion.section>

          {/* Section 8: Contact Information */}
          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 mb-3">
              8. Contact &amp; Inquiries
            </h2>
            <div className="text-sm md:text-base text-slate-600 space-y-1 leading-relaxed">
              <p>For administrative or legal clarifications regarding these terms, please contact:</p>
              <p className="font-semibold text-slate-900 pt-1">Faculty of ITEE, University of Oulu</p>
              <p>Pentti Kaiteran katu 1, 90570 Oulu, Finland</p>
              <p>Email: <span className="text-teal-700 font-medium">itee.cooperation@oulu.fi</span></p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
