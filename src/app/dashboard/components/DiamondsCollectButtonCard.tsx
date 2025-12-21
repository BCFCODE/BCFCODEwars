'use client';

import React from 'react';
import clsx from 'clsx';
import CountUp from 'react-countup';
import { DiamondIcon } from '../_leaderboard/components/DiamondIcon';
import { cn } from '@/lib/utils';

export function DiamondsCollectButtonCard({ count }: { count: number }) {
  const [loading, setLoading] = React.useState(false);
  const [collected, setCollected] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const progressRef = React.useRef(progress);
  const intervalRef = React.useRef<number | null>(null);
  const finishTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (finishTimeoutRef.current)
        window.clearTimeout(finishTimeoutRef.current);
    };
  }, []);

  const startSimulatedProgress = () => {
    setProgress(2);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      const cur = progressRef.current;
      if (cur >= 95) {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }
      const step = Math.max(
        1,
        Math.round((100 - cur) * (0.02 + Math.random() * 0.04))
      );
      const next = Math.min(95, cur + step);
      setProgress(next);
    }, 220);
  };

  const stopSimulatedProgress = (complete = false) => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (complete) {
      if (finishTimeoutRef.current)
        window.clearTimeout(finishTimeoutRef.current);
      finishTimeoutRef.current = window.setTimeout(() => {
        setProgress(100);
        setCollected(true);
        setTimeout(() => {
          setLoading(false);
          setCollected(false);
          setProgress(0);
        }, 1100);
      }, 220);
    } else {
      setProgress(0);
      setLoading(false);
    }
  };

  const handleCollect = async () => {
    if (loading) return;
    setCollected(false);
    setLoading(true);
    startSimulatedProgress();

    try {
      // const res = await fetch('/api/diamonds/collect', { method: 'POST' });
      // if (!res.ok) throw new Error('Failed to collect');
      stopSimulatedProgress(true);
    } catch (err) {
      console.error(err);
      stopSimulatedProgress(false);
    }
  };

  return (
    <button
      onClick={handleCollect}
      disabled={loading}
      className={clsx(
        'relative mx-auto w-full max-w-md cursor-pointer',
        'flex flex-col items-center justify-center',
        'rounded-2xl p-4 sm:p-5 md:p-6',
        'bg-gradient-to-t from-[var(--bg-background)]/10 to-[var(--kyu-3)]/10',
        'dark:from-[var(--bg-background)]/10 dark:to-[var(--kyu-3)]/10',
        'shadow-xl transition-all duration-200',
        'hover:scale-[1.02] active:scale-[0.98]',
        'disabled:cursor-wait disabled:opacity-90'
      )}
      aria-label='Collect diamonds'
      title={loading ? 'Collecting diamonds…' : 'Collect diamonds'}
    >
      {/* Success Pulse */}
      {collected && (
        <div className='pointer-events-none absolute inset-0 animate-ping rounded-2xl bg-yellow-300/20' />
      )}

      {/* Main Content */}
      <div className='relative z-10 w-full'>
        <div className='flex items-center justify-between gap-3 sm:gap-4'>
          {/* Diamond Icon - Responsive Container */}
          <div className='flex-shrink-0'>
            <div className='flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12 md:h-14 md:w-14'>
              <DiamondIcon
                isLoading={loading}
                size='md'
                className={cn('h-full w-full object-contain')}
              />
            </div>
          </div>

          {/* Count + Progress */}
          <div className='min-w-0 flex-1 space-y-2'>
            {/* Count */}
            <div
              className={clsx(
                'rounded-lg px-3 py-1.5 sm:px-4 sm:py-2',
                'bg-gradient-to-r from-[--champagne-mist] to-[--honey-silk]',
                'dark:from-[--royal-gold] dark:to-[--amber-legacy]',
                'text-left'
              )}
            >
              <span
                className={clsx(
                  'font-extrabold tabular-nums drop-shadow-sm',
                  'text-lg sm:text-xl md:text-2xl lg:text-3xl',
                  'text-[--amber-legacy] dark:text-[--royal-gold]'
                )}
              >
                {collected ? (
                  <CountUp end={count} duration={1.2} separator='' />
                ) : (
                  count
                )}
              </span>
            </div>

            {/* Progress Bar */}
            <div className='mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md'>
              <div className='h-2.5 w-full overflow-hidden rounded-full bg-yellow-50/80 ring-1 ring-yellow-50/10 ring-inset sm:h-3 dark:bg-yellow-900/20'>
                <div
                  role='progressbar'
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress)}
                  className='h-full origin-left rounded-full shadow-sm'
                  style={{
                    width: `${progress}%`,
                    transition: loading
                      ? 'width 260ms cubic-bezier(0.4, 0, 0.2, 1)'
                      : 'width 380ms ease-out',
                    background:
                      'linear-gradient(90deg, rgba(255,224,130,0.95), rgba(255,186,0,0.98) 55%, rgba(255,230,160,0.9))',
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  {loading && progress > 3 && (
                    <div
                      className='h-full w-1/2 -translate-x-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-80 mix-blend-overlay'
                      style={{
                        animation: 'sheen-move 1.4s ease-in-out infinite'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Below */}
      <div className='mt-3 space-y-1 text-center sm:mt-4'>
        <p
          className={clsx(
            'font-bold tracking-wide',
            'text-sm sm:text-base',
            'text-amber-700 dark:text-amber-300'
          )}
        >
          {loading
            ? 'Collecting Diamonds…'
            : collected
              ? 'Collected!'
              : 'Collect Diamonds'}
        </p>
        <p className='text-muted-foreground text-xs sm:text-sm'>
          Tap to collect new diamonds
        </p>
      </div>

      {/* Sheen Animation */}
      <style jsx>{`
        @keyframes sheen-move {
          0% {
            transform: translateX(-100%) rotate(15deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(200%) rotate(15deg);
            opacity: 0.3;
          }
        }
      `}</style>
    </button>
  );
}
