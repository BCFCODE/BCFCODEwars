import { getPublicUsers } from '@/services/userService';
import dummyData from '../dummyData.json';
import UsersDataTableTabs from './components/Tabs';
import { Metadata } from 'next';
import { baseUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'User Leaderboard',
  description:
    'Check out the BCFCODE User Leaderboard — discover who’s solving the most katas, leveling up fast, and leading the coding battle ranks.',
  openGraph: {
    title: 'BCFCODE User Leaderboard',
    description:
      'Track user progress and kata completions across the BCFCODE community leaderboard.',
    url: `${baseUrl}/dashboard/leaderboard/users`,
    siteName: 'BCFCODE',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg', // this can be another image according to context
        width: 1200,
        height: 630,
        alt: 'BCFCODE User Leaderboard Preview'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCFCODE User Leaderboard',
    description:
      'See who’s leading the kata race on the BCFCODE User Leaderboard.',
    images: [
      'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg' // this can be another image according to context
    ],
    creator: '@bcfcode'
  },
  robots: {
    index: true, // ✅ users leaderboard is public
    follow: true
  }
};

export default async function UsersTablePage() {
  const usersData = (await getPublicUsers()) ?? [];
  const usersTemporaryDummyData = dummyData
    .map((data, i) => (usersData[i] ? { ...data, ...usersData[i] } : data))
    .slice(0, usersData.length);

  return <UsersDataTableTabs initialData={usersTemporaryDummyData} />;
}
