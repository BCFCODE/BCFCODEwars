// src/app/dashboard/leaderboard/codewars/page.tsx

import { getPublicCodewarsUsers } from '@/services/userService';
import dummyData from '../dummyData.json';
import CodewarsDataTableTabs from './components/Tabs';
import type { Metadata } from 'next';
import { baseUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Codewars Leaderboard',
  description:
    'See who’s climbing the Codewars ranks on BCFCODE. Track kata completions, discover top performers, and get inspired by the community’s best coders.',
  openGraph: {
    title: 'BCFCODE Codewars Leaderboard',
    description:
      'The official BCFCODE Codewars Leaderboard — explore kata completions, progress, and rankings.',
    url: `${baseUrl}/dashboard/leaderboard/codewars`,
    siteName: 'BCFCODE',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg', // this can be another image according to context
        width: 1200,
        height: 630,
        alt: 'BCFCODE Codewars Leaderboard Preview'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCFCODE Codewars Leaderboard',
    description:
      'Who’s solving the most Codewars katas? Explore the BCFCODE leaderboard and get motivated.',
    images: [
      'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg' // this can be another image according to context
    ],
    creator: '@BCFCODE'
  },
  robots: {
    index: true, // ✅ leaderboard is public, should be indexed
    follow: true
  }
};

export default async function CodewarsTablePage() {
  const codewarsData = (await getPublicCodewarsUsers()) ?? [];

  const codewarsTemporaryDummyData = dummyData
    .map((data, i) =>
      codewarsData[i] ? { ...data, ...codewarsData[i] } : data
    )
    .slice(0, codewarsData.length);

  // console.log(codewarsData);

  return <CodewarsDataTableTabs initialData={codewarsTemporaryDummyData} />;
}
