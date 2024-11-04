import { Metadata } from "next/types";
import { providerMap } from "../../../auth";
import LeaderBoard from "./Leaderboard";
import { handleSignIn } from "./signInHandler";
import { SignInPage } from "@toolpad/core/SignInPage";

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
