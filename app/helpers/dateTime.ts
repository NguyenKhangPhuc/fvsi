/**
 * PURPOSE:
 * Date and time helper utilities for timezone transformations across the VN-FI Collaboration app.
 * Provides functions to convert local browser date-time strings into standard UTC-0:0 (ISO 8601) format
 * suitable for PostgreSQL timestamptz storage.
 */

import { TZDate } from '@date-fns/tz';

/**
 * Converts a local date-time string (such as the value from an HTML5 `<input type="datetime-local" />`,
 * e.g. "2026-09-11T14:30") into a UTC-0:0 ISO 8601 string (e.g. "2026-09-11T11:30:00.000Z").
 *
 * BEHAVIOR:
 * - When given a string without explicit timezone offset like "YYYY-MM-DDTHH:mm", the JavaScript
 *   Date parser interprets it according to the user's current local timezone.
 * - Calling `.toISOString()` converts that exact instant into UTC-0:0 with trailing 'Z'.
 *
 * @param localDateTimeStr - The local date-time string from the form input.
 * @returns The ISO 8601 UTC string (ending in 'Z') or null if invalid or empty.
 */
export function convertLocalToUTC(localDateTimeStr: string | null | undefined): string | null {
  if (!localDateTimeStr || typeof localDateTimeStr !== 'string') {
    return null;
  }

  const trimmed = localDateTimeStr.trim();
  if (!trimmed) {
    return null;
  }

  const date = new Date(trimmed);
  if (isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

/**
 * Formats an ISO UTC date-time string back into a local "YYYY-MM-DDTHH:mm" format,
 * useful when pre-populating an HTML5 datetime-local input.
 *
 * @param isoString - The ISO 8601 date string.
 * @returns Local datetime string formatted as "YYYY-MM-DDTHH:mm" or empty string if invalid.
 */
export function convertUTCToLocalInput(isoString: string | null | undefined): string {
  if (!isoString || typeof isoString !== 'string') {
    return '';
  }

  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

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
 * used to pre-populate the Finland-time datetime-local input when editing.
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
