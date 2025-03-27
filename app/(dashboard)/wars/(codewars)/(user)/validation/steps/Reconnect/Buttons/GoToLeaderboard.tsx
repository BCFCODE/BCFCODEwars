"use client";

import { Button } from "@mui/material";
import Link from "next/link";

const GoToLeaderboard = () => {
  return (
    <Link href="/leaderboard">
      <Button
        variant="outlined"
        color="primary"
        size="large"
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
          boxShadow: 3,
        }}
      >
        Go to Leaderboard
      </Button>
    </Link>
  );
};

export default GoToLeaderboard;
