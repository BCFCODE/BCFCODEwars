"use client";

import usePaginationQuery from "@/app/(dashboard)/leaderboard/UsersTable/Pagination/usePaginationQuery";
import { Box, SxProps } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";

interface Props extends PropsWithChildren {
  SX?: SxProps;
}

const Container = ({ children, SX }: Props) => {
  const { isLoading } = usePaginationQuery();

  return <Box sx={SX}>{!isLoading && children}</Box>;
};

export default Container;
