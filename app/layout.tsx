/**
 * PURPOSE:
 * Root layout for the VN-FI Collaboration application.
 * Mounts the NavbarServer (which renders either Navbar or NavbarMobile based on viewport)
 * and Footer globally across all pages.
 * Plus Jakarta Sans is the primary typeface.
 */

import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Geist } from 'next/font/google'
import './globals.css'
import NavbarServer from './components/NavbarServer'
import Footer from './components/Footer'
import { cn } from "@/lib/utils";
import { LoaderProvider } from './context/LoaderContext'
import { NotificationProvider } from './context/NotificationContext'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Finland–Vietnam Strategic Impact Initiative (FVSI) | ITEE Faculty',
  description:
    'Bilateral academic and research collaboration between the ITEE Faculty at University of Oulu, Finland, and premier academic institutes across Việt Nam.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn("h-full", plusJakartaSans.variable, "font-sans", geist.variable)}
    >
      <LoaderProvider>
        <NotificationProvider>
          <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 antialiased">
            {/* Global Navigation */}
            <NavbarServer />

            {/* Page Content */}
            <main className="w-full flex-1 pt-20 bg-transparent">
              {children}
            </main>

            {/* Global Footer */}
            <Footer />
          </body>
        </NotificationProvider>
      </LoaderProvider>
    </html>
  )
}
