import LeaderBoardPage from "@/app/(dashboard)/leaderboard/page";
import { Box } from "@mui/material";
import { SignInPage } from "@toolpad/core/SignInPage";
import { Metadata } from "next/types";
import { providerMap } from "../../../auth";
import { handleSignIn } from "./signInHandler";
import {
  leaderboardStyles,
  signInPageContainerStyles,
  signInText,
} from "./styles";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function SignIn() {
  return (
    <Box>
      <Box sx={leaderboardStyles}>
        <LeaderBoardPage />
      </Box>
      <SignInPage
        sx={signInPageContainerStyles}
        localeText={signInText}
        providers={providerMap}
        signIn={handleSignIn}
      />
    </Box>
  );
}
