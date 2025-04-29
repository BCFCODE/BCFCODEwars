import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { ChallengeSummary } from "./hooks/useChallengeCountsByPeriod";
import useTargetStore from "../DailyTarget/store/useTargetStore";

interface Props {
  completedChallenges: ChallengeSummary;
}

const CodewarsStatGauge = ({ completedChallenges }: Props) => {
  console.log(
    "count",
    completedChallenges.count,
    'percent',
    completedChallenges.percent
    // "target",
    // completedChallenges.target,
    // ((completedChallenges.count * 100) / completedChallenges.target).toFixed(2)
  );

  return (
    <Stack>
      <Gauge
        height={200}
        value={completedChallenges.percent}
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
        {completedChallenges.message}
      </Typography>
    </Stack>
  );
};

export default CodewarsStatGauge;
