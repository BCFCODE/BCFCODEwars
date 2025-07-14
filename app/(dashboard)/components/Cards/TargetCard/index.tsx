"use client";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import GaugeProvider from "@/app/context/providers/GaugeProvider";
import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Box from "@mui/system/Box";
import BottomInfo from "./BottomInfo";
import DailyTarget from "./DailyTarget";
import TargetInEachDay from "./TargetInEachDay";

interface Props {
  email: string;
  label: string;
  sx?: SxProps;
}

export default function TargetCard({ sx, email, label }: Props) {
  const { isLoading } = useCurrentUserQuery(email);

  if (isLoading) return null;

  return (
    <Box
      sx={{
        p: 2,
        minWidth: 300,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
        borderRadius: 2,
        position: "relative",
        display: "flex",
        ...sx,
      }}
    >
      <GaugeProvider context={{ email }}>
        <Box>
          <Typography sx={{ color: "text.secondary" }}>{label}</Typography>

          <TargetInEachDay />

          <BottomInfo />
        </Box>
        <DailyTarget />
      </GaugeProvider>
    </Box>
  );
}
