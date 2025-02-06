"use client";

// app/(dashboard)/leaderboard/(Table)/Table.tsx
import APIdbService from "@/app/api/services/db-service";
import ErrorButtonContainer from "@/app/components/UI/Error/Buttons/ButtonContainer";
import ErrorUI from "@/app/components/UI/Error/ErrorUI";
import useDBUserContext from "@/app/context/hooks/useDBUserContext";
import CodewarsService from "@/app/services/codewars-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { DBUser } from "@/types/db/users";
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
import React from "react";
import { diamondBoxStyles, codewarsCellStyles } from "../../styles";
import CodewarsCompletedChallengesTable from "../CodewarsCompletedChallenges/Table";
import LeaderboardAvatar from "./Avatar";
import OpenButton from "./Buttons/OpenButton";
import SkeletonTableRow from "./Skeleton";
import CodewarsProvider from "@/app/context/providers/codewars/CodewarsProvider";
import DBUserProvider from "@/app/context/providers/db/DBUserProvider";
import LeaderboardLoadingError from "./Error";

const { getCompletedChallenges } = new CodewarsService();
const { getUsers } = new APIdbService();

export function LeaderboardUsers() {
  const {
    currentUser: { codewars, name, createdAt, lastLogin },
  } = useDBUserContext();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [completedChallenges, setCompletedChallenges] =
    React.useState<CodewarsCompletedChallenge[]>();
  const [error, setError] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);

  const codewarsUsername = codewars?.username;

  const handleOpen = async () => {
    setOpen(!open);
    setIsLoading(true);
    handleTry();
  };

  const handleTry = async () => {
    try {
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
  };

  const handleRetry = () => {
    setError(false); // Clear the error
    setIsLoading(true); // Re-initiate loading state
    handleRetry();
  };

  const handleReconnect = () => {
    router.replace("/wars/validation/steps/1");
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <OpenButton {...{ open, handleOpen }} />
        </TableCell>
        <TableCell
          sx={{
            ...codewarsCellStyles,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
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
        <TableCell sx={codewarsCellStyles} align="right">
          {new Date(createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          {new Date(lastLogin).toLocaleTimeString()}
        </TableCell>
        <TableCell sx={{ ...codewarsCellStyles }} align="right">
          <Box sx={diamondBoxStyles}>
            <Typography>{Math.floor(Math.random() * 100000)}</Typography>
            <DiamondIcon />
          </Box>
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
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
  const [allUsers, setAllUsers] = React.useState<DBUser[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const columns = 6;

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
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={codewarsCellStyles} width="auto">
              User
            </TableCell>
            <TableCell sx={codewarsCellStyles} align="right">
              Member Since
            </TableCell>
            <TableCell sx={codewarsCellStyles} align="right">
              Last Login
            </TableCell>
            <TableCell sx={codewarsCellStyles} align="right">
              Diamonds
            </TableCell>
            <TableCell sx={codewarsCellStyles} align="right">
              Rank
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <SkeletonTableRow key={i} nOfCols={columns} />
              ))
            : allUsers.map((currentUser: DBUser) => (
                <DBUserProvider
                  key={currentUser.email}
                  context={{ allUsers, currentUser }}
                >
                  <LeaderboardUsers />
                </DBUserProvider>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
