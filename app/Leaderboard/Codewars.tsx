"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props: { user: ReturnType<typeof createData> }) {
  const { user } = props;
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
        <TableCell align="right">{user.calories}</TableCell>
        <TableCell align="right">{user.fat}</TableCell>
        <TableCell align="right">{user.carbs}</TableCell>
        <TableCell align="right">{user.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
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
                        {Math.round(userHistory.amount * user.price * 100) /
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
const rows = [
  createData("Morteza", 159, 6.0, 24, 4.0, 3.99),
  createData("Miguel", 237, 9.0, 37, 4.3, 4.99),
  createData("Martin", 262, 16.0, 24, 6.0, 3.79),
  createData("John", 305, 3.7, 67, 4.3, 2.5),
  createData("Mary", 356, 16.0, 49, 3.9, 1.5),
];
export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell width="auto">User</TableCell>
            <TableCell align="right">Global Position</TableCell>
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
