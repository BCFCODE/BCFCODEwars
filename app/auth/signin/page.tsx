import { Metadata } from "next/types";
import { providerMap } from "../../../auth";
import LeaderBoard from "./Leaderboard";
import { handleSignIn } from "./signInHandler";
import { SignInPage } from "@toolpad/core/SignInPage";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return (
    <>
      <LeaderBoard />
      <Box height="100vh" paddingTop="10vh">
        <SignInPage providers={providerMap} signIn={handleSignIn} />
      </Box>
    </>
  );
}
