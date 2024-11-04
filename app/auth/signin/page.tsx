import { SignInPage } from "@toolpad/core/SignInPage";
import { Metadata } from "next";
import { providerMap } from "../../../auth";
import LeaderBoard from "./Leaderboard";
import { handleSignIn } from "./signInHandler";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return (
    <>
      <SignInPage providers={providerMap} signIn={handleSignIn} />
      <LeaderBoard />
    </>
  );
}
