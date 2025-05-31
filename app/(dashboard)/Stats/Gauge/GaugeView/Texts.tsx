import useGaugeContext from "@/app/context/hooks/useGaugeContext";
import { Box, Fade, Typography } from "@mui/material";
import gaugeConfig from "../config";
import useGaugeData from "../hooks/useGaugeData";
import { GaugeTypes } from "../types";

interface Props {
  type: GaugeTypes;
  index: number;
}

/**
 * Texts Component
 *
 * Displays status messages and progress metrics for a given gauge based on
 * recent user activity and predefined targets (daily, weekly, etc.).
 *
 * @component
 * @example
 * <Texts type="weekly" index={0} />
 *
 * @param {GaugeTypes} type - Type of gauge to display (daily, weekly, monthly, yearly).
 * @param {number} index - Index to identify which gauge's data to retrieve from context or hooks.
 *
 * @returns {JSX.Element} A MUI Box containing two fade-in text lines:
 *  1. A summary message indicating target status.
 *  2. A count breakdown (if the target hasn't been met in the later period).
 *
 * - Uses `useGaugeContext` to get the label multiplier.
 * - Uses `useGaugeData` to retrieve the percent completion, raw count, and period status.
 * - Reads config (`unitTarget`, `days`) from gaugeConfig based on gauge type.
 *
 * UI Behavior:
 * - Text fades in with transitions for a smoother UX.
 * - Displays motivational text when the target is reached.
 * - Shows current count vs. target if the goal is unmet.
 */
const Texts = ({ type, index }: Props) => {
  const { label } = useGaugeContext();
  const { percent, count, didLaterPeriodMeetTarget } = useGaugeData(index);
  const { unitTarget, days } = gaugeConfig[type];

  return (
    <Box>
      <Fade key={count} in timeout={2500}>
        <Typography sx={{ textAlign: "center" }}>
          {percent >= 100 || didLaterPeriodMeetTarget
            ? `${unitTarget} target reached!`
            : `${count} in last ${days === 1 ? "24Hours" : `${days}Days`}`}
        </Typography>
      </Fade>
      {!didLaterPeriodMeetTarget && (
        <Fade key={label} in timeout={600}>
          <Typography sx={{ textAlign: "center" }}>
            {count} / {label * days}
          </Typography>
        </Fade>
      )}
    </Box>
  );
};

export default Texts;
