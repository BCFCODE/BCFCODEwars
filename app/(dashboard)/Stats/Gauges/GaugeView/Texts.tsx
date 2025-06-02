import useGaugeContext from "@/app/context/hooks/useGaugeContext";
import { Box, Fade, SxProps, Typography } from "@mui/material";
import gaugeConfig from "../config";
import { GaugeTypes } from "../../types";
import useGaugeData from "../../hooks/useGaugeData";
import useGaugeStyles from "../../hooks/useGaugeDimensions";

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
  const { gaugeFooterTextSX } = useGaugeStyles();
  const { label } = useGaugeContext();
  const { percent, count, didLaterPeriodMeetTarget } = useGaugeData(index);
  const { unitTarget, days } = gaugeConfig[type];

  return (
    <Box sx={gaugeFooterTextSX}>
      <Fade key={count} in timeout={2500}>
        <Typography sx={{ fontSize: "inherit" }}>
          {percent >= 100 || didLaterPeriodMeetTarget
            ? `${unitTarget} target reached!`
            : `${count} in last ${days === 1 ? "24Hours" : `${days}Days`}`}
        </Typography>
      </Fade>
      {!didLaterPeriodMeetTarget && (
        <Fade key={label} in timeout={600}>
          <Typography sx={{ fontSize: "inherit" }}>
            {count} / {label * days}
          </Typography>
        </Fade>
      )}
    </Box>
  );
};

export default Texts;
