'use client';

import { ApiResponse as ValidationApiResponse } from '@/app/api/codewars/connect/validation/schema';
import { ApiResponse as SaveApiResponse } from '@/app/api/codewars/connect/save/schema';
import { CodewarsApiUser } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

type Step = 1 | 2 | 3;

export default function CodewarsConnectForm() {
  const [step, setStep] = useState<Step>(1);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState<CodewarsApiUser>();

  /* -------------------- 🔹 Step 2: Validate username -------------------- */
  async function handleValidation(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim()) {
      toast.warning('Please enter your Codewars username.');
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

      if (data.success) {
        setError(false);
        toast.success('✅ User validated successfully!');
        setUserData(data.userData);
        setStep(3);
      }
    } catch {
      setError(true);
      toast.error('Something went wrong during validation.');
    } finally {
      setLoading(false);
    }
  }

  /* -------------------- 🔹 Step 3: Confirm and Save -------------------- */
  async function handleSave() {
    if (!userData) return;

    const toastId = toast.loading('Saving your Codewars connection...');
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

      if (data.success) {
        setError(false);
        toast.success(data.message);
        window.location.href = '/dashboard/profile/codewars';
      }
    } catch {
      setError(true);
      toast.dismiss(toastId);
      toast.error('Failed to save connection. Please retry.');
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
            account to sync your kata stats and showcase your progress.
          </p>
          <button
            onClick={() => setStep(2)}
            className='bg-primary text-primary-foreground w-full cursor-pointer rounded-lg py-2.5 font-semibold shadow-md transition-all hover:scale-[1.02] hover:shadow-lg'
          >
            Continue
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
              className='border-border hover:bg-accent/10 w-1/2 cursor-pointer rounded-lg border py-2.5 font-semibold transition-all'
            >
              Back
            </button>
            <button
              type='submit'
              disabled={loading}
              className='bg-primary text-primary-foreground w-1/2 cursor-pointer rounded-lg py-2.5 font-semibold shadow-md transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-70'
            >
              {error ? 'Try again' : loading ? 'Validating...' : 'Validate'}
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
              {userData.username.toLocaleString()}
            </p>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-medium'>Rank:</span>{' '}
              {userData.ranks.overall.name.toLocaleString()}
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
          </div>

          <div className='flex w-full justify-between gap-2'>
            <button
              onClick={() => setStep(2)}
              className='border-border hover:bg-accent/10 w-1/2 cursor-pointer rounded-lg border py-2.5 text-sm font-semibold transition-all'
            >
              Back
            </button>
            <button
              onClick={handleSave}
              className='bg-primary text-primary-foreground w-1/2 cursor-pointer rounded-lg py-2.5 font-semibold shadow-sm transition-all hover:scale-[1.02]'
            >
              {error ? 'Try again' : loading ? 'Saving...' : ' Confirm & Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
