"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import useUsersQuery from "@/app/context/hooks/ReactQuery/useUsersQuery";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { Paper, Table, TableContainer } from "@mui/material";
import LeaderboardLoadingError from "./Error";
import UsersTable from "./UsersTable";
import LeaderboardHeader from "./UsersTable/Header";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { usersQueryKeys } from "@/app/context/providers/ReactQuery/queryKeys";
import { useSession } from "next-auth/react";

export default function LeaderBoardPage() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: usersQueryKeys.allUsers });
  }, [queryClient]);

  const { data, isError, isLoading, refetch } = useUsersQuery();
  // const { status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") refetch();
  // }, [status, refetch]);
  // console.log("LeaderBoardPage", data);

  if (isError) return <LeaderboardLoadingError onRetry={refetch} />;

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
