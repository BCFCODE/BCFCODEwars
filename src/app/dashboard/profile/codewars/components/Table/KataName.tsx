'use client';

import React, { useMemo } from 'react';
import clsx from 'clsx';
import { motion, MotionStyle } from 'framer-motion';
import dayjs from '@/lib/dayjs';

interface CustomMotionStyle extends MotionStyle {
  '--gradient-from'?: string;
  '--gradient-to'?: string;
}

interface Props {
  name: string;
  date?: Date | string | number; // Optional date to align gradient logic with DaysAgo/SolvedOn
  className?: string;
}

export const KataName: React.FC<Props> = ({ name, date, className }) => {
  const { gradientFrom, gradientTo, textColor } = useMemo(() => {
    let gradientFrom = '--color-background';
    let gradientTo = '--color-kyu-5';
    let textColor = '--text-color-light'; // Darker color for light mode

    if (date) {
      const seconds = dayjs().diff(dayjs(date), 'second');
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) {
        gradientTo = '--color-primary';
        textColor = '--color-primary-foreground';
      } else if (minutes < 60) {
        gradientTo = '--color-kyu-6';
      } else if (hours < 24) {
        gradientTo = '--color-kyu-5';
      } else if (days < 7) {
        gradientTo = '--color-kyu-3';
        textColor = '--color-primary-foreground';
      } else if (days < 365) {
        gradientTo = '--color-kyu-2';
      } else {
        gradientTo = '--color-rose-gleam';
        textColor = '--color-primary-foreground';
      }
    }

    return { gradientFrom, gradientTo, textColor };
  }, [date]);

  return (
    <motion.div
      className={clsx(
        'relative inline-flex w-100 items-center gap-1 rounded-2xl px-2 py-1 text-sm font-semibold tracking-tight hover:w-full',
        // 'bg-gradient-to-br from-[var(--gradient-from)]/20 to-[var(--gradient-to)]/20 dark:from-[var(--gradient-from)]/5 dark:to-[var(--gradient-to)]/5',
        // 'border border-[color-mix(in_srgb,_var(--gradient-to)_10%,_transparent)]',
        'transition-all duration-300 ease-out select-none',
        'hover:bg-gradient-to-br hover:from-[var(--gradient-from)]/25 hover:to-[var(--gradient-to)]/25',
        'hover:shadow-[0_0_12px_color-mix(in_srgb,_var(--gradient-to)_40%,_transparent)]',
        'focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-2 focus:outline-none',
        className
      )}
      style={
        {
          '--gradient-from': `var(${gradientFrom})`,
          '--gradient-to': `var(${gradientTo})`,
          '--text-color-light': 'hsl(0, 0%, 20%)', // Darker text for light mode
          color: `var(${textColor})`
        } as CustomMotionStyle
      }
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      role='text'
      aria-label={`Kata: ${name}`}
    >
      {/* Tooltip for full name */}
      <motion.div
        className='absolute -top-10 left-1/2 z-10 hidden -translate-x-1/2 group-hover:block'
        initial={{ opacity: 0, y: 5, scale: 0.95 }}
        animate={{ opacity: 0, y: 5, scale: 0.95 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div
          className={clsx(
            'bg-[var(--gradient-from)]/90 dark:bg-[var(--gradient-from)]/80',
            'rounded-lg border border-[var(--gradient-to)]/50 px-3 py-1 text-xs font-medium',
            'text-[var(--text-color-light)] shadow-lg backdrop-blur-sm dark:text-[var(--color-champagne-mist)]',
            'max-w-xs break-words whitespace-normal'
          )}
        >
          {name}
        </div>
        {/* Tooltip arrow */}
        <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--gradient-to)]/50' />
      </motion.div>

      {/* Truncated name */}
      <span
        className={clsx(
          'truncate',
          'text-[var(--text-color-light)] dark:bg-gradient-to-r dark:from-[var(--gradient-to)] dark:to-[var(--color-champagne-mist)] dark:bg-clip-text dark:text-transparent'
        )}
      >
        {name}
      </span>
    </motion.div>
  );
};
