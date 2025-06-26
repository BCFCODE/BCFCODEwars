"use client";

import CodewarsStats from "@/app/components/CodewarsStats";
import LoadingUI from "@/app/components/UI/LoadingUI";
import useCurrentUserQuery from "@/app/context/hooks/useCurrentUserQuery";
import CodewarsStatsFallback from "../components/CodewarsStatsFallback";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import generateResponsiveSX, {
  ResponsiveBreakpoint,
} from "@/app/lib/ui/gauges/generateResponsiveSX";

const DashboardStats = () => {
  const session = useSession().data as Session;
  const email = session?.user?.email ?? "";

  const { data, isLoading } = useCurrentUserQuery(email);

  const isConnectedToCodewars = data?.codewars.isConnected;

  const list = isConnectedToCodewars ? data.codewars.codeChallenges.list : [];

  const isListEmpty = list.length === 0;

  if (true) return <CodewarsStatsFallback />;
  if (isLoading)
    return (
      <LoadingUI
        title="Calculating your coding victories on Codewars..."
        message="Preparing personalized stats from your Codewars journey..."
      />
    );

  if (isListEmpty) return <CodewarsStatsFallback />;

  const gaugeInnerTextSXBreakpoints: ResponsiveBreakpoint[] = [
    { minWidth: 1, sx: { fontSize: 8 } },
    { minWidth: 240, sx: { fontSize: 15 } },
    { minWidth: 320, sx: { fontSize: 22 } },
    { minWidth: 420, sx: { fontSize: 30 } },
    { minWidth: 560, sx: { fontSize: 35 } },
    { minWidth: 720, sx: { fontSize: 40 } },
    { minWidth: 740, sx: { fontSize: 44 } },
    { minWidth: 900, sx: { fontSize: 30 } },
    { minWidth: 1020, sx: { fontSize: 33.5 } },
    { minWidth: 1040, sx: { fontSize: 36 } },
    { minWidth: 1200, sx: { fontSize: 44 } },
  ];

  const gaugeFooterTextSXBreakpoints: ResponsiveBreakpoint[] = [
    { minWidth: 1, sx: { fontSize: 3, marginTop: -10 } },
    { minWidth: 220, sx: { fontSize: 3, marginTop: -10 } },
    { minWidth: 240, sx: { fontSize: 5, marginTop: -9 } },
    { minWidth: 280, sx: { fontSize: 7, marginTop: -8 } },
    { minWidth: 320, sx: { fontSize: 7, marginTop: -7 } },
    { minWidth: 340, sx: { fontSize: 10, marginTop: -6 } },
    { minWidth: 420, sx: { fontSize: 15, marginTop: -3.5 } },
    { minWidth: 480, sx: { fontSize: 15, marginTop: -3 } },
    { minWidth: 520, sx: { fontSize: 17, marginTop: -2 } },
    { minWidth: 600, sx: { fontSize: 16, marginTop: -4 } },
    { minWidth: 640, sx: { fontSize: 18, marginTop: -2 } },
    { minWidth: 680, sx: { fontSize: 19, marginTop: -2 } },
    { minWidth: 720, sx: { fontSize: 19, marginTop: -1 } },
    { minWidth: 820, sx: { fontSize: 20, marginTop: 0 } },
    { minWidth: 890, sx: { fontSize: 14, marginTop: -4.5 } },
    { minWidth: 900, sx: { fontSize: 15, marginTop: -4 } },
    { minWidth: 1020, sx: { fontSize: 14, marginTop: -3 } },
    { minWidth: 1050, sx: { fontSize: 17, marginTop: -3 } },
    { minWidth: 1120, sx: { fontSize: 16, marginTop: -2 } },
    { minWidth: 1260, sx: { fontSize: 19, marginTop: -1 } },
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
            ...generateResponsiveSX(gaugeInnerTextSXBreakpoints),
          },
          gaugeFooterTextSX: {
            textAlign: "center",
            transition: "font-size 1s ease, margin 1s ease",
            ...generateResponsiveSX(gaugeFooterTextSXBreakpoints),
          },
        },
      }}
    />
  );
};

export default DashboardStats;
