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
  type: GaugeTypes;
  list: CodewarsCompletedChallenge[];
  index: number;
}

const SingleGauge = ({ list, index, type }: Props) => {
  const { counts, percents } = useGaugeData({ list });
  const [count, percent] = [counts, percents].map((data) => data[index]);
  const colorKey = getColorKey(percent);
  const slicedPercents = percents.slice(index + 1);
  const isOtherReachedTheTarget = slicedPercents.some(
    (percent) => percent >= 100
  );
  console.log(percent, isOtherReachedTheTarget);
  switch (type) {
    case "daily":
      return (
        <Stack>
          <Gauge
            height={200}
            value={percent >= 110 || percent === -1 ? 110 : percent}
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
                  percent === -1 || percent >= 100
                    ? `#76FF03`
                    : theme.palette[colorKey].main,
              },
              // [`& .${gaugeClasses.referenceArc}`]: {
              //   fill: theme.palette.text.disabled,
              // },
            })}
            // text={({ value, valueMax }) => `${value} / ${valueMax}`}
            text={({ value, valueMax }) =>
              `${isOtherReachedTheTarget ? "Done!" : `${percent}%`}`
            }
          />
          <Typography sx={{ textAlign: "center" }}>Message</Typography>
        </Stack>
      );
    case "weekly":
      return (
        <Stack>
          <Gauge
            height={200}
            value={percent >= 110 || percent === -1 ? 110 : percent}
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
                  percent === -1 || percent >= 100
                    ? `#76FF03`
                    : theme.palette[colorKey].main,
              },
              // [`& .${gaugeClasses.referenceArc}`]: {
              //   fill: theme.palette.text.disabled,
              // },
            })}
            // text={({ value, valueMax }) => `${value} / ${valueMax}`}
            text={({ value, valueMax }) =>
              `${isOtherReachedTheTarget ? "Done!" : `${percent}%`}`
            }
          />
          <Typography sx={{ textAlign: "center" }}>Message</Typography>
        </Stack>
      );
    case "monthly":
      return (
        <Stack>
          <Gauge
            height={200}
            value={percent >= 110 || percent === -1 ? 110 : percent}
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
                  percent === -1 || percent >= 100
                    ? `#76FF03`
                    : theme.palette[colorKey].main,
              },
              // [`& .${gaugeClasses.referenceArc}`]: {
              //   fill: theme.palette.text.disabled,
              // },
            })}
            // text={({ value, valueMax }) => `${value} / ${valueMax}`}
            text={({ value, valueMax }) =>
              `${isOtherReachedTheTarget ? "Done!" : `${percent}%`}`
            }
          />
          <Typography sx={{ textAlign: "center" }}>Message</Typography>
        </Stack>
      );
    case "yearly":
      return (
        <Stack>
          <Gauge
            height={200}
            value={percent >= 110 || percent === -1 ? 110 : percent}
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
                  percent === -1 || percent >= 100
                    ? `#76FF03`
                    : theme.palette[colorKey].main,
              },
              // [`& .${gaugeClasses.referenceArc}`]: {
              //   fill: theme.palette.text.disabled,
              // },
            })}
            // text={({ value, valueMax }) => `${value} / ${valueMax}`}
            text={({ value, valueMax }) => `${percent}%`}
          />
          <Typography sx={{ textAlign: "center" }}>
            {count} in last 365Days
          </Typography>
          {/* <Typography sx={{ textAlign: "center" }}>{count}/30Days</Typography> */}
        </Stack>
      );
  }
};

export default SingleGauge;
