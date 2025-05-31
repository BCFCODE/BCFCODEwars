"use client";

import CodewarsStats from "@/app/components/CodewarsStats";
import LoadingUI from "@/app/components/UI/LoadingUI";
import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import CodewarsStatsFallback from "../components/CodewarsStatsFallback";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const DashboardStats = () => {
  const session = useSession().data as Session;
  const email = session?.user?.email ?? "";

  const { data, isLoading } = useCurrentUserQuery(email);

  const isConnectedToCodewars = data?.codewars.isConnected;

  const list = isConnectedToCodewars ? data.codewars.codeChallenges.list : [];

  const isListEmpty = list.length === 0;

  if (isLoading)
    return (
      <LoadingUI
        title="Calculating your coding victories on Codewars..."
        message="Preparing personalized stats from your Codewars journey..."
      />
    );

  if (isListEmpty) return <CodewarsStatsFallback />;

  return (
    <CodewarsStats
      {...{
        email,
        dimensions: {
          columnsPerBreakpoint: { xs: 2, sm: 2, md: 4, lg: 4, xl: 4 },
          fontSizePerBreakpoint: {
            xs: `${8}vw`,
            sm: `${6}vw`,
            md: `${4}vw`,
            lg: `${3.5}vw`,
            xl: `${3}vw`,
          },
        },
      }}
    />
  );
};

export default DashboardStats;
