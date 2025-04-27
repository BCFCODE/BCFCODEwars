"use client";

import dbAPIService from "@/app/api/services/db";
import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { CodeChallengesFilter } from "@/types/diamonds";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { StepProps } from "../stepSwitch";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import Buttons from "./Buttons";
import useConnectMutation from "./hooks/useConnectMutation";
import useReconnectMutation from "./hooks/useReconnectMutation";

const Step3 = ({
  currentStep,
  validatedUsername,
  session,
  codewars,
}: StepProps) => {
  const router = useRouter();

  const { data: currentUser } = useCurrentUserQuery();

  const { mutateAsync: reconnect } = useReconnectMutation();
  const { mutateAsync: connect } = useConnectMutation();

  const email = currentUser?.email ?? "";

  const handleOnYes = async () => {
    if (!currentUser) return;
    // console.log("Yes it is me, clicked!", codewars, currentUser?.codewars);
    if (currentUser?.codewars.isConnected) {
      await reconnect({
        name: codewars.name ?? "",
        username: validatedUsername,
        email,
        clan: codewars.clan ?? "",
      });
    } else {
      const initializedCodewarsUser = {
        ...codewars,
        email,
        isConnected: true,
        codeChallenges: {
          ...codewars.codeChallenges,
          challengeFilter: CodeChallengesFilter.ClaimedDiamonds,
          list: [],
        },
        username: validatedUsername,
      };

      await connect(initializedCodewarsUser);
    }

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
            isUsernameSynced: true,
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
