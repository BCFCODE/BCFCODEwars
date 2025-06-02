import Grid from "@mui/material/Grid";
import GaugeView from "./GaugeView";
import { GaugeTypes } from "../types";
import useGaugeStyles from "../hooks/useGaugeDimensions";

const Gauges = () => {
  const { totalColumns, gridSize } = useGaugeStyles();
  const gaugeTypes: GaugeTypes[] = ["daily", "weekly", "monthly", "yearly"];

  return (
    <Grid container spacing={1} columns={totalColumns}>
      {gaugeTypes.map((kind, i) => (
        <Grid
          sx={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
          // size={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }}
          size={gridSize}
          key={i}
        >
          <GaugeView index={i} type={kind} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Gauges;
