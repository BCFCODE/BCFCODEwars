import DBUserProvider from "@/app/context/providers/db/DBUserProvider";
import { DBUser } from "@/types/db/users";
import { ReactNode } from "react";

interface Props {
  allUsers: DBUser[];
  children: ReactNode;
}

const Users = ({ allUsers, children }: Props) => {
  return allUsers.map((currentUser: DBUser) => (
    <DBUserProvider key={currentUser.email} context={{ allUsers, currentUser }}>
      {children}
    </DBUserProvider>
  ));
};

export default Users;
