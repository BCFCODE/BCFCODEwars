'use client';

import * as React from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ChartRadarKatas } from '@/components/ui/ChartRadarKatas';

const chartData = [
  { kyu: '8 kyū', solved: 275, fill: 'var(--primary)' },
  { kyu: '7 kyū', solved: 200, fill: 'var(--primary-light)' },
  { kyu: '6 kyū', solved: 287, fill: 'var(--primary-lighter)' },
  { kyu: '5 kyū', solved: 173, fill: 'var(--primary-dark)' },
  { kyu: '4 kyū', solved: 190, fill: 'var(--primary-darker)' }
  // ...add down to 1 kyū if you have the data
];

export function CodewarsRadarOverViewPage() {
  const totalSolved = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.solved, 0);
  }, []);

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Kata Mastery Progress</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Your solved katas across each Codewars kyū rank
          </span>
          <span className='@[540px]/card:hidden'>Kyū distribution</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='-my-6'>
          <ChartRadarKatas />
        </div>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          {chartData[0].kyu} leads with{' '}
          {((chartData[0].solved / totalSolved) * 100).toFixed(1)}% of your
          solved katas <IconTrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Based on your activity in the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
