import CurrentUserProvider from "@/app/context/providers/CurrentUser";
import { useUsersStore } from "@/app/store/users";
import { AuthenticatedUser } from "@/types/users";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UsersMap = ({ children }: Props) => {
  const allUsers = useUsersStore((state) => state.allUsers);

  return allUsers.map((currentUser: AuthenticatedUser) => (
    <CurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      {children}
    </CurrentUserProvider>
  ));
};

export default UsersMap;
