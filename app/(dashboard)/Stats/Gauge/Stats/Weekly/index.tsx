import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import useChallengeCountsByPeriod from "../../hooks/useChallengeCountsByPeriod";

const WeeklyStat = () => {
  const { inLast7Days } = useChallengeCountsByPeriod();

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
      <Typography sx={{ textAlign: "center" }}>
        {inLast7Days} in 7Days
      </Typography>
    </Stack>
  );
};

export default WeeklyStat;
