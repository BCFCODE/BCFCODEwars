import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { completedAfterThreshold } from "@/utils/dayjs";
import useTargetStore from "../../DailyTarget/store/useTargetStore";

const useChallengeCountsByPeriod = (): {
  inLast24Hour: number;
  inLast7Days: number;
  inLast30Days: number;
  inLast365Days: number;
} => {
  const { data } = useCurrentUserQuery();
  const { target } = useTargetStore();
  const list = data?.codewars.codeChallenges.list;

  const [inLast24Hour, inLast7Days, inLast30Days, inLast365Days] = [
    1, 7, 30, 365,
  ].map(
    (dayCount) =>
      list?.filter(({ completedAt }) =>
        completedAfterThreshold(completedAt, dayCount)
      ).length ?? 0
  );

  console.log("WeeklyStat", inLast7Days, target);

  return { inLast24Hour, inLast7Days, inLast30Days, inLast365Days };
};

export default useChallengeCountsByPeriod;
