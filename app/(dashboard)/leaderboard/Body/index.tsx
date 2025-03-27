import { TableBody } from "@mui/material";
import { UsersSection } from "./Sections/Users";
import Users from "./Sections/Users/UsersMap";

const Body = () => {
  // const { isLoading, allUsers } = useAllUsersContext();
  // console.log("allUsers in Body", allUsers);
  return (
    <TableBody>
      <Users>
        <UsersSection />
      </Users>
    </TableBody>
  );
};

export default Body;
