"use client";

import { Box, Button, Link, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { StepProps } from "../stepSwitch";
import UserInfoCard from "../UserInfoCard/UserInfoCard";

const Reconnect = ({
  session,
  codewars,
  validatedUsername,
  isDbUsernameSyncedWithCodewars,
}: Omit<StepProps, "currentStep">) => {
  const router = useRouter();
  const userName = session?.user?.name.split(" ")[0] || "User";

  const handleReconnect = () => {
    router.replace("/wars/validation/steps/1"); // Navigate to the first step to reconnect
  };

  const userInfoCardProps = {
    session,
    codewars,
    validatedUsername,
    isDbUsernameSyncedWithCodewars,
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
          px: 3,
          pt: 5,
          mt: -5
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
          {!isDbUsernameSyncedWithCodewars ? (
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                textAlign: "left",
                lineHeight: 1.6,
                mt: 2,
              }}
            >
              No worries—you can easily reconnect and revalidate your new
              username. This helps us keep your data accurate and up to date.
            </Typography>
          ) : (
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: "text.secondary",
                textAlign: "left",
              }}
            >
              It looks like you're already connected as {userName}. If that's
              not right, you can reconnect and update your username for a
              smoother experience!
            </Typography>
          )}

          {/* User Info */}
          <UserInfoCard {...userInfoCardProps} />

          {/* Tip Section */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Tip: Want to update your clan, name, or username? Simply click{" "}
            <Link
              href="https://www.codewars.com/users/edit"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 500 }}
            >
              here
            </Link>{" "}
            to make the change. After updating, come back here to reconnect your
            account and stay in sync.
          </Typography>

          {/* Reconnect Button */}
          <Button
            variant="contained"
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
            onClick={handleReconnect}
          >
            Reconnect Now
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Reconnect;
