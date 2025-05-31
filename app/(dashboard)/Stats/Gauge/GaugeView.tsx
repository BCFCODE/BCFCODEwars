import useGaugeContext from "@/app/context/hooks/useGaugeContext";
import { Fade, Typography } from "@mui/material";
import SingleGauge from "./SingleGauge";
import useGaugeData from "./hooks/useGaugeData";
import gaugeConfig from "./config";

export type GaugeTypes = "daily" | "weekly" | "monthly" | "yearly";

interface Props {
  type: GaugeTypes;
  index: number;
}

/**
 * GaugeView Component
 *
 * Renders a single progress gauge visualization for the user's Codewars challenge activity
 * across a specified time window (e.g., daily, weekly, monthly, yearly).
 *
 * ---
 * This component:
 * - Pulls the current user's `label` from global GaugeContext (acts as the challenge goal multiplier).
 * - Uses `useGaugeData(index)` to calculate:
 *    - `percent`: Percent of goal completed in the given window.
 *    - `count`: Total challenges completed in that period.
 *    - `didLaterPeriodMeetTarget`: Whether a larger period met the 100% target.
 * - Uses `gaugeConfig[type]` to dynamically get:
 *    - `unitTarget`: A friendly label for the timeframe (e.g., "Daily").
 *    - `days`: The number of days for the time window.
 *
 * ---
 * UI Rendering:
 * - Shows a `SingleGauge` visualization for the selected timeframe.
 * - Displays success message if current or larger timeframe hit 100%:
 *      → `${unitTarget} target reached!`
 * - Otherwise displays:
 *      → `${count} in last ${days === 1 ? "24Hours" : `${days}Days`}`
 * - Shows raw progress ratio (`count / (label * days)`) if no fallback met the goal.
 *
 * ---
 * @component
 * @param {Object} props
 * @param {GaugeTypes} props.type - One of "daily", "weekly", "monthly", or "yearly"
 * @param {number} props.index - Index used to compute time-based challenge stats
 *
 * @example
 * <GaugeView type="weekly" index={1} />
 */
const GaugeView = ({ index, type }: Props) => {
  const { label } = useGaugeContext();
  const { percent, count, didLaterPeriodMeetTarget } = useGaugeData(index);
  const { unitTarget, days } = gaugeConfig[type];

  return (
    <SingleGauge gaugeQuery={{ percent, didLaterPeriodMeetTarget }}>
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
    </SingleGauge>
  );
};

export default GaugeView;
