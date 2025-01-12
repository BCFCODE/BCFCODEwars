"use client";

// app/(dashboard)/leaderboard/(Table)/Table.tsx
import LoadingUI from "@/app/LoadingUI";
import {
  CodewarsCompletedChallenge,
  CodewarsCompletedChallengeApiResponse,
} from "@/types/codewars";
import { DatabaseUser } from "@/types/database";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React from "react";
import LeaderboardAvatar from "./Avatar";
import { fetchCompletedChallenges, fetchDatabaseUsers } from "./Data";
import SkeletonTableRow from "./Skeleton";
import { diamondTextStyle, textStyles } from "./styles";
import GetDiamondsButton from "./Buttons/GetDiamonds/GetDiamondsButton";
import DiamondIcon from "@mui/icons-material/Diamond";
interface Props {
  user: DatabaseUser;
}

export function UserInTable({ user }: Props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [completedChallenges, setCompletedChallenges] =
    React.useState<CodewarsCompletedChallenge[]>();
  const [error, setError] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(0);
  const isCodewarsConnected = user.codewars?.isConnected ?? false;
  const codewarsUsername = user.codewars?.username;

  React.useEffect(() => {
    if (open) {
      (async () => {
        try {
          setIsLoading(true);
          const fetchedChallenges: CodewarsCompletedChallengeApiResponse =
            await fetchCompletedChallenges(codewarsUsername, pageNumber);

          if ("data" in fetchedChallenges) {
            const { data: challenges } = fetchedChallenges;
            setCompletedChallenges(challenges);
          } else {
            // TODO: Handle cases where data is missing
          }
        } catch (error) {
          // TODO: Handle errors gracefully
        } finally {
          setIsLoading(false);
          // TODO: Add additional cleanup or updates if needed
        }
      })();
    }
  }, [open, codewarsUsername, pageNumber]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {/* Expand/Collapse button */}
          {isCodewarsConnected && (
            <IconButton
              aria-label="Toggle challenge details"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell
          sx={{ ...textStyles, display: "flex", alignItems: "center", gap: 1 }}
          component="th"
          scope="row"
        >
          <LeaderboardAvatar image={user.image} />
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {user.name}
          </Typography>
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {new Date(user.createdAt).toLocaleDateString()}
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {new Date(user.lastLogin).toLocaleTimeString()}
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
              {isLoading ? (
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
                          <GetDiamondsButton />
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
            : users.map((user) => <UserInTable key={user.email} user={user} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
