"use client";

import usePaginationQuery from "@/app/(dashboard)/leaderboard/UsersTable/Pagination/usePaginationQuery";
import LoadingUI from "@/app/components/UI/LoadingUI";
import { Box, Paper, Table, TableContainer } from "@mui/material";
import LeaderboardLoadingError from "./Error";
import UsersTable from "./UsersTable";
import LeaderboardHeader from "./UsersTable/Header";
import Pagination from "./UsersTable/Pagination";

export default function Leaderboard() {
  console.log("Leaderboard rendered at", new Date().toISOString());
  const { data, isError, isLoading, refetch } = usePaginationQuery();
  
  if (isError) return <LeaderboardLoadingError onRetry={refetch} />;

  if (isLoading || !data?.list)
    return (
      <LoadingUI
        title="Loading Leaderboard..."
        message="Hang tight! We're fetching the latest rankings."
      />
    );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Leaderboard Table">
        <LeaderboardHeader />
        <UsersTable list={data?.list ?? []} />
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination totalPageCount={data?.totalUsers ?? 0} />
      </Box>
    </TableContainer>
  );
}
