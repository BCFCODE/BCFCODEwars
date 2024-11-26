import { Leaderboard } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Navigation } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { SessionProvider, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import * as React from "react";
import { auth } from "../auth";
import { montserrat } from "../lib/fonts";
// import FlagIcon from '@mui/icons-material/Flag';
import ExploreIcon from "@mui/icons-material/Explore";
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import StarIcon from '@mui/icons-material/Star';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import theme from "../theme";

export const metadata: Metadata = {
  title: {
    template: "%s | BCFCODE",
    default: "BCFCODE",
  },
  description:
    "Welcome to BCFCODE, the home of awesome coding battles built by the BCFCODEteam, led by Bakhshandeh Morteza. Dive in and join the fun!",
  metadataBase: new URL("https://bcfcode.ir/"),

  // Open Graph meta tags
  openGraph: {
    title: "BCFCODE",
    description:
      "Join the best coding battles and challenges at BCFCODE, led by Bakhshandeh Morteza. Ready to test your coding skills?",
    url: "https://bcfcode.ir/",
    siteName: "BCFCODE",
    images: [
      {
        url: "https://bcfcode.ir/opengraph-image.jpg?9de773d50c401793", // URL of your Open Graph image
        width: 1200,
        height: 630,
        alt: "BCFCODE Open Graph Image",
      },
    ],
  },
  // Twitter meta tags
  twitter: {
    card: "summary_large_image", // Large summary card with image
    site: "@BCFCODE", // Twitter handle of the website or owner
    title: "BCFCODE",
    description:
      "Join the best coding battles and challenges at BCFCODE, led by Bakhshandeh Morteza.",
    images: [
      {
        url: "https://bcfcode.ir/twitter-image.jpg?9de773d50c401793", // URL of your Twitter image
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
        borderRadius: "50%", // Rounded logo for a more modern look
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for a professional depth
        marginLeft: 2,
        marginRight: 1,
      }}
    />
  ),
  title: "BCFCODE",
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
