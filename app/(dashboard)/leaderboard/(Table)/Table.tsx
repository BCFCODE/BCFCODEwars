"use client";
// app/(dashboard)/leaderboard/(Table)/Table.tsx
import { LeaderboardRow } from "@/types/leaderboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Paper, TableContainer } from "@mui/material";
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
import Body from "./Body";
import { fetchAndCreateRows } from "./Data";
import SkeletonTableRow from "./Skeleton";
import { textStyles } from "./styles";

interface Props {
  user: LeaderboardRow;
}

export function Row({ user }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleOpenTable = () => {
    console.log("Table opened!");
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {/* open/close button */}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open);
              !open && handleOpenTable();
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
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
          {user.createdAt}
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {user.rank}
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {user.position}
        </TableCell>
        <TableCell sx={textStyles} align="right">
          {user.globalPosition}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Completed Challenges
              </Typography>
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
                {/* main body */}
                <Body />
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Leaderboard() {
  const [rows, setRows] = React.useState<LeaderboardRow[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const columns = 7;

  React.useEffect(() => {
    async function loadData() {
      try {
        const fetchedRows = await fetchAndCreateRows();
        setRows(fetchedRows);
      } catch (error) {
        console.error("Error fetching Leaderboard table rows:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
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
              Rank
            </TableCell>
            <TableCell sx={textStyles} align="right">
              Position
            </TableCell>
            <TableCell sx={textStyles} align="right">
              Global Position
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <SkeletonTableRow key={i} nOfCols={columns} />
              ))
            : rows.map((row) => <Row key={row.name} user={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
