"use client";

import useIdleHistory from "@/app/(dashboard)/leaderboard/UsersTable/UserRow/Cells/Avatar/hooks/useIdleHistory";
import { useSession } from "next-auth/react";

const ClientIdleTracker = () => {
  const session = useSession().data;
  const email = session?.user?.email;

  if (email) {
    useIdleHistory(email);
  }

  return null;
};

export default ClientIdleTracker;
