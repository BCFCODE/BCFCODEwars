"use client";

import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import { CodeChallengesFilter } from "@/types/diamonds";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import UserInfoCard from "../../UserInfoCard";
import Buttons from "../../ui/Buttons";
import useConnectMutation from "./hooks/useConnectMutation";
import useReconnectMutation from "./hooks/useReconnectMutation";
import { CodewarsUser } from "@/types/codewars";
import Link from "next/link";
import { StepProps } from "../stepSwitch";

const Step3 = ({
  currentStep,
  validatedUsername,
  session,
  codewars,
}: StepProps) => {
  const router = useRouter();

  const email = session?.user?.email ?? "";
  const { data: currentUser } = useCurrentUserQuery(email);

  const { mutateAsync: reconnect, isSuccess: successfullyReconnected } =
    useReconnectMutation();
  const { mutateAsync: connect, isSuccess: successfullyConnected } =
    useConnectMutation();

  // const email = currentUser?.email ?? "";

  const handleOnYes = async () => {
    if (!currentUser) return;

    if (currentUser?.codewars.isConnected) {
      await reconnect({
        name: codewars.name ?? "",
        username: validatedUsername,
        email,
        clan: codewars.clan ?? "",
      });
    } else {
      const initializedCodewarsUser: CodewarsUser = {
        ...codewars,
        email,
        isConnected: true,
        codeChallenges: {
          ...codewars.codeChallenges,
          totalItems: codewars.codeChallenges.totalCompleted,
          totalPages: 0,
          challengeFilter: CodeChallengesFilter.Both,
          list: [],
        },
        username: validatedUsername,
      };

      await connect(initializedCodewarsUser);
    }

    if (successfullyConnected) router.replace(`${currentStep + 1}`);
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

      <Buttons
        left={
          <Button
            component={Link}
            href={`/wars/validation/steps/${Number(currentStep) - 1}`}
            color="inherit"
            disabled={Number(currentStep) === 3}
            sx={{ mr: 1 }}
          >
            No
          </Button>
        }
        right={<Button onClick={handleOnYes}>Yes, it is me</Button>}
      />
    </>
  );
};

export default Step3;
