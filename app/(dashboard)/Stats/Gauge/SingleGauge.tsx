import { Stack, Typography } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { ChallengeSummary } from "./hooks/useChallengeCountsByPeriod";
import useGaugeData from "./useGaugeData";
import { CodewarsCompletedChallenge } from "@/types/codewars";

const getColorKey = (
  percent: number
): "error" | "warning" | "info" | "success" => {
  if (percent < 34) return "error";
  if (percent < 67) return "warning";
  if (percent < 90) return "info";
  return "success";
};

export type GaugeTypes = "daily" | "weekly" | "monthly" | "yearly";

interface Props {
  type: GaugeTypes
  list: CodewarsCompletedChallenge[];
  index: number;
}

const SingleGauge = ({ list, index , type}: Props) => {
  const { counts, percents } = useGaugeData({ list });
  const colorKey = getColorKey(percents[index]);

  return (
    <Stack>
      <Gauge
        height={200}
        value={
          percents[index] >= 110 || percents[index] === -1
            ? 110
            : percents[index]
        }
        startAngle={-110}
        endAngle={110}
        valueMax={110}
        sx={(theme) => ({
          pointerEvents: "none",
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            transform: "translate(0px, 0px)",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill:
              percents[index] === -1 || percents[index] >= 100
                ? `#76FF03`
                : theme.palette[colorKey].main,
          },
          // [`& .${gaugeClasses.referenceArc}`]: {
          //   fill: theme.palette.text.disabled,
          // },
        })}
        // text={({ value, valueMax }) => `${value} / ${valueMax}`}
        text={({ value, valueMax }) =>
          `${percents[index] === -1 ? "Done!" : `${percents[index]}%`}`
        }
      />
      <Typography sx={{ textAlign: "center" }}>Message</Typography>
    </Stack>
  );
};

export default SingleGauge;
