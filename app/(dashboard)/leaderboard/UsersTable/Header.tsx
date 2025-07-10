import { TableHead, TableRow, TableCell, Box, Typography } from "@mui/material";
import React from "react";
import { codewarsCellStyles } from "../styles";
import OnlineUsers from "../../components/OnlineUsers";
import useOnlineUsersQuery from "./hooks/useOnlineUsersQuery";

const LeaderboardHeader = () => {
  const { data } = useOnlineUsersQuery();
  console.log(data)
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
            <OnlineUsers totalUsers={10} />
          </Box>
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          Last Activity
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="left">
          Since
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
