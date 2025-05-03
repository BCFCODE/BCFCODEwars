import Leaderboard from "@/app/(dashboard)/leaderboard/LeaderBoard";
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
import Providers from "@/app/context/providers";
// import SubmitButton from "./SubmitButton";

export const metadata: Metadata = {
  title: "Sign in",
};

// const signInSlots: SignInPageSlots = {
//   submitButton: SubmitButton,
// };

export default async function SignIn() {
  return (
    <Box>
      <Box sx={leaderboardStyles}>
        <Leaderboard />
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
