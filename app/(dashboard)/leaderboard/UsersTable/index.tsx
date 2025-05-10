import CurrentUserProvider from "@/app/context/providers/CurrentUser";
import { AuthenticatedUser } from "@/types/users";
import { TableBody } from "@mui/material";
import UserRow from "./UserRow";
import usePaginationQuery from "./Pagination/usePaginationQuery";

const UsersTable = () => {
  const { data } = usePaginationQuery();
  return data?.list.map((user: AuthenticatedUser) => (
    <CurrentUserProvider key={user.email} context={{ currentUser: user }}>
      <TableBody>
        <UserRow key={user.email} />
      </TableBody>
    </CurrentUserProvider>
  ));
};

export default UsersTable;
