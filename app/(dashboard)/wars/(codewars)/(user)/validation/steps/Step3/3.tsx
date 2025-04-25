"use client";

import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import { CodeChallengesFilter } from "@/types/diamonds";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { StepProps } from "../stepSwitch";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import Buttons from "./Buttons";
// import connect from "./connect";
// import reconnect from "./reconnect";
import dbAPIService from "@/app/api/services/db";

const { connectToCodewars, reconnectToCodewars } = new dbAPIService();

const Step3 = ({
  currentStep,
  validatedUsername,
  session,
  codewars,
}: StepProps) => {
  const router = useRouter();

  const { data: currentUser } = useCurrentUserQuery();
  // console.log("Step3/data useUsersQuery", codewars, currentUser);

  const handleOnYes = async () => {
    // console.log("Yes it is me, clicked!", codewars, currentUser?.codewars);
    if (currentUser?.codewars.isConnected) {
      console.log(
        "codewars is connected so reconnect",
        codewars,
        currentUser.codewars
      );
      // reconnect({
      //   name: codewars.name ?? "",
      //   username: validatedUsername,
      //   email: session?.user?.email ?? "",
      //   clan: codewars.clan ?? "",
      // });
      reconnectToCodewars({
        name: codewars.name ?? "",
        username: validatedUsername,
        email: session?.user?.email ?? "",
        clan: codewars.clan ?? "",
      });
    } else if (currentUser) {
      const initializedCodewarsUser = {
        ...codewars,
        isConnected: true,
        codeChallenges: {
          ...codewars.codeChallenges,
          challengeFilter: CodeChallengesFilter.ClaimedDiamonds,
          list: [],
        },
        username: validatedUsername,
      };
      console.log(
        "codewars is not connected so connect",
        codewars,
        currentUser.codewars,
        "initializedCodewarsUser",
        initializedCodewarsUser
      );
      const email = currentUser?.email ?? "";
      // console.log("initializedCodewarsUser", initializedCodewarsUser);
      // connect({
      //   email: currentUser?.email ?? "",
      //   initializedCodewarsUser,
      // });
      connectToCodewars({ email, initializedCodewarsUser });
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
