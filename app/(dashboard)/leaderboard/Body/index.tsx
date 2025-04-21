import { TableBody } from "@mui/material";
import { UsersSection } from "./Sections/Users";
import Users from "./Sections/Users/UsersMap";

const Body = () => {

  return (
    <TableBody>
      <Users>
        <UsersSection />
      </Users>
    </TableBody>
  );
};

export default Body;
