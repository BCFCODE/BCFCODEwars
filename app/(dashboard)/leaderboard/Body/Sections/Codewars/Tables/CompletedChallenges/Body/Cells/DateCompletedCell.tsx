import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";

interface Props {
  completedAt: string;
}

const DateCompletedCell = ({ completedAt }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} component="th" scope="row">
      {new Date(completedAt).toLocaleDateString()}
    </TableCell>
  );
};

export default DateCompletedCell;
