import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";

const SkeletonTableRow: React.FC<{ nOfCols: number }> = ({ nOfCols }) => {
  return (
    <TableRow>
      {Array.from({ length: nOfCols }).map((_, i) => (
        <TableCell key={i}>
          <Skeleton variant="text" animation="wave" />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default SkeletonTableRow;
