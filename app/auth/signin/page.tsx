import LeaderBoardPage from "@/app/(dashboard)/leaderboard/page";
import { Box } from "@mui/material";
import { SignInPage } from "@toolpad/core/SignInPage";
import { Metadata } from "next/types";
import { auth, providerMap } from "../../../auth";
import { handleSignIn } from "./signInHandler";
import {
  leaderboardStyles,
  signInPageContainerStyles,
  // signInSlotProps,
  signInText,
} from "./styles";
import { CurrentUser } from "@/types/users";
import dbAPIService from "@/app/api/services/db";
// import SubmitButton from "./SubmitButton";

export const metadata: Metadata = {
  title: "Sign in",
};

// const signInSlots: SignInPageSlots = {
//   submitButton: SubmitButton,
// };

const { getUsers } = new dbAPIService();

export default async function SignIn() {
  const fetchedUsers = await getUsers({ cache: "no-store" });
  const allUsers = fetchedUsers.users as CurrentUser[];
  const session = await auth();
  // console.log("SignIn page focussed... (Logged out occurred)");
  // console.log("allUsers in auth/signin", allUsers);
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
