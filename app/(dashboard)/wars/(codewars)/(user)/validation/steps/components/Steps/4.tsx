"use client";

import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { StepProps } from "./stepSwitch";
import LoadingPulseButton from "../ui/LoadingPulseButton";
import { useState } from "react";

const Step4 = ({ session }: StepProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const userName = (session?.user?.name ?? "").split(" ")[0] || "User";

  const handleGoToLeaderboard = async () => {
    setIsLoading(true);
    await queryClient.invalidateQueries({
      queryKey: [usersQueryKeys.usersList],
    });
    await queryClient.refetchQueries({
      queryKey: [usersQueryKeys.usersList],
    });
    router.replace("/leaderboard");
  };

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

        <LoadingPulseButton
          loading={isLoading}
          onClick={handleGoToLeaderboard}
          label="Show Me the Leaderboard"
          ariaLabel="Go to the Leaderboard and see my updated stats"
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
          <Typography
            variant="button" // same as button text style
            sx={{
              whiteSpace: "nowrap", // ❗prevent wrapping
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Syncing and Redirecting...
          </Typography>
        </LoadingPulseButton>
      </Paper>
    </Box>
  );
};

export default Step4;
