import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
// import { getMillisecondsDaysAgo } from "../../utils/getMillisecondsDaysAgo";
import dayjs from "@/utils/dayjs";

const DailyStat = () => {
  const { data } = useCurrentUserQuery();
  const list = data?.codewars.codeChallenges.list;
  const targetPointAgo = dayjs().subtract(30, "day");
  console.log(
    ">>>>>>> Can I calculate this number with day.js? what is best practices? is this?",

    list?.filter((challenge) =>
      dayjs(challenge.completedAt).isAfter(targetPointAgo)
    ).length ?? 0
  );
  return (
    <Stack>
      <Gauge
        height={200}
        value={80}
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
      <Typography sx={{ textAlign: "center" }}>1 in last 24Hours</Typography>
    </Stack>
  );
};

export default DailyStat;
