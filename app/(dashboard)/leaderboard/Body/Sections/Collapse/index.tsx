import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { Collapse, TableCell, TableRow } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CollapseSection = ({ children }: Props) => {
  const { isCollapse } = useCurrentUserContext();
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
