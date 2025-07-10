import { Box, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import OnlineUsers from "../../components/OnlineUsers";
import { codewarsCellStyles } from "../styles";
import useOnlineUsersQuery from "./hooks/useOnlineUsersQuery";

const LeaderboardHeader = () => {
  const { data } = useOnlineUsersQuery();

  // Optimization is necessary, too many renders...
  // console.log(">>>>>>>>>>", data, isLoading);

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
            <Typography>
              {data?.list?.length ? `Online users:` : `Users`}
            </Typography>

            <OnlineUsers
              sx={{ marginLeft: -3 }}
              list={data?.list ?? []}
              totalUsers={data?.list?.length ?? 0}
            />
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
