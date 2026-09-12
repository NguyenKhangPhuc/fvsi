/**
 * PURPOSE:
 * Centralized design token constants for the VN-FI Collaboration app.
 * All colors, spacing, radii, and typography are defined here.
 * Components must import from this file — never use raw hex values in JSX.
 *
 * APPROACH: Approach B (plain constants object) with Tailwind v4 @theme in globals.css.
 * The `tw` export maintains backward compatibility for existing auth pages.
 */

// ─── Raw Design Token Values (Light Theme) ────────────────────────────────────
export const colors = {
  /** Core backgrounds */
  background: '#ffffff',
  backgroundLow: '#f8fafc',

  /** Surface containers (cards, panels) */
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f8fafc',
  surfaceContainer: '#f8fafc',
  surfaceContainerHigh: '#e2e8f0',
  surfaceContainerHighest: '#e2e8f0',
  surfaceBright: '#ffffff',
  surfaceVariant: '#f1f5f9',
  surfaceDim: '#f1f5f9',

  /** Primary & Accent */
  primary: '#0f172a', // Slate 900
  onPrimary: '#ffffff',
  primaryContainer: '#4bbca9', // Mint-teal highlight
  onPrimaryContainer: '#ffffff',

  /** Secondary / Nordic Teal */
  secondary: '#00a89d', // Teal 700 text contrast on white
  secondaryFixed: '#00fff1',
  secondaryContainer: '#e0fbf9',
  onSecondaryContainer: '#006f68',
  onSecondary: '#ffffff',

  /** Text / On-surface */
  onBackground: '#0f172a',
  onSurface: '#0f172a',
  onSurfaceVariant: '#475569', // Slate 600
  outline: '#94a3b8', // Slate 400
  outlineVariant: '#e2e8f0', // Slate 200

  /** Status */
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#93000a',

  /** Special */
  inverseSurface: '#1e293b',
  inverseOnSurface: '#f8fafc',
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
    background: 'bg-white',
    backgroundLow: 'bg-[#f8fafc]',
    surfaceContainerLowest: 'bg-white',
    surfaceContainerLow: 'bg-[#f8fafc]',
    surfaceContainer: 'bg-[#f8fafc]',
    surfaceContainerHigh: 'bg-[#e2e8f0]',
    surfaceContainerHighest: 'bg-[#e2e8f0]',
    primaryContainer: 'bg-[#4bbca9]',
    secondary: 'bg-[#00a89d]',
  },
  text: {
    primary: 'text-slate-900',
    primaryContainer: 'text-[#0f172a]',
    secondary: 'text-[#00a89d]',
    onBackground: 'text-[#0f172a]',
    onSurface: 'text-[#0f172a]',
    onSurfaceVariant: 'text-[#475569]',
    outline: 'text-[#94a3b8]',
    onPrimaryContainer: 'text-white',
  },
  border: {
    outlineVariant: 'border-[#e2e8f0]',
    outline: 'border-[#94a3b8]',
    primaryContainer: 'border-[#4bbca9]',
    /** Backward-compat alias used by auth pages */
    whiteSubtle: 'border-slate-200',
  },
  shadow: {
    primaryContainer: 'shadow-[0_0_16px_rgba(75,188,169,0.35)]',
    primaryContainerHover: 'hover:shadow-[0_0_24px_rgba(75,188,169,0.55)]',
    card: 'shadow-md',
  },
} as const
