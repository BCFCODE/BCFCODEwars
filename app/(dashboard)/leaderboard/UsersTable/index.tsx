import CurrentUserProvider from "@/app/context/providers/CurrentUser";
import { AuthenticatedUser } from "@/types/users";
import { TableBody } from "@mui/material";
import UserRow from "./UserRow";
import { useRef, useState } from "react";
import { useUsersStore } from "@/app/context/store/users";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import usePaginationStore from "./UserRow/Cells/CollapseButton/CodewarsTable/Pagination/usePaginationStore";

interface Props {
  list?: AuthenticatedUser[];
}

const UsersTable = ({ list }: Props) => {
  const onMouseEnterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const selectedUser = useUsersStore((state) => state.user.selectedUser);
  const isCollapsed = useUsersStore((state) => state.user.isCollapsed);
  const setIsCollapsed = useUsersStore((state) => state.setIsCollapsed);

  return list?.map((currentUser: AuthenticatedUser) => (
    <CurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      <TableBody
        key={currentUser.email}
        onMouseEnter={() => {
          const isHoverOnLastSelectedUser =
            currentUser.email === selectedUser?.email;
          if (isHoverOnLastSelectedUser && onMouseEnterTimerRef.current) {
            clearTimeout(onMouseEnterTimerRef.current);
            onMouseEnterTimerRef.current = null;
          }
          if (
            selectedUser &&
            !isHoverOnLastSelectedUser &&
            !isCollapsed[selectedUser.email]
          ) {
            onMouseEnterTimerRef.current = setTimeout(() => {
              if (selectedUser) setIsCollapsed(selectedUser.email, true);

              if (onMouseEnterTimerRef.current) {
                clearTimeout(onMouseEnterTimerRef.current);
                onMouseEnterTimerRef.current = null;
              }
            }, 2000);
          }
        }}
      >
        <UserRow />
      </TableBody>
    </CurrentUserProvider>
  ));
};

export default UsersTable;
