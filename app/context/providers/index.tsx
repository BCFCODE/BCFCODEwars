import dbAPIService from "@/app/api/services/db";
import { auth } from "@/auth";
import theme from "@/theme";
import { baseURL } from "@/utils/constants";
import { Leaderboard } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { LinearProgress } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Navigation } from "@toolpad/core";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { Session } from "next-auth";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import { headers } from "next/headers";
import Image from "next/image";
import * as React from "react";
import { ReactNode } from "react";
import "../../styles/global.css";
import DiamondsProvider from "./Diamonds";
import ReactQueryProvider from "./ReactQuery";
import getQueryClient from "./ReactQuery/queryClient";
import usersQueryKeys from "./ReactQuery/queryKeys/users";

const { getUsers } = new dbAPIService();

export const metadata: Metadata = {
  title: {
    template: "%s | BCFCODE",
    default: "BCFCODE",
  },
  description:
    "Welcome to BCFCODE, the home of awesome coding battles built by the BCFCODEteam, led by Bakhshandeh Morteza. Dive in and join the fun!",
  metadataBase: new URL(`${baseURL}/`),
  openGraph: {
    title: "BCFCODE",
    description:
      "Join the best coding battles and challenges at BCFCODE, led by Bakhshandeh Morteza. Ready to test your coding skills?",
    url: `${baseURL}/`,
    siteName: "BCFCODE",
    images: [
      {
        url: `/app/opengraph-image.jpg`,
        width: 1200,
        height: 630,
        alt: "BCFCODE Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BCFCODE",
    title: "BCFCODE",
    description:
      "Join the best coding battles and challenges at BCFCODE, led by Bakhshandeh Morteza.",
    images: [
      {
        url: `/app/twitter-image.jpg`,
        alt: "BCFCODE Twitter Image",
        width: 1200,
        height: 630,
      },
    ],
  },
};

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
      src="/BCFCODE-LOGO.jpg"
      alt="BCFCODE LOGO"
      unoptimized={true}
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
                <DiamondsProvider>{children}</DiamondsProvider>
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
