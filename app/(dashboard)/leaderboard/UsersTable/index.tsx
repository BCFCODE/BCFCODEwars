import CurrentUserProvider from "@/app/context/providers/CurrentUser";
import { AuthenticatedUser } from "@/types/users";
import { TableBody } from "@mui/material";
import UserRow from "./UserRow";

interface Props {
  list?: AuthenticatedUser[];
}

const UsersTable = ({ list }: Props) => {
  return list?.map((currentUser: AuthenticatedUser) => (
    <CurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      <TableBody>
        <UserRow />
      </TableBody>
      
    </CurrentUserProvider>
  ));
};

export default UsersTable;
