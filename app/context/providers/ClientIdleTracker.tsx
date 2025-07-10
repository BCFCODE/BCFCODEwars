"use client";

import useIdleHistory from "@/app/(dashboard)/leaderboard/UsersTable/hooks/useIdleHistory";
import { useSession } from "next-auth/react";

const ClientIdleTracker = () => {
  const session = useSession().data;
  const name = session?.user?.name ?? "";
  const email = session?.user?.email ?? "";
  const image = session?.user?.image ?? "";

  if (session) {
    useIdleHistory({ name, email, image });
  }

  return null;
};

export default ClientIdleTracker;
