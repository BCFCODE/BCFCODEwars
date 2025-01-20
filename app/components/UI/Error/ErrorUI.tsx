import ErrorIcon from "@mui/icons-material/Error";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ErrorUI = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 3,
        textAlign: "center",
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 2,
      }}
    >
      <ErrorIcon color="error" sx={{ fontSize: 48 }} />
      {children}
    </Box>
  );
};

export default ErrorUI;
