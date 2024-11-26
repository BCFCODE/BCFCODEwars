"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
import { createData, rows } from "./Data";
import { TableContainer, Paper } from "@mui/material";

interface Props {
  user: ReturnType<typeof createData>;
}

export function Row({ user }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {user.name}
        </TableCell>
        <TableCell align="right">{user.memberSince}</TableCell>
        <TableCell align="right">{user.rank}</TableCell>
        <TableCell align="right">{user.position}</TableCell>
        <TableCell align="right">{user.globalPosition}</TableCell>
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
                    <TableCell>Date Completed</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Rank</TableCell>
                    <TableCell align="right">Rank</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.history.map((userHistory) => (
                    <TableRow key={userHistory.date}>
                      <TableCell component="th" scope="row">
                        {userHistory.date}
                      </TableCell>
                      <TableCell>{userHistory.customerId}</TableCell>
                      <TableCell align="right">{userHistory.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(userHistory.amount * user.rank * 100) /
                          100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell width="auto">User</TableCell>
            <TableCell align="right">Member Since</TableCell>
            <TableCell align="right">Rank</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Global Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} user={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
