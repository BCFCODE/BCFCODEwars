import { Suspense } from "react";
import LeaderBoard from "./Leaderboard";

const MainPage = () => {
  return (
    <LeaderBoard />
    // <Suspense fallback={<p>Welcome to BCFCODEwars</p>}>
    //   <LeaderBoard />
    // </Suspense>
  );
};

export default MainPage;
