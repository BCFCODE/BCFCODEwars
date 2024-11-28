import { Metadata } from "next/types";
import { providerMap } from "../../../auth";
import { handleSignIn } from "./signInHandler";
import { SignInPage } from "@toolpad/core/SignInPage";
import { Box, SxProps, Theme } from "@mui/material";
import LeaderBoard from "@/app/Leaderboard/Table/Table";

export const metadata: Metadata = {
  title: "Sign in",
};

const leaderboardStyles: SxProps<Theme> = {
  margin: { xs: 0, sm: 1, md: 2, lg: 3, xl: 4 },
};

export default function SignIn() {
  return (
    <>
      <Box sx={leaderboardStyles}>
        <LeaderBoard />
      </Box>
      <Box height="100vh" paddingTop="10vh">
        <SignInPage providers={providerMap} signIn={handleSignIn} />
      </Box>
    </>
  );
}
