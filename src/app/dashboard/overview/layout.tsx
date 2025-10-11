// app/dashboard/overview/layout.tsx

import PageContainer from '@/components/layout/page-container';
import { currentUser } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { baseUrl } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Overview | BCFCODE Dashboard',
  description:
    'Your BCFCODE overview — track your coding activity, monitor progress, and stay motivated with real-time stats and insights.',
  openGraph: {
    title: 'BCFCODE Dashboard Overview',
    description:
      'Get a snapshot of your coding journey: recent katas, growth rate, and personalized insights inside BCFCODE.',
    url: `${baseUrl}/dashboard/overview`,
    siteName: 'BCFCODE',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/dashboard-overview-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'BCFCODE Dashboard Overview Preview'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCFCODE Dashboard Overview',
    description:
      'See your BCFCODE activity at a glance: recent katas, growth stats, and progress insights.',
    images: [
      'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/dashboard-overview-preview.jpg'
    ],
    creator: '@BCFCODE'
  },
  robots: {
    index: false, // 👈 dashboard overview is private, don’t index
    follow: false
  }
};

export default async function OverViewLayout({
  codewars,
  kata_champions,
  codewars_radar_chart,
  bar_stats,
  area_stats
}: {
  codewars: React.ReactNode;
  kata_champions: React.ReactNode;
  codewars_radar_chart: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  const user = await currentUser();

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back {user?.firstName ?? 'Guest'}👋
          </h2>
        </div>

        {/* <Cards /> */}
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card bg-gradient-to-t from-[var(--bg-background)]/10 to-[var(--kyu-5)]/10 dark:from-[var(--bg-background)]/10 dark:to-[var(--kyu-5)]/10'>
            <CardHeader>
              <CardDescription>New Customers</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                1,234
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingDown />
                  -20%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Down 20% this period <IconTrendingDown className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Acquisition needs attention
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card bg-gradient-to-t from-[var(--bg-background)]/10 to-[var(--kyu-5)]/10 dark:from-[var(--bg-background)]/10 dark:to-[var(--kyu-5)]/10'>
            <CardHeader>
              <CardDescription>Active Accounts</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                45,678
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Strong user retention <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Engagement exceed targets
              </div>
            </CardFooter>
          </Card>
          <Card className='@container/card bg-gradient-to-t from-[var(--bg-background)]/10 to-[var(--kyu-5)]/10 dark:from-[var(--bg-background)]/10 dark:to-[var(--kyu-5)]/10'>
            <CardHeader>
              <CardDescription>Growth Rate</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                4.5%
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Steady performance increase{' '}
                <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Meets growth projections
              </div>
            </CardFooter>
          </Card>
          {codewars}
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {/* kata_champions parallel routes */}
            {kata_champions}
          </div>
          <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 md:col-span-3'>{codewars_radar_chart}</div>
        </div>
      </div>
    </PageContainer>
  );
}
