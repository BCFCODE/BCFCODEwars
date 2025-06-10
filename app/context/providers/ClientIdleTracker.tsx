"use client";

import useIdleToggle from "@/app/(dashboard)/leaderboard/UsersTable/UserRow/Cells/Avatar/hooks/useIdleToggle";
import { useSession } from "next-auth/react";

const ClientIdleTracker = () => {
  const session = useSession().data;
  const email = session?.user?.email;

  if (email) {
    useIdleToggle(email);
  }

  return null;
};

export default ClientIdleTracker;
