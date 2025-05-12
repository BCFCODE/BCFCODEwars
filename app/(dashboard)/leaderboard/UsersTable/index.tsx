import CurrentUserProvider from "@/app/context/providers/CurrentUser";
import { AuthenticatedUser } from "@/types/users";
import { TableBody } from "@mui/material";
import UserRow from "./UserRow";
import { useRef, useState } from "react";
import { useUsersStore } from "@/app/context/store/users";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";

interface Props {
  list?: AuthenticatedUser[];
}

const UsersTable = ({ list }: Props) => {
  const onEnterTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onLeaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isOnHover, setIsOnHover] = useState<boolean>();
  const setSelectedUser = useUsersStore((state) => state.setSelectedUser);
  const setIsCollapsed = useUsersStore((state) => state.setIsCollapsed);

  return list?.map((currentUser: AuthenticatedUser) => (
    <CurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      <TableBody
        key={currentUser.email}
        onMouseEnter={() => {
          if (isOnHover === true) {
            onEnterTimerRef.current = setTimeout(() => {
              console.log("User/onMouseEnter", currentUser.email);
              setSelectedUser({ ...currentUser, isCollapsed: true });
              setIsOnHover(() => false);
            }, 50);
          }
          if (onLeaveTimerRef.current) {
            clearTimeout(onLeaveTimerRef.current);
            onLeaveTimerRef.current = null;
          }
        }}
        onMouseLeave={() => {
          onLeaveTimerRef.current = setTimeout(() => {
            console.log("User/onMouseLeave", currentUser.email);
            setIsCollapsed(true);
            setIsOnHover(false);
          }, 1000);
          if (onEnterTimerRef.current) {
            clearTimeout(onEnterTimerRef.current);
            onEnterTimerRef.current = null;
          }
        }}
      >
        <UserRow />
      </TableBody>
    </CurrentUserProvider>
  ));
};

export default UsersTable;
