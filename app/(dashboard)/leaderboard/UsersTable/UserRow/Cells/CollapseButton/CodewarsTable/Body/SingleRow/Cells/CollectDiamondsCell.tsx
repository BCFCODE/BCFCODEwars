import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell, Tooltip } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CollectDiamondsCell = ({ children }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} align="right">
      {children}
    </TableCell>
  );
};

export default CollectDiamondsCell;
