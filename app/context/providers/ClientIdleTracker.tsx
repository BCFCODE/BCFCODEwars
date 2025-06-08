"use client";

import useIdleActivity from "@/app/(dashboard)/leaderboard/UsersTable/UserRow/Cells/Avatar/hooks/useIdleActivity";
import { useSession } from "next-auth/react";

const ClientIdleTracker = () => {
  const session = useSession().data;
  const email = session?.user?.email;

  if (email) {
    useIdleActivity(email);
  }

  return null;
};

export default ClientIdleTracker;
