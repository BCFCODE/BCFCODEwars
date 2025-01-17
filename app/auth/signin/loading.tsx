import LoadingUI from "@/app/components/UI/LoadingUI";
import React from "react";

const SignInLoadingMainPage = () => {
  return (
    <LoadingUI
      title="Welcome to BCFCODE"
      message="Preparing your sign-in and leaderboard..."
    />
  );
};

export default SignInLoadingMainPage;
