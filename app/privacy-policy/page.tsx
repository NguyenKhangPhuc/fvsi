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
  title: 'Privacy Policy | FVSI',
  description: 'Privacy policy and GDPR user rights disclosures for the Finland–Vietnam Strategic Impact Initiative platform.',
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
