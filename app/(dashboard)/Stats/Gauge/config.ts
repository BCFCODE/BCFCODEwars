import { GaugeTypes } from "./GaugeView";

interface GaugeConfigEntry {
  unitTarget: string;
  days: number;
}

/**
 * Gauge Configuration Map
 *
 * Defines the time-based configuration for each gauge type used in the UI.
 * Each entry maps a `GaugeTypes` value (e.g., "daily", "weekly") to its associated
 * label and duration in days.
 *
 * ---
 * Properties:
 * - `unitTarget`: Human-readable label used in UI messages (e.g., "Weekly target reached!")
 * - `days`: Number of days representing the time period for aggregation
 *
 * ---
 * This config enables centralized control over all time-based gauge behaviors
 * and labels, improving consistency and scalability.
 *
 * ---
 * @example
 * gaugeConfig["monthly"] // { unitTarget: "Monthly", days: 30 }
 */
const gaugeConfig: Record<GaugeTypes, GaugeConfigEntry> = {
  daily: { unitTarget: "Daily", days: 1 },
  weekly: { unitTarget: "Weekly", days: 7 },
  monthly: { unitTarget: "Monthly", days: 30 },
  yearly: { unitTarget: "Yearly", days: 365 },
};

export default gaugeConfig;
