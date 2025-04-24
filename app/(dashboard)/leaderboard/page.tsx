"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import useUsersQuery from "@/app/context/hooks/ReactQuery/useUsersQuery";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter } from "next/navigation";
import LeaderboardLoadingError from "./Error";
import LeaderboardHeader from "./UsersTable/Header";
import UsersTable from "./UsersTable";

export default function LeaderBoardPage() {
  const router = useRouter();

  const { data, isError, isLoading } = useUsersQuery();
  console.log('LeaderBoardPage/data', data?.list)

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
            <UsersTable list={data?.list} />
          </Table>
        </TableContainer>
      </CodewarsProvider>
    );
}
