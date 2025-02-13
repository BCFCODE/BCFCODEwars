import useDBAllUsersContext from "@/app/context/hooks/useContexts/useDBAllUsersContext";
import { TableBody } from "@mui/material";
import { UsersSection } from "./Sections/Users";
import Skeleton from "./Sections/Users/Skeleton";
import Users from "./Sections/Users/UsersMap";

const Body = () => {
  const { isLoading } = useDBAllUsersContext();

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
