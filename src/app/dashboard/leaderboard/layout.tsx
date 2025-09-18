import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Leaderboard',
    template: '%s | Leaderboard'
  },
  description:
    'Manage your coding battles, progress, and profile inside the BCFCODE dashboard.',
  openGraph: {
    title: 'BCFCODE Dashboard',
    description:
      'Track your coding battles and performance in the BCFCODE dashboard.',
    url: 'https://bcfcode.com/dashboard',
    siteName: 'BCFCODE',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg',
        width: 1200,
        height: 630,
        alt: 'BCFCODE Dashboard Open Graph'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCFCODE Dashboard',
    description:
      'Manage your coding battles and profile inside the BCFCODE dashboard.',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824941/twitter-image_q83jcs.jpg',
        alt: 'BCFCODE Dashboard Twitter Image'
      }
    ]
  },
  robots: {
    index: false, // 👈 dashboard pages usually should NOT be indexed by search engines
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
