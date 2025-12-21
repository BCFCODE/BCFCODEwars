import PageContainer from '@/components/layout/page-container';
import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Codewars | BCFCODE Dashboard',
  description:
    'Your Codewars on BCFCODE — honor, ranks, leaderboard position and language stats.',
  robots: { index: false, follow: false }
};

interface Props extends PropsWithChildren {}

export default async function Layout({ children }: Props) {
  return <PageContainer>{children}</PageContainer>;
}
