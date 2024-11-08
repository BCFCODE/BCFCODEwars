import LoadingUI from "@/app/LoadingUI";
import React from "react";

const LeaderBoardLoadingPage = () => {
  return (
    <LoadingUI
      head="Leaderboard"
      body="Fetching the latest scores and rankings..."
    />
  );
};

export default LeaderBoardLoadingPage;
