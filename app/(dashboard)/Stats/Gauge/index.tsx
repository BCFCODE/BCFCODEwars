import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

interface Props {
  completedChallenges: number;
}

const CodewarsStatGauge = ({ completedChallenges }: Props) => {
  return (
    <Stack>
      <Gauge
        height={200}
        value={15}
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
        {completedChallenges} in last 365Days
      </Typography>
    </Stack>
  );
};

export default CodewarsStatGauge;
