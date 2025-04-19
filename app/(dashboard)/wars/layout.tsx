import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const WarsPageLayout = ({ children }: Props) => {
  return <Box>{children}</Box>;
};

export default WarsPageLayout;
