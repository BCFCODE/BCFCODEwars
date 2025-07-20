import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const WarningMessage = ({ children }: Props) => (
  <Typography
    component="span"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: "warning.main",
      fontWeight: 600,
      fontSize: "1rem",
      textAlign: "center",
      lineHeight: 1.6,
    }}
  >
    <Box
      component="span"
      sx={{
        mr: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // flexDirection: "column",
        fontSize: "2.2rem",
      }}
    >
      ⚠️
    </Box>
    {children}
  </Typography>
);

export default WarningMessage;
