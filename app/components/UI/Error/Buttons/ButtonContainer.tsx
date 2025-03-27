import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorButtonContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default ErrorButtonContainer;
