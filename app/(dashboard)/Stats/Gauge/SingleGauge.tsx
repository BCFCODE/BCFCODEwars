import { Stack } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { ReactNode } from "react";

const getColorKey = (
  percent: number
): "error" | "warning" | "info" | "success" => {
  if (percent < 34) return "error";
  if (percent < 67) return "warning";
  if (percent < 90) return "info";
  return "success";
};

interface GaugeQuery {
  didLaterPeriodMeetTarget: boolean;
  percent: number;
}

interface Props {
  children: ReactNode;
  gaugeQuery: GaugeQuery;
}

const SingleGauge = ({
  children,
  gaugeQuery: { didLaterPeriodMeetTarget, percent },
}: Props) => {
  const colorKey = getColorKey(percent);
  return (
    <Stack>
      <Gauge
        height={200}
        value={didLaterPeriodMeetTarget || percent >= 110 ? 110 : percent}
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
              didLaterPeriodMeetTarget || percent >= 100
                ? `#76FF03`
                : theme.palette[colorKey].main,
          },
          // [`& .${gaugeClasses.referenceArc}`]: {
          //   fill: theme.palette.text.disabled,
          // },
        })}
        // text={({ value, valueMax }) => `${value} / ${valueMax}`}
        text={({ value, valueMax }) =>
          `${didLaterPeriodMeetTarget ? "Done!" : `${percent}%`}`
        }
      />
      {children}
    </Stack>
  );
};

export default SingleGauge;
