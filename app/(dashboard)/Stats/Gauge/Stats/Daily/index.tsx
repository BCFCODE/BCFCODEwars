import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import useChallengeCountsByPeriod from "../../hooks/useChallengeCountsByPeriod";

const DailyStat = () => {
  const { inLast24Hour } = useChallengeCountsByPeriod();

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
      <Typography sx={{ textAlign: "center" }}>
        {inLast24Hour} in last 24Hours
      </Typography>
    </Stack>
  );
};

export default DailyStat;
