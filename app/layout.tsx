import { Leaderboard } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Navigation } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/nextjs";
import { Metadata } from "next";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import * as React from "react";
import { auth } from "../auth";
import theme from "../theme";
import { montserrat } from "../lib/fonts";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { Typography } from "@mui/material";

export const metadata: Metadata = {
  title: {
    template: "%s | BCFCODE",
    default: "BCFCODE",
  },
  description:
    "Welcome to BCFCODE, the home of awesome coding battles built by the BCFCODEteam, led by Bakhshandeh Morteza. Dive in and join the fun!",
  metadataBase: new URL("https://bcfcode.ir/"),
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
        borderRadius: "50%", // Rounded logo for a more modern look
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for a professional depth
        marginLeft: 2,
        marginRight: 1,
      }}
    />
  ),
  title: 'BCFCODE',
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
              <SpeedInsights />
            </AppProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
