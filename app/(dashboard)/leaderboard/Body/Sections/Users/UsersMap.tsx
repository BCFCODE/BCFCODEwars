import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import CurrentUserProvider from "@/app/context/providers/CurrentUser";
import { CurrentUser } from "@/types/users";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UsersMap = ({ children }: Props) => {
  const { allUsers } = useAllUsersContext();

  return allUsers.map((currentUser: CurrentUser) => (
    <CurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      {children}
    </CurrentUserProvider>
  ));
};

export default UsersMap;
