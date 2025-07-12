import * as React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Box from "@mui/system/Box";
import { SxProps } from "@mui/system";
import DiamondsPieChart from "./DiamondsPieChart";
import { Typography } from "@mui/material"

interface Props {
  label: string;
  sx: SxProps;
}

export default function DashboardCard({ sx, label }: Props) {
  return (
    <Box sx={{ ...sx, display: "flex" }}>
      <Box>
        <Typography sx={{ color: "text.secondary" }}>{label}</Typography>
        <Box
          sx={{
            color: "text.primary",
            fontSize: "2.125rem",
            fontWeight: "medium",
          }}
        >
          98.3 K
        </Box>
        
        <Box
          component={TrendingUpIcon}
          sx={{ color: "success.dark", fontSize: "1rem", verticalAlign: "sub" }}
        />
        <Box
          sx={{
            display: "inline",
            fontSize: "0.875rem",
            fontWeight: "bold",
            color: "success.dark",
            mx: 0.5,
          }}
        >
          18.7%
        </Box>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            fontSize: "0.875rem",
          }}
        >
          vs. last week
        </Box>
      </Box>
      <DiamondsPieChart />
    </Box>
  );
}
