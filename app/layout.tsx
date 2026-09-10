/**
 * PURPOSE:
 * Root layout for the VN-FI Collaboration application.
 * Mounts the NavbarServer (which renders either Navbar or NavbarMobile based on viewport)
 * and Footer globally across all pages.
 * Plus Jakarta Sans is the primary typeface.
 */

import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import NavbarServer from './components/NavbarServer'
import Footer from './components/Footer'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VN–FI Collaboration | ITEE Faculty',
  description:
    'Bilateral academic and research collaboration between the ITEE Faculty at University of Oulu, Finland, and premier academic institutes across Việt Nam.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-black text-[#e5e5e5] antialiased">
        {/* Global Navigation */}
        <NavbarServer />

        {/* Page Content */}
        <main className="w-full flex-1 pt-20 bg-black">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  )
}
