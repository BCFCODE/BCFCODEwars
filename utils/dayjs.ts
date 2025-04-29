import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "Recently Solved",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

export const dayAgo = (dayCount: number) => dayjs().subtract(dayCount, "day");

export const completedAfterThreshold = (
  completedAt: Date | string,
  daysAgoThreshold: number
) => dayjs(completedAt).isAfter(dayAgo(daysAgoThreshold));

export default dayjs;
