"use client";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  email: string;
}

const TotalDiamondsCount = ({ email }: Props) => {
  const { data } = useCurrentUserQuery(email ?? "");

  const totalDiamonds = data?.diamonds.totals.codewars.total ?? 0;

  return (
    <Box
      sx={{
        color: "text.primary",
        fontSize: "2.125rem",
        fontWeight: "medium",
      }}
    >
      {totalDiamonds > 0
        ? `${(totalDiamonds / 1000).toFixed(2)} K`
        : totalDiamonds}
    </Box>
  );
};

export default TotalDiamondsCount;
