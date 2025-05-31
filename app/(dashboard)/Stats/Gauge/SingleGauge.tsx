import { Fade, Stack } from "@mui/material";
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
      <Fade in timeout={100}>
        <Gauge
          height={200}
          value={didLaterPeriodMeetTarget || percent >= 110 ? 110 : percent}
          startAngle={-110}
          endAngle={110}
          valueMax={110}
          sx={(theme) => ({
            pointerEvents: "none",
            [`& .${gaugeClasses.valueText}`]: {
              transform: "translate(0px, 0px)",
              fontSize: {
                xs: `${8}vw`,
                sm: `${6}vw`,
                md: `${3.5}vw`,
                lg: `${3}vw`,
              },
              transition: "font-size 1s ease",
              // [`@media (min-width: ${1000}px)`]: {
              //   fontSize: 40,
              // },
              // [`@media (min-width: ${800}px)`]: {
              //   fontSize: 35,
              // },
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
          text={
            (/* { value, valueMax } */) =>
              `${didLaterPeriodMeetTarget ? "Done!" : `${percent}%`}`
          }
        />
      </Fade>
      {children}
    </Stack>
  );
};

export default SingleGauge;
