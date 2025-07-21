"use client";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";

import { Tooltip, Typography } from "@mui/material";
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

  if (isLoading) return null;

  const challenges = data?.codewars.codeChallenges.list ?? [];

  const { ranks, lastTwoDaysSolvedProblems } = useMemo(
    () => ({
      ranks: Array.from({ length: 8 }, (_, k) => -1 - k).map(
        (rank) =>
          challenges.filter(
            (challenge) => challenge.moreDetails?.rank.id === rank
          ).length
      ),
      lastTwoDaysSolvedProblems: challenges.filter((challenge) =>
        completedAfterThreshold(challenge.completedAt, 2)
      ) as CodewarsCompletedChallenge[],
    }),
    [challenges.length]
  );

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
        <Tooltip title="Heads up! This pie chart only reflects your collected diamond challenges. Keep collecting diamonds to see your progress shine here!">
          <Box component="span">
            <CodewarsPieChart
              sx={{ marginRight: 0.5 }}
              ranks={ranks}
              username={data?.codewars.username}
            />
          </Box>
        </Tooltip>
      </Box>
    </EmailProvider>
  );
}
