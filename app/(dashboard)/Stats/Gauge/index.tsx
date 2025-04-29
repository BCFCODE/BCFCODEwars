import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { ChallengeSummary } from "./hooks/useChallengeCountsByPeriod";

const getColorKey = (
  percent: number
): "error" | "warning" | "info" | "success" => {
  if (percent < 34) return "error";
  if (percent < 67) return "warning";
  if (percent < 90) return "info";
  return "success";
};

interface Props {
  completedChallenges: ChallengeSummary;
}

const CodewarsStatGauge = ({ completedChallenges }: Props) => {
  const colorKey = getColorKey(completedChallenges.percent);

  return (
    <Stack>
      <Gauge
        height={200}
        value={
          completedChallenges.percent > 110 ||
          completedChallenges.percent === -1
            ? 110
            : completedChallenges.percent
        }
        startAngle={-110}
        endAngle={110}
        valueMax={110}
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            transform: "translate(0px, 0px)",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill:
              completedChallenges.percent === -1
                ? `#76FF03`
                : theme.palette[colorKey].main,
          },
          // [`& .${gaugeClasses.referenceArc}`]: {
          //   fill: theme.palette.text.disabled,
          // },
        })}
        // text={({ value, valueMax }) => `${value} / ${valueMax}`}
        text={({ value, valueMax }) =>
          `${completedChallenges.percent === -1 ? "Done!" : `${completedChallenges.percent}%`}`
        }
      />
      <Typography sx={{ textAlign: "center" }}>
        {completedChallenges.message}
      </Typography>
    </Stack>
  );
};

export default CodewarsStatGauge;
