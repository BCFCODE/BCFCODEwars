import AllUsersProvider from "@/app/context/providers/db/allUsers/AllUsersProvider";
import DBDiamondsProvider from "@/app/context/providers/diamonds/DiamondsProvider";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function LeaderboardLayout({ children }: Props) {
  return (
    <AllUsersProvider>
      <DBDiamondsProvider>{children}</DBDiamondsProvider>
    </AllUsersProvider>
  );
}
