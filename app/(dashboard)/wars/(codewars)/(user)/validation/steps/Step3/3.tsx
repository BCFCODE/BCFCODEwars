"use client";

import { Box, Paper, Typography } from "@mui/material";
import { StepProps } from "../stepSwitch";
import handleAddUserToDB from "./connectUser";
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
    handleAddUserToDB({ currentStep, validatedUsername, session, codewars });
    router.replace(`${currentStep + 1}`);
  };

  const overallRank = Math.abs(Number(codewars?.ranks.overall.rank)).toString();

  const userInfoCardProps = { codewars, validatedUsername };

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
          information. If it’s not correct, go back and double-check to ensure
          the username is accurate!
        </Typography>

        {/* User Info */}
        <UserInfoCard {...userInfoCardProps} />
      </Box>

      <Box sx={{ display: "flex", width: "100%", flexDirection: "row", pt: 2 }}>
        <Buttons onYes={handleOnYes} currentStep={Number(currentStep)} />
      </Box>
    </>
  );
};

export default Step3;
