'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { DiamondsCollectButtonCard } from '@/app/dashboard/profile/codewars/components/DiamondsCollectButtonCard';
import { isConnectedToCodewars } from '@/types';

export function CodewarsStatusCard({
  codewarsUser
}: {
  codewarsUser: isConnectedToCodewars;
}) {
  const [showCollectDiamondsBtn, setShowCollectDiamondsBtn] = useState(false);

  if (!codewarsUser.isConnected) {
    return (
      <Card className='group @container/card bg-gradient-to-r from-[var(--kyu-3)] to-[var(--kyu-2)] shadow-lg transition-transform duration-300 hover:scale-[1.02]'>
        <CardHeader className='group-hover:hidden'>
          <CardDescription className='flex max-h-5 items-center gap-2'>
            <IconTrendingUp className='h-5 w-5 text-[var(--royal-gold)]' />
            Codewars Connection
          </CardDescription>
          <CardTitle className='-mt-1 max-h-14 text-[14px] font-semibold'>
            Ready to Begin Your Codewars Journey {codewarsUser.name}?
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-3 text-[12.5px]'>
          <p className='text-muted-foreground hidden group-hover:block'>
            Connect your Codewars account today and unlock{' '}
            <span className='font-semibold text-[var(--royal-gold)]'>
              exclusive BCFCODE statistics
            </span>
            . Track progress, visualize growth, and level up your coding path.
          </p>
          <Link href='/dashboard/profile/codewars/connect'>
            <Button className='bg-accent-foreground hover:bg-muted cursor-pointer text-white shadow-md'>
              Connect Codewars Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  if (showCollectDiamondsBtn)
    return <DiamondsCollectButtonCard count={codewarsUser.totalDiamonds} />;

  return (
    <Card className='group dark:from-accent-foreground @container/card bg-gradient-to-r from-[--champagne-mist] to-[--honey-silk] shadow-lg transition-transform duration-300 hover:scale-[1.02] dark:to-[var(--background)]'>
      <CardHeader>
        <CardDescription className='flex items-center gap-2 group-hover:hidden'>
          <Image
            width={23}
            height={23}
            src='https://www.codewars.com/packs/assets/logo.f607a0fb.svg'
            alt='Codewars Logo'
            // className='h-6 w-6'
          />
          Codewars Connected
        </CardDescription>
        <CardTitle className='text-sm font-bold'>
          {/* Short text default, long text on hover */}
          <span className='block group-hover:hidden'>
            You’re Crushing It, {codewarsUser.name}! 🚀
          </span>
          <span className='text-muted-foreground hidden max-h-16 text-xs font-normal transition-opacity duration-300 group-hover:block'>
            Your Codewars stats are now live inside BCFCODE. Unlock{' '}
            <span className='font-semibold text-[var(--royal-gold)]'>
              exclusive insights
            </span>{' '}
            you can’t find on Codewars. Track progress, visualize growth, and
            keep leveling up.
          </span>
        </CardTitle>
      </CardHeader>
      <CardFooter className='flex items-start justify-between gap-1 text-sm'>
        <Button
          onClick={() => setShowCollectDiamondsBtn(true)}
          className='bg-background hover:bg-muted/30 text-card-foreground cursor-pointer shadow-md'
        >
          Collect Diamonds
        </Button>
        <Link href='/dashboard/profile/codewars'>
          <Button className='bg-background hover:bg-muted/30 text-card-foreground cursor-pointer shadow-md'>
            Full Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
