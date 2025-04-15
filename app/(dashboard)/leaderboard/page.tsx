"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { useLeaderBoardStore } from "@/app/store/leaderboard";
import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter } from "next/navigation";
import Body from "./Body";
import LeaderboardLoadingError from "./Error";
import LeaderboardHeader from "./Head/Header";

export default function LeaderBoardPage() {
  const router = useRouter();

  const { isError, isLoading } = useLeaderBoardStore((state) => state);

  if (isError)
    return <LeaderboardLoadingError onRetry={() => router.refresh()} />;

  if (isLoading)
    return (
      <LoadingUI
        title="Loading Leaderboard..."
        message="Hang tight! We're fetching the latest rankings. Sign in below to join and see your position."
      />
    );

  if (!isError)
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
