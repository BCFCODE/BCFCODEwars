"use client";

import { Session } from "next-auth";
import { useUsersStore } from "./users";
import { useEffect } from "react";
import dbAPIService from "../api/services/db";
import { AuthenticatedUser } from "@/types/users";

const { getUsers } = new dbAPIService();

interface Props {
  session: Session | null;
}

const StoreInitializer = ({ session }: Props) => {
  const email = session?.user?.email;
  // console.log("StoreInitializer/session", session, email);
  const setCurrentUser = useUsersStore((s) => s.setCurrentUser);
  const setAllUsers = useUsersStore((s) => s.setAllUsers);

  useEffect(() => {
    if (!email) return;

    (async () => {
      const { users } = await getUsers({ cache: "no-store" });

      const allUsers = (users as AuthenticatedUser[]).map((u) =>
        u.email === email ? { ...u, session } : u
      );
      
      setAllUsers(allUsers);
      setCurrentUser(email);

      // console.log("StoreInitializer/users", currentUser, allUsers);
    })();
    // TODO: Post a get request to currentUser api, with email, to fetch current user from api
  }, [email, session]);

  return null;
};

export default StoreInitializer;
