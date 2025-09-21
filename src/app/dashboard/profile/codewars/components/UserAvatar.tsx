'use client';

import React from 'react';
import Image from 'next/image';

type avatarData = {
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  isConnected?: boolean;
};

export function UserAvatar({
  user,
  size = 48,
  showPresence = true
}: {
  user?: avatarData | null;
  size?: number; // px
  showPresence?: boolean;
}) {
  const initials = React.useMemo(() => {
    if (!user) return 'G';
    const a = user.firstName?.trim() ?? '';
    const b = user.lastName?.trim() ?? '';
    if (a && b) return `${a.charAt(0)}${b.charAt(0)}`.toUpperCase();
    if (a) {
      const parts = a.split(/\s+/);
      if (parts.length > 1)
        return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
      return a.charAt(0).toUpperCase();
    }
    return 'G';
  }, [user]);

  const presenceColor = user?.isConnected
    ? 'bg-[var(--kyu-3)]'
    : 'bg-muted-foreground';

  // sizes
  const outer = `relative inline-flex items-center justify-center rounded-full shadow-md`;
  const ring = `ring-2 ring-white/40`;

  const dimension = `${size}px`;
  const fontSize = Math.max(12, Math.floor(size / 2.8));

  return (
    <div
      className={`${outer} ${ring}`}
      style={{
        width: dimension,
        height: dimension
      }}
      title={user?.firstName ?? 'Guest'}
    >
      {user?.imageUrl ? (
        // Use next/image for optimized delivery; fallback to <img> if you prefer
        <div className='relative h-full w-full overflow-hidden rounded-full'>
          <Image
            src={user.imageUrl}
            alt={user?.firstName ? `${user.firstName}'s avatar` : 'User avatar'}
            fill
            sizes={`${size}px`}
            className='object-cover'
            priority={false}
          />
        </div>
      ) : (
        <div
          className='flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-[var(--royal-gold)] to-[var(--kyu-3)] text-white'
          style={{ fontSize }}
          aria-hidden={false}
        >
          <span className='text-lg leading-none font-bold'>{initials}</span>
        </div>
      )}

      {/* Presence badge (bottom-right) */}
      {showPresence && (
        <span
          aria-hidden
          className={`absolute right-0 bottom-0 inline-block h-3 w-3 translate-x-1/4 translate-y-1/4 rounded-full border-2 border-white ${presenceColor}`}
          title={user?.isConnected ? 'Connected to Codewars' : 'Not connected'}
        />
      )}
    </div>
  );
}
