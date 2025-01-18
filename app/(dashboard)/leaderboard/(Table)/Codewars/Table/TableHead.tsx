import { TableHead, TableRow, TableCell } from "@mui/material";
import { textStyles } from "../../styles";

export function CodewarsCompletedChallengesTableHead() {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell sx={textStyles}>Date completed</TableCell>
          <TableCell sx={textStyles}>Challenge Name</TableCell>
          <TableCell sx={textStyles}>Rank</TableCell>
          <TableCell sx={textStyles} align="right">
            Earned Diamonds
          </TableCell>
          <TableCell sx={textStyles} align="right">
            Solved Time
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}
