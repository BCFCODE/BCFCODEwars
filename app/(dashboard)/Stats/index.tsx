"use client";

import CodewarsStats from "@/app/components/CodewarsStats";
import LoadingUI from "@/app/components/UI/LoadingUI";
import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import CodewarsStatsFallback from "../components/CodewarsStatsFallback";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import generateResponsiveFontSizeSX, {
  ResponsiveFontSizeBreakpoint,
} from "@/app/lib/ui/gauges/generateResponsiveFontSizeSX";

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

  const fontSizeBreakpoints: ResponsiveFontSizeBreakpoint[] = [
    { minWidth: 1, fontSize: 8 },
    { minWidth: 240, fontSize: 15 },
    { minWidth: 320, fontSize: 22 },
    { minWidth: 420, fontSize: 30 },
    { minWidth: 560, fontSize: 35 },
    { minWidth: 720, fontSize: 40 },
    { minWidth: 740, fontSize: 44 },
    { minWidth: 900, fontSize: 30 },
    { minWidth: 1020, fontSize: 33.5 },
    { minWidth: 1040, fontSize: 36 },
    { minWidth: 1200, fontSize: 44 },
  ];

  return (
    <CodewarsStats
      {...{
        email,
        gaugeStyles: {
          columnsPerBreakpoint: { xs: 2, sm: 2, md: 4, lg: 4, xl: 4 },
          gaugeInnerTextSX: {
            transform: "translate(0px, 0px)",
            transition: "font-size 1s ease",
            ...generateResponsiveFontSizeSX(fontSizeBreakpoints),
          },
          gaugeFooterTextSx: {
            textAlign: "center",
            transition: "font-size 1s ease, margin 1s ease",
            [`@media (min-width: ${1}px)`]: {
              fontSize: 3,
              marginTop: -10,
            },
            [`@media (min-width: ${220}px)`]: {
              fontSize: 3,
              marginTop: -10,
            },
            [`@media (min-width: ${240}px)`]: {
              fontSize: 5,
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
              marginTop: -3.5,
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
              marginTop: -2,
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
