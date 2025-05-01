"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import useUsersQuery from "@/app/context/hooks/ReactQuery/useUsersQuery";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { usersQueryKeys } from "@/app/context/providers/ReactQuery/queryKeys";
import { Paper, Table, TableContainer } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import LeaderboardLoadingError from "./Error";
import UsersTable from "./UsersTable";
import LeaderboardHeader from "./UsersTable/Header";
import Pagination from "./UsersTable/Pagination";

export default function LeaderBoardPage() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: usersQueryKeys.allUsers });
  }, [queryClient]);

  const { data, isError, isLoading, refetch } = useUsersQuery();

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
        <TableContainer
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          component={Paper}
        >
          <Table aria-label="Leaderboard Table">
            <LeaderboardHeader />
            <UsersTable list={data?.list} />
          </Table>
          <Pagination />
        </TableContainer>
      </CodewarsProvider>
    );
}
