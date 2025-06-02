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
        gaugeStyles: {
          columnsPerBreakpoint: { xs: 2, sm: 2, md: 4, lg: 4, xl: 4 },
          gaugeInnerTextSX: {
            transform: "translate(0px, 0px)",
            transition: "font-size 1s ease",
            [`@media (max-width: ${240}px)`]: {
              fontSize: 10,
            },
            [`@media (min-width: ${320}px)`]: {
              fontSize: 18,
            },
            [`@media (min-width: ${420}px)`]: {
              fontSize: 30,
            },
            [`@media (min-width: ${560}px)`]: {
              fontSize: 35,
            },
            [`@media (min-width: ${720}px)`]: {
              fontSize: 45,
            },
            [`@media (min-width: ${920}px)`]: {
              fontSize: 30,
            },
            [`@media (min-width: ${1080}px)`]: {
              fontSize: 35,
            },
            [`@media (min-width: ${1200}px)`]: {
              fontSize: 44,
            },
          },
          gaugeFooterTextSx: {
            textAlign: "center",
            // fontSize: {
            //   xs: `${0.7}rem`,
            //   sm: `${1}rem`,
            //   md: `${0.8}rem`,
            //   lg: `${1.2}rem`,
            //   xl: `${1}rem`,
            // },
            // position: 'absolute'
          },
        },
      }}
    />
  );
};

export default DashboardStats;
