'use client'

/**
 * PURPOSE:
 * Infinite horizontal scrolling marquee component displaying official event merchandise.
 * Uses Next.js <Image /> component for optimized image loading.
 * Smooth infinite looping with pause-on-hover interaction.
 *
 * CONTEXT/PARENT:
 * Embedded in the Merchandise section of app/page.tsx.
 */

import { useState } from 'react'
import Image from 'next/image'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'

interface MerchandiseItem {
  id: string
  title: string
  src: string
  alt: string
}

const MERCHANDISE_ITEMS: MerchandiseItem[] = [
  {
    id: 'merch-1',
    title: 'VN-FI Collaboration Hoodie',
    src: '/merchandise/merch_1_img.webp',
    alt: 'VN-FI Collaboration Official Merchandise 1',
  },
  {
    id: 'merch-2',
    title: 'ITEE Faculty Thermal Tumbler',
    src: '/merchandise/merch_2_img.webp',
    alt: 'VN-FI Collaboration Official Merchandise 2',
  },
  {
    id: 'merch-3',
    title: 'Oulu Academic Canvas Tote',
    src: '/merchandise/merch_3_img.webp',
    alt: 'VN-FI Collaboration Official Merchandise 3',
  },
  {
    id: 'merch-4',
    title: 'Nordic Tech Enamel Pin & Lanyard',
    src: '/merchandise/merch_4_img.webp',
    alt: 'VN-FI Collaboration Official Merchandise 4',
  },
]

export default function MerchandiseMarquee() {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate items 4 times to ensure seamless infinite loop across all viewport widths
  const marqueeList = [
    ...MERCHANDISE_ITEMS,
    ...MERCHANDISE_ITEMS,
    ...MERCHANDISE_ITEMS,
    ...MERCHANDISE_ITEMS,
  ]

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* ── Edge Gradient Fade Masks ── */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#f8fafc] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#f8fafc] to-transparent z-10" />

      {/* ── Marquee Track Container ── */}
      <div
        className="flex w-max"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex items-center gap-6 ${isPaused ? 'animate-marquee-paused' : 'animate-marquee'}`}
        >
          {marqueeList.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group w-64 sm:w-72 flex-shrink-0 rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-[#4bbca9]/60 transition-all duration-300"
            >
              {/* Image Box */}
              <div className="relative w-full aspect-square rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-3">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 256px, 288px"
                />
              </div>

              {/* Information Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-slate-950 group-hover:text-[#3ea694] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">Official Event Merch</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#4bbca9] group-hover:text-white group-hover:border-transparent transition-all shrink-0 ml-2">
                  <ShoppingBagIcon sx={{ fontSize: 16 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee CSS Animation Styles ── */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-paused {
          animation: marquee 35s linear infinite;
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
