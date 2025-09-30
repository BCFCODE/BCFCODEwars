'use client';

import React from 'react';
import clsx from 'clsx';
import CountUp from 'react-countup';
import { DiamondIcon } from '../../../leaderboard/components/DiamondIcon';

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
        setCollected(true); // trigger countup animation
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
        'relative flex w-full cursor-pointer flex-col items-center rounded-2xl pb-3',
        'bg-gradient-to-t from-[var(--bg-background)]/10 to-[var(--kyu-5)]/10 dark:from-[var(--bg-background)]/10 dark:to-[var(--kyu-5)]/10',
        'text-center shadow-xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]',
        loading && 'cursor-wait opacity-90'
      )}
      aria-label='Collect diamonds'
      title={loading ? 'Collecting diamonds…' : 'Collect diamonds'}
    >
      {collected && (
        <div className='pointer-events-none absolute inset-0 animate-ping rounded-2xl bg-yellow-300/10' />
      )}

      <div className='relative z-10 p-0'>
        <div className='flex w-full items-center justify-between gap-2'>
          <DiamondIcon isLoading={loading} size='md' />

          <div
            className={clsx(
              'flex flex-col items-start gap-2 rounded-xl',
              'bg-gradient-to-r from-[--champagne-mist] to-[--honey-silk] dark:from-[--royal-gold] dark:to-[--amber-legacy]',
              'text-4xl'
            )}
          >
            <span
              className={clsx(
                'font-extrabold tabular-nums drop-shadow-sm',
                'text-[--amber-legacy] dark:text-[--royal-gold]'
              )}
            >
              {collected ? (
                <CountUp end={count} duration={1.2} separator='' />
              ) : (
                count
              )}
            </span>

            <div className='relative z-10 mt-0 flex w-full justify-center'>
              <div className='h-3 w-40 sm:w-48'>
                <div className='h-3 w-full overflow-hidden rounded-full bg-yellow-50/80 ring-1 ring-yellow-50/10 ring-inset dark:bg-yellow-900/20'>
                  <div
                    role='progressbar'
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                    className='h-full origin-left transform rounded-full shadow-sm'
                    style={{
                      width: `${progress}%`,
                      transition: loading
                        ? 'width 260ms linear'
                        : 'width 380ms ease-out',
                      background:
                        'linear-gradient(90deg, rgba(255,224,130,0.95), rgba(255,186,0,0.98) 55%, rgba(255,230,160,0.9))',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06) inset'
                    }}
                  >
                    {loading && progress > 3 && (
                      <div
                        style={{
                          height: '100%',
                          width: '40%',
                          transform: 'translateX(-30%)',
                          background:
                            'linear-gradient(120deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))',
                          opacity: 0.9,
                          mixBlendMode: 'overlay',
                          animation: 'sheen-move 1.4s linear infinite'
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span
        className={clsx(
          'mt-0 font-bold text-amber-700 dark:text-amber-300',
          'z-10 text-sm tracking-wide'
        )}
      >
        {loading
          ? 'Collecting Diamonds…'
          : collected
            ? 'Collected!'
            : 'Collect Diamonds'}
      </span>
      <span className='text-muted-foreground z-10 mt-1 text-xs'>
        Tap to collect new diamonds
      </span>

      <style>{`
        @keyframes sheen-move {
          0% { transform: translateX(-40%); opacity: 0.25; }
          50% { transform: translateX(10%); opacity: 0.9; }
          100% { transform: translateX(110%); opacity: 0.25; }
        }
      `}</style>
    </button>
  );
}
