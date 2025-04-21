import { ReactNode } from "react";
import { montserrat } from "./styles/fonts";
import Providers from "./context/providers";
import "./styles/global.css";

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
      <Providers>{children}</Providers>
    </html>
  );
}
