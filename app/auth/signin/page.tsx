import Leaderboard from "@/app/(dashboard)/leaderboard/LeaderBoard";
import { Box } from "@mui/material";
import { SignInPage, SignInPageSlots } from "@toolpad/core/SignInPage";
import { Metadata } from "next/types";
import { providerMap } from "../../../auth";
import Container from "./Container";
import { handleSignIn } from "./signInHandler";
import {
  // signInSlotProps,
  signInText,
} from "./styles";
// import SubmitButton from "./SubmitButton";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function SignIn() {
  return (
    <Box>
      <Container
        SX={{
          opacity: 0.2,
          transition: "opacity 1s ease",
          "&:hover": { opacity: 1 },
        }}
      >
        <SignInPage
          sx={{
            top: 250, // Fixed vertical offset
            position: "fixed",
            left: "50%", // Center horizontally
            transform: "translate(-50%, -50%)", // Only center horizontally

            // For screens smaller than 700px, override minWidth and width
            "@media (max-width:800px)": {
              position: "static", // Let it flow naturally (optional)
              width: "100%", // Full width on small screens
              transform: "none", // Remove transform on small screens
              margin: "auto", // Center with margin
              top: "auto", // Reset fixed top
            },
          }}
          localeText={signInText}
          providers={providerMap}
          signIn={handleSignIn}
        />
      </Container>
      <Box
        sx={{ height: "90vh", margin: { xs: 0, sm: 1, md: 2, lg: 3, xl: 4 } }}
      >
        <Leaderboard />
      </Box>
    </Box>
  );
}
