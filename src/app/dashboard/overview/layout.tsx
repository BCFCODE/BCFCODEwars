import PageContainer from '@/components/layout/page-container';
import { currentUser } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import React from 'react';
import { Badge } from '@/components/UI/Badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/UI/Card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

export const metadata: Metadata = {
  title: {
    default: 'Overview',
    template: '%s | BCFCODE Dashboard'
  },
  description:
    'Private dashboard for managing your coding battles, performance, and profile on BCFCODE.',
  robots: {
    index: false, // ✅ do not index private pages
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true
    }
  }
  // ⚠️ Optional: Keep OG/Twitter disabled for dashboards unless internal previews are needed
  // If you *do* want internal previews, uncomment and adapt below:
  // openGraph: {
  //   title: "BCFCODE Dashboard",
  //   description: "Track your coding battles and performance in the BCFCODE dashboard.",
  //   url: "https://bcfcode.com/dashboard/overview",
  //   siteName: "BCFCODE",
  //   images: [
  //     {
  //       url: "https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/opengraph-image_suelea.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "BCFCODE Dashboard Preview",
  //     },
  //   ],
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "BCFCODE Dashboard",
  //   description: "Manage your coding battles and profile inside the BCFCODE dashboard.",
  //   images: [
  //     {
  //       url: "https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824941/twitter-image_q83jcs.jpg",
  //       alt: "BCFCODE Dashboard Twitter Preview",
  //     },
  //   ],
  // },
};

export default async function OverViewLayout({
  codewars,
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  codewars: React.ReactNode;
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
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
          <Card className='@container/card'>
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
          <Card className='@container/card'>
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
          <Card className='@container/card'>
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
            {/* sales parallel routes */}
            {sales}
          </div>
          <div className='col-span-4'>{area_stats}</div>
          <div className='col-span-4 md:col-span-3'>{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
