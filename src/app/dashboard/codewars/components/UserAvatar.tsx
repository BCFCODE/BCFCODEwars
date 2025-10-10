import { getUser } from '@/services/clerkService';
import Image from 'next/image';

interface Props {
  size?: number;
  /** Show presence indicator badge */
  showPresence?: boolean;
  /** Whether user is connected to Codewars (controls presence color) */
  isConnected: boolean;
}

/**
 * A reusable, circular user avatar with optional presence badge.
 *
 * - Uses `next/image` for optimized loading.
 * - Shows initials fallback if no image.
 * - Always remains a perfect circle regardless of container.
 *
 * @example
 * <UserAvatar user={{ firstName: 'Jane', imageUrl: '/me.jpg', isConnected: true }} size={48} />
 */
export async function UserAvatar({
  showPresence = true,
  size = 55,
  isConnected
}: Props) {
  const user = await getUser();
  // initials fallback
  const initials = () => {
    if (!user) return 'G';
    const first = user.firstName?.trim() ?? '';
    const last = user.lastName?.trim() ?? '';
    if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
    if (first) return first[0].toUpperCase();
    return 'G';
  };

  const presenceColor = isConnected ? 'bg-emerald-600' : 'bg-muted-foreground';

  const dimension = `${size}px`;
  const fontSize = Math.max(12, Math.floor(size / 2.5));

  return (
    <div
      className='relative inline-flex items-center justify-center rounded-full shadow-md ring-2 ring-white/40'
      style={{
        width: dimension,
        height: dimension,
        minWidth: dimension,
        minHeight: dimension
      }}
      title={user.firstName ?? 'Guest'}
    >
      {user.imageUrl ? (
        <Image
          src={user.imageUrl}
          alt={user.firstName ?? 'User avatar'}
          fill
          sizes={`${size}px`}
          className='rounded-full object-cover'
          referrerPolicy='no-referrer'
        />
      ) : (
        <div
          className='flex h-full w-full items-center justify-center rounded-full bg-gradient-to-tr from-[var(--royal-gold)] to-[var(--kyu-3)] text-white'
          style={{ fontSize }}
        >
          <span className='leading-none font-bold'>{initials()}</span>
        </div>
      )}

      {showPresence && (
        <span
          aria-hidden
          className={`absolute right-0 bottom-1 inline-block h-3 w-3 translate-x-1/4 translate-y-1/4 rounded-full border-2 border-white ${presenceColor}`}
          title={isConnected ? 'Connected to Codewars' : 'Not connected'}
        />
      )}
    </div>
  );
}
