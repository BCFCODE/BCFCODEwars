'use client';

import React, { useMemo, useEffect } from 'react';
import dayjs from '@/lib/dayjs';
import clsx from 'clsx';
import { motion, MotionStyle } from 'framer-motion';

// Extend MotionStyle to include custom CSS properties
interface CustomMotionStyle extends MotionStyle {
  '--gradient-from'?: string;
  '--gradient-to'?: string;
}

interface DaysAgoProps {
  date: Date | string | number;
  className?: string;
}

export const DaysAgo: React.FC<DaysAgoProps> = ({ date, className }) => {
  const [now, setNow] = React.useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const { relative, full, gradientFrom, gradientTo, textColor } =
    useMemo(() => {
      const d = dayjs(date);
      const diffSeconds = dayjs(now).diff(d, 'second');
      const diffDays = dayjs(now).diff(d, 'day');
      const diffMonths = dayjs(now).diff(d, 'month');
      const diffYears = dayjs(now).diff(d, 'year');

      // Consistent-length relative time labels
      let relative: string;
      if (diffSeconds < 60) {
        relative = 'Now';
      } else if (diffDays < 1) {
        relative = '1 day';
      } else if (diffDays < 7) {
        relative = `${diffDays} days`;
      } else if (diffDays < 30) {
        relative = `${diffMonths || 1} mo`; // Use "mo" for months
      } else if (diffDays < 365) {
        relative = `${diffMonths || 1} mo`;
      } else {
        relative = `${diffYears || 1} yr`; // Use "yr" for years
      }

      // Capitalize first letter
      relative = relative.charAt(0).toUpperCase() + relative.slice(1);
      const full = d.format('YYYY-MM-DD HH:mm');

      // Gradient and text color mapping based on time difference
      let gradientFrom = '--color-background';
      let gradientTo = '--color-kyu-5'; // Ember Coral default
      let textColor = '--color-foreground'; // High-contrast default
      if (diffSeconds < 60) {
        gradientTo = '--color-primary'; // Vibrant Teal
        textColor = '--color-primary-foreground'; // White for contrast
      } else if (diffDays < 1) {
        gradientTo = '--color-kyu-6'; // Sunset Amber
        textColor = '--color-foreground';
      } else if (diffDays < 7) {
        gradientTo = '--color-kyu-5'; // Ember Coral
        textColor = '--color-foreground';
      } else if (diffDays < 30) {
        gradientTo = '--color-kyu-3'; // Amethyst Crest
        textColor = '--color-primary-foreground';
      } else if (diffDays < 365) {
        gradientTo = '--color-kyu-2'; // Sapphire Sky
        textColor = '--color-foreground';
      } else {
        gradientTo = '--color-rose-gleam'; // Vibrant rose gold
        textColor = '--color-primary-foreground';
      }

      return { relative, full, gradientFrom, gradientTo, textColor };
    }, [date, now]);

  return (
    <motion.time
      dateTime={dayjs(date).toISOString()}
      title={full}
      aria-label={`Posted ${relative}`}
      className={clsx(
        'inline-flex items-center gap-1 rounded-2xl px-1 py-0 text-sm font-semibold tracking-tight',
        'bg-gradient-to-br from-[var(--gradient-from)]/20 to-[var(--gradient-to)]/20 dark:from-[var(--gradient-from)]/10 dark:to-[var(--gradient-to)]/10',
        'border border-[color-mix(in_srgb,_var(--gradient-to)_20%,_transparent)]',
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
          color: `var(${textColor})`
        } as CustomMotionStyle
      }
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        className='h-4 w-4'
        viewBox='0 0 24 24'
        fill='none'
        aria-hidden='true'
        whileHover={{ rotate: 15, scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <defs>
          <linearGradient
            id='clockGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' style={{ stopColor: `var(${gradientFrom})` }} />
            <stop offset='100%' style={{ stopColor: `var(${gradientTo})` }} />
          </linearGradient>
        </defs>
        <circle
          cx='12'
          cy='12'
          r='10'
          stroke='url(#clockGradient)'
          strokeWidth='2'
        />
        <path
          d='M12 6v6l4 2'
          stroke='url(#clockGradient)'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </motion.svg>
      <span className='bg-gradient-to-r from-[var(--gradient-to)] to-[var(--color-royal-gold)] bg-clip-text text-transparent dark:to-[var(--color-champagne-mist)]'>
        {relative}
      </span>
    </motion.time>
  );
};
