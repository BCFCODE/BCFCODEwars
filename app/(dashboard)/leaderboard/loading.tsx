import LoadingUI from "@/app/components/UI/LoadingUI";
import React from "react";

const LeaderBoardLoadingPage = () => {
  return (
    <LoadingUI
      title="Leaderboard"
      message="Fetching the latest scores and rankings..."
    />
  );
};

export default LeaderBoardLoadingPage;
