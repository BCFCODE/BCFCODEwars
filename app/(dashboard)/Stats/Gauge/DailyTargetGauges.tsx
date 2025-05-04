import { CodewarsCompletedChallenge } from "@/types/codewars";
import Grid from "@mui/material/Grid";
import SingleGauge, { GaugeTypes } from "./SingleGauge";

interface Props {
  list: CodewarsCompletedChallenge[];
}

const DailyTargetGauges = ({ list }: Props) => {
  const gaugeTypes: GaugeTypes[] = ["daily", "weekly", "monthly", "yearly"];

  return (
    <Grid container spacing={2} columns={24}>
      {gaugeTypes.map((kind, i) => (
        <Grid
          sx={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
          size={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }}
          key={i}
        >
          <SingleGauge
            index={i}
            list={list}
            type={kind}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DailyTargetGauges;
