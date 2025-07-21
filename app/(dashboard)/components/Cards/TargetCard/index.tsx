"use client";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import GaugeProvider from "@/app/context/providers/GaugeProvider";
import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Box from "@mui/system/Box";
import BottomInfo from "./BottomInfo";
import DailyTarget from "./DailyTarget";
import TargetInEachDay from "./TargetInEachDay";
import generateResponsiveSX from "@/app/lib/ui/gauges/generateResponsiveSX";
import {
  gaugeFooterTextSXBreakpoints,
  gaugeInnerTextSXBreakpoints,
} from "@/app/(dashboard)/leaderboard/UsersTable/UserRow";

interface Props {
  email: string;
  label: string;
  sx?: SxProps;
}

export default function TargetCard({ sx, email, label }: Props) {
  const { isLoading } = useCurrentUserQuery(email);

  if (isLoading) return null;

  return (
    <GaugeProvider
      context={{
        email,
        gaugeStyles: {
          columnsPerBreakpoint: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4 },
          gaugeInnerTextSX: {
            transform: "translate(0px, 0px)",
            transition: "font-size 1s ease",
            ...generateResponsiveSX(gaugeInnerTextSXBreakpoints),
          },
          gaugeFooterTextSX: {
            textAlign: "center",
            transition: "font-size 1s ease, margin 1s ease",
            ...generateResponsiveSX(gaugeFooterTextSXBreakpoints),
          },
        },
      }}
    >
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
        <Box>
          <Typography sx={{ color: "text.secondary" }}>{label}</Typography>

          <TargetInEachDay />

          <BottomInfo />
        </Box>
        <DailyTarget />
      </Box>
    </GaugeProvider>
  );
}
