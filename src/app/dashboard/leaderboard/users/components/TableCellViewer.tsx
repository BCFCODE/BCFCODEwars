'use client';

import { Button } from '@/components/UI/button';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/UI/chart';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/UI/drawer';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/UI/select';
import { Separator } from '@/components/UI/separator';
import { IconTrendingUp } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { UsersTableData } from '../../types';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';

function TableCellViewer({ item }: { item: UsersTableData }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant='link'
          className='text-foreground w-fit cursor-pointer px-0 text-left'
        >
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>
            Track your Codewars progress and achievements
          </DrawerDescription>
        </DrawerHeader>
        <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          {!isMobile && (
            <>
              {!item.isCodewarsConnected && (
                <div className='bg-card-background flex flex-col items-center justify-center gap-4 rounded-xl border border-transparent bg-gradient-to-r from-[--champagne-mist] to-[--honey-silk] p-6 text-center shadow-lg transition-transform duration-300 hover:scale-[1.02] dark:from-[--royal-gold] dark:to-[--amber-legacy]'>
                  {/* Motivational text */}
                  <div className='space-y-2'>
                    <div className='flex w-full items-center gap-3 text-left tracking-tight'>
                      {/* Codewars logo */}
                      <div className='h-20 w-20 animate-pulse'>
                        <img
                          src='https://www.codewars.com/packs/assets/logo.f607a0fb.svg'
                          alt='Codewars Logo'
                          className='h-full w-full object-contain'
                        />
                      </div>
                      <h3 className='text-foreground text-md font-bold'>
                        Ready to Begin Your Codewars Journey {item.name}?
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
            <Button variant='outline'>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { TableCellViewer };
