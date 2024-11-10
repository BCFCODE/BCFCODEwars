import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { auth } from "@/auth";

const BCFCODEwarsMainPage = async () => {
  const session = await auth();

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: "primary.secondary", fontWeight: "bold", mb: 1 }}
      >
        Hello {session?.user?.name}!
      </Typography>
      <Typography variant="h5" sx={{ color: "text.secondary", mb: 3 }}>
        Welcome to the BCFCODEwars Main Page 🎉
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", maxWidth: 600, mb: 3 }}
      >
        This page is currently under construction, so stay tuned for updates!
      </Typography>
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default BCFCODEwarsMainPage;
