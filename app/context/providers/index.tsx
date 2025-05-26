//this is my app\context\providers\index.tsx

import DatabaseAPIService from "@/app/api/services/db";
import { auth } from "@/auth";
import theme from "@/theme";
import { Leaderboard } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { LinearProgress } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Navigation } from "@toolpad/core";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Session } from "next-auth";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { headers } from "next/headers";
import Image from "next/image";
import * as React from "react";
import { ReactNode } from "react";
import "../../styles/global.css";
import ReactQueryProvider from "./ReactQuery";
import getQueryClient from "./ReactQuery/queryClient";
import usersQueryKeys from "./ReactQuery/queryKeys/users";

const { getUsers } = new DatabaseAPIService();

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Control Center",
  },
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "wars",
    title: "Wars",
    icon: <MilitaryTechIcon />,
  },
  {
    segment: "missions",
    title: "Missions",
    icon: <ExploreIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "leaderboard",
    title: "Leader board",
    icon: <Leaderboard />,
  },
];

const BRANDING = {
  logo: (
    <Image
      width={40}
      height={40}
      src="https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/favicon_txosgy.png"
      alt="BCFCODE LOGO"
      // unoptimized={true}
      loading="lazy"
      style={{
        borderRadius: "50%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    />
  ),
  title: "BCFCODE",
};

const AUTHENTICATION = {
  signIn,
  signOut,
};

interface Props {
  children: ReactNode;
}

const Providers = async ({ children }: Props) => {
  // Await headers() and ensure its operations are performed synchronously after awaiting
  const headersList = await headers();
  const forwardedProto = headersList.get("x-forwarded-proto");

  // Await the auth call after resolving headers
  const session: Session | null = await auth(); // Now fully async

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [usersQueryKeys.usersList],
    queryFn: async () =>
      await getUsers({
        skip: 0,
        limit: 10,
        page: 0,
        rowsPerPage: 10,
        apiPageNumber: 0,
      }),
    retry: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        <HydrationBoundary state={dehydratedState}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <React.Suspense fallback={<LinearProgress />}>
              <NextAppProvider
                navigation={NAVIGATION}
                branding={BRANDING}
                session={session}
                authentication={AUTHENTICATION}
                theme={theme}
              >
                {children}
                <Analytics />
                <SpeedInsights />
              </NextAppProvider>
            </React.Suspense>
          </AppRouterCacheProvider>
        </HydrationBoundary>
      </ReactQueryProvider>
    </SessionProvider>
  );
};

export default Providers;
