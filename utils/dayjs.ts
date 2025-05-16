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

export const dayAgo = (dayCount: number) => dayjs().subtract(dayCount, "day");

export const completedAfterThreshold = (
  completedAt: Date | string,
  daysAgoThreshold: number
) => dayjs(completedAt).isAfter(dayAgo(daysAgoThreshold));

export default dayjs;
