import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: 2,
      }}
    >
      <CircularProgress sx={{ marginBottom: 2 }} />
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          // color: "#333",
          marginBottom: 1,
        }}
      >
        🚀 Almost There...
      </Typography>
      <Typography
        variant="body1"
        sx={{
          // color: "#555",
          maxWidth: 600,
        }}
      >
        We’re verifying your Codewars connection. Hang tight — we’re checking
        your status and will have you ready in no time.
      </Typography>
    </Box>
  );
};

export default Loading;
