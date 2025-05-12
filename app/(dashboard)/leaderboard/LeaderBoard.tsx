"use client";

import usePaginationQuery from "@/app/(dashboard)/leaderboard/UsersTable/Pagination/usePaginationQuery";
import LoadingUI from "@/app/components/UI/LoadingUI";
import CodewarsProvider from "@/app/context/providers/Codewars";
import { Box, Paper, Table, TableContainer } from "@mui/material";
import LeaderboardLoadingError from "./Error";
import UsersTable from "./UsersTable";
import LeaderboardHeader from "./UsersTable/Header";
import Pagination from "./UsersTable/Pagination";
import { useUsersStore } from "@/app/context/store/users";

export default function Leaderboard() {
  const selectedUser = useUsersStore((state) => state.user.selectedUser);
  const { data, isError, isLoading, refetch } = usePaginationQuery();

  // const list = data?.list.map((user) =>
  //   user.email === selectedUser?.email
  //     ? { ...user, isCollapsed: selectedUser.isCollapsed }
  //     : { ...user, isCollapsed: true }
  // );

  console.log("selectedUser for mapping is collapsed", selectedUser);
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
