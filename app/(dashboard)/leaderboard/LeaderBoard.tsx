"use client";

import LoadingUI from "@/app/components/UI/LoadingUI";
import usePaginationQuery from "@/app/(dashboard)/leaderboard/UsersTable/Pagination/usePaginationQuery";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { Box, Paper, Table, TableContainer } from "@mui/material";
import LeaderboardLoadingError from "./Error";
import UsersTable from "./UsersTable";
import LeaderboardHeader from "./UsersTable/Header";
import Pagination from "./UsersTable/Pagination";
import usePaginationStore from "./UsersTable/Pagination/usePaginationStore";

export default function Leaderboard() {
  const { paginationQuery } = usePaginationStore((state) => state);

  const { data, isError, isLoading, refetch } =
    usePaginationQuery(paginationQuery);

  if (isError) return <LeaderboardLoadingError onRetry={refetch} />;

  if (isLoading)
    return (
      <LoadingUI
        title="Loading Leaderboard..."
        message="Hang tight! We're fetching the latest rankings."
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination totalPageCount={data?.totalUsers} />
          </Box>
        </TableContainer>
      </CodewarsProvider>
    );
}
