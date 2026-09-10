/**
 * PURPOSE:
 * Home page (route "/") for the VN-FI Collaboration application.
 * Server component — fetches all events then passes them to HomeEventsClient.
 * Renders:
 *   1. Hero section with video placeholder HUD
 *   2. People & Organizers section (3 featured cards with local team images)
 *   3. Events section (HomeEventsClient — interactive 2-column stacking list)
 *   4. Institutional Collaboration strip
 */

import Image from 'next/image'
import Link from 'next/link'
import { getAllEvents } from './actions/events/get/getAllEvents'
import HomeEventsClient from './components/HomeEventsClient'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import GroupsIcon from '@mui/icons-material/Groups'
import VerifiedIcon from '@mui/icons-material/Verified'
import SchoolIcon from '@mui/icons-material/School'
import TerminalIcon from '@mui/icons-material/Terminal'
import ForumIcon from '@mui/icons-material/Forum'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

// ─── People data ──────────────────────────────────────────────────────────────
const PEOPLE = [
  {
    name: 'Jari Hannu',
    role: 'DEAN OF EDUCATION',
    affiliation: 'Faculty of ITEE • Univ. of Oulu',
    description:
      'Championing educational bridges between Finland and Vietnam. Overseeing the curriculum alignment, dual-degree accreditations, and long-term research scholarship frameworks for emerging talent in Southeast Asia.',
    meta: 'ORCID: 0000-0002-8911-3140',
    image: '/team/jari.jpeg',
    icons: [SchoolIcon],
  },
  {
    name: 'Hanna Saarela',
    role: 'DEVELOPMENT MANAGER',
    affiliation: 'Faculty Internationalization Desk',
    description:
      'Leading international academic cooperation and bilateral partnership initiatives. Architecting mobility grants, corporate sponsorships with Finnish tech corporations, and institutional agreements with Vietnamese top-tier universities.',
    meta: 'LIAISON ID: OU-ITEE-HS',
    image: '/team/hanna.jpg',
    icons: [SchoolIcon],
  },
  {
    name: 'Phuc Nguyen',
    role: 'STUDENT COORDINATOR',
    affiliation: '3rd Year Computer Science & Engineering',
    description:
      'Catalyst for the Vietnamese Student Chapter in Oulu. Coordinating bilateral hackathons, peer mentorship for inbound exchange scholars, and cultural orientation for Vietnamese engineering cohorts arriving in northern Finland.',
    meta: 'GUILD: BLANKO / OTY',
    image: '/team/phuc.png',
    icons: [TerminalIcon, ForumIcon],
  },
]

