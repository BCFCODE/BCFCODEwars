import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import useChallengeCountsByPeriod from "../../hooks/useChallengeCountsByPeriod";

const MonthlyStat = () => {
  const { inLast30Days } = useChallengeCountsByPeriod();

  return (
    <Stack>
      <Gauge
        height={200}
        value={30}
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
        {inLast30Days} in last 30Days
      </Typography>
    </Stack>
  );
};

export default MonthlyStat;
