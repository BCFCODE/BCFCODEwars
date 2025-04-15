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
  const { setAllUsers, setCurrentUser } = useUsersStore((s) => s.actions);

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
  }, [email, session]);

  return null;
};

export default StoreInitializer;
