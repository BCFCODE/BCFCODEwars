import { Box, Stack } from "@mui/material";
import { GaugeTypes } from "../../types";
import SingleGauge from "./SingleGauge";
import Texts from "./Texts";

interface Props {
  type: GaugeTypes;
  index: number;
}

/**
 * GaugeView Component
 *
 * A high-level layout component responsible for displaying a complete gauge unit,
 * including both the animated gauge (`SingleGauge`) and its accompanying text info (`Texts`).
 *
 * @component
 * @example
 * <GaugeView type="monthly" index={2} />
 *
 *
 * Composition:
 * - Renders a `SingleGauge` to visually represent percentage.
 * - Renders `Texts` to show descriptive status or progress text.
 * - Uses MUI’s `Stack` and `Box` for semantic and layout consistency.
 *
 * Best Practices:
 * - Separation of visual and textual feedback into distinct components improves modularity.
 * - Keeps components focused on their own responsibilities for better testability and reusability.
 * - Top-down prop flow (index/type) ensures synchronization across children components.
 */
const GaugeView = ({ index, type }: Props) => {
  return (
    <Stack>
      <Box
        sx={{
          transition: "font-size 1s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SingleGauge {...{ index }} />
        <Texts {...{ index, type }} />
      </Box>
    </Stack>
  );
};

export default GaugeView;
