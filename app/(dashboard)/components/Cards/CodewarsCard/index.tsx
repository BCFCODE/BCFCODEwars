"use client";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";

import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Box from "@mui/system/Box";

import { CodewarsCompletedChallenge } from "@/types/codewars";
import { completedAfterThreshold } from "@/utils/dayjs";
import { useMemo } from "react";
import CodewarsPieChart from "./CodewarsPieChart";
import BottomInfo from "./PercentVsLastDay";
import SolvedCount from "./SolvedCount";
import EmailProvider from "@/app/context/providers/EmailProvider";

interface Props {
  email: string;
  label: string;
  sx?: SxProps;
}

export default function CodewarsCard({ sx, email, label }: Props) {
  const { data, isLoading } = useCurrentUserQuery(email);

  const challenges = data?.codewars.codeChallenges.list ?? [];

  const lastTwoDaysSolvedProblems = useMemo(() => {
    return challenges.filter((challenge) =>
      completedAfterThreshold(challenge.completedAt, 2)
    ) as CodewarsCompletedChallenge[];
  }, [challenges]);

  if (isLoading) return null;

  return (
    <EmailProvider context={{ email }}>
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
            totalCompleted={data?.codewars.codeChallenges.totalCompleted ?? 0}
          />

          <BottomInfo lastTwoDaysSolvedProblems={lastTwoDaysSolvedProblems} />
        </Box>
        <CodewarsPieChart
          sx={{ marginRight: 0.5 }}
          ranks={[20, 20, 20, 20, 20, 20]}
          username={data?.codewars.username}
        />
      </Box>
    </EmailProvider>
  );
}
