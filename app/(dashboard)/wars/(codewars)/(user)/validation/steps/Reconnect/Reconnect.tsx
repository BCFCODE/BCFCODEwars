"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { StepProps } from "../stepSwitch";
import UserInfoCard from "../UserInfoCard/UserInfoCard";

const Reconnect = ({
  session,
  codewars,
  validatedUsername,
}: Omit<StepProps, "currentStep">) => {
  const router = useRouter();
  const userName = session?.user?.name.split(" ")[0] || "User";

  const handleReconnect = () => {
    router.replace("/wars/validation/steps/1"); // Navigate to the first step to reconnect
  };

  const userInfoCardProps = { codewars, validatedUsername };

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
            Welcome Back, {userName}!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              color: "text.secondary",
            }}
          >
            It seems you were previously connected as this user. If this isn’t
            you, don’t worry—you can reconnect and validate your username
            correctly. Please ensure your information is accurate to help us
            maintain a reliable database.
          </Typography>

        

          {/* User Info */}
          <UserInfoCard {...userInfoCardProps} />

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: "text.secondary",
            }}
          >
            Ready to confirm your details or reconnect?
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
              // borderRadius: 2,
            }}
            onClick={handleReconnect}
          >
            Reconnect
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Reconnect;
