/**
 * PURPOSE:
 * Centralized design token constants for the VN-FI Collaboration app.
 * All colors, spacing, radii, and typography are defined here.
 * Components must import from this file — never use raw hex values in JSX.
 *
 * APPROACH: Approach B (plain constants object) with Tailwind v4 @theme in globals.css.
 * The `tw` export maintains backward compatibility for existing auth pages.
 */

// ─── Raw Design Token Values ──────────────────────────────────────────────────
export const colors = {
  /** Core backgrounds */
  background: '#000000',
  backgroundLow: '#0a0a0a',

  /** Surface containers (cards, panels) */
  surfaceContainerLowest: '#0a0a0a',
  surfaceContainerLow: '#121212',
  surfaceContainer: '#181818',
  surfaceContainerHigh: '#202020',
  surfaceContainerHighest: '#262626',
  surfaceBright: '#262626',
  surfaceVariant: '#202020',

  /** Primary & Accent */
  primary: '#ffffff',
  primaryContainer: '#00fff1', // Cyan accent
  onPrimaryContainer: '#000000',
  secondary: '#00fff1', // Same cyan for secondary text
  onSecondary: '#000000',

  /** Text / On-surface */
  onBackground: '#e5e5e5',
  onSurface: '#ededed',
  onSurfaceVariant: '#a3a3a3',
  outline: '#666666',
  outlineVariant: '#2e2e2e',

  /** Status */
  error: '#ffb4ab',
  errorContainer: '#93000a',

  /** Special */
  inverseSurface: '#f5f5f5',
  inverseOnSurface: '#171717',
} as const

export const spacing = {
  '2xs': '0.25rem',   // 4px
  'xs': '0.5rem',    // 8px
  'sm': '0.75rem',   // 12px
  'md': '1rem',      // 16px
  'lg': '1.5rem',    // 24px
  'xl': '2rem',      // 32px
  '2xl': '3rem',     // 48px
  '3xl': '4rem',     // 64px
  'gutterMobile': '1rem',
  'gutterDesktop': '1.5rem',
  'containerMax': '1280px',
} as const

export const radii = {
  DEFAULT: '0.25rem',  // 4px
  lg: '0.5rem',        // 8px
  xl: '0.75rem',       // 12px
  full: '9999px',
} as const

// ─── Tailwind Class Token Object (Approach B) ─────────────────────────────────
// Used by components via className composition.
// The `tw` export is used by existing login/sign-up pages — do NOT remove.
export const tw = {
  bg: {
    background: 'bg-black',
    backgroundLow: 'bg-[#0a0a0a]',
    surfaceContainerLowest: 'bg-[#0a0a0a]',
    surfaceContainerLow: 'bg-[#121212]',
    surfaceContainer: 'bg-[#181818]',
    surfaceContainerHigh: 'bg-[#202020]',
    surfaceContainerHighest: 'bg-[#262626]',
    primaryContainer: 'bg-[#00fff1]',
    secondary: 'bg-[#00fff1]',
  },
  text: {
    primary: 'text-white',
    primaryContainer: 'text-[#00fff1]',
    secondary: 'text-[#00fff1]',
    onBackground: 'text-[#e5e5e5]',
    onSurface: 'text-[#ededed]',
    onSurfaceVariant: 'text-[#a3a3a3]',
    outline: 'text-[#666666]',
    onPrimaryContainer: 'text-black',
  },
  border: {
    outlineVariant: 'border-[#2e2e2e]',
    outline: 'border-[#666666]',
    primaryContainer: 'border-[#00fff1]',
    /** Backward-compat alias used by auth pages */
    whiteSubtle: 'border-white/10',
  },
  shadow: {
    primaryContainer: 'shadow-[0_0_16px_rgba(0,255,241,0.3)]',
    primaryContainerHover: 'hover:shadow-[0_0_24px_rgba(0,255,241,0.5)]',
    card: 'shadow-2xl',
  },
} as const
