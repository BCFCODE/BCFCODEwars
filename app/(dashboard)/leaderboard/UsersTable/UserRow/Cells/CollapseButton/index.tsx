import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { useUsersStore } from "@/app/store/users";
import { Collapse, TableCell, TableRow } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const CollapseBoundary = ({ children }: Props) => {
  const { currentUser } = useCurrentUserContext();
  const isCollapsed = useUsersStore(
    (state) => state.user.isCollapsed[currentUser.email] ?? true
  );
  const selectedUser = useUsersStore((state) => state.user.selectedUser);

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse  in={!isCollapsed} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default CollapseBoundary;
