// app/(dashboard)/leaderboard/page.tsx

"use client";

import APIdbService from "@/app/api/services/db-service";
import { DBUser } from "@/types/db/users";
import { Paper, Table, TableContainer } from "@mui/material";
import React from "react";
import LeaderboardLoadingError from "./Error";
import LeaderboardHeader from "./Head/Header";
import Body from "./Body";

const { getUsers } = new APIdbService();

export default function LeaderBoardPage() {
  const [allUsers, setAllUsers] = React.useState<DBUser[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);

  const fetchUsersFromDatabase = async () => {
    try {
      const fetchedUsers = await getUsers();
      if (!fetchedUsers.success) {
        setError(true);
      }
      setAllUsers(fetchedUsers.users as DBUser[]);
    } catch (error) {
      console.error("Error loading leaderboard data");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsersFromDatabase();
  }, []);

  const handleRetry = () => {
    setLoading(true); // Show loading state
    setError(false); // Clear any existing errors
    fetchUsersFromDatabase(); // Refetch the leaderboard data
  };

  if (error) return <LeaderboardLoadingError onRetry={handleRetry} />;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Leaderboard Table">
        <LeaderboardHeader />
        <Body {...{ allUsers, isLoading }} />
      </Table>
    </TableContainer>
  );
}
