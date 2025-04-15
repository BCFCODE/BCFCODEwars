import { TableBody } from "@mui/material";
import UserRow from "./Sections/Users/UserCells/UserRow";
import CollapseSection from "./Sections/Collapse";
import CodewarsSection from "./Sections/Codewars";
import { useUsersStore } from "@/app/store/users";
import { CurrentUserContext } from "../context/CurrentUser";

const Body = () => {
  const allUsers = useUsersStore((s) => s.allUsers);

  return (
    <TableBody>
      {allUsers.map((currentUser) => (
        <CurrentUserContext.Provider
          key={currentUser.email}
          value={currentUser}
        >
          <UserRow />
          <CollapseSection>
            <CodewarsSection />
          </CollapseSection>
        </CurrentUserContext.Provider>
      ))}
    </TableBody>
  );
};

export default Body;
