"use client";

import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import Box from "@mui/system/Box";
import PercentVsLastWeek from "./PercentVsLastWeek";
import DiamondsPieChart from "./DiamondsPieChart";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import { CodewarsRanks } from "@/types/diamonds";
import TotalDiamondsCount from "./TotalValue";

interface Props {
  email: string;
  label: string;
  sx?: SxProps;
}

export default function DiamondsCard({ sx, email, label }: Props) {
  const { data, isLoading } = useCurrentUserQuery(email);

  if (isLoading) return null;
  // console.log(data?.diamonds.totals.codewars.ranks)
  const ranks = Object.values(
    (data?.diamonds.totals.codewars.ranks as CodewarsRanks) ?? {}
  );

  return (
    <Box
      sx={{
        p: 2,
        minWidth: 300,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        ...sx,
      }}
    >
      <Box>
        <Typography sx={{ color: "text.secondary" }}>{label}</Typography>

        <TotalDiamondsCount
          totalCodewarsDiamonds={data?.diamonds.totals.codewars.total ?? 0}
        />

        <PercentVsLastWeek
          codewarsDiamondsRecord={data?.diamonds.codewars ?? []}
        />
      </Box>
      <DiamondsPieChart sx={{ marginRight: 0.5 }} ranks={ranks} />
    </Box>
  );
}
