"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import useUsersQuery from "@/app/context/hooks/ReactQuery/useUsersQuery";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { usersQueryKeys } from "@/app/context/providers/ReactQuery/queryKeys";
import { Paper, Table, TableContainer } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LeaderboardLoadingError from "./Error";
import UsersTable from "./UsersTable";
import LeaderboardHeader from "./UsersTable/Header";
import Pagination from "./UsersTable/Pagination";
import { PaginationQuery } from "@/app/services/db";

export default function LeaderBoardPage() {
  const [paginationQuery, setPaginationQuery] = useState<PaginationQuery>({
    skip: 0,
    limit: 10,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: usersQueryKeys.allUsers });
  }, [queryClient]);

  const { data, isError, isLoading, refetch } = useUsersQuery(paginationQuery);

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
          component={Paper}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Table aria-label="Leaderboard Table">
            <LeaderboardHeader />
            <UsersTable list={data?.list} />
          </Table>
          <Pagination
            onPaginationQueryChange={({ skip, limit }) => {
              setPaginationQuery({ skip, limit });
              // console.log(skip, limit);
            }}
          />
        </TableContainer>
      </CodewarsProvider>
    );
}
