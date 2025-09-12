import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/UI/sonner';
import { fontVariables } from '@/lib/font';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { cn } from '@/lib/utils';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import './theme.css';
import { baseUrl } from '@/lib/constants';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export const metadata: Metadata = {
  title: {
    template: '%s | BCFCODE',
    default: 'BCFCODE'
  },
  description:
    'Join the best coding battles and challenges at BCFCODE, led by Bakhshandeh Morteza.',
  metadataBase: new URL(baseUrl), // or your baseURL
  icons: {
    icon: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/favicon_txosgy.png',
    apple:
      'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/favicon_txosgy.png'
  },
  openGraph: {
    title: 'BCFCODE',
    description:
      'Join the best coding battles and challenges at BCFCODE, led by Bakhshandeh Morteza.',
    url: baseUrl.toString(),
    siteName: 'BCFCODE',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg',
        width: 1200,
        height: 630,
        alt: 'BCFCODE Open Graph Image'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@BCFCODE',
    title: 'BCFCODE',
    description:
      'Join the best coding battles and challenges at BCFCODE, led by Bakhshandeh Morteza.',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824941/twitter-image_q83jcs.jpg',
        alt: 'BCFCODE Twitter Image',
        width: 1200,
        height: 630
      }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const isScaled = activeThemeValue?.endsWith('-scaled');

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background overflow-hidden overscroll-none font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Providers activeThemeValue={activeThemeValue as string}>
              <Toaster />
              {children}
              <Analytics />
              <SpeedInsights />
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
