import Grid from "@mui/material/Grid";
import GaugeSwitch, { GaugeTypes } from "./Switch";

const CodewarsTargetGauges = () => {
  const gaugeTypes: GaugeTypes[] = ["daily", "weekly", "monthly", "yearly"];

  return (
    <Grid container spacing={2} columns={24}>
      {gaugeTypes.map((kind, i) => (
        <Grid
          sx={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
          size={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }}
          key={i}
        >
          <GaugeSwitch index={i} type={kind} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CodewarsTargetGauges;
