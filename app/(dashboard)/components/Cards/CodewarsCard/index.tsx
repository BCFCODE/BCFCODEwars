"use client";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import GaugeProvider from "@/app/context/providers/GaugeProvider";
import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Box from "@mui/system/Box";

import SolvedCount from "./SolvedCount";
import BottomInfo from "./BottomInfo";
import CodewarsPieChart from "./CodewarsPieChart";

interface Props {
  email: string;
  label: string;
  sx?: SxProps;
}

export default function CodewarsCard({ sx, email, label }: Props) {
  const { data, isLoading } = useCurrentUserQuery(email);

  if (isLoading) return null;

  return (
    <GaugeProvider context={{ email }}>
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
          justifyContent: "space-between",
          ...sx,
        }}
      >
        <Box>
          <Typography sx={{ color: "text.secondary" }}>{label}</Typography>

          <SolvedCount
            position={data?.codewars.codeChallenges.totalCompleted ?? 0}
          />

          <BottomInfo
            leaderboardPosition={data?.codewars.leaderboardPosition ?? 0}
          />
        </Box>
        <CodewarsPieChart
          sx={{ marginRight: 0.5 }}
          ranks={[20, 20, 20, 20, 20]}
        />
      </Box>
    </GaugeProvider>
  );
}
