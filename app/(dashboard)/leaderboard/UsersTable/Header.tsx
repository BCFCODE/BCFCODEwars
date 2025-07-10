import { TableHead, TableRow, TableCell, Box, Typography } from "@mui/material";
import React from "react";
import { codewarsCellStyles } from "../styles";
import OnlineUsers from "../../components/OnlineUsers";

const LeaderboardHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell sx={codewarsCellStyles} width="auto">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: 25,
              gap: 5,
            }}
          >
            <Typography>Users</Typography>
            <OnlineUsers />
          </Box>
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
        <TableCell sx={codewarsCellStyles} align="center">
          Rank
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LeaderboardHeader;
