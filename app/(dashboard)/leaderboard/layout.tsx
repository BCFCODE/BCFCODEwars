import DBAllUsersProvider from "@/app/context/providers/db/allUsers/dbAllUsersProvider";
import DBDiamondsProvider from "@/app/context/providers/diamonds/DiamondsProvider";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function LeaderboardLayout({ children }: Props) {
  return (
    <DBAllUsersProvider>
      <DBDiamondsProvider>{children}</DBDiamondsProvider>
    </DBAllUsersProvider>
  );
}
