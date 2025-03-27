"use client";

import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import WeeklyStat from "./Gauge/Weekly";
import MonthlyStat from "./Gauge/Monthly";
import YearlyStat from "./Gauge/YearlyStat";
import DailyStat from "./Gauge/Daily";

const DashboardStats = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={24}>
        <Grid size={6}>
          <DailyStat />
        </Grid>

        <Grid size={6}>
          <WeeklyStat />
        </Grid>

        <Grid size={6}>
          <MonthlyStat />
        </Grid>

        <Grid size={6}>
          <YearlyStat />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardStats;
