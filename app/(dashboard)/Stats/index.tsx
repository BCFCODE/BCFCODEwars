"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import DailyStat from "./Gauge/Stats/Daily";
import MonthlyStat from "./Gauge/Stats/Monthly";
import WeeklyStat from "./Gauge/Stats/Weekly";
import YearlyStat from "./Gauge/Stats/Yearly";

const stats = [DailyStat, WeeklyStat, MonthlyStat, YearlyStat];

const DashboardStats = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={24}>
        {stats.map((Stat, index) => (
          <Grid size={{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }} key={index}>
            <Stat />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardStats;
