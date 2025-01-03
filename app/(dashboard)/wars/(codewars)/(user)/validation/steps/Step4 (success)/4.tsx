"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { StepProps } from "../stepSwitch";
import UserAvatar from "../UserAvatar";

const Step4 = ({ session }: StepProps) => {
  const router = useRouter();
  const userName = session?.user?.name.split(" ")[0] || "User";

  const handleNavigateToWars = () => {
    router.replace("/wars");
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
        pt: 5,
      }}
    >
      {/* Main Content */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: "600px",
          textAlign: "center",
          backgroundColor: "background.default",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: "text.primary",
          }}
        >
          🎉 Congratulations, {userName}!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            color: "text.secondary",
          }}
        >
          You&apos;ve successfully connected your Codewars account to our
          database and are ready to go! We&apos;ll guide you through the Wars
          page where you can check your leaderboard, view completed challenges,
          and explore so much more.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 2,
            color: "text.secondary",
          }}
        >
          We&apos;re working on exciting new features to provide more useful
          stats, keep you motivated, and help you achieve mastery in coding.
          Stay tuned for the amazing journey ahead!
        </Typography>
      </Paper>

      {/* Navigation Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          mt: 3,
          px: 4,
          py: 1.5,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
          boxShadow: 3,
          borderRadius: 3,
        }}
        onClick={handleNavigateToWars}
      >
        Go to Wars Page
      </Button>
    </Box>
  );
};

export default Step4;
