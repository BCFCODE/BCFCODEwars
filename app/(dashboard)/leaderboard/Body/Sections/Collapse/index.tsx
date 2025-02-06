import { TableRow, TableCell, Collapse } from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isCollapse: boolean;
}

const CollapseSection = ({ children, isCollapse }: Props) => {
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapseSection;
