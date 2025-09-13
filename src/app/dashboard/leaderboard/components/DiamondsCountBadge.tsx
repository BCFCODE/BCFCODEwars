'use client';

import { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
  count: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function DiamondsCountBadge({ children, count, size = 'lg' }: Props) {
  const sizeMap = {
    sm: 'text-2xl px-3 py-1.5',
    md: 'text-3xl px-4 py-2',
    lg: 'text-5xl px-6 py-3',
    xl: 'text-7xl px-8 py-4'
  };

  return (
    <div className='flex flex-col items-center gap-2'>
      {/* Big number container */}
      <div
        className={clsx(
          'rounded-xl shadow-inner',
          // Theme-aware gradient
          'bg-gradient-to-r from-[--champagne-mist] to-[--honey-silk] dark:from-[--royal-gold] dark:to-[--amber-legacy]',
          sizeMap[size]
        )}
      >
        <span
          className={clsx(
            'font-extrabold tabular-nums drop-shadow-sm',
            // Theme-aware text
            'text-[--amber-legacy] dark:text-[--royal-gold]'
          )}
        >
          {count}
        </span>
      </div>

      {children && <div className='-mt-10'>{children}</div>}
    </div>
  );
}
