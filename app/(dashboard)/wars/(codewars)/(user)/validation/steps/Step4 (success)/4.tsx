"use client";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { StepProps } from "../stepSwitch";

const Step4 = ({ session }: StepProps) => {
  const router = useRouter();
  const userName = session?.user?.name.split(" ")[0] || "User";

  const handleNavigateToWars = () => {
    router.replace("/leaderboard");
  };

  return (
    <Box
      sx={{
        // backgroundColor: 'red',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 3,
        px: 3,
        // pt: 5,
      }}
    >
      {/* Main Content */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: "600px",
          textAlign: "left",
          backgroundColor: "background.default",
          borderRadius: 3,
          boxShadow: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "text.primary",
              textAlign: "center",
            }}
          >
            🎉 Great job, {userName}!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              color: "text.secondary",
            }}
          >
            Your Codewars activity has been analyzed, and you’re now ranked on
            the BCFCODE leaderboard. Check out your position, explore your
            stats, and dive into your performance. Ready to climb higher and
            tackle new challenges? Click the button below to visit the
            leaderboard and keep the momentum going!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: "text.secondary",
            }}
          >
            Ready to see where you stand and take on new challenges? Tap the
            button below to head to the leaderboard and kickstart your journey!
          </Typography>
        </Box>
        {/* Navigation Button */}
        <Button
          variant="text"
          color="primary"
          size="large"
          sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            textTransform: "none",
            // fontWeight: 600,
            // fontSize: "1rem",
            boxShadow: 3,
            // borderRadius: 3,
          }}
          onClick={handleNavigateToWars}
        >
          Go to Leaderboard
        </Button>
      </Paper>
    </Box>
  );
};

export default Step4;
