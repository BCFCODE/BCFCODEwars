import { TableBody } from "@mui/material";
import React from "react";
import DBUserProvider from "@/app/context/providers/db/DBUserProvider";
import { DBUser } from "@/types/db/users";
import { LeaderboardUsers } from "./Collapse";
import SkeletonTableRow from "./Skeleton";

interface Props {
  allUsers: DBUser[];
  isLoading: boolean;
}

const LeaderboardBody = ({ allUsers, isLoading }: Props) => {
  const columns = 6;

  return (
    <TableBody>
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            <SkeletonTableRow key={i} nOfCols={columns} />
          ))
        : allUsers.map((currentUser: DBUser) => (
            <DBUserProvider
              key={currentUser.email}
              context={{ allUsers, currentUser }}
            >
              <LeaderboardUsers />
            </DBUserProvider>
          ))}
    </TableBody>
  );
};

export default LeaderboardBody;
