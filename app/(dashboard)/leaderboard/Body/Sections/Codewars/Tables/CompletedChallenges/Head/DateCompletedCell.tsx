import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";

export default function DateCompletedCell() {
  return (
    <TableCell sx={textStyles} align="right">
      Completed At
    </TableCell>
  );
}
