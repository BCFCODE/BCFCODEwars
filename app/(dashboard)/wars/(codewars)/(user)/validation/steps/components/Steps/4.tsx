"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { StepProps } from "./stepSwitch";

const Step4 = ({ session }: StepProps) => {
  const userName = (session?.user?.name ?? "").split(" ")[0] || "User";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 3,
        px: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 4 },
          maxWidth: 600,
          width: "100%",
          borderRadius: 4,
          boxShadow: 6,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "text.primary",
            textAlign: "center",
          }}
        >
          🎉 Nice work, {userName}!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            color: "text.secondary",
            lineHeight: 1.7,
            mb: 3,
          }}
        >
          You&apos;re now connected to your Codewars account!
          <br />
          Head to the <strong>Leaderboard</strong> — you’ll see a small arrow
          next to your avatar on the left. Click it to reveal your solved
          challenges.
          <br />
          To activate your dashboard stats, click on your collected diamonds. 💎
          <br />
          All your stats are powered by those shiny diamonds!
        </Typography>

        <Button
          component={Link}
          href="/leaderboard"
          replace
          variant="text"
          size="large"
          color="primary"
          sx={{
            px: 5,
            py: 1.5,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 1,
            boxShadow: 3,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          Go to Leaderboard
        </Button>
      </Paper>
    </Box>
  );
};

export default Step4;
