import { TableBody } from "@mui/material";
import React from "react";
import DBUserProvider from "@/app/context/providers/db/DBUserProvider";
import { DBUser } from "@/types/db/users";
import { LeaderboardUsersSection } from "./Sections/Users";
import Row from "./Sections/Users/Skeleton/Row";
import Skeleton from "./Sections/Users/Skeleton";

interface Props {
  allUsers: DBUser[];
  isLoading: boolean;
}

const LeaderboardBody = ({ allUsers, isLoading }: Props) => {
  return (
    <TableBody>
      {isLoading ? (
        <Skeleton />
      ) : (
        allUsers.map((currentUser: DBUser) => (
          <DBUserProvider
            key={currentUser.email}
            context={{ allUsers, currentUser }}
          >
            <LeaderboardUsersSection />
          </DBUserProvider>
        ))
      )}
    </TableBody>
  );
};

export default LeaderboardBody;
