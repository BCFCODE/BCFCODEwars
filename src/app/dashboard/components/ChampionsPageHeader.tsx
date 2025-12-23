'use client';

import type { isConnectedToCodewarsSafeParseReturnType } from '@/types';
import { use } from 'react';

interface Props {
  codewarsDataPromise: Promise<isConnectedToCodewarsSafeParseReturnType>;
}

const ChampionsPageHeader = ({ codewarsDataPromise }: Props) => {
  const { success, data: codewarsData = { isConnected: false } } =
    use(codewarsDataPromise);

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='min-w-0 space-y-2'>
        <h2 className='text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white'>
          Recently Solved Katas
          <span className='ml-2 text-base font-normal text-gray-500 dark:text-gray-400'>
            — Codewars History
          </span>
        </h2>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
          {codewarsData?.isConnected ? (
            'Explore the live history of solved katas from the BCFCODE community.'
          ) : (
            <span className='flex flex-col gap-2 sm:flex-row sm:items-center'>
              <span className='inline-flex items-center gap-2 rounded-full border border-gray-300/30 px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400'>
                <span className='h-2 w-2 rounded-full bg-red-500' />
                Not connected
              </span>
              <span className='ml-0 sm:ml-2'>
                Connect your Codewars account to view your history.
              </span>
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ChampionsPageHeader;
