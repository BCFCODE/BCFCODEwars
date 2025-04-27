import DiamondsProvider from "@/app/context/providers/Diamonds";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function LeaderboardLayout({ children }: Props) {
  return <DiamondsProvider>{children}</DiamondsProvider>;
}
