import Grid from "@mui/material/Grid";
import SingleGauge from "./SingleGauge";
import useChallengeCountsByPeriod from "./hooks/useChallengeCountsByPeriod";

const DailyTargetGauges = () => {
  const { inLast24Hours, inLast7Days, inLast30Days, inLast365Days } =
    useChallengeCountsByPeriod();

  return (
    <Grid container spacing={2} columns={24}>
      {[inLast24Hours, inLast7Days, inLast30Days, inLast365Days].map(
        (inLastDaysAgo, index) => (
          <Grid size={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }} key={index}>
            <SingleGauge completedChallenges={inLastDaysAgo} />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default DailyTargetGauges;
