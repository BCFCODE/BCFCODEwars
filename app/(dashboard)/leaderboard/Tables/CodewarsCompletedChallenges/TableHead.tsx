import { TableHead, TableRow, TableCell } from "@mui/material";
import { tableCellStyle } from "../../styles";

export function CodewarsCompletedChallengesTableHead() {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell sx={tableCellStyle}>Date completed</TableCell>
          <TableCell sx={tableCellStyle}>Challenge Name</TableCell>
          <TableCell sx={tableCellStyle}>Rank</TableCell>
          <TableCell sx={tableCellStyle} align="right">
            Diamonds
          </TableCell>
          <TableCell sx={tableCellStyle} align="right">
            Solved Time
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}
