"use client";

import useDBAllUsersContext from "@/app/context/hooks/db/useDBAllUsersContext";
import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter } from "next/navigation";
import Body from "./Body";
import LeaderboardLoadingError from "./Error";
import LeaderboardHeader from "./Head/Header";
import CodewarsProvider from "@/app/context/providers/codewars/CodewarsProvider";

export default function LeaderBoardPage() {
  const router = useRouter();
  // // Consume the error state from context to trigger re-render when it updates.
  const { error } = useDBAllUsersContext();

  console.log(">>>>>>>>>>>> useDBAllUsersContext error", error);
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
