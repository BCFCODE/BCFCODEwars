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
  const onEnterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onLeaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const setSelectedUser = useUsersStore((state) => state.setSelectedUser);
  const selectedUser = useUsersStore((state) => state.user.selectedUser);
  const setIsCollapsed = useUsersStore((state) => state.setIsCollapsed);
  const resetCodewarsPagination = usePaginationStore(
    (state) => state.resetPagination
  );

  return list?.map((currentUser: AuthenticatedUser) => (
    <CurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      <TableBody
        key={currentUser.email}
        // onMouseEnter={() => {
        //   // console.log(
        //   //   "onMouseEnter/selectedUser",
        //   //   currentUser.email,
        //   //   selectedUser?.email,
        //   //   currentUser.email === selectedUser?.email,
        //   //   "selectedUser.isCollapsed",
        //   //   selectedUser?.isCollapsed
        //   // );
        //   if (currentUser.email !== selectedUser?.email) {
        //     onEnterTimerRef.current = setTimeout(() => {
        //       // console.log("User/onMouseEnter/currentUser", currentUser.email);
        //       setSelectedUser({ ...currentUser });
        //       // setIsCollapsed(currentUser.email, true);
        //     }, 300);
        //   }
        //   if (onLeaveTimerRef.current) {
        //     clearTimeout(onLeaveTimerRef.current);
        //     onLeaveTimerRef.current = null;
        //   }
        // }}
        // onMouseLeave={() => {
        //   // console.log(
        //   //   "User/onMouseLeave",
        //   //   currentUser.email,
        //   //   selectedUser?.email,
        //   //   currentUser.email === selectedUser?.email,
        //   //   "selectedUser.isCollapsed",
        //   //   selectedUser?.isCollapsed
        //   // );
        //   console.log(
        //     "resetCodewarsPagination(currentUser.codewars.username)",
        //     currentUser.codewars.username
        //   );
        //   // if(selectedUser)
        //   // resetCodewarsPagination(selectedUser?.codewars.username);
        //   onLeaveTimerRef.current = setTimeout(() => {
        //     // console.log("User/onMouseLeave", currentUser.email);
        //     setIsCollapsed(true);
        //   }, 1500);
        //   if (onEnterTimerRef.current) {
        //     clearTimeout(onEnterTimerRef.current);
        //     onEnterTimerRef.current = null;
        //   }
        // }}
      >
        <UserRow />
      </TableBody>
    </CurrentUserProvider>
  ));
};

export default UsersTable;
