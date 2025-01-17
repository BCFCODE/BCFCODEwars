"use client";

// app/(dashboard)/leaderboard/(Table)/Table.tsx
import LoadingUI from "@/app/components/UI/LoadingUI";
import CodewarsService from "@/app/services/codewars-service";
import {
  CodewarsChallengesApiResponse,
  CodewarsCompletedChallenge,
} from "@/types/codewars";
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
import React from "react";
import LeaderboardAvatar from "./Avatar";
import GetDiamondsButton from "./Buttons/GetDiamonds/GetDiamondsButton";
import OpenButton from "./Buttons/OpenButton";
import { fetchDatabaseUsers } from "./Data";
import SkeletonTableRow from "./Skeleton";
import { diamondTextStyle, textStyles } from "./styles";
import { useRouter } from "next/navigation";
import ErrorUI from "@/app/components/UI/ErrorUI";

const { getCompletedChallenges } = new CodewarsService();
export interface TableProps {
  userInDB: DatabaseUser;
}

export function UserInTable({ userInDB }: TableProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [completedChallenges, setCompletedChallenges] =
    React.useState<CodewarsCompletedChallenge[]>();
  const [error, setError] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);

  const codewarsUsername = userInDB.codewars?.username;

  const handleOpen = async () => {
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
  };

  React.useEffect(() => {
    open && handleOpen();
  }, [open, codewarsUsername, pageNumber]);

  const handleRetry = () => {
    setError(false); // Clear the error
    setIsLoading(true); // Re-initiate loading state
    handleOpen();
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {/* Expand/Collapse button */}
          {/* <Link href={`?username=${codewarsUsername}&pageNumber=${pageNumber}`}> */}
          <OpenButton {...{ userInDB, open }} onOpen={() => setOpen(!open)} />
          {/* </Link> */}
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
                Codewars Challenges Completed
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
                <Table size="small" aria-label="completed challenges">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={textStyles}>Date completed</TableCell>
                      <TableCell sx={textStyles}>Challenge Name</TableCell>
                      <TableCell sx={textStyles} align="right">
                        Earned Diamonds
                      </TableCell>
                      <TableCell sx={textStyles} align="right">
                        Solved Time
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {completedChallenges?.map((challenge) => (
                      <TableRow key={challenge.id}>
                        <TableCell sx={textStyles} component="th" scope="row">
                          {new Date(challenge.completedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={textStyles}>
                          {challenge.name.length > 50
                            ? `${challenge.name.slice(0, 50)}...`
                            : challenge.name}
                        </TableCell>
                        <TableCell sx={textStyles} align="right">
                          {/* Click and get diamonds */}
                          <GetDiamondsButton {...{ userInDB, challenge }} />
                        </TableCell>

                        <TableCell sx={textStyles} align="right">
                          {new Date(challenge.completedAt).toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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

  React.useEffect(() => {
    (async () => {
      try {
        const fetchUsers = await fetchDatabaseUsers();
        setUsers(fetchUsers as DatabaseUser[]);
      } catch (error) {
        console.error("Error loading leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    })();
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
                <UserInTable key={user.email} {...{ userInDB: user }} />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
