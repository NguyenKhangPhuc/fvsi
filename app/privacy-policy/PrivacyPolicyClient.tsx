'use client'

/**
 * PURPOSE:
 * Client Component rendering the Privacy Policy and GDPR compliance disclosures.
 * Features Framer Motion staggered entrance animations and responsive design token styling.
 *
 * CONTEXT/PARENT FILE:
 * Mounted by 'app/privacy-policy/page.tsx'.
 */

import { motion } from 'framer-motion'
import Link from 'next/link'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import StorageIcon from '@mui/icons-material/Storage'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import LockIcon from '@mui/icons-material/Lock'
import TerminalIcon from '@mui/icons-material/Terminal'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmailIcon from '@mui/icons-material/Email'
import BackButton from '@/app/components/BackButton'

const GDPR_RIGHTS = [
  {
    article: 'Art. 15 GDPR',
    title: 'Right of Access',
    description: 'You have the right to request confirmation of whether your personal data is being processed and receive a full copy of your data records.',
  },
  {
    article: 'Art. 16 GDPR',
    title: 'Right to Rectification',
    description: 'You can request the immediate correction or completion of inaccurate or outdated personal details stored in your profile.',
  },
  {
    article: 'Art. 17 GDPR',
    title: 'Right to Erasure ("To Be Forgotten")',
    description: 'You have the right to demand the permanent deletion of your account credentials, profile, and associated personal records from our databases.',
  },
  {
    article: 'Art. 18 GDPR',
    title: 'Right to Restriction of Processing',
    description: 'Under specific legal criteria, you may request that we temporarily freeze or restrict the active processing of your personal information.',
  },
  {
    article: 'Art. 20 GDPR',
    title: 'Right to Data Portability',
    description: 'You are entitled to receive your personal data in a structured, commonly used, and machine-readable format (e.g., JSON or CSV export).',
  },
  {
    article: 'Art. 21 GDPR',
    title: 'Right to Object',
    description: 'You retain the continuous right to object to any automated processing of your information on grounds relating to your particular circumstances.',
  },
]

const SECTIONS = [
  { id: 'internal-advisory', title: '1. Internal Use Advisory' },
  { id: 'data-collected', title: '2. What Data We Collect' },
  { id: 'supabase-gdpr', title: '3. Supabase Cloud & Security' },
  { id: 'gdpr-rights', title: '4. Your GDPR User Rights' },
  { id: 'retention', title: '5. Retention & Non-Disclosure' },
  { id: 'controller', title: '6. Data Controller & Contact' },
]

