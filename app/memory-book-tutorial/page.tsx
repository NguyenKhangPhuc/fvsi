/**
 * PURPOSE:
 * Server Component representing the Memory Book Setup Tutorial page (/memory-book-tutorial).
 * Exports metadata and renders the interactive MemoryBookTutorialClient interface.
 *
 * CONTEXT/PARENT FILE:
 * Mounted at 'app/memory-book-tutorial/page.tsx'.
 */

import { Metadata } from 'next'
import MemoryBookTutorialClient from './MemoryBookTutorialClient'

export const metadata: Metadata = {
  title: 'Memory Book Setup Tutorial | UniOulu ICT Study Paths',
  description:
    'Comprehensive step-by-step developer guide for setting up GitHub, Git CLI, Node.js LTS, Docker, pnpm, Supabase local database, and running the Memory Book application.',
}

export default function MemoryBookTutorialPage() {
  return <MemoryBookTutorialClient />
}
