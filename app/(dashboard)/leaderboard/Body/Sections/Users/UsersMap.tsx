import useDBAllUsersContext from "@/app/context/hooks/db/useDBAllUsersContext";
import CurrentUserProvider from "@/app/context/providers/db/currentUser/dbCurrentUserProvider";
import { CurrentUser } from "@/types/db/users";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UsersMap = ({ children }: Props) => {
  const { allUsers } = useDBAllUsersContext();

  return allUsers.map((currentUser: CurrentUser) => (
    <CurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      {children}
    </CurrentUserProvider>
  ));
};

export default UsersMap;
