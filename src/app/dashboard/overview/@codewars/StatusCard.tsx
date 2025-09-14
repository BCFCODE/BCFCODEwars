'use client';

import { Button } from '@/components/UI/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/UI/card';
import { IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';

export function CodewarsStatusCard({
  codewarsUser
}: {
  codewarsUser: { isConnected: boolean; name: string };
}) {
  if (!codewarsUser.isConnected) {
    return (
      <Card className='@container/card bg-gradient-to-r from-[var(--kyu-3)] to-[var(--kyu-2)] shadow-lg transition-transform duration-300 hover:scale-[1.02]'>
        <CardHeader>
          <CardDescription className='flex items-center gap-2'>
            <IconTrendingUp className='h-5 w-5 text-[var(--royal-gold)]' />
            Codewars Connection
          </CardDescription>
          <CardTitle className='text-md font-bold'>
            Ready to Begin Your Codewars Journey {codewarsUser.name}?
          </CardTitle>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-3 text-sm'>
          <p className='text-muted-foreground'>
            Connect your Codewars account today and unlock{' '}
            <span className='font-semibold text-[var(--royal-gold)]'>
              exclusive BCFCODE statistics
            </span>
            . Track progress, visualize growth, and level up your coding path.
          </p>
          <Link href='/dashboard/codewars/connect'>
            <Button className='bg-accent-foreground cursor-pointer text-white shadow-md hover:bg-[--amber-legacy]'>
              Connect Codewars Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className='@container/card bg-gradient-to-r from-[--champagne-mist] to-[--honey-silk] shadow-lg transition-transform duration-300 hover:scale-[1.02] dark:from-[var(--accent-foreground)] dark:to-[var(--background)]'>
      <CardHeader>
        <CardDescription className='flex items-center gap-2'>
          <img
            src='https://www.codewars.com/packs/assets/logo.f607a0fb.svg'
            alt='Codewars Logo'
            className='h-6 w-6'
          />
          Codewars Connected
        </CardDescription>
        <CardTitle className='text-md font-bold'>
          You’re Crushing It, {codewarsUser.name}! 🚀
        </CardTitle>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-3 text-sm'>
        <p className='text-muted-foreground'>
          Your Codewars stats are now live inside BCFCODE. Unlock{' '}
          <span className='font-semibold text-[var(--royal-gold)]'>
            exclusive insights
          </span>{' '}
          you can’t find on Codewars. Track progress, visualize growth, and keep
          leveling up.
        </p>
        <Link href='/dashboard/codewars'>
          <Button className='cursor-pointer bg-[--kyu-2] text-white shadow-md hover:bg-[--kyu-3]'>
            View Full Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
