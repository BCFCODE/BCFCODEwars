import { Box, Fade } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import useGaugeData from "../hooks/useGaugeData";
import useGaugeDimensions from "../hooks/useGaugeDimensions";

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
 * @param {number} index - Index to fetch and render specific gauge data.
 *
 * @returns {JSX.Element} A styled and color-coded circular gauge component.
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
  const { fontSize } = useGaugeDimensions();
  const { percent, didLaterPeriodMeetTarget } = useGaugeData(index);
  const colorKey = getColorKey(percent);

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
            pointerEvents: "none",
            [`& .${gaugeClasses.valueText}`]: {
              fontSize, // from context
              transform: "translate(0px, 0px)",
              transition: "font-size 1s ease",
              // [`@media (min-width: ${0}px)`]: {
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
    </Box>
  );
};

export default SingleGauge;
