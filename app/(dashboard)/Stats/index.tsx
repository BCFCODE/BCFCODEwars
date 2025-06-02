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
              fontSize: 8,
            },
            [`@media (max-width: ${280}px)`]: {
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
            [`@media (min-width: ${1020}px)`]: {
              fontSize: 33.5,
            },
            [`@media (min-width: ${1040}px)`]: {
              fontSize: 36,
            },
            [`@media (min-width: ${1200}px)`]: {
              fontSize: 44,
            },
          },
          gaugeFooterTextSx: {
            textAlign: "center",
            transition: "font-size 1s ease, margin 1s ease",
            [`@media (max-width: ${220}px)`]: {
              fontSize: 3,
              marginTop: -10,
            },
            [`@media (min-width: ${220}px)`]: {
              fontSize: 3,
              marginTop: -10,
            },
            [`@media (min-width: ${240}px)`]: {
              fontSize: 6,
              marginTop: -9,
            },
            [`@media (min-width: ${280}px)`]: {
              fontSize: 7,
              marginTop: -8,
            },
            [`@media (min-width: ${320}px)`]: {
              fontSize: 7,
              marginTop: -7,
            },
            [`@media (min-width: ${340}px)`]: {
              fontSize: 10,
              marginTop: -6,
            },
            [`@media (min-width: ${420}px)`]: {
              fontSize: 15,
              marginTop: -4,
            },
            [`@media (min-width: ${480}px)`]: {
              fontSize: 15,
              marginTop: -3,
            },
            [`@media (min-width: ${520}px)`]: {
              fontSize: 17,
              marginTop: -2,
            },
            [`@media (min-width: ${600}px)`]: {
              fontSize: 16,
              marginTop: -4,
            },
            [`@media (min-width: ${640}px)`]: {
              fontSize: 18,
              marginTop: -3,
            },
            [`@media (min-width: ${680}px)`]: {
              fontSize: 19,
              marginTop: -2,
            },
            [`@media (min-width: ${720}px)`]: {
              fontSize: 19,
              marginTop: -1,
            },
            [`@media (min-width: ${820}px)`]: {
              fontSize: 19,
              marginTop: 0,
            },
            [`@media (min-width: ${980}px)`]: {
              fontSize: 15,
              marginTop: -4,
            },
            [`@media (min-width: ${1020}px)`]: {
              fontSize: 15,
              marginTop: -3,
            },
            [`@media (min-width: ${1050}px)`]: {
              fontSize: 18,
              marginTop: -2,
            },
            [`@media (min-width: ${1260}px)`]: {
              fontSize: 19,
              marginTop: -1,
            },
          },
        },
      }}
    />
  );
};

export default DashboardStats;
