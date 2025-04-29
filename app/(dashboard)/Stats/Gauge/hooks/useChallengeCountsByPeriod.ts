import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { completedAfterThreshold } from "@/utils/dayjs";
import useTargetStore from "../../DailyTarget/store/useTargetStore";

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

  return {
    inLast24Hour: {
      count: countInLast24Hour,
      message: `${countInLast24Hour} in last 24Hours`,
      percent: Math.floor((countInLast24Hour * 100) / (1 * target)),
    },
    inLast7Days: {
      count: countInLast7Days,
      message: `${countInLast7Days} in last 7Days`,
      percent: Math.floor((countInLast7Days * 100) / (7 * target)),
    },
    inLast30Days: {
      count: countInLast30Days,
      message: `${countInLast30Days} in last 30Days`,
      percent: Math.floor((countInLast30Days * 100) / (30 * target)),
    },
    inLast365Days: {
      count: countInLast365Days,
      message: `${countInLast365Days} in last 365Days`,
      percent: Math.floor((countInLast365Days * 100) / (365 * target)),
    },
  };
};

export default useChallengeCountsByPeriod;
