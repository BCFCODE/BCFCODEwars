import useDBAllUsersContext from "@/app/context/hooks/useDBAllUsersContext";
import DBCurrentUserProvider from "@/app/context/providers/db/currentUser/dbCurrentUserProvider";
import { DBUser } from "@/types/db/users";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UsersMap = ({ children }: Props) => {
  const { allUsers } = useDBAllUsersContext();

  return allUsers.map((currentUser: DBUser) => (
    <DBCurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      {children}
    </DBCurrentUserProvider>
  ));
};

export default UsersMap;
