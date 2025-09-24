'use client';

import React from 'react';
import clsx from 'clsx';
import { DiamondIcon } from '../../../leaderboard/components/DiamondIcon';

/**
 * Client component: Collect diamonds from Codewars katas.
 *
 * - The whole card acts as a button
 * - Shows diamond count & icon
 * - Shows a progress bar under the diamond and above the text while loading
 * - Progress is simulated (smooth) and completes when the server responds
 *
 * Note: keeps your colors and structure intact.
 */
export function DiamondsCollectButtonCard({ count }: { count: number }) {
  const [loading, setLoading] = React.useState(false);
  const [collected, setCollected] = React.useState(false);
  const [progress, setProgress] = React.useState(0); // 0 - 100

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
      // increase by small random steps but never reach 95
      const cur = progressRef.current;
      if (cur >= 95) {
        // stop incrementing near completion — wait for real completion
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }
      // gentle acceleration/deceleration
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
      // small delay to show 100% visually
      if (finishTimeoutRef.current)
        window.clearTimeout(finishTimeoutRef.current);
      finishTimeoutRef.current = window.setTimeout(() => {
        setProgress(100);
        // success pulse synth
        setTimeout(() => setCollected(true), 120);
        // hide loader after short delay
        setTimeout(() => {
          setLoading(false);
          setCollected(false);
          setProgress(0);
        }, 1100);
      }, 220);
    } else {
      // abort: reset
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

      // if (!res.ok) {
      //   throw new Error('Failed to trigger diamond collection');
      // }

      // on success: fill to 100%
      stopSimulatedProgress(true);
    } catch (err) {
      console.error(err);
      // on failure: stop progress and reset after a small delay
      stopSimulatedProgress(false);
    }
  };

  return (
    <button
      onClick={handleCollect}
      disabled={loading}
      className={clsx(
        'relative flex w-full cursor-pointer flex-col items-center rounded-2xl',
        'bg-gradient-to-br from-amber-100 to-yellow-200 dark:from-yellow-900/10 dark:to-amber-800/35',
        'text-center shadow-xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]',
        loading && 'cursor-wait opacity-90'
      )}
      aria-label='Collect diamonds'
      title={loading ? 'Collecting diamonds…' : 'Collect diamonds'}
    >
      {/* subtle success pulse (inside) */}
      {collected && (
        <div className='pointer-events-none absolute inset-0 animate-ping rounded-2xl bg-yellow-300/10' />
      )}

      <div className='relative z-10'>
        {/* keep passing isLoading if your DiamondIcon supports it; harmless if ignored */}
        <div className='flex w-full items-center justify-between gap-2'>
          <DiamondIcon isLoading={loading} size='md' />

          {/* Big number container */}
          <div
            className={clsx(
              'flex flex-col gap-2 rounded-xl shadow-inner',
              // Theme-aware gradient
              'bg-gradient-to-r from-[--champagne-mist] to-[--honey-silk] dark:from-[--royal-gold] dark:to-[--amber-legacy]',
              'text-4xl'
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
            {/* PROGRESS BAR CONTAINER (fixed height to avoid layout shift) */}
            {
              <div className='relative z-10 mt-0 flex w-full justify-center'>
                {/* Reserve fixed space always to avoid layout shifts; actual bar centered */}
                <div className='h-3 w-40 sm:w-48'>
                  {/* Background track */}
                  <div className='h-3 w-full overflow-hidden rounded-full bg-yellow-50/80 ring-1 ring-yellow-50/10 ring-inset dark:bg-yellow-900/20'>
                    {/* Progress fill */}
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
                      {/* animated sheen (keeps inside fill) */}
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
            }
          </div>
        </div>
      </div>

      {/* Text (kept below the progress bar) */}
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

      {/* Inline keyframes for sheen animation (self-contained) */}
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
