"use client";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import { Box } from "@mui/system";
import React from "react";
import { formatNumberK } from "../utils/formatNumberK";

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
      {formatNumberK(totalDiamonds)}
    </Box>
  );
};

export default TotalDiamondsCount;
