import { Typography, Box, Paper } from "@mui/material";
import React from "react";

const Step3 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
        px: 3, // Padding for responsiveness
        py: 4,
      }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          letterSpacing: 1.2,
        }}
      >
        Is this you?
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          lineHeight: 1.6,
          maxWidth: "600px",
        }}
      >
        Confirm to update your username on the leaderboard based on this
        information. If it’s not correct, go back and double-check to ensure the
        username is accurate!
      </Typography>

      {/* User Info */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 2,
          maxWidth: "400px",
          borderRadius: 2,
          backgroundColor: "background.paper",
          textAlign: "left",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            mb: 1,
          }}
        >
          <strong>User Name:</strong> BCFCODE
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            mb: 1,
          }}
        >
          <strong>Name:</strong> Morteza Bakhshendeh
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            mb: 1,
          }}
        >
          <strong>Clan:</strong> BCFCODEwars
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
          }}
        >
          <strong>Leaderboard Position:</strong> 2356
        </Typography>
      </Paper>
    </Box>
  );
};

export default Step3;
