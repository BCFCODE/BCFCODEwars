import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { completedAfterThreshold } from "@/utils/dayjs";
import useTargetStore from "../../DailyTarget/store/useTargetStore";
import { count } from "console";
import { number } from "zod";

export interface ChallengeSummary {
  count: number;
  message: string;
  // target: number;
  percent: number;
}

const useChallengeCountsByPeriod = (): {
  inLast24Hour: ChallengeSummary;
  inLast7Days: ChallengeSummary;
  inLast30Days: ChallengeSummary;
  inLast365Days: ChallengeSummary;
} => {
  const { data } = useCurrentUserQuery();
  const { target } = useTargetStore();
  const list = data?.codewars.codeChallenges.list;

  const [
    countInLast24Hour,
    countInLast7Days,
    countInLast30Days,
    countInLast365Days,
  ] = [1, 7, 30, 365].map(
    (dayCount) =>
      list?.filter(({ completedAt }) =>
        completedAfterThreshold(completedAt, dayCount)
      ).length ?? 0
  );

  const getPercent = (count: number, timeframeDays: number) =>
    Math.floor((count * 100) / (timeframeDays * target));

  const [
    lastDayPercent,
    last7DaysPercent,
    last30DaysPercent,
    last365DaysPercent,
  ] = [
    getPercent(countInLast24Hour, 1),
    getPercent(countInLast7Days, 7),
    getPercent(countInLast30Days, 30),
    getPercent(countInLast365Days, 365),
  ];

  const percents = [
    lastDayPercent,
    last7DaysPercent,
    last30DaysPercent,
    last365DaysPercent,
  ];

  return {
    inLast24Hour: {
      count: countInLast24Hour,
      message: percents.some((percent) => percent >= 100)
        ? `Daily target reached!`
        : `${countInLast24Hour} in last 24Hours`,
      percent: percents.some((percent) => percent >= 100) ? -1 : lastDayPercent,
    },
    inLast7Days: {
      count: countInLast7Days,
      message: `${countInLast7Days} in last 7Days`,
      percent: last7DaysPercent,
    },
    inLast30Days: {
      count: countInLast30Days,
      message: `${countInLast30Days} in last 30Days`,
      percent: last30DaysPercent,
    },
    inLast365Days: {
      count: countInLast365Days,
      message: `${countInLast365Days} in last 365Days`,
      percent: last365DaysPercent,
    },
  };
};

export default useChallengeCountsByPeriod;
