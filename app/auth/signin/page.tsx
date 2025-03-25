import LeaderBoardPage from "@/app/(dashboard)/leaderboard/page";
import { Box } from "@mui/material";
import { SignInPage, SignInPageSlots } from "@toolpad/core/SignInPage";
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

export default function SignIn() {
  // const { isLoading } = useAllUsersContext();
  console.log("SignIn page focussed... (Logged out occurred)");
  // if (isLoading)
  //   return (
  //     <LoadingUI
  //       title="Loading Leaderboard..."
  //       message="Hang tight! We're fetching the latest rankings. Sign in below to join and see your position."
  //     />
  //   );
  return (
    <>
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
    </>
  );
}
