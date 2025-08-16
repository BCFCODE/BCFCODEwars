import { Box } from "@mui/material";
import { SignInPage } from "@toolpad/core/SignInPage";
import { Metadata } from "next/types";
import { providerMap } from "../../../auth";
import Container from "./Container";
import { handleSignIn } from "./signInHandler";
import { signInText } from "./styles";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function SignIn() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column", // < 600px
          sm: "column", // 600px–900px
          md: "row", // ≥ 900px
        },
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
        p: 2,
      }}
    >
      {/* Sign-In Container */}
      <Container
        // SX={{
        //   opacity: 0.2,
        //   transition: "opacity 0.7s ease",
        //   "&:hover": { opacity: 1 },
        //   "@media (max-width:800px)": {
        //     opacity: 1,
        //   },
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   borderRadius: 50
        // }}
      >
        <SignInPage
          sx={{
            zIndex: 10,
            position: {
              xs: "relative", // stack normally on mobile
              md: "fixed", // float in center on large
            },
            // top: { xs: "auto", md: 250 },
            left: { xs: "auto", md: "50%" },
            transform: { xs: "none", md: "translate(-50%, -50%)" },
            width: { xs: "100%", sm: "90%", md: "auto" },
          }}
          localeText={signInText}
          providers={providerMap}
          signIn={handleSignIn}
        />
      </Container>

      {/* Leaderboard */}
      {/* <Box
        sx={{
          height: "90vh",
          width: "100%",
          margin: { xs: 0, sm: 1, md: 2, lg: 3, xl: 4 },
        }}
      >
        <Leaderboard />
      </Box> */}
    </Box>
  );
}
