'use client';

import { Button } from '@/components/ui/button';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { UsersTableData } from '../../types';
import Image from 'next/image';

// Sample chart data (replace with actual data from item)
const chartData = [
  { month: 'Jan', katas: 10 },
  { month: 'Feb', katas: 15 },
  { month: 'Mar', katas: 25 },
  { month: 'Apr', katas: 20 },
  { month: 'May', katas: 30 },
  { month: 'Jun', katas: 40 }
];

const chartConfig: ChartConfig = {
  katas: {
    label: 'Completed Katas',
    color: 'var(--chart-1)' // Teal
  }
};

function TableCellViewer({ user }: { user: UsersTableData }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant='link'
          className='text-foreground w-fit cursor-pointer px-0 text-left'
        >
          {user.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>{user.name}</DrawerTitle>
          <DrawerDescription>Under development...</DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          {!isMobile && (
            <>
              {user.isCodewarsConnected ? (
                <div className='bg-card-background flex flex-col items-center justify-center gap-4 rounded-xl border border-transparent bg-gradient-to-r from-[--kyu-3] to-[--kyu-2] p-6 text-center shadow-lg transition-transform duration-300 hover:scale-[1.02]'>
                  {/* Celebratory text */}
                  <div className='space-y-2'>
                    <div className='flex w-full items-center gap-3 text-left tracking-tight'>
                      <IconTrendingUp className='text-royal-gold h-8 w-8' />
                      <h3 className='text-foreground text-lg font-bold'>
                        You’re Crushing It, {user.name}!
                      </h3>
                    </div>
                    <p className='text-muted-foreground text-left text-sm leading-relaxed'>
                      Your Codewars journey is on fire! 🚀 Explore your{' '}
                      <span className='text-kyu-3 font-semibold'>
                        exclusive BCFCODE stats
                      </span>{' '}
                      and watch your coding skills soar to new heights.
                    </p>
                  </div>

                  {/* Progress chart */}
                  <ChartContainer
                    config={chartConfig}
                    className='h-[200px] w-full'
                  >
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='month' />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type='monotone'
                        dataKey='katas'
                        stroke='var(--chart-1)'
                        fill='var(--chart-1)'
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ChartContainer>

                  {/* CTA button */}
                  <Link href='/dashboard/codewars'>
                    <Button
                      size='lg'
                      className='bg-accent-foreground cursor-pointer text-white shadow-md transition-all hover:bg-[--kyu-2] hover:shadow-lg'
                    >
                      View Full Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className='bg-card-background flex flex-col items-center justify-center gap-4 rounded-xl border border-transparent bg-gradient-to-r from-[--champagne-mist] to-[--honey-silk] p-6 text-center shadow-lg transition-transform duration-300 hover:scale-[1.02] dark:from-[--royal-gold] dark:to-[--amber-legacy]'>
                  {/* Motivational text */}
                  <div className='space-y-2'>
                    <div className='flex w-full items-center gap-3 text-left tracking-tight'>
                      {/* Codewars logo */}
                      <div className='h-20 w-20 animate-pulse'>
                        <Image
                          src='https://www.codewars.com/packs/assets/logo.f607a0fb.svg'
                          alt='Codewars Logo'
                          width={30}
                          height={30}
                          // className='h-full w-full object-contain'
                        />
                      </div>
                      <h3 className='text-foreground text-md font-bold'>
                        Ready to Begin Your Codewars Journey {user.name}?
                      </h3>
                    </div>
                    <p className='text-muted-foreground text-left text-sm leading-relaxed'>
                      Connect your Codewars account today and unlock{' '}
                      <span className='text-royal-gold font-semibold'>
                        exclusive BCFCODE statistics
                      </span>{' '}
                      you can’t find anywhere else. Track progress, visualize
                      growth, and level up your coding path.
                    </p>
                  </div>

                  {/* CTA button */}
                  <Link href='/dashboard/codewars/connect'>
                    <Button
                      size='lg'
                      className='bg-accent-foreground cursor-pointer text-white shadow-md transition-all hover:bg-[--amber-legacy] hover:shadow-lg'
                    >
                      Connect Codewars Account
                    </Button>
                  </Link>
                </div>
              )}

              <Separator />
            </>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className='cursor-pointer' variant='outline'>
              Done
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { TableCellViewer };
