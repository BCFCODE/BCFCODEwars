// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { baseUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'BCFCODE',
  description:
    'Login or get redirected to your dashboard at BCFCODE — the platform for coding battles and challenges.',
  robots: {
    index: false, // 🚫 Don’t index redirect-only pages
    follow: false
  },
  openGraph: {
    title: 'BCFCODE',
    description:
      'Sign in to access your coding battles, progress tracking, and dashboard.',
    url: baseUrl.toString(),
    siteName: 'BCFCODE',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg',
        width: 1200,
        height: 630,
        alt: 'BCFCODE Dashboard Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCFCODE',
    description:
      'Sign in to access your coding battles, progress tracking, and dashboard.',
    images: [
      'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824941/twitter-image_q83jcs.jpg'
    ]
  }
};

export const dynamic = 'force-dynamic'; // Ensure fresh auth check

export default async function Page() {
  const { userId } = await auth();

  // Use replace() instead of redirect() for slightly better performance
  // And combine conditions for cleaner logic
  return redirect(userId ? '/dashboard/overview' : '/auth/sign-in');
}
