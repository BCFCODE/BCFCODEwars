import AllUsersProvider from "@/app/context/providers/AllUsers";
import DiamondsProvider from "@/app/context/providers/Diamonds";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function LeaderboardLayout({ children }: Props) {
  return (
    <AllUsersProvider>
      <DiamondsProvider>{children}</DiamondsProvider>
    </AllUsersProvider>
  );
}
