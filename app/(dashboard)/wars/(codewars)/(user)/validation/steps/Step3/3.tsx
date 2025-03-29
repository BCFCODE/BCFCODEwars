"use client";

import { Box, Link, Paper, Typography } from "@mui/material";
import { StepProps } from "../stepSwitch";
import initializeAndStoreNewUserToDatabase from "./connectUser";
import Buttons from "./Buttons";
import { useRouter } from "next/navigation";
import UserInfoCard from "../UserInfoCard/UserInfoCard";

const Step3 = ({
  currentStep,
  validatedUsername,
  session,
  codewars,
}: StepProps) => {
  const router = useRouter();

  const handleOnYes = () => {
    initializeAndStoreNewUserToDatabase({
      currentStep,
      validatedUsername,
      session,
      codewars,
    });
    router.replace(`${currentStep + 1}`);
  };

  return (
    <>
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

        {/* User Info */}
        <UserInfoCard
          {...{
            isDbUsernameSyncedWithCodewars: true,
            session,
            codewars,
            validatedUsername,
            /*  
              This flag is temporarily set to 'true' to ensure that the user info card is displayed for validation purposes. 
              It allows us to show the user’s Codewars information while confirming if the username is accurate. 
              Once the validation process is complete, this can be updated or removed based on the application's flow. 
            */
          }}
        />

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
            maxWidth: "600px",
            textAlign: "revert-layer",
          }}
        >
          Confirm these details for your username update on the leaderboard. If
          they&apos;re incorrect, go back and check!
        </Typography>
      </Box>

      <Box sx={{ display: "flex", width: "100%", flexDirection: "row", pt: 2 }}>
        <Buttons onYes={handleOnYes} currentStep={Number(currentStep)} />
      </Box>
    </>
  );
};

export default Step3;
