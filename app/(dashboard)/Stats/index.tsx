"use client";

import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import DailyStat from "./Gauge/Daily";
import MonthlyStat from "./Gauge/Monthly";
import YearlyStat from "./Gauge/YearlyStat";

const DashboardStats = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={24}>
        <Grid size={8}>
          <DailyStat />
        </Grid>

        <Grid size={8}>
          <MonthlyStat />
        </Grid>

        <Grid size={8}>
          <YearlyStat />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardStats;
