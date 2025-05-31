import Grid from "@mui/material/Grid";
import GaugeView, { GaugeTypes } from "./GaugeView";

const CodewarsTargetGauges = () => {
  const gaugeTypes: GaugeTypes[] = ["daily", "weekly", "monthly", "yearly"];

  return (
    <Grid container spacing={2} columns={24}>
      {gaugeTypes.map((kind, i) => (
        <Grid
          sx={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
          // size={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }}
          size={{ xs: 12, md: 6 }}
          key={i}
        >
          <GaugeView index={i} type={kind} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CodewarsTargetGauges;
