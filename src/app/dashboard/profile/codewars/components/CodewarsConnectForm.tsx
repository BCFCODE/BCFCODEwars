'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function CodewarsConnectForm() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!username.trim()) {
      toast.error('⚠️ Please enter your Codewars username.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/codewars/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.reason || 'Connection failed.');
      }

      setError(false);

      toast.success('✅ Successfully connected! Redirecting...');
      setTimeout(
        () => (window.location.href = '/dashboard/profile/codewars'),
        1500
      );
    } catch (err: any) {
      setError(true);
      toast.error(err.message || '❌ Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex flex-col items-center gap-4 rounded-xl bg-gradient-to-b from-[var(--color-kyu-5)]/10 via-[var(--color-kyu-3)]/5 to-transparent p-6 shadow-lg backdrop-blur-md transition-all duration-300'
    >
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter your Codewars username'
        className='border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2 text-sm transition-all focus:ring-1 focus:outline-none'
      />

      <button
        type='submit'
        disabled={loading}
        className='group bg-primary text-primary-foreground relative w-full cursor-pointer overflow-hidden rounded-lg py-2.5 font-semibold shadow-md transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-70'
      >
        <span className='relative z-10'>
          {error
            ? 'Try Again'
            : loading
              ? 'Connecting...'
              : 'Validate & Connect'}
        </span>
        <div className='absolute inset-0 -z-0 bg-gradient-to-r from-[var(--color-kyu-5)]/70 via-[var(--color-kyu-3)]/5 to-[var(--color-kyu-2)]/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      </button>
    </form>
  );
}
