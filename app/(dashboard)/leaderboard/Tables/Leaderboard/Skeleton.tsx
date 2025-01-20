import { Skeleton, TableCell, TableRow } from "@mui/material";
import React from "react";
import { textStyles } from "../../styles";

const SkeletonTableRow: React.FC<{ nOfCols: number }> = ({ nOfCols }) => {
  return (
    <TableRow>
      {Array.from({ length: nOfCols }).map((_, i) => (
        <TableCell sx={textStyles} key={i}>
          <Skeleton variant="text" animation="wave" />
        </TableCell>
      ))}
    </TableRow>
  );
};

export default SkeletonTableRow;