export default async function Home() {
  const { data: events, error } = await getAllEvents()

  if (error) {
    return (
      <div className="w-full flex items-center justify-center text-red-400 py-20">
        Something went wrong: {error.message}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full bg-black">

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col justify-center px-4 lg:px-6 max-w-[1280px] mx-auto py-8 lg:py-12">
        {/* Card container */}
        <div className="relative w-full rounded-xl bg-[#121212] border border-[#262626] backdrop-blur-xl overflow-hidden p-4 lg:p-8 shadow-2xl">
          {/* SVG grid overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-matrix" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00fff1" strokeDasharray="3 5" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-matrix)" />
            <circle cx="20%" cy="40%" r="280" fill="none" stroke="#00fff1" strokeWidth="0.8" opacity="0.15" />
            <circle cx="85%" cy="65%" r="380" fill="none" stroke="#00fff1" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.2" />
          </svg>

          {/* Content grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">

            {/* ── Left Content ── */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5">

              {/* Institutional badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#2e2e2e] text-[#00fff1]">
                <span className="w-2 h-2 rounded-full bg-[#00fff1] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00fff1]">ITEE Faculty • Bilateral Partnership</span>
                <span className="text-[#666666] text-xs">•</span>
                <span className="text-[10px] text-[#00fff1]">Oulu × Hà Nội</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-none tracking-tight">
                Việt Nam —{' '}
                <br />
                <span className="bg-gradient-to-r from-white via-[#00fff1] to-[#00fff1] bg-clip-text text-transparent">
                  Finland Collaboration
                </span>
              </h1>

              {/* Description */}
              <p className="text-base text-[#a3a3a3] max-w-xl leading-relaxed">
                View all of our events that will be organized in this October. Bridging Arctic technological excellence in 6G, autonomous software, and sustainable computing with the vanguard of Vietnamese innovation.
              </p>

              {/* CTA Cluster */}
              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <Link
                  href="#events"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00fff1] text-black text-sm font-bold rounded-lg shadow-lg hover:bg-white transition-all duration-200"
                >
                  <span>Explore Events</span>
                  <ArrowDownwardIcon sx={{ fontSize: 18 }} />
                </Link>
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-[#1e1e1e] border border-[#2e2e2e] text-white text-sm rounded-lg hover:bg-[#282828] transition-all duration-200">
                  <PlayCircleIcon sx={{ fontSize: 18, color: '#00fff1' }} />
                  <span>Watch Teaser</span>
                </button>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 w-full max-w-lg">
                {[
                  { value: '08', label: 'Flagship Events' },
                  { value: '500+', label: 'Attendees' },
                  { value: '12', label: 'Keynotes' },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-lg bg-[#0d0d0d] border border-[#222222]">
                    <span className="block text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-[10px] font-bold text-[#00fff1] uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Video Placeholder ── */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#0a0a0a] border border-[#262626] shadow-2xl">
                {/* Placeholder bg with grid */}
                <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
                    <defs>
                      <pattern id="grid-video" width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#00fff1" strokeDasharray="2 4" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-video)" />
                  </svg>
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <PlayCircleIcon sx={{ fontSize: 64, color: '#2e2e2e' }} />
                    <span className="text-xs font-mono text-[#2e2e2e] uppercase tracking-widest">Video Coming Soon</span>
                  </div>
                </div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* HUD overlay */}
                <div className="absolute inset-0 p-3 flex flex-col justify-between">
                  {/* Top HUD bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#000000]/80 border border-[#2e2e2e] text-[10px] font-mono text-[#00fff1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span className="font-bold">LIVE FEED • OULU CAMPUS HUB</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#a3a3a3]">60 FPS // 4K STREAM</span>
                  </div>

                  {/* Center play button */}
                  <div className="flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-[#00fff1] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,255,241,0.4)] hover:scale-110 transition-transform cursor-pointer">
                      <PlayCircleIcon sx={{ fontSize: 32 }} />
                    </div>
                  </div>

                  {/* Bottom latency bar */}
                  <div className="space-y-1 bg-[#0a0a0a]/90 border border-[#262626] backdrop-blur-sm p-2 rounded-lg">
                    <div className="flex items-center justify-between text-[10px] text-[#00fff1] font-mono">
                      <span>Oulu–Hanoi Trans-Eurasian Optical Link</span>
                      <span>34ms LATENCY</span>
                    </div>
                    <div className="w-full h-0.5 bg-[#222222] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00fff1] w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. PEOPLE & ORGANIZERS SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="people" className="w-full py-16 px-4 lg:px-6 max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <div className="flex items-center gap-2 text-[#00fff1] mb-2">
              <GroupsIcon sx={{ fontSize: 20 }} />
              <span className="text-xs font-bold uppercase tracking-widest">Faculty Leadership &amp; Student Liaisons</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Distinguished People &amp; Organizers
            </h2>
          </div>
          <p className="text-sm text-[#a3a3a3] max-w-md leading-relaxed">
            Pioneering academic pathways connecting Oulu&apos;s leading ICT research ecosystems directly with university partners across Việt Nam.
          </p>
        </div>

        {/* 3 People Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PEOPLE.map((person) => {
            const [IconA, IconB] = person.icons
            return (
              <div
                key={person.name}
                className="group relative rounded-xl bg-[#121212] border border-[#262626] backdrop-blur-md p-6 flex flex-col justify-between hover:border-[#00fff1]/50 hover:shadow-[0_0_24px_rgba(0,255,241,0.2)] transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Portrait */}
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#1a1a1a]">
                    <Image
                      src={person.image}
                      alt={`Portrait of ${person.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                    />
                    {/* Role badge */}
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-[#0a0a0a]/95 border border-[#2e2e2e] text-[#00fff1] text-[10px] font-bold uppercase tracking-wider">
                      {person.role}
                    </div>
                  </div>

                  {/* Name & Affiliation */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white group-hover:text-[#00fff1] transition-colors">
                        {person.name}
                      </h3>
                      <VerifiedIcon sx={{ fontSize: 20, color: '#00fff1' }} />
                    </div>
                    <p className="text-xs font-semibold text-[#00fff1] uppercase tracking-wide">
                      {person.affiliation}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#a3a3a3] leading-relaxed">
                    {person.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 flex items-center justify-between text-[#a3a3a3] border-t border-[#222222]">
                  <span className="text-[10px] font-mono text-[#737373]">{person.meta}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="#"
                      className="w-8 h-8 rounded bg-[#1f1f1f] border border-[#2e2e2e] flex items-center justify-center hover:text-[#00fff1] hover:border-[#00fff1]/50 transition-all"
                    >
                      <IconA sx={{ fontSize: 16 }} />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded bg-[#1f1f1f] border border-[#2e2e2e] flex items-center justify-center hover:text-[#00fff1] hover:border-[#00fff1]/50 transition-all"
                    >
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. EVENTS SECTION
          HomeEventsClient handles search, filters, stacking cards, modal
      ══════════════════════════════════════════════════════════════════════ */}
      <HomeEventsClient initialEvents={events ?? []} />

      {/* ══════════════════════════════════════════════════════════════════════
          4. INSTITUTIONAL COLLABORATION STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full px-4 lg:px-6 max-w-[1280px] mx-auto py-12 bg-black">
        <div className="rounded-xl bg-[#121212] border border-[#262626] backdrop-blur-xl p-6 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-[#00fff1] text-xs font-bold uppercase tracking-widest">
              <VerifiedUserIcon sx={{ fontSize: 18 }} />
              <span>Accredited Academic Exchange</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Have Research Inquiries or Propose a Track?
            </h3>
            <p className="text-sm text-[#a3a3a3] leading-relaxed">
              The ITEE Faculty Liaison Board reviews collaborative curriculum propositions, researcher exchange proposals, and dual PhD scholarships on a rolling basis.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-white text-black text-sm font-bold rounded-lg hover:bg-[#00fff1] transition-all"
            >
              Submit Cooperation Proposal
            </a>
            <a
              href="#"
              className="px-5 py-3 bg-[#1e1e1e] border border-[#2e2e2e] text-white text-sm rounded-lg hover:bg-[#282828] transition-all"
            >
              Download Prospectus (.PDF)
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
