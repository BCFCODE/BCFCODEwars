import AllUsersProvider from "@/app/context/providers/AllUsers";
import DBDiamondsProvider from "@/app/context/providers/Diamonds";
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
