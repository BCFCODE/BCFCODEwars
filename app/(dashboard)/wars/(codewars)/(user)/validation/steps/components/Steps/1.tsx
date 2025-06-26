// app/(dashboard)/wars/(codewars)/(user)/validation/steps/Step1

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import UserAvatar from "../UserAvatar";
import Buttons from "../ui/Buttons";
import Link from "next/link";
import { StepProps } from "./stepSwitch";

const Step1 = async ({ session, currentStep }: StepProps) => {
  let firstName;
  session && (firstName = (session?.user?.name ?? "").split(" ")[0]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
          px: 2,
          pt: 5,
        }}
      >
        {/* User Avatar */}
        <UserAvatar session={session} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "80%",
            // minHeight: "100%", // Full height of the screen
            bgcolor: "background.default", // Neutral background color
            // color: "text.primary", // Primary text color for readability
            p: { xs: 3, sm: 3 }, // Responsive padding (smaller on mobile)
            boxShadow: 3, // Subtle shadow for depth
            borderRadius: 2, // Rounded corners for a modern feel
          }}
        >
          {/* Header Message */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              color: "text.secondary",
              fontSize: { xs: "1.1rem", sm: "1.35rem" },
            }}
          >
            Welcome, {session?.user?.name || "User"}!
          </Typography>

          {/* Welcome Message */}
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              // maxWidth: "80%",
              textAlign: "center",
            }}
          >
            An exciting journey awaits! By connecting to Codewars here, you’ll
            unlock exclusive insights, stats, and our leaderboard. Let’s make
            this adventure yours, {firstName}—click Next to get started!
          </Typography>
        </Box>

        {/* Loading Indicator */}
        {!session && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            <CircularProgress color="primary" size={50} />
          </Box>
        )}
      </Box>
      <Buttons
        left={
          <Button
            component={Link}
            href={`/wars`}
            color="inherit"
            sx={{ mr: 1 }}
          >
            Back
          </Button>
        }
        right={
          <Button
            component={Link}
            href={`/wars/validation/steps/${Number(currentStep) + 1}`}
          >
            Next
          </Button>
        }
      />
    </>
  );
};

export default Step1;
