import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import { TableBody } from "@mui/material";
import { UsersSection } from "./Sections/Users";
import Skeleton from "./Sections/Users/Skeleton";
import Users from "./Sections/Users/UsersMap";

const Body = () => {
  const { isLoading, allUsers } = useAllUsersContext();
  console.log("allUsers in Body", allUsers);
  return (
    <TableBody>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Users>
          <UsersSection />
        </Users>
      )}
    </TableBody>
  );
};

export default Body;
