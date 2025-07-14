import { Box, Fade } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import useGaugeData from "../../hooks/useGaugeData";
import useGaugeStyles from "../../hooks/useGaugeDimensions";
import { usePathname } from "next/navigation";

const getColorKey = (
  percent: number
): "error" | "warning" | "info" | "success" => {
  if (percent < 34) return "error";
  if (percent < 67) return "warning";
  if (percent < 90) return "info";
  return "success";
};

interface Props {
  index: number;
}

/**
 * SingleGauge Component
 *
 * Renders an animated radial gauge using MUI X's `<Gauge />` to visually
 * represent progress percentage toward a defined target.
 *
 * @component
 * @example
 * <SingleGauge index={1} />
 *
 * Key Features:
 * - Dynamically selects a gauge color based on progress thresholds:
 *   - < 34%: red (error)
 *   - < 67%: yellow (warning)
 *   - < 90%: blue (info)
 *   - >= 90%: green (success)
 *
 * - Shows "Done!" when a late-period goal is met or the percent exceeds 100%.
 * - Max gauge value is capped at 110% to prevent overscaling.
 * - Typography is responsive and animated for smooth transitions.
 *
 * Best Practices:
 * - `pointerEvents: "none"` disables interaction for a pure display component.
 * - Conditional coloring enhances accessibility and intuitive understanding.
 * - Separates logic (`getColorKey`) from rendering for clarity and reuse.
 */
const SingleGauge = ({ index }: Props) => {
  const { gaugeInnerTextSX } = useGaugeStyles();
  const { percent, didLaterPeriodMeetTarget } = useGaugeData(index);
  const colorKey = getColorKey(percent);

  const pathname = usePathname();
  const isRoot = pathname === "/";
  const shouldAdjustMargin = index > 1 && isRoot;

  return (
    <Box>
      <Fade in timeout={100}>
        <Gauge
          height={200}
          value={didLaterPeriodMeetTarget || percent >= 110 ? 110 : percent}
          startAngle={-110}
          endAngle={110}
          valueMax={110}
          sx={(theme) => ({
            // backgroundColor: "gray",
            // maxHeight: 300,
            transition: "margin 1s ease",
            // pointerEvents: "none",
            [`& .${gaugeClasses.valueText}`]: {
              ...gaugeInnerTextSX,
              pointerEvents: "none",
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill:
                didLaterPeriodMeetTarget || percent >= 100
                  ? `#76FF03`
                  : theme.palette[colorKey].main,
              pointerEvents: "none",
            },
            [`@media (min-width: ${200}px)`]: {
              marginTop: shouldAdjustMargin ? -10 : "initial",
            },
            [`@media (min-width: ${260}px)`]: {
              marginTop: shouldAdjustMargin ? -9 : "initial",
            },
            [`@media (min-width: ${320}px)`]: {
              marginTop: shouldAdjustMargin ? -8 : "initial",
            },
            [`@media (min-width: ${360}px)`]: {
              marginTop: shouldAdjustMargin ? -7 : "initial",
            },
            [`@media (min-width: ${420}px)`]: {
              marginTop: shouldAdjustMargin ? -6 : "initial",
            },
            [`@media (min-width: ${500}px)`]: {
              marginTop: shouldAdjustMargin ? -4 : "initial",
            },
            [`@media (min-width: ${620}px)`]: {
              marginTop: shouldAdjustMargin ? -2 : "initial",
            },
            [`@media (min-width: ${740}px)`]: {
              marginTop: "initial",
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
    </Box>
  );
};

export default SingleGauge;
