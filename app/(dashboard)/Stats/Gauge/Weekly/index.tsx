import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import dayjs from "@/utils/dayjs";
import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const WeeklyStat = () => {
  const { data } = useCurrentUserQuery();
  const list = data?.codewars.codeChallenges.list;
  const targetPointAgo = dayjs().subtract(1, "week");

  const challengesCompletedInLast7DaysAgo =
    list?.filter((challenge) =>
      dayjs(challenge.completedAt).isAfter(targetPointAgo)
    ).length ?? 0;

  return (
    <Stack>
      <Gauge
        height={200}
        value={50}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            transform: "translate(0px, 0px)",
          },
        }}
        // text={({ value, valueMax }) => `${value} / ${valueMax}`}
        text={({ value, valueMax }) => `${value}%`}
      />
      <Typography sx={{ textAlign: "center" }}>1 in 7Days</Typography>
    </Stack>
  );
};

export default WeeklyStat;
