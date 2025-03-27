import LeaderBoardPage from "@/app/(dashboard)/leaderboard/page";
import { Box } from "@mui/material";
import { SignInPage, SignInPageSlots } from "@toolpad/core/SignInPage";
import { Metadata } from "next/types";
import { auth, providerMap } from "../../../auth";
import { handleSignIn } from "./signInHandler";
import {
  leaderboardStyles,
  signInPageContainerStyles,
  // signInSlotProps,
  signInText,
} from "./styles";
import { useReducer } from "react";

import APIdbService from "@/app/api/services/db-service";
import { CurrentUser } from "@/types/users";
// import SubmitButton from "./SubmitButton";

export const metadata: Metadata = {
  title: "Sign in",
};

// const signInSlots: SignInPageSlots = {
//   submitButton: SubmitButton,
// };

const { getUsers } = new APIdbService();

export default async function SignIn() {
  const fetchedUsers = await getUsers({ cache: "no-store" });
  const allUsers = fetchedUsers.users as CurrentUser[];
  console.log("SignIn page focussed... (Logged out occurred)");
  console.log("allUsers in auth/signin", allUsers);
  const session = await auth();
  // const { isLoading } = useAllUsersContext();
  // if (isLoading)
  //   return (
  //     <LoadingUI
  //       title="Loading Leaderboard..."
  //       message="Hang tight! We're fetching the latest rankings. Sign in below to join and see your position."
  //     />
  //   );
  return (
    <Box>
      <Box sx={leaderboardStyles}>
        <LeaderBoardPage {...{ session, allUsersInSignInPage: allUsers }} />
      </Box>
      <SignInPage
        sx={signInPageContainerStyles}
        // slotProps={signInSlotProps}
        // slots={signInSlots}
        localeText={signInText}
        providers={providerMap}
        signIn={handleSignIn}
      />
    </Box>
  );
}
