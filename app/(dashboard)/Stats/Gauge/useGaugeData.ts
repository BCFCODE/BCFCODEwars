import { completedAfterThreshold } from "@/utils/dayjs";
import useTargetStore from "../DailyTarget/useTargetStore";
import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import useGaugeContext from "../../../context/hooks/useGaugeContext";

const useGaugeData = (): {
  counts: number[];
  percents: number[];
} => {
  const { email } = useGaugeContext();
  const { data } = useCurrentUserQuery(email);
  const { target } = useTargetStore();
  const list = data?.codewars.codeChallenges?.list ?? [];

  const dayCounts = [1, 7, 30, 365];

  const counts = dayCounts.map(
    (dayCount) =>
      list?.filter(({ completedAt }) =>
        completedAfterThreshold(completedAt, dayCount)
      ).length ?? 0
  );

  const getPercent = (count: number, timeframeDays: number) =>
    Math.floor((count * 100) / (timeframeDays * target));

  const percents = dayCounts.map((dayCount, i) =>
    getPercent(counts[i], dayCount)
  );
  console.log("percents", percents, typeof percents);
  return { counts, percents };
};

export default useGaugeData;