export default function PrivacyPolicyClient() {
  return (
    <div className="relative min-h-screen w-full bg-[#f8fafc] text-slate-900 pb-20 select-none">
      {/* ── Background Matrix Grid ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="privacy-grid-matrix" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00a89d" strokeDasharray="3 5" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#privacy-grid-matrix)" />
          <circle cx="20%" cy="18%" r="340" fill="none" stroke="#00a89d" strokeWidth="1" opacity="0.25" />
          <circle cx="80%" cy="80%" r="400" fill="none" stroke="#008f85" strokeWidth="1" strokeDasharray="4 8" opacity="0.2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation / Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <BackButton />
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
            GDPR Compliant Notice
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
                <PrivacyTipIcon sx={{ fontSize: 16, color: '#00a89d' }} />
                <span>Privacy &amp; Data Protection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Privacy Policy
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Learn how UniOulu ICT Study Paths protects your privacy, manages internal authentication, and upholds European GDPR standards.
              </p>
            </div>

            {/* Quick Warning Callout */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 max-w-sm shrink-0 flex items-start gap-3">
              <WarningAmberIcon sx={{ fontSize: 24, color: '#d97706', shrink: 0, mt: 0.5 }} />
              <div className="text-xs leading-relaxed">
                <span className="font-bold block text-amber-950 mb-0.5">Internal System Notice:</span>
                This portal is strictly designed for internal collaboration. General users and attendees are <strong>not recommended to log in</strong>. Event browsing is open to everyone without an account.
              </div>
            </div>
          </div>

          {/* Jump Navigation */}
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

        {/* ── Document Sections ── */}
        <div className="space-y-6">

          {/* Section 1: Internal Use Advisory */}
          <motion.section
            id="internal-advisory"
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
                The UniOulu ICT Study Paths portal is engineered primarily for <strong>internal administrative, research partnership, and organizational coordination</strong> between the Faculty of ITEE at the University of Oulu and academic institutions in Vietnam.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 space-y-2">
                <p className="font-semibold text-slate-900">
                  Recommendation on Account Creation:
                </p>
                <p className="text-sm text-slate-600">
                  External visitors, students, and event attendees <strong>are not recommended to log in</strong>. You do not need to register or provide personal credentials to view event schedules, access venue details, or browse official merchandise.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 2: What Data We Collect */}
          <motion.section
            id="data-collected"
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
                2. Information We Collect Upon Authentication
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-4">
              <p>
                If an authorized internal user chooses to create an account or sign in (via direct email/password or Google / GitHub OAuth), the platform collects and processes the following categories of data:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Email */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                    <EmailIcon sx={{ fontSize: 18, color: '#00a89d' }} />
                    <span>Email Address</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Captured from user input or your OAuth provider to uniquely identify your administrative account, deliver verification tokens, and dispatch security notices.
                  </p>
                </div>

                {/* Full Name */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                    <VerifiedUserIcon sx={{ fontSize: 18, color: '#00a89d' }} />
                    <span>Full Name</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Used to attribute event creation records, update logs, and display administrative authorship across the collaborative management portal.
                  </p>
                </div>

                {/* IP Address */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                    <LockIcon sx={{ fontSize: 18, color: '#00a89d' }} />
                    <span>IP Address (Internet Protocol)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Logged during active sessions to detect anomalous access patterns, enforce geographic and network rate-limits, and mitigate automated attacks.
                  </p>
                </div>

                {/* Access Logs & Audit Telemetry */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                    <TerminalIcon sx={{ fontSize: 18, color: '#00a89d' }} />
                    <span>Access Logs &amp; Telemetry</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Timestamps of authentication attempts, browser user-agent headers, and mutation audit logs recorded by Supabase and Next.js middleware for system accountability.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center gap-2.5">
                <InfoOutlinedIcon sx={{ fontSize: 18, color: '#059669', shrink: 0 }} />
                <span>
                  <strong>Strict Data Minimization:</strong> We do NOT collect credit card numbers, payment accounts, tracking cookies for marketing, or sensitive personal data.
                </span>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Supabase Cloud & Security */}
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
                <LockIcon sx={{ fontSize: 20 }} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-950">
                3. Supabase Cloud Hosting &amp; Technical Safeguards
              </h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-3">
              <p>
                All account profiles and event metadata are securely hosted on <strong>Supabase Cloud</strong>, which operates on enterprise-grade cloud facilities located within European Union compliance parameters.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-slate-700">
                <li><strong>GDPR Compliance:</strong> Supabase maintains ISO/IEC 27001 certifications, SOC 2 Type II audits, and comprehensive Data Processing Agreements (DPA) adhering strictly to GDPR.</li>
                <li><strong>Transport Security:</strong> All client-server traffic is forced over HTTPS using modern TLS 1.3 cryptographic suites.</li>
                <li><strong>Storage Encryption:</strong> Database tables, backups, and user avatars in Supabase Storage are encrypted at rest with AES-256.</li>
                <li><strong>Row Level Security:</strong> PostgreSQL Row Level Security (RLS) is applied across every table to guarantee that only authenticated administrators with verified roles can alter content.</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 4: Your GDPR User Rights */}
          <motion.section
            id="gdpr-rights"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#00a89d]">
                <VerifiedUserIcon sx={{ fontSize: 20 }} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-950">
                4. Your Rights Under the GDPR
              </h2>
            </div>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
              Under Regulation (EU) 2016/679 (GDPR), every individual whose personal data is processed by the platform is entitled to exercise the following statutory rights:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GDPR_RIGHTS.map((r) => (
                <div key={r.article} className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-950">{r.title}</span>
                      <span className="text-[10px] font-mono text-teal-800 bg-teal-100/70 border border-teal-200 px-2 py-0.5 rounded font-semibold">
                        {r.article}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{r.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              To exercise any of these rights, contact our Data Protection Liaison at the email provided below. Requests are evaluated and addressed within thirty (30) days without undue delay.
            </p>
          </motion.section>

          {/* Section 5: Retention & Non-Disclosure */}
          <motion.section
            id="retention"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 mb-3">
              5. Data Retention &amp; Non-Disclosure
            </h2>
            <div className="text-sm md:text-base text-slate-600 leading-relaxed space-y-2">
              <p>
                <strong>No Commercial Sharing:</strong> We do not sell, license, rent, or trade your personal information with third-party advertisers, data aggregators, or marketing firms under any circumstances.
              </p>
              <p>
                <strong>Retention Period:</strong> Personal identifiers associated with internal accounts are stored only for the duration of active institutional involvement in the UniOulu ICT Study Paths collaboration or until account deletion is requested.
              </p>
            </div>
          </motion.section>

          {/* Section 6: Data Controller & Contact */}
          <motion.section
            id="controller"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-sm hover:border-teal-500/40 transition-all"
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-950 mb-3">
              6. Data Controller &amp; Inquiries
            </h2>
            <div className="text-sm md:text-base text-slate-600 space-y-1.5 leading-relaxed">
              <p>The designated Data Controller responsible for personal data processing on this platform is:</p>
              <p className="font-semibold text-slate-900 pt-1">Faculty of Information Technology and Electrical Engineering (ITEE)</p>
              <p>University of Oulu, Pentti Kaiteran katu 1, 90570 Oulu, Finland</p>
              <p>General Cooperation: <span className="text-teal-700 font-medium">itee.cooperation@oulu.fi</span></p>
              <p className="text-xs text-slate-500 pt-2">
                If you believe your data has been handled inconsistently with European data protection regulations, you also have the statutory right to lodge a formal complaint with the <strong>Office of the Data Protection Ombudsman (Tietosuojavaltuutetun toimisto)</strong> in Finland.
              </p>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  )
}
