"use client";

import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter } from "next/navigation";
import Body from "./Body";
import LeaderboardLoadingError from "./Error";
import LeaderboardHeader from "./Head/Header";
import CodewarsProvider from "@/app/context/providers/Codewars";

export default function LeaderBoardPage() {
  const router = useRouter();
  // // Consume the error state from context to trigger re-render when it updates.
  const { error } = useAllUsersContext();

  // console.log(">>>>>>>>>>>> useAllUsersContext error", error);
  // // Conditionally render the error UI when error is true.
  if (error)
    return <LeaderboardLoadingError onRetry={() => router.refresh()} />;

  if (!error)
    return (
      <CodewarsProvider>
        <TableContainer component={Paper}>
          <Table aria-label="Leaderboard Table">
            <LeaderboardHeader />
            <Body />
          </Table>
        </TableContainer>
      </CodewarsProvider>
    );
}
