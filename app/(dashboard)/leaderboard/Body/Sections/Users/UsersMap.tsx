import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import useUsersQuery from "@/app/context/hooks/ReactQuery/useUsersQuery";
import CurrentUserProvider from "@/app/context/providers/CurrentUser";
import { AuthenticatedUser } from "@/types/users";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const UsersMap = ({ children }: Props) => {
  // const {data: allUsers} = useUsersQuery()
  const { allUsers } = useAllUsersContext();

  // console.log('allUsers in UsersMap', allUsers)
  return allUsers?.map((currentUser: AuthenticatedUser) => (
    <CurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      {children}
    </CurrentUserProvider>
  ));
};

export default UsersMap;
