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

/**
 * Converts a wall-clock date-time string entered as Finland time (e.g. "2026-12-01T17:00" from an
 * HTML5 `<input type="datetime-local" />`) into a UTC ISO 8601 string, regardless of the browser's own
 * timezone. Daylight saving is applied automatically (winter GMT+2, summer GMT+3).
 *
 * Example: "2026-12-01T17:00" -> "2026-12-01T15:00:00.000Z".
 *
 * @param finlandDateTimeStr - Finland wall-clock time as "YYYY-MM-DDTHH:mm".
 * @returns The ISO 8601 UTC string, or null if empty or invalid.
 */
export function convertFinlandToUTC(finlandDateTimeStr: string | null | undefined): string | null {
  if (!finlandDateTimeStr || typeof finlandDateTimeStr !== 'string') {
    return null;
  }

  const match = finlandDateTimeStr.trim().match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) {
    return null;
  }

  const [year, month, day, hours, minutes] = match.slice(1).map(Number);
  const date = new TZDate(year, month - 1, day, hours, minutes, 0, FINLAND_TIME_ZONE);
  if (isNaN(date.getTime())) {
    return null;
  }

  // TZDate.toISOString() keeps the Helsinki offset; normalise to UTC ('Z').
  return new Date(date.getTime()).toISOString();
}

/**
 * Converts a UTC ISO string into Finland wall-clock time formatted as "YYYY-MM-DDTHH:mm",
 * used to pre-populate the Finland-time datetime-local inputs when editing.
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

  return `${tzDate.getFullYear()}-${pad(tzDate.getMonth() + 1)}-${pad(tzDate.getDate())}T${pad(tzDate.getHours())}:${pad(tzDate.getMinutes())}`;
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
