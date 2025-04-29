import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { completedAfterThreshold } from "@/utils/dayjs";
import useTargetStore from "../../DailyTarget/store/useTargetStore";

export interface ChallengeSummary {
  count: number;
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

  console.log("WeeklyStat", countInLast24Hour, target);

  return {
    inLast24Hour: {
      count: countInLast24Hour,
    },
    inLast7Days: {
      count: countInLast7Days,
    },
    inLast30Days: {
      count: countInLast30Days,
    },
    inLast365Days: {
      count: countInLast365Days,
    },
  };
};

export default useChallengeCountsByPeriod;
