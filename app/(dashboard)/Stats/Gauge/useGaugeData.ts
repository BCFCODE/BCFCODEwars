import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { completedAfterThreshold } from "@/utils/dayjs";
import useTargetStore from "../context/store/useTargetStore";
import { CodewarsCompletedChallenge } from "@/types/codewars";

interface Props {
  list: CodewarsCompletedChallenge[];
}

const useGaugeData = ({
  list,
}: Props): {
  counts: number[];
  percents: number[];
} => {
  const { target } = useTargetStore();

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

  return { counts, percents };
};

export default useGaugeData;
