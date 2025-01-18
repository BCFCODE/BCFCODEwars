"use client";

// app/(dashboard)/leaderboard/(Table)/Table.tsx
import ErrorUI from "@/app/components/UI/ErrorUI";
import LoadingUI from "@/app/components/UI/LoadingUI";
import CodewarsService from "@/app/services/codewars-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { DatabaseUser } from "@/types/database";
import DiamondIcon from "@mui/icons-material/Diamond";
import {
  Box,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import LeaderboardAvatar from "./Avatar";
import OpenButton from "./Buttons/OpenButton";
import CodewarsCompletedChallengesTable from "./Codewars/Table/Table";
import { fetchDatabaseUsers } from "./Data";
import SkeletonTableRow from "./Skeleton";
import { diamondTextStyle, textStyles } from "./styles";

const { getCompletedChallenges } = new CodewarsService();

export function FillTableWithDatabaseUsers({
  userInDB,
}: {
  userInDB: DatabaseUser;
}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [completedChallenges, setCompletedChallenges] =
    React.useState<CodewarsCompletedChallenge[]>();
  const [error, setError] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);

  const codewarsUsername = userInDB.codewars?.username;

  const handleOpen = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCompletedChallenges(
        codewarsUsername,
        pageNumber
      );

      if ("data" in response) {
        const { data: challenges } = response.data;
        setCompletedChallenges(challenges);
      } else {
        // TODO: Handle cases where data is missing
      }
    } catch (error) {
      // TODO: Handle errors gracefully
      // console.error("Error fetching challenges: ", error);
      setError(true);
    } finally {
      setIsLoading(false);
      // TODO: Add additional cleanup or updates if needed
    }
  }, [codewarsUsername, pageNumber]);

  React.useEffect(() => {
    open && handleOpen();
  }, [open, codewarsUsername, pageNumber, handleOpen]);

  const handleRetry = () => {
    setError(false); // Clear the error
    setIsLoading(true); // Re-initiate loading state
    handleOpen();
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <OpenButton {...{ userInDB, open }} onOpen={() => setOpen(!open)} />
        </TableCell>
        <TableCell
          sx={{ ...textStyles, display: "flex", alignItems: "center", gap: 1 }}
          component="th"
          scope="row"
        >
          <LeaderboardAvatar image={userInDB.image} />
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {userInDB.name}
          </Typography>
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {new Date(userInDB.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {new Date(userInDB.lastLogin).toLocaleTimeString()}
        </TableCell>
        <TableCell sx={{ ...textStyles }} align="right">
          <Box sx={diamondTextStyle}>
            <Typography>{Math.floor(Math.random() * 100000)}</Typography>
            <DiamondIcon />
          </Box>
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {/* Not available */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Codewars Completed Challenges
              </Typography>
              {error ? (
                <ErrorUI
                  message="Oops, we couldn’t fetch your challenge list from Codewars. If you’ve changed your username on Codewars, click 'Reconnect.' Otherwise, it’s likely a network issue—please check your connection and try again!"
                  onRetry={handleRetry}
                />
              ) : isLoading ? (
                <LoadingUI
                  title="Loading Challenges"
                  message="Retrieving data from Codewars. Please wait..."
                />
              ) : (
                <CodewarsCompletedChallengesTable
                  {...{ userInDB, completedChallenges }}
                />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Leaderboard() {
  const [users, setUsers] = React.useState<DatabaseUser[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const columns = 7;

  const fetchUsersFromDatabaseAndBuildLeaderBoard = async () => {
    try {
      const fetchedUsers = await fetchDatabaseUsers();
      setUsers(fetchedUsers as DatabaseUser[]);
    } catch (error) {
      console.error("Error loading leaderboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsersFromDatabaseAndBuildLeaderBoard();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Leaderboard Table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={textStyles} width="auto">
              User
            </TableCell>
            <TableCell sx={textStyles} align="right">
              Member Since
            </TableCell>
            <TableCell sx={textStyles} align="right">
              Last Login
            </TableCell>
            <TableCell sx={textStyles} align="right">
              Diamonds
            </TableCell>
            <TableCell sx={textStyles} align="right">
              Rank
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <SkeletonTableRow key={i} nOfCols={columns} />
              ))
            : users.map((user: DatabaseUser) => (
                <FillTableWithDatabaseUsers
                  key={user.email}
                  {...{ userInDB: user }}
                />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
