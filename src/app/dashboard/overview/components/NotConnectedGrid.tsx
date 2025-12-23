'use client';

import { Card } from '@/components/ui/card';
import { UserX } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function NotConnectedGrid() {
  const [isNow, setIsNow] = useState(true);

  if (!isNow) return null;

  return (
    <div className='flex flex-1 flex-col items-center justify-center space-y-6 px-4 py-12 transition-colors duration-500'>
      <div className='col-span-1 md:col-span-2 lg:col-span-4'>
        <Card className='border-muted/20 from-muted/10 to-background mx-auto rounded-xl border border-dashed bg-gradient-to-br p-6 text-center shadow-md'>
          <div className='flex flex-col items-center gap-3'>
            <UserX className='text-muted-foreground h-10 w-10' />
            <h3 className='text-lg font-bold'>Codewars not connected</h3>
            <p className='text-muted-foreground max-w-xl text-sm'>
              Connect your Codewars account to surface your honor, ranks,
              leaderboard position and language stats. Once connected these
              cards will show live metrics and shortcuts to deeper insights.
            </p>
            <div className='mt-4 flex flex-col items-center gap-3 sm:flex-row'>
              <Link href='/dashboard/codewars/connect'>
                <button className='bg-primary text-primary-foreground inline-flex cursor-pointer items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
                  Connect
                </button>
              </Link>

              <button
                onClick={() => setIsNow(false)}
                className='hover:bg-muted inline-flex cursor-pointer items-center rounded-md px-4 py-2 text-sm font-medium'
              >
                Not now
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
