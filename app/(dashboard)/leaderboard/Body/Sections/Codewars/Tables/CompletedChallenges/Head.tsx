import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableHead, TableRow, TableCell } from "@mui/material";

export function Head() {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell sx={textStyles}>Date completed</TableCell>
          <TableCell sx={textStyles}>Challenge Name</TableCell>
          <TableCell sx={textStyles}>Rank</TableCell>
          <TableCell sx={textStyles} align="right">
            Diamonds
          </TableCell>
          <TableCell sx={textStyles} align="right">
            Solved Time
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}
