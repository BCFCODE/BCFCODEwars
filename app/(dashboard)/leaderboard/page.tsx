"use client";

import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter } from "next/navigation";
import Body from "./Body";
import LeaderboardLoadingError from "./Error";
import LeaderboardHeader from "./Head/Header";
import CodewarsProvider from "@/app/context/providers/Codewars";
import LoadingUI from "@/app/components/UI/LoadingUI";

export default function LeaderBoardPage() {
  const router = useRouter();
  // // Consume the error state from context to trigger re-render when it updates.
  const { error, isLoading } = useAllUsersContext();

  // console.log(">>>>>>>>>>>> useAllUsersContext error", error);
  // // Conditionally render the error UI when error is true.
  
  // console.log('isError in loading leaderboard', error)
  if (error)
    return <LeaderboardLoadingError onRetry={() => router.refresh()} />;

  if (isLoading)  
    return (  
      <LoadingUI  
        title="Loading Leaderboard..."  
        message="Hang tight! We're fetching the latest rankings. Sign in below to join and see your position."  
      />  
    );  

  if (!error)
    return (
      <CodewarsProvider>
        <TableContainer component={Paper} >
          <Table aria-label="Leaderboard Table">
            <LeaderboardHeader />
            <Body />
          </Table>
        </TableContainer>
      </CodewarsProvider>
    );
}
