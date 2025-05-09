import CurrentUserProvider from "@/app/context/providers/CurrentUser";
import { AuthenticatedUser } from "@/types/users";
import { TableBody } from "@mui/material";
import UserRow from "./UserRow";

interface Props {
  list?: AuthenticatedUser[];
}

const UsersTable = ({ list }: Props) => {
  return list?.map((user: AuthenticatedUser) => (
    <CurrentUserProvider key={user.email} context={{ currentUser: user }}>
      <TableBody>
        <UserRow key={user.email} currentUser={user} />
      </TableBody>
    </CurrentUserProvider>
  ));
};

export default UsersTable;
