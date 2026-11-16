/**
 * PURPOSE:
 * Date and time helper utilities for timezone transformations across the VN-FI Collaboration app.
 * Organisers enter event times as Finland time (Europe/Helsinki). These helpers convert them into
 * standard UTC (ISO 8601) for PostgreSQL timestamptz storage, convert stored values back to Finland
 * time for editing, and compute the livestream clock phase from absolute (UTC) instants.
 */

import { TZDate } from '@date-fns/tz';

/** IANA timezone used for organiser-entered times (handles EET/EEST daylight saving). */
export const FINLAND_TIME_ZONE = 'Europe/Helsinki';

/** Display/input format used by the create and edit event forms (24-hour, Finland time). */
export const FINLAND_INPUT_FORMAT = 'dd-mm-yyyy hh:mm';

/**
 * Converts a wall-clock date-time string entered as Finland time in the form format
 * "dd-mm-yyyy hh:mm" (24-hour, e.g. "01-12-2026 17:00") into a UTC ISO 8601 string, regardless of the
 * browser's own timezone. Daylight saving is applied automatically (winter GMT+2, summer GMT+3).
 *
 * Example: "01-12-2026 17:00" -> "2026-12-01T15:00:00.000Z".
 *
 * @param finlandDateTimeStr - Finland wall-clock time as "dd-mm-yyyy hh:mm".
 * @returns The ISO 8601 UTC string, or null if empty, malformed or not a real calendar date/time.
 */
export function convertFinlandToUTC(finlandDateTimeStr: string | null | undefined): string | null {
  if (!finlandDateTimeStr || typeof finlandDateTimeStr !== 'string') {
    return null;
  }

  const match = finlandDateTimeStr.trim().match(/^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})$/);
  if (!match) {
    return null;
  }

  const [day, month, year, hours, minutes] = match.slice(1).map(Number);

  // Reject impossible values such as 31-02-2026 or 25:00 (Date.UTC would silently roll them over).
  const check = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day ||
    check.getUTCHours() !== hours ||
    check.getUTCMinutes() !== minutes
  ) {
    return null;
  }

  const date = new TZDate(year, month - 1, day, hours, minutes, 0, FINLAND_TIME_ZONE);
  if (isNaN(date.getTime())) {
    return null;
  }

  // TZDate.toISOString() keeps the Helsinki offset; normalise to UTC ('Z').
  return new Date(date.getTime()).toISOString();
}

/**
 * Converts a UTC ISO string into Finland wall-clock time formatted as "dd-mm-yyyy hh:mm",
 * used to pre-populate the Finland-time inputs when editing.
 *
 * @param isoString - The ISO 8601 date string.
 * @returns Finland datetime string or empty string if invalid.
 */
export function convertUTCToFinlandInput(isoString: string | null | undefined): string {
  if (!isoString || typeof isoString !== 'string') {
    return '';
  }

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return '';
  }

  const tzDate = new TZDate(date, FINLAND_TIME_ZONE);
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${pad(tzDate.getDate())}-${pad(tzDate.getMonth() + 1)}-${tzDate.getFullYear()} ${pad(tzDate.getHours())}:${pad(tzDate.getMinutes())}`;
}

export type LivestreamPhase = 'countdown' | 'live' | 'none';

/**
 * Determines which livestream clock state applies at a given instant.
 *
 * Both inputs are absolute UTC instants, so the result is the same in every viewer timezone;
 * a start entered as Finland time is already the correct instant once stored.
 *
 * - 'countdown': now is before start_date.
 * - 'live': now is at or after start_date and before end_date.
 * - 'none': start_date is missing/invalid, end_date is missing/invalid (nothing to count to after the
 *   start), or end_date has passed.
 *
 * @param startIso - Stored start_date (UTC ISO string).
 * @param endIso - Stored end_date (UTC ISO string).
 * @param nowMs - Current time in epoch milliseconds.
 */
export function getLivestreamPhase(
  startIso: string | null | undefined,
  endIso: string | null | undefined,
  nowMs: number
): LivestreamPhase {
  const start = startIso ? new Date(startIso).getTime() : NaN;
  if (isNaN(start)) {
    return 'none';
  }
  if (nowMs < start) {
    return 'countdown';
  }

  const end = endIso ? new Date(endIso).getTime() : NaN;
  if (!isNaN(end) && nowMs < end) {
    return 'live';
  }
  return 'none';
}
