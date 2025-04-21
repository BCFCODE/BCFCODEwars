"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { StepProps } from "../stepSwitch";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import Buttons from "./Buttons";
import initializeAndStoreNewUserToDatabase from "./connectUser";
import { useUsersStore } from "@/app/store/users";
import useAllUsersDispatchContext from "@/app/context/hooks/db/useAllUsersDispatchContext";
import dbAPIService from "@/app/api/services/db";
import useUsersQuery from "@/app/context/hooks/ReactQuery/useUsersQuery";
// import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";

// const { getUsers } = new dbAPIService();

const Step3 = ({
  currentStep,
  validatedUsername,
  session,
  codewars,
}: StepProps) => {
  const { data: allUsers } = useUsersQuery();
  const { currentUser } = useUsersStore((state) => state);
  console.log(
    "Step3/currentUser and allUsers from useUsersQuery",
    currentUser,
    allUsers
  );
  const router = useRouter();
  const dispatchAllUsers = useAllUsersDispatchContext();
  const handleOnYes = async () => {
    // const { users, success } = await getUsers({ cache: "no-store" });
    // console.log("fetchedUsers", users, users?.find((user) => user.email === codewars.email));
    initializeAndStoreNewUserToDatabase({
      currentStep,
      validatedUsername,
      session,
      codewars,
    });
    // if (users)
    //   dispatchAllUsers({
    //     type: "SET_ALL_USERS",
    //     payload: users.find((user) => user.email === codewars.email),
    //   });
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
