import { DBUser } from "@/types/db/users";
import { TableBody } from "@mui/material";
import Skeleton from "./Sections/Users/Skeleton";
import Users from "./Sections/Users/UsersMap";
import { UsersSection } from "./Sections/Users";

interface Props {
  allUsers: DBUser[];
  isLoading: boolean;
}

const Body = ({ allUsers, isLoading }: Props) => {
  return (
    <TableBody>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Users {...{ allUsers }}>
          <UsersSection />
        </Users>
      )}
    </TableBody>
  );
};

export default Body;
