/**
 * PURPOSE:
 * Server Component representing the Terms & Conditions page (/terms-and-conditions).
 * Exports metadata and mounts the TermsAndConditionsClient interface.
 *
 * CONTEXT/PARENT FILE:
 * Mounted at 'app/terms-and-conditions/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * None.
 */

import { Metadata } from 'next'
import TermsAndConditionsClient from './TermsAndConditionsClient'

export const metadata: Metadata = {
  title: 'Terms & Conditions | UniOulu ICT Study Paths',
  description: 'Terms and conditions for using the UniOulu ICT Study Paths event management platform.',
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsClient />
}
