/**
 * PURPOSE:
 * Home page (route "/") for the Oulu ICT Study Paths application (Light Theme).
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
import MerchandiseMarquee from './components/MerchandiseMarquee'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import GroupsIcon from '@mui/icons-material/Groups'
import VerifiedIcon from '@mui/icons-material/Verified'
import SchoolIcon from '@mui/icons-material/School'
import EmailIcon from '@mui/icons-material/Email'
import TerminalIcon from '@mui/icons-material/Terminal'
import ForumIcon from '@mui/icons-material/Forum'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'

// ─── People data ──────────────────────────────────────────────────────────────
const PEOPLE = [
  {
    name: 'Jari Hannu',
    role: 'DEAN OF EDUCATION',
    affiliation: 'Microelectronics Research Group • Univ. of Oulu',
    description:
      'Dean of Education at the Faculty of ITEE, University of Oulu. Research interests include electronics materials, wearable and stretchable devices, testing technologies, and RF-sensing.',
    meta: 'ORCID: 0000-0002-8911-3140',
    image: '/team/jari.jpeg',
    icons: [SchoolIcon, EmailIcon],
  },
  {
    name: 'Hanna Saarela',
    role: 'DEVELOPMENT MANAGER',
    affiliation: 'CWC – Networks and Systems • Faculty of ITEE',
    description:
      'Development Manager at the Faculty of ITEE, University of Oulu. Leads international cooperation, talent attraction, and co-innovation in ICT. Project Manager of the EU co-funded ESF+ project IKAPO.',
    meta: 'LIAISON ID: OU-ITEE-HS',
    image: '/team/hanna.jpg',
    icons: [SchoolIcon, EmailIcon],
  },
  {
    name: 'Phuc Nguyen',
    role: 'CSE STUDENT',
    affiliation: 'Univ. of Oulu • Computer Science & Engineering',
    description:
      'Former student of Hung Vuong High School. Sharing a real peer story about studying CSE in Finland — specializing in web development, event management tools, and student productivity apps.',
    meta: 'GUILD: BLANKO / OTY',
    image: '/team/phuc.png',
    icons: [TerminalIcon, ForumIcon],
  },
]

export default async function Home() {
  const { data: events, error } = await getAllEvents()

  if (error) {
    return (
      <div className="w-full flex items-center justify-center text-red-500 py-20">
        Something went wrong: {error.message}
      </div>
    )
  }

  return (
    <div className="relative flex flex-col w-full min-h-screen bg-[#f8fafc]">
      {/* ── Page Background Matrix Pattern ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-65 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="page-grid-matrix" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00a89d" strokeDasharray="3 5" strokeWidth="0.9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#page-grid-matrix)" />
          <circle cx="18%" cy="25%" r="320" fill="none" stroke="#00a89d" strokeWidth="1" opacity="0.35" />
          <circle cx="82%" cy="65%" r="420" fill="none" stroke="#008f85" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 w-full min-h-[900px] flex flex-col justify-center px-4 lg:px-6 max-w-[1280px] mx-auto py-8 lg:py-12">
        {/* Card container */}
        <div className="relative w-full rounded-xl bg-white border border-slate-200/80 p-4 lg:p-8 shadow-lg">
          {/* Content grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">

            {/* ── Left Content ── */}
            <div className="lg:col-span-6 flex flex-col items-start gap-5">

              {/* Institutional badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f8fafc] border border-slate-200 text-teal-800 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">ITEE Faculty</span>
                <span className="text-slate-300 text-xs">•</span>
                <span className="text-[10px] text-teal-700 font-semibold">Oulu × TP. Hồ Chí Minh × Hà Nội</span>
              </div>

              {/* Logo replacing Title */}
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] py-1">
                <Image
                  src="/oulu_ict_logo.png"
                  alt="Uni Oulu ICT Study Paths"
                  width={730}
                  height={395}
                  priority
                  className="w-full h-auto object-contain"
                />
                <h1 className="sr-only">Uni Oulu ICT Study Paths</h1>
              </div>

              {/* Description */}
              <p className="text-base text-slate-600 max-w-xl leading-relaxed">
                Explore events organized by the Faculty of ITEE at the University of Oulu in collaboration with Vietnamese universities. A bridge between Finnish technology research and Vietnamese talent.
              </p>

              {/* CTA Cluster */}
              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <Link
                  href="#events"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#4bbca9] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#3ea694] transition-all duration-200"
                >
                  <span>Explore Events</span>
                  <ArrowDownwardIcon sx={{ fontSize: 18 }} />
                </Link>
                <a
                  href="https://youtu.be/XNtjK50_0Qs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-all duration-200 shadow-sm cursor-pointer"
                >
                  <PlayCircleIcon sx={{ fontSize: 18, color: '#4bbca9' }} />
                  <span>Watch on YouTube</span>
                </a>
              </div>

              {/* Live Stats — 3-column with events.length and EUR-ACE Accredited */}
              <div className="grid grid-cols-3 gap-3 pt-2 w-full max-w-md">
                {[
                  { value: String(events?.length ?? 0).padStart(2, '0'), label: 'Flagship Events' },
                  { value: '500+', label: 'Attendees' },
                  { value: 'EUR-ACE', label: 'Accredited' },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-lg bg-[#f8fafc] border border-slate-200 shadow-sm flex flex-col justify-between">
                    <span className="block text-xl md:text-2xl font-bold text-slate-950 truncate">{stat.value}</span>
                    <span className="text-[9px] md:text-[10px] font-bold text-teal-700 uppercase tracking-wider leading-tight mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: YouTube Video Embed & ShanghaiRanking ── */}
            <div className="lg:col-span-6 flex flex-col gap-4 w-full">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shadow-xl">
                <iframe
                  className="w-full h-full border-0"
                  src="https://www.youtube.com/embed/XNtjK50_0Qs?rel=0"
                  title="Oulu ICT Study Paths Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* ShanghaiRanking 2025 Header & Cards */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    ShanghaiRanking Global Ranking of Academic Subjects 2025
                  </span>
                </div>

                {/* 4 Cards ordered from highest to lowest rank (left to right) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { rank: '41st', subject: 'Telecommunication Engineering', highlight: true },
                    { rank: 'Top 100', subject: 'Electrical & Electronic Engineering', highlight: false },
                    { rank: 'Top 150', subject: 'Artificial Intelligence', highlight: false },
                    { rank: 'Top 300', subject: 'Computer Science & Engineering', highlight: false },
                  ].map((item) => (
                    <div
                      key={item.subject}
                      className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all shadow-xs ${
                        item.highlight
                          ? 'bg-teal-50/80 border-teal-300/80 hover:border-teal-400'
                          : 'bg-[#f8fafc] border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <span className={`block text-lg sm:text-xl font-extrabold leading-none ${
                          item.highlight ? 'text-teal-800' : 'text-slate-950'
                        }`}>
                          {item.rank}
                        </span>
                        <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Globally</span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-800 leading-snug mt-2 line-clamp-2">
                        {item.subject}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Accredited Programme Information Card */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-700 flex items-start gap-2.5">
                  <VerifiedIcon sx={{ fontSize: 18, color: '#00a89d', shrink: 0, mt: 0.5 }} />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The University of Oulu runs <strong className="text-slate-900">EUR-ACE accredited Wireless Communications Engineering</strong> master’s programme in tight collaboration with the <strong className="text-teal-800">6G Flagship</strong> – the research and innovation programme for 6G and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. PEOPLE & ORGANIZERS SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="people" className="relative z-10 w-full py-16 px-4 lg:px-6 max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-5">
          <div>
            <div className="flex items-center gap-2 text-teal-700 mb-2">
              <GroupsIcon sx={{ fontSize: 20, color: '#00a89d' }} />
              <span className="text-xs font-bold uppercase tracking-widest">Faculty Leadership &amp; Student Liaisons</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight">
              Meet the People
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md leading-relaxed">
            The people behind the collaboration — from university faculty in Oulu to students sharing their experience in Finland.
          </p>
        </div>

        {/* 3 People Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PEOPLE.map((person) => {
            const [IconA, IconB] = person.icons
            return (
              <div
                key={person.name}
                className="group relative rounded-xl bg-white border border-slate-200/90 shadow-md p-6 flex flex-col justify-between hover:border-teal-500/50 hover:shadow-[0_8px_30px_rgba(0,194,178,0.2)] transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Portrait */}
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src={person.image}
                      alt={`Portrait of ${person.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                    />
                    {/* Role badge */}
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-slate-950/90 border border-white/20 text-[#4bbca9] text-[10px] font-bold uppercase tracking-wider">
                      {person.role}
                    </div>
                  </div>

                  {/* Name & Affiliation */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-slate-950 group-hover:text-teal-700 transition-colors">
                        {person.name}
                      </h3>
                      <VerifiedIcon sx={{ fontSize: 20, color: '#00a89d' }} />
                    </div>
                    <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
                      {person.affiliation}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {person.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 flex items-center justify-between text-slate-500 border-t border-slate-100">
                  <span className="text-[10px] font-mono text-slate-500">{person.meta}</span>
                  <div className="flex items-center gap-2">
                    {IconA && (
                      <a
                        href="#"
                        className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center hover:text-teal-600 text-slate-600 transition-colors"
                      >
                        <IconA sx={{ fontSize: 16 }} />
                      </a>
                    )}
                    {IconB && (
                      <a
                        href="#"
                        className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center hover:text-teal-600 text-slate-600 transition-colors"
                      >
                        <IconB sx={{ fontSize: 16 }} />
                      </a>
                    )}
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
          4. MERCHANDISE SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="merchandise" className="relative z-10 w-full px-4 lg:px-6 max-w-[1280px] mx-auto py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <CardGiftcardIcon sx={{ fontSize: 16, color: '#4bbca9' }} />
              <span>Official Event Goods</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-950 tracking-tight">
              University of Oulu Merchandise
            </h2>
          </div>
          <p className="text-base text-slate-600 max-w-md leading-relaxed font-medium">
            Visit our event and possibly grab your merchandise!
          </p>
        </div>

        {/* Infinite Horizontal Carousel */}
        <MerchandiseMarquee />
      </section>

    </div>
  )
}
