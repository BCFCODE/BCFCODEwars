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
import LoadingPulseButton from "../../ui/LoadingPulseButton";
import { useState } from "react";
import { UserRole } from "@/types/users";

const Step3 = ({
  currentStep,
  validatedUsername,
  session,
  codewars,
}: StepProps) => {
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const email = session?.user?.email ?? "";
  const { data: currentUser } = useCurrentUserQuery(email);

  const {
    mutateAsync: reconnect,
    isPending: reconnectIsPending,
    isError: isReconnectError,
  } = useReconnectMutation();
  const {
    mutateAsync: connect,
    isPending: connectIsPending,
    isError: isConnectError,
  } = useConnectMutation();

  const buildInitializedCodewarsUser = (): CodewarsUser => ({
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
    role: UserRole.User,
  });

  // const email = currentUser?.email ?? "";

  const handleOnYes = async () => {
    if (!currentUser) return;

    try {
      if (currentUser.codewars.isConnected) {
        await reconnect({
          name: codewars.name ?? "",
          username: validatedUsername,
          email,
          clan: codewars.clan ?? "",
        });
      } else {
        await connect(buildInitializedCodewarsUser());
      }

      router.replace(`${currentStep + 1}`);
    } catch (error) {
      setIsError(true);
      console.error("Failed to connect or reconnect:", error);
    }
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
          codewarsUsername={codewars.name ?? "N/A"}
          codewarsHonor={codewars.honor ?? 0}
          validatedUsername={validatedUsername ?? "User"}
          codewarsLeaderboardPosition={codewars.leaderboardPosition ?? 0}
          codewarsClan={codewars.clan ?? "N/A"}
          isUsernameSynced={true}
          /*  
              This flag is temporarily set to 'true' to ensure that the user info card is displayed for validation purposes. 
              It allows us to show the user’s Codewars information while confirming if the username is accurate. 
              Once the validation process is complete, this can be updated or removed based on the application's flow. 
            */
          overallRank={Math.abs(Number(codewars?.ranks?.overall.rank))}
        />

        {/* Description */}
        {isError || isConnectError || isReconnectError ? (
          <Typography
            variant="body1"
            sx={{
              color: "error.main", // ✅ Use MUI error color
              lineHeight: 1.6,
              maxWidth: "600px",
              textAlign: "revert-layer",
              fontWeight: 500,
            }}
          >
            Something went wrong while trying to connect your account to
            Codewars. This could be a temporary network issue or a problem with
            the Codewars service. Please try again by clicking{" "}
            <strong>Retry</strong>. If the issue continues, contact support.
          </Typography>
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
              maxWidth: "600px",
              textAlign: "revert-layer",
            }}
          >
            Confirm these details for your username update on the leaderboard.
            If they&apos;re incorrect, go back and check!
          </Typography>
        )}
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
        right={
          <LoadingPulseButton
            variant="text"
            ariaLabel="Confirm identity and connect to Codewars account"
            label={
              isError || isConnectError || isReconnectError
                ? "Retry"
                : "Yes, it is me"
            }
            onClick={handleOnYes}
            loading={connectIsPending || reconnectIsPending}
            sx={{ width: "auto" }}
          >
            <Typography
              variant="button" // same as button text style
              sx={{
                whiteSpace: "nowrap", // ❗prevent wrapping
                overflow: "hidden", // just in case
                textOverflow: "ellipsis", // truncate if too long
              }}
            >
              Connecting...
            </Typography>
          </LoadingPulseButton>
          // <Button onClick={handleOnYes}>Yes, it is me</Button>
        }
      />
    </>
  );
};

export default Step3;
