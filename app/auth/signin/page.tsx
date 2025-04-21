import LeaderBoardPage from "@/app/(dashboard)/leaderboard/page";
import dbAPIService from "@/app/api/services/db";
import { Box } from "@mui/material";
import { SignInPage } from "@toolpad/core/SignInPage";
import { Metadata } from "next/types";
import { providerMap } from "../../../auth";
import { handleSignIn } from "./signInHandler";
import {
  leaderboardStyles,
  signInPageContainerStyles,
  // signInSlotProps,
  signInText,
} from "./styles";
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

  return (
    <Box>
      <Box sx={leaderboardStyles}>
        <LeaderBoardPage />
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
