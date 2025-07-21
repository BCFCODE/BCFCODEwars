import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodewarsDiamondsRecord } from "@/types/diamonds";
import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(isBetween);

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
 * Sums `diamondsEarned` for challenges completed strictly between `start`
 * (inclusive) and `end` (exclusive).
 */
export function sumDiamondsInRange(
  challenges: CodewarsDiamondsRecord[],
  start: Dayjs,
  end: Dayjs
): number {
  return challenges.reduce((sum, ch) => {
    const d = dayjs(ch.completedAt);
    return d.isBetween(start, end, undefined, "[)") // inclusive start, exclusive end
      ? sum + ch.diamondsEarned
      : sum;
  }, 0);
}

/* ------------------------------------------------------------------ */
/*  Week‑over‑week analytics                                          */
/* ------------------------------------------------------------------ */

export interface WeekDiamondsStats {
  /** Diamonds earned in the last 7 days (inclusive of today) */
  thisWeek: number;
  /** Diamonds earned in the 7 days before that */
  prevWeek: number;
  /** Growth percentage vs previous week (positive = up) */
  growthPct: number; //  e.g. 18.7  means +18.7 %
}

/**
 * Calculates week‑over‑week diamond growth.
 *
 * - “This week” = today minus 0‑7 days (inclusive start of 7 days ago,
 *   exclusive tomorrow).
 * - “Previous week” = 7‑14 days ago.
 * - If `prevWeek` is 0, growthPct is 0 (avoids divide‑by‑zero).
 *
 * @param challenges Array of CodewarsCompletedChallenge
 * @returns {WeekDiamondsStats}
 *
 * @example
 * const stats = calcWeeklyDiamondGrowth(challenges);
 * console.log(`${stats.growthPct.toFixed(1)} % vs last week`);
 */
export function calcWeeklyDiamondGrowth(
  challenges: CodewarsDiamondsRecord[]
): WeekDiamondsStats {
  const todayEnd = dayjs().utc().endOf("day"); // exclusive upper bound
  const thisWeekStart = dayAgo(7); // inclusive lower bound
  const prevWeekStart = dayAgo(14);
  const prevWeekEnd = thisWeekStart; // exclusive

  const thisWeek = sumDiamondsInRange(challenges, thisWeekStart, todayEnd);

  const prevWeek = sumDiamondsInRange(challenges, prevWeekStart, prevWeekEnd);

  const growthPct = prevWeek > 0 ? ((thisWeek - prevWeek) / prevWeek) * 100 : 0;

  return { thisWeek, prevWeek, growthPct };
}

export interface DaySolvedStats {
  today: number;
  yesterday: number;
  growthPct: number;
}

/**
 * Calculates daily solved problem growth.
 *
 * - “Today” = start to end of today
 * - “Yesterday” = start to end of previous day
 * - If yesterday = 0, growthPct is 0
 *
 * @param challenges Array of completed challenges
 * @returns DaySolvedStats
 */
export function calcDailySolvedProblemsGrowth(
  challenges: CodewarsCompletedChallenge[]
): DaySolvedStats {
  const startOfToday = dayjs().startOf("day");
  const endOfToday = dayjs().endOf("day");

  const startOfYesterday = startOfToday.subtract(1, "day");
  const endOfYesterday = startOfToday;

  let today = 0;
  let yesterday = 0;

  for (const challenge of challenges) {
    const completedAt = dayjs(challenge.completedAt);
    if (completedAt.isBetween(startOfToday, endOfToday, undefined, "[)")) {
      today++;
    } else if (completedAt.isBetween(startOfYesterday, endOfYesterday, undefined, "[)")) {
      yesterday++;
    }
  }

  const growthPct = yesterday > 0 ? ((today - yesterday) / yesterday) * 100 : 0;

  return { today, yesterday, growthPct };
}

/**
 * Exported Dayjs instance with configured plugins and locale.
 */
export default dayjs;

