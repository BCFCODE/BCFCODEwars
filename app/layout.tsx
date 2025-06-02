import { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "./context/providers";
import { montserrat } from "./styles/fonts";
import "./styles/global.css";

export const metadata: Metadata = {
  title: {
    template: "%s | BCFCODE",
    default: "BCFCODE",
  },
  description:
    "Join the best coding battles and challenges at BCFCODE, led by Bakhshandeh Morteza.",
  metadataBase: new URL("https://bcfcode.com"), // or your baseURL
  icons: {
    icon: "https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/favicon_txosgy.png",
    apple:
      "https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/favicon_txosgy.png",
  },
  openGraph: {
    title: "BCFCODE",
    description:
      "Join the best coding battles and challenges at BCFCODE, led by Bakhshandeh Morteza.",
    url: "https://bcfcode.com",
    siteName: "BCFCODE",
    images: [
      {
        url: "https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg",
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
        url: "https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824941/twitter-image_q83jcs.jpg",
        alt: "BCFCODE Twitter Image",
        width: 1200,
        height: 630,
      },
    ],
  },
};

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={montserrat.className}
      data-toolpad-color-scheme="light"
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
