/**
 * PURPOSE:
 * Date and time helper utilities for timezone transformations across the VN-FI Collaboration app.
 * Provides functions to convert local browser date-time strings into standard UTC-0:0 (ISO 8601) format
 * suitable for PostgreSQL timestamptz storage.
 */

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
