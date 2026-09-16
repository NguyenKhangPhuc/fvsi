/**
 * PURPOSE:
 * Server Component representing the Privacy Policy page (/privacy-policy).
 * Exports metadata and mounts the PrivacyPolicyClient interface.
 *
 * CONTEXT/PARENT FILE:
 * Mounted at 'app/privacy-policy/page.tsx'.
 *
 * INPUTS / PARAMETERS:
 * None.
 */

import { Metadata } from 'next'
import PrivacyPolicyClient from './PrivacyPolicyClient'

export const metadata: Metadata = {
  title: 'Privacy Policy | UniOulu ICT Study Paths',
  description: 'Privacy policy and GDPR user rights disclosures for the UniOulu ICT Study Paths platform.',
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
