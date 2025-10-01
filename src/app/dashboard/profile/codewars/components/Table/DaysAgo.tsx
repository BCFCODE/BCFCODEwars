'use client';

import React, { useMemo, useEffect, useState } from 'react';
import dayjs from '@/lib/dayjs';
import clsx from 'clsx';
import { motion, MotionStyle } from 'framer-motion';

interface CustomMotionStyle extends MotionStyle {
  '--gradient-from'?: string;
  '--gradient-to'?: string;
}

interface DaysAgoProps {
  date: Date | string | number;
  className?: string;
}

export const DaysAgo: React.FC<DaysAgoProps> = ({ date, className }) => {
  const [now, setNow] = useState(Date.now());

  // ⏳ Auto-refresh but adaptively
  useEffect(() => {
    const d = dayjs(date);
    const ageMinutes = dayjs(now).diff(d, 'minute');
    const intervalMs = ageMinutes < 60 ? 60_000 : 300_000; // 1m for <1h, else 5m
    const interval = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(interval);
  }, [date, now]);

  const { relative, gradientFrom, gradientTo, textColor } = useMemo(() => {
    const d = dayjs(date);
    const seconds = dayjs(now).diff(d, 'second');
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let relative = '';
    if (seconds < 60) relative = 'Just now';
    else if (minutes < 60) relative = `${minutes}m ago`;
    else if (hours < 24) relative = `${hours}h ago`;
    else if (days < 7) relative = `${days}d ago`;
    else if (days < 30) relative = `${Math.floor(days / 7)}w ago`;
    else if (days < 365) relative = d.format('MMM D');
    else relative = d.format('MMM D, YYYY');

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

    return { relative, gradientFrom, gradientTo, textColor };
  }, [date, now]);

  return (
    <motion.time
      dateTime={dayjs(date).toISOString()}
      aria-label={`Posted ${relative}`}
      className={clsx(
        'relative inline-flex w-24 items-center justify-center gap-1 rounded-2xl px-2 py-1 text-sm font-semibold tracking-tight',
        'bg-gradient-to-br from-[var(--gradient-from)]/20 to-[var(--gradient-to)]/20 dark:from-[var(--gradient-from)]/10 dark:to-[var(--gradient-to)]/10',
        'border border-[color-mix(in_srgb,_var(--gradient-to)_10%,_transparent)]',
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
      {/* Clock icon */}
      <motion.svg
        className='ml-0 h-4 w-4'
        viewBox='0 0 24 24'
        fill='none'
        aria-hidden='true'
        whileHover={{ rotate: 15, scale: 1.1, opacity: 0.8 }}
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

      {/* Time label */}
      <span
        className={clsx(
          'text-[var(--text-color-light)] dark:bg-gradient-to-r dark:from-[var(--gradient-to)] dark:to-[var(--color-champagne-mist)] dark:bg-clip-text dark:text-transparent'
        )}
      >
        {relative}
      </span>
    </motion.time>
  );
};
