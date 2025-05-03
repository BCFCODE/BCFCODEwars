"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import useUsersQuery from "@/app/context/hooks/ReactQuery/useUsersQuery";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { Paper, Table, TableContainer } from "@mui/material";
import LeaderboardLoadingError from "./Error";
import UsersTable from "./UsersTable";
import usePaginationStore from "./UsersTable/context/store/usePaginationStore";
import LeaderboardHeader from "./UsersTable/Header";
import Pagination from "./UsersTable/Pagination";

export default function Leaderboard() {
  const { paginationQuery } = usePaginationStore((state) => state);

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
          <Pagination totalPageCount={data?.totalUsers} />
        </TableContainer>
      </CodewarsProvider>
    );
}
