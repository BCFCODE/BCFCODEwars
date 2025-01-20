"use client";

// app/(dashboard)/leaderboard/(Table)/Table.tsx
import APIUsersService from "@/app/api/services/users-service";
import ErrorButtonContainer from "@/app/components/UI/Error/Buttons/ButtonContainer";
import ErrorUI from "@/app/components/UI/Error/ErrorUI";
import DatabaseUserProvider from "@/app/context/DatabaseUserProvider";
import useDatabaseUserContext from "@/app/context/hooks/useDatabaseUserContext";
import CodewarsService from "@/app/services/codewars-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { DatabaseUser } from "@/types/database";
import DiamondIcon from "@mui/icons-material/Diamond";
import {
  Box,
  Button,
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
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import CodewarsProvider from "../../../../context/CodewarsProvider";
import { diamondTextStyle, textStyles } from "../../styles";
import CodewarsCompletedChallengesTable from "../CodewarsCompletedChallenges/Table";
import LeaderboardAvatar from "./Avatar";
import OpenButton from "./Buttons/OpenButton";
import SkeletonTableRow from "./Skeleton";

const { getCompletedChallenges } = new CodewarsService();
const { getUsers } = new APIUsersService();

export function LeaderboardUsers() {
  const {
    currentUser: { codewars, name, createdAt, lastLogin },
  } = useDatabaseUserContext();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [completedChallenges, setCompletedChallenges] =
    React.useState<CodewarsCompletedChallenge[]>();
  const [error, setError] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);

  const codewarsUsername = codewars?.username;

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

  const handleReconnect = () => {
    router.replace("/wars/validation/steps/1");
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <OpenButton {...{ open, onOpen: () => setOpen(!open) }} />
        </TableCell>
        <TableCell
          sx={{ ...textStyles, display: "flex", alignItems: "center", gap: 1 }}
          component="th"
          scope="row"
        >
          <LeaderboardAvatar />
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {new Date(createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {new Date(lastLogin).toLocaleTimeString()}
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
            <CodewarsProvider context={{ completedChallenges }}>
              <CodewarsCompletedChallengesTable
                {...{
                  handleReconnect,
                  handleRetry,
                  error,
                  isLoading,
                }}
              />
            </CodewarsProvider>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Leaderboard() {
  const [allUsers, setAllUsers] = React.useState<DatabaseUser[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const columns = 6;

  const fetchUsersFromDatabase = async () => {
    try {
      const fetchedUsers = await getUsers();
      if (!fetchedUsers.success) {
        setError(true);
      }
      setAllUsers(fetchedUsers.users as DatabaseUser[]);
    } catch (error) {
      console.error("Error loading leaderboard data:", error);
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

  if (error)
    return (
      <ErrorUI>
        <Typography variant="body1" color="text.primary" gutterBottom>
          We encountered an issue while fetching user data.
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          This could be due to:
        </Typography>
        <Typography
          variant="body2"
          component="ul"
          color="text.secondary"
          sx={{ pl: 2, textAlign: "left" }}
        >
          <li>A network connectivity problem.</li>
          <li>The server being temporarily unavailable.</li>
          <li>An unexpected error in our system.</li>
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          What you can do:
        </Typography>
        <Typography
          variant="body2"
          component="ol"
          color="text.secondary"
          sx={{ pl: 2, textAlign: "left" }}
        >
          <li>Check your internet connection.</li>
          <li>Ensure the server is reachable.</li>
          <li>Try refreshing the page or clicking the retry button below.</li>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          If the issue persists, please contact our support team for assistance.
        </Typography>
        <ErrorButtonContainer>
          <Button variant="outlined" color="primary" onClick={handleRetry}>
            Try Again
          </Button>
        </ErrorButtonContainer>
      </ErrorUI>
    );

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
            : allUsers.map((currentUser: DatabaseUser) => (
                <DatabaseUserProvider
                  key={currentUser.email}
                  context={{ allUsers, currentUser }}
                >
                  <LeaderboardUsers />
                </DatabaseUserProvider>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
