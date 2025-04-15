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
import { AuthenticatedUser } from "@/types/users";
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
  const { users } = await getUsers({
    cache: "no-store",
  });
  // const allUsers = fetchedUsers.users as AuthenticatedUser[];

  return (
    <Box>
      <Box sx={leaderboardStyles}>
        <LeaderBoardPage {...{ allUsersInSignInPage: users }} />
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
