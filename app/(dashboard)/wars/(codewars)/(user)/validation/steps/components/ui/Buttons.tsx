"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  left: ReactNode;
  right: ReactNode;
}

const Buttons = ({ left, right }: Props) => {
  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "row", pt: 2 }}>
      {left}
      <Box sx={{ flex: "1 1 auto" }} />
      {right}
    </Box>
  );
};

export default Buttons;
