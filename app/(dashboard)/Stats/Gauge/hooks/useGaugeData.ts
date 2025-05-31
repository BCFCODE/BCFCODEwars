import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import { completedAfterThreshold } from "@/utils/dayjs";
import useGaugeContext from "../../../../context/hooks/useGaugeContext";

interface GaugeData {
  percent: number;
  count: number;
  didLaterPeriodMeetTarget: boolean;
}

const useGaugeData = (index: number): GaugeData => {
  const { email, label } = useGaugeContext();
  const { data } = useCurrentUserQuery(email);

  const list = data?.codewars.codeChallenges?.list ?? [];

  const dayCounts = [1, 7, 30, 365];

  const counts = dayCounts.map(
    (dayCount) =>
      list?.filter(({ completedAt }) =>
        completedAfterThreshold(completedAt, dayCount)
      ).length ?? 0
  );

  const getPercent = (count: number, timeframeDays: number) =>
    Math.floor((count * 100) / (timeframeDays * label));

  const percents = dayCounts.map((dayCount, i) =>
    getPercent(counts[i], dayCount)
  );

  const [count, percent] = [counts, percents].map((data) => data[index]);
  const slicedPercents = percents.slice(index + 1);
  const didLaterPeriodMeetTarget = slicedPercents.some(
    (percent) => percent >= 100
  );

  return { percent, count, didLaterPeriodMeetTarget };
};

export default useGaugeData;
