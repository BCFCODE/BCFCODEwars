"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import CodewarsStatGauge from "./Gauge";
import useChallengeCountsByPeriod from "./Gauge/hooks/useChallengeCountsByPeriod";
import DailyTarget from "./DailyTarget";

const DashboardStats = () => {
  const {
    isListEmpty,
    inLast24Hours,
    inLast7Days,
    inLast30Days,
    inLast365Days,
  } = useChallengeCountsByPeriod();

  // if(isListEmpty) return 'Oh'
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={24}>
        {[inLast24Hours, inLast7Days, inLast30Days, inLast365Days].map(
          (inLastDaysAgo, index) => (
            <Grid size={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }} key={index}>
              <CodewarsStatGauge completedChallenges={inLastDaysAgo} />
            </Grid>
          )
        )}
      </Grid>
      <DailyTarget />
    </Box>
  );
};

export default DashboardStats;
