import useGaugeContext from "@/app/context/hooks/useGaugeContext";
import { Typography } from "@mui/material";
import SingleGauge from "./SingleGauge";
import useGaugeData from "./useGaugeData";

export type GaugeTypes = "daily" | "weekly" | "monthly" | "yearly";

interface Props {
  type: GaugeTypes;
  index: number;
}

/**
 * useGaugeData
 *
 * A custom React hook that calculates gauge metrics based on a user's Codewars activity
 * over specified timeframes (1, 7, 30, 365 days).
 *
 * This hook is designed for use in visual progress indicators (gauges) that reflect
 * how consistently a user meets their challenge-completion targets over time.
 *
 * ---
 * Internally:
 * - Fetches the current user's email and label (i.e., daily goal multiplier) from GaugeContext.
 * - Fetches completed Codewars challenges from a custom `useCurrentUserQuery` hook.
 * - Computes the number of completed challenges for each time window:
 *   [1-day, 7-day, 30-day, 365-day] windows.
 * - Calculates the completion percentage for each period based on:
 *   `(completedCount / (label * timeframe)) * 100`
 * - Determines whether **any later time window** (e.g., weekly/monthly) met the 100% target,
 *   even if the current one did not. This allows the UI to show leniency in progress feedback.
 *
 * ---
 * @param index - The index of the timeframe to compute data for:
 *   - 0 = daily (1 day)
 *   - 1 = weekly (7 days)
 *   - 2 = monthly (30 days)
 *   - 3 = yearly (365 days)
 *
 * @returns An object containing:
 * - `percent`: The percentage of the target achieved in the selected period.
 * - `count`: The raw number of completed challenges during that timeframe.
 * - `didLaterPeriodMeetTarget`: Whether any *later* (larger) period met or exceeded 100%.
 *
 * @example
 * ```tsx
 * const { percent, count, didLaterPeriodMeetTarget } = useGaugeData(1); // weekly data
 * ```
 *
 * @remarks
 * This hook is tightly coupled with:
 * - `useGaugeContext` for accessing `email` and `label`
 * - `useCurrentUserQuery` for fetching user challenge data
 * - `completedAfterThreshold` utility for date filtering
 *
 * For UI usage, see `GaugeSwitch` for conditional rendering of different gauges.
 */

const GaugeSwitch = ({ index, type }: Props) => {
  const { label } = useGaugeContext();

  const { percent, count, didLaterPeriodMeetTarget } = useGaugeData(index);

  switch (type) {
    case "daily": {
      return (
        <SingleGauge gaugeQuery={{ percent, didLaterPeriodMeetTarget }}>
          <Typography sx={{ textAlign: "center" }}>
            {percent >= 100 || didLaterPeriodMeetTarget
              ? `Daily label reached!`
              : `${count} in last 24Hours`}
          </Typography>
          {!didLaterPeriodMeetTarget && (
            <Typography sx={{ textAlign: "center" }}>
              {count} / {label * 1}
            </Typography>
          )}
        </SingleGauge>
      );
    }
    case "weekly": {
      return (
        <SingleGauge gaugeQuery={{ percent, didLaterPeriodMeetTarget }}>
          <Typography sx={{ textAlign: "center" }}>
            {percent >= 100 || didLaterPeriodMeetTarget
              ? `Weekly label reached!`
              : `${count} in last 7Days`}
          </Typography>
          {!didLaterPeriodMeetTarget && (
            <Typography sx={{ textAlign: "center" }}>
              {count} / {label * 7}
            </Typography>
          )}
        </SingleGauge>
      );
    }
    case "monthly": {
      return (
        <SingleGauge gaugeQuery={{ percent, didLaterPeriodMeetTarget }}>
          <Typography sx={{ textAlign: "center" }}>
            {percent >= 100 || didLaterPeriodMeetTarget
              ? `Monthly label reached!`
              : `${count} in last 30Days`}
          </Typography>
          {!didLaterPeriodMeetTarget && (
            <Typography sx={{ textAlign: "center" }}>
              {count} / {label * 30}
            </Typography>
          )}
        </SingleGauge>
      );
    }
    case "yearly": {
      return (
        <SingleGauge gaugeQuery={{ percent, didLaterPeriodMeetTarget }}>
          <Typography sx={{ textAlign: "center" }}>
            {percent >= 100 || didLaterPeriodMeetTarget
              ? `Yearly label reached!`
              : `${count} in last 365Days`}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            {count} / {label * 365}
          </Typography>
        </SingleGauge>
      );
    }
  }
};

export default GaugeSwitch;
