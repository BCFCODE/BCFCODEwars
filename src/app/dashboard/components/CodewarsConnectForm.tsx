'use client';

import { ApiResponse as ValidationApiResponse } from '@/app/api/codewars/connect/validation/schema';
import { ApiResponse as SaveApiResponse } from '@/app/api/codewars/connect/save/schema';
import { CodewarsApiUser } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type Step = 1 | 2 | 3;

const baseBtn = cn(
  'cursor-pointer',
  'w-full sm:w-1/2',
  'rounded-lg',
  'py-2.5',
  'font-semibold',
  'transition-all duration-300',
  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
  'disabled:cursor-not-allowed disabled:opacity-70'
);

const primaryBtn = cn(
  baseBtn,
  'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground',
  'hover:from-primary/90 hover:to-primary hover:shadow-md',
  'active:scale-[0.98]',
  'focus:ring-primary/40'
);

const outlineBtn = cn(
  baseBtn,
  'border border-border text-foreground bg-background',
  'hover:bg-accent/10 hover:text-accent-foreground',
  'active:scale-[0.98]',
  'focus:ring-accent/30'
);

const successBtn = cn(
  baseBtn,
  'bg-green-500/20 border border-green-500/30',
  'shadow-sm hover:shadow-md hover:bg-green-500/25',
  'active:scale-[0.98]',
  'focus:ring-green-500/40'
);

export default function CodewarsConnectForm() {
  const [step, setStep] = useState<Step>(1);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userData, setUserData] = useState<CodewarsApiUser>();

  /* -------------------- 🔹 Step 2: Validate username -------------------- */
  async function handleValidation(e: React.FormEvent) {
    e.preventDefault();

    if (!username.trim()) {
      toast.warning('Oops! Please enter your Codewars username to proceed.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/codewars/connect/validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      const data: ValidationApiResponse = await res.json();

      if (!data.success) {
        setError(true);
        toast[data.toastType](data.reason);
        return;
      }

      setError(false);
      toast.success('Username validated! Ready to conquer the next step!');
      setUserData(data.userData);
      setStep(3);
    } catch {
      setError(true);
      toast.error('Uh-oh! Validation failed. Give it another shot!');
    } finally {
      setLoading(false);
    }
  }

  /* -------------------- 🔹 Step 3: Confirm and Save -------------------- */
  async function handleSave() {
    if (!userData) return;

    const toastId = toast.loading(
      '💾 Saving your Codewars connection to the leaderboard...'
    );
    try {
      const res = await fetch('/api/codewars/connect/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData })
      });

      const data: SaveApiResponse = await res.json();

      toast.dismiss(toastId);
      if (!data.success) {
        setError(true);
        toast[data.toastType](data.reason);
        return;
      }

      setError(false);
      setIsSaved(true);
      toast.success('🏆 Success! Your Codewars account is now linked!');
      window.location.href = '/dashboard/overview';
    } catch {
      setError(true);
      toast.dismiss(toastId);
      toast.error('❌ Connection failed. Let’s try saving again!');
    }
  }

  /* -------------------- 🔹 Render Steps -------------------- */
  return (
    <div className='w-full max-w-md rounded-xl bg-gradient-to-b from-[var(--color-kyu-5)]/10 via-[var(--color-kyu-3)]/5 to-transparent p-6 shadow-lg backdrop-blur-md'>
      {step === 1 && (
        <div className='flex flex-col items-center gap-4 text-center'>
          <h2 className='text-primary text-2xl font-bold'>
            Welcome to Codewars Connect ⚔️
          </h2>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            Link your{' '}
            <span className='text-foreground font-semibold'>Codewars</span>{' '}
            account to effortlessly sync kata progress, track your coding
            achievements, and showcase your growth as a developer.
          </p>
          <button onClick={() => setStep(2)} className={primaryBtn}>
            Let’s Go!
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleValidation} className='flex flex-col gap-4'>
          <h2 className='text-primary text-center text-xl font-semibold'>
            Validate your Codewars username
          </h2>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your Codewars username'
            className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2 text-sm transition-all focus:ring-1 focus:outline-none'
          />
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={() => setStep(1)}
              className={outlineBtn}
            >
              Back
            </button>
            <button
              type='submit'
              disabled={loading}
              className={cn(
                primaryBtn,
                loading && 'cursor-wait opacity-80',
                error &&
                  'bg-gradient-to-r from-red-500/30 to-red-600/40 hover:from-red-600/80 hover:to-red-700/80'
              )}
            >
              {error ? 'Try Again' : loading ? 'Validating...' : 'Validate'}
            </button>
          </div>
        </form>
      )}

      {step === 3 && userData && (
        <div className='flex flex-col items-center gap-5'>
          <h2 className='text-primary text-center text-xl font-semibold tracking-tight'>
            Confirm Your Codewars Profile
          </h2>

          <div className='border-border bg-card flex w-full flex-col items-start gap-2 rounded-xl border p-5 text-center shadow-sm'>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-medium'>Username:</span>{' '}
              {userData.username}
            </p>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-medium'>Rank:</span>{' '}
              {userData.ranks.overall.name}
            </p>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-medium'>Honor:</span>{' '}
              {userData.honor.toLocaleString()}
            </p>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-medium'>Leaderboard:</span>{' '}
              #{userData.leaderboardPosition ?? 'N/A'}
            </p>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-medium'>Clan:</span>{' '}
              {userData.clan || '—'}
            </p>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-medium'>Challenges:</span>{' '}
              {userData.codeChallenges.totalCompleted} completed
            </p>
          </div>

          <div className='flex w-full justify-between gap-2'>
            <button onClick={() => setStep(2)} className={outlineBtn}>
              Back
            </button>
            <button
              disabled={isSaved}
              onClick={handleSave}
              className={cn(
                isSaved ? successBtn : primaryBtn,
                loading && 'cursor-wait opacity-80',
                error &&
                  !isSaved &&
                  'bg-gradient-to-r from-red-500/30 to-red-600/40 hover:from-red-600/80 hover:to-red-700/80'
              )}
            >
              {isSaved
                ? 'Saved!'
                : error
                  ? 'Try Again...'
                  : loading
                    ? 'Saving...'
                    : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
