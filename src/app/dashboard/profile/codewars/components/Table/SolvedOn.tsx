'use client';

import React, { useMemo } from 'react';
import dayjs from '@/lib/dayjs';
import clsx from 'clsx';
import { motion, MotionStyle } from 'framer-motion';

interface CustomMotionStyle extends MotionStyle {
  '--gradient-from'?: string;
  '--gradient-to'?: string;
}

interface SolvedOnProps {
  date: Date | string | number;
  className?: string;
}

export const SolvedOn: React.FC<SolvedOnProps> = ({ date, className }) => {
  const { datePart, timePart, verbose, gradientFrom, gradientTo, textColor } =
    useMemo(() => {
      const d = dayjs(date);
      const datePart = d.format('YYYY-MM-DD ');
      const timePart = d.format('h:mm A');
      const verbose = d.format('MMMM D, YYYY, h:mm A');

      const seconds = dayjs().diff(d, 'second');
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let gradientFrom = '--color-background';
      let gradientTo = '--color-kyu-5';
      let textColor = '--text-color-light'; // Darker text for light mode
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

      return {
        datePart,
        timePart,
        verbose,
        gradientFrom,
        gradientTo,
        textColor
      };
    }, [date]);

  return (
    <motion.time
      dateTime={dayjs(date).toISOString()}
      aria-label={`Solved on ${verbose}`}
      className={clsx(
        'relative inline-flex w-40 items-center justify-center gap-1 rounded-2xl px-1 py-1 text-sm font-semibold tracking-tight',
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
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Tooltip for verbose date */}
      <motion.div
        className='absolute -top-10 left-1/2 z-10 hidden -translate-x-1/2'
        initial={{ opacity: 0, y: 5, scale: 0.95 }}
        animate={{ opacity: 0, y: 5, scale: 0.95 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div
          className={clsx(
            'bg-[var(--gradient-from)]/90 dark:bg-[var(--gradient-from)]/80',
            'rounded-lg border border-[var(--gradient-to)]/50 px-3 py-1 text-xs font-medium',
            'text-[var(--text-color-light)] shadow-lg backdrop-blur-sm dark:text-[var(--color-champagne-mist)]'
          )}
        >
          {verbose}
        </div>
        {/* Tooltip arrow */}
        <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--gradient-to)]/50' />
      </motion.div>

      {/* Date label */}
      <span
        className={clsx(
          'text-[var(--text-color-light)] dark:bg-gradient-to-r dark:from-[var(--gradient-to)] dark:to-[var(--color-champagne-mist)] dark:bg-clip-text dark:text-transparent'
        )}
      >
        <span className='inline max-[380px]:hidden'>{datePart}</span>
        {timePart}
      </span>
    </motion.time>
  );
};
