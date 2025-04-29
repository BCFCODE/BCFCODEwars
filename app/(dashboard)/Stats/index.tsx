"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import CodewarsStatGauge from "./Gauge";
import useChallengeCountsByPeriod from "./Gauge/hooks/useChallengeCountsByPeriod";

const DashboardStats = () => {
  const { inLast24Hour, inLast7Days, inLast30Days, inLast365Days } =
    useChallengeCountsByPeriod();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={24}>
        {[inLast24Hour, inLast7Days, inLast30Days, inLast365Days].map(
          (inLastDaysAgo, index) => (
            <Grid size={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }} key={index}>
              <CodewarsStatGauge completedChallenges={inLastDaysAgo} />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};

export default DashboardStats;
