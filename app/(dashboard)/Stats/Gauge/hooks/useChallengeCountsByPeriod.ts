import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { completedAfterThreshold } from "@/utils/dayjs";
import useTargetStore from "../../DailyTarget/store/useTargetStore";

export interface ChallengeSummary {
  count: number;
  message: string;
  percent: number;
}

const useChallengeCountsByPeriod = (): {
  isLoading: boolean
  isListEmpty: boolean;
  inLast24Hours: ChallengeSummary;
  inLast7Days: ChallengeSummary;
  inLast30Days: ChallengeSummary;
  inLast365Days: ChallengeSummary;
} => {
  const { data, isLoading } = useCurrentUserQuery();
  const { target } = useTargetStore();

  const isConnectedToCodewars = data?.codewars.isConnected;

  const list = isConnectedToCodewars ? data.codewars.codeChallenges.list : [];

  const isListEmpty = list.length === 0;

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
    last24HoursPercent,
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
    last24HoursPercent,
    last7DaysPercent,
    last30DaysPercent,
    last365DaysPercent,
  ];

  return {
    isLoading,
    isListEmpty,
    inLast24Hours: {
      count: countInLast24Hour,
      message: percents.slice(0).some((percent) => percent > 100)
        ? `Daily target reached! ${last24HoursPercent >= 100 ? `${countInLast24Hour}/30Days` : ""}`
        : `${countInLast24Hour} in last 24Hours`,
      percent:
        last24HoursPercent >= 100
          ? last24HoursPercent
          : percents.slice(0).some((percent) => percent >= 100)
            ? -1
            : last24HoursPercent,
    },
    inLast7Days: {
      count: countInLast7Days,
      message: percents.slice(1).some((percent) => percent > 100)
        ? `Weekly target reached! ${last7DaysPercent >= 100 ? `${countInLast7Days}/30Days` : ""}`
        : `${countInLast7Days} in last 7Days`,
      percent:
        last7DaysPercent >= 100
          ? last7DaysPercent
          : percents.slice(1).some((percent) => percent >= 100)
            ? -1
            : last7DaysPercent,
    },
    inLast30Days: {
      count: countInLast30Days,
      message: percents.slice(2).some((percent) => percent > 100)
        ? `Monthly target reached! ${last30DaysPercent >= 100 ? `${countInLast30Days}/30Days` : ""}`
        : `${countInLast30Days} in last 30Days`,
      percent:
        last30DaysPercent >= 100
          ? last30DaysPercent
          : percents.slice(2).some((percent) => percent >= 100)
            ? -1
            : last30DaysPercent,
    },
    inLast365Days: {
      count: countInLast365Days,
      message: percents.slice(3).some((percent) => percent > 100)
        ? `Yearly target reached!`
        : `${countInLast365Days} in last 365Days ${last365DaysPercent >= 100 ? `${countInLast365Days}/30Days` : ""}`,
      percent:
        last365DaysPercent >= 100
          ? last365DaysPercent
          : percents.slice(3).some((percent) => percent >= 100)
            ? -1
            : last365DaysPercent,
    },
  };
};

export default useChallengeCountsByPeriod;
