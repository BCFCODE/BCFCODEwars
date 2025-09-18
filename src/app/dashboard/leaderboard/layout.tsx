// src/app/dashboard/leaderboard/layout.tsx

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Leaderboard',
    template: '%s | BCFCODE Leaderboard'
  },
  description:
    'Explore coding rankings, kata progress, and achievements inside the BCFCODE Leaderboard dashboard.',
  openGraph: {
    title: 'BCFCODE Leaderboard Dashboard',
    description:
      'Track your coding battles, progress, and community rankings inside BCFCODE.',
    url: 'https://bcfcode.com/dashboard/leaderboard',
    siteName: 'BCFCODE',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg',
        width: 1200,
        height: 630,
        alt: 'BCFCODE Leaderboard Preview'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCFCODE Leaderboard Dashboard',
    description:
      'Your coding battles and performance, visualized in the BCFCODE dashboard.',
    images: [
      'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824941/twitter-image_q83jcs.jpg'
    ],
    creator: '@bcfcode'
  },
  robots: {
    index: false, // ❌ private dashboard wrapper should not be indexed
    follow: false
  }
};

interface Props extends PropsWithChildren {}

export default async function Layout({ children }: Props) {
  /* 
  // Get current route from headers
  const headersList = await headers();
  const pathname =
    headersList.get('x-invoke-path') ||
    headersList.get('referer')?.split('?')[0] ||
    '';
  const currentRoute = pathname.replace(/^\/dashboard\/?/, ''); // Normalize: e.g., "leaderboard/users"
 */
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>{children}</div>
      </div>
    </div>
  );
}
