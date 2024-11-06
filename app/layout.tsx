import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Navigation } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import * as React from "react";
import { auth } from "../auth";
import theme from "../theme";
import { montserrat } from "./lib/fonts";
import { Leaderboard } from "@mui/icons-material";

export const metadata: Metadata = {
  title: {
    template: "%s | BCFCODEwars",
    default: "BCFCODEwars",
  },
  description:
    "Welcome to BCFCODEwars, the home of awesome coding battles built by the BCFCODEteam, led by Bakhshandeh Morteza. Dive in and join the fun!",
  metadataBase: new URL("https://bcfcodewars.vercel.app/"),
};

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
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
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'leaderboard',
    title: 'Leader board',
    icon: <Leaderboard />,
  },
];

const BRANDING = {
  logo: (
    <Image
      width={40}
      height={40}
      src="/BCFCODEwars LOGO.png"
      alt="BCFCODEwars LOGO"
    />
  ),
  title: "BCFCODEwars",
};


const AUTHENTICATION = {
  signIn,
  signOut,
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body className={montserrat.className}>
        <SessionProvider session={session}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              session={session}
              authentication={AUTHENTICATION}
              theme={theme}
            >
              {props.children}
              <Analytics />
            </AppProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
