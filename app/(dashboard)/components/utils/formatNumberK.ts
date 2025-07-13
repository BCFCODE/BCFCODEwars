/**
 * Formats a number in thousands using `K` notation.
 *
 * - For numbers under 1,000, returns the full number as-is (e.g. `"842"`).
 * - For numbers 1,000 and up, returns a rounded string with up to 1 decimal
 *   place and a non-breaking thin space before `K` (e.g. `"98.3 K"`).
 * - Removes trailing `.0` (e.g. `"12.0 K"` → `"12 K"`).
 *
 * 📐 UX rationale:
 * - Compact and easy to scan
 * - Thin space keeps `K` readable and avoids line-breaking
 * - 1 decimal for clarity without visual noise
 *
 * @param value - The number to format (e.g., diamonds count)
 * @returns A human-readable string like `"985"` or `"12.4 K"`
 *
 * @example
 * formatNumberK(842);     // → "842"
 * formatNumberK(12500);   // → "12.5 K"
 * formatNumberK(83000);   // → "83 K"
 */
export function formatNumberK(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) return '0';
  if (value < 1000) return value.toString();

  const thinSpace = '\u202F'; // Unicode narrow no-break space
  const formatted = (value / 1000).toFixed(1).replace(/\.0$/, '');

  return `${formatted}${thinSpace}K`;
}
