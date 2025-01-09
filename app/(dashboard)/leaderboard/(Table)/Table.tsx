"use client";
// app/(dashboard)/leaderboard/(Table)/Table.tsx
import {
  CodewarsCompletedChallenge,
  CodewarsCompletedChallengeApiResponse,
} from "@/types/codewars";
import { DatabaseUser } from "@/types/database";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { LinearProgress, Paper, TableContainer } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as React from "react";
import LeaderboardAvatar from "./Avatar";
import { fetchCompletedChallenges, fetchDatabaseUsers } from "./Data";
import SkeletonTableRow from "./Skeleton";
import { textStyles } from "./styles";
import LoadingUI from "@/app/LoadingUI";

interface Props {
  user: DatabaseUser;
}

export function UserInTable({ user }: Props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [completedChallenges, setCompletedChallenges] =
    React.useState<CodewarsCompletedChallenge[]>();
  const [error, setError] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(1);
  const isCodewarsConnected = user.codewars?.isConnected ?? false;
  const codewarsUsername = user.codewars?.username;

  React.useEffect(() => {
    if (open) {
      // console.log("Table opened!");
      // console.log(`isCodewarsConnected`, isCodewarsConnected);
      // console.log(`codewarsUsername`, codewarsUsername);

      (async () => {
        try {
          setIsLoading(true);
          const fetchedChallenges: CodewarsCompletedChallengeApiResponse =
            await fetchCompletedChallenges(codewarsUsername, pageNumber);

          if ("data" in fetchedChallenges) {
            const { data: challenges } = fetchedChallenges;
            console.log(challenges, "<<<<<<<<<<<<<");
            setCompletedChallenges(challenges);
          } else {
            // TODO
          }
        } catch (error) {
          // TODO
        } finally {
          setIsLoading(false);
          // TODO
        }
      })();
    }
  }, [open]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {/* open/close button */}
          {isCodewarsConnected && (
            <IconButton
              aria-label="expand row"
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
        <TableCell sx={textStyles} align="right">
          {/* N/A */}
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {/* N/A */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Completed Challenges on Codewars
              </Typography>
              {isLoading ? (
                <LoadingUI
                  title="Loading challenges"
                  message="Please wait while we fetch data..."
                />
              ) : (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={textStyles}>Date Completed</TableCell>
                      <TableCell sx={textStyles}>Name</TableCell>
                      <TableCell sx={textStyles} align="right">
                        Rank
                      </TableCell>
                      <TableCell sx={textStyles} align="right">
                        Rank
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {completedChallenges?.map((challenge) => (
                      <TableRow key={challenge.id}>
                        <TableCell sx={textStyles} component="th" scope="row">
                          {new Date(challenge.completedAt).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(challenge.completedAt).toLocaleTimeString()}
                        </TableCell>
                        <TableCell sx={textStyles}>
                          {challenge.name.length > 50
                            ? `${challenge.name.slice(0, 50)}...`
                            : challenge.name}
                        </TableCell>
                        <TableCell sx={textStyles} align="right">
                          Rank
                        </TableCell>
                        <TableCell sx={textStyles} align="right">
                          Rank
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
        console.error("Error fetching Leaderboard table rows:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
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
              Last login
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
