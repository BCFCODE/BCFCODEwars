import DBUserProvider from "@/app/context/providers/db/DBUserProvider";
import { DBUser } from "@/types/db/users";
import React from "react";
import { LeaderboardUsersSection } from ".";

interface Props {
  allUsers: DBUser[];
}

const Users = ({ allUsers }: Props) => {
  return allUsers.map((currentUser: DBUser) => (
    <DBUserProvider key={currentUser.email} context={{ allUsers, currentUser }}>
      <LeaderboardUsersSection />
    </DBUserProvider>
  ));
};

export default Users;
