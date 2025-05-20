import { CodewarsCompletedChallenge } from "@/types/codewars";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "Recently Solved",
    m: "1m ago",
    mm: "%dm ago",
    h: "1h ago",
    hh: "%dh ago",
    d: "1d ago",
    dd: "%dd ago",
    M: "1mo ago",
    MM: "%dmo ago",
    y: "1y ago",
    yy: "%dy ago",
  },
});

/**
 * Returns a Dayjs object representing the date/time `dayCount` days ago from now.
 *
 * @param {number} dayCount - The number of days to subtract from the current date.
 * @returns {dayjs.Dayjs} A Dayjs object for the calculated date.
 *
 * @example
 * const threeDaysAgo = dayAgo(3);
 */
export const dayAgo = (dayCount: number): dayjs.Dayjs =>
  dayjs().subtract(dayCount, "day");

/**
 * Checks if a given completion date is after a threshold defined by days ago.
 *
 * @param {Date | string} completedAt - The completion date as a Date object or ISO date string.
 * @param {number} daysAgoThreshold - The number of days ago to use as a threshold.
 * @returns {boolean} True if `completedAt` is after the threshold date, false otherwise.
 *
 * @example
 * const isRecent = completedAfterThreshold("2025-05-15T00:00:00Z", 7);
 */
export const completedAfterThreshold = (
  completedAt: Date | string,
  daysAgoThreshold: number
): boolean => dayjs(completedAt).isAfter(dayAgo(daysAgoThreshold));

/**
 * Sorts an array of CodewarsCompletedChallenge by their `completedAt` date in ascending order (oldest first).
 *
 * This function returns a new sorted array without modifying the original input.
 *
 * @param {CodewarsCompletedChallenge[]} challenges - Array of completed challenges with a `completedAt` date string.
 * @returns {CodewarsCompletedChallenge[]} A new array sorted by ascending completion date.
 *
 * @example
 * const sortedAsc = sortByCompletedAtAsc(challenges);
 */
export function sortByCompletedAtAsc(
  challenges: CodewarsCompletedChallenge[]
): CodewarsCompletedChallenge[] {
  return [...challenges].sort((a, b) =>
    dayjs(a.completedAt).diff(dayjs(b.completedAt))
  );
}

/**
 * Sorts an array of CodewarsCompletedChallenge by their `completedAt` date in descending order (newest first).
 *
 * This function returns a new sorted array without modifying the original input.
 *
 * @param {CodewarsCompletedChallenge[]} challenges - Array of completed challenges with a `completedAt` date string.
 * @returns {CodewarsCompletedChallenge[]} A new array sorted by descending completion date.
 *
 * @example
 * const sortedDesc = sortByCompletedAtDesc(challenges);
 */
export function sortByCompletedAtDesc(
  challenges: CodewarsCompletedChallenge[]
): CodewarsCompletedChallenge[] {
  return [...challenges].sort((a, b) =>
    dayjs(b.completedAt).diff(dayjs(a.completedAt))
  );
}

/**
 * Exported Dayjs instance with configured plugins and locale.
 */
export default dayjs;
