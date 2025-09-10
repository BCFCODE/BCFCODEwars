import { Badge } from '@/components/ui/new-york-v4/badge';
import { baseUrl } from '@/lib/constants';
import Link from 'next/link';

export default function ServerTabs({
  selectedRoute
}: {
  selectedRoute: string;
}) {
  console.log('selectedRoute', selectedRoute);
  const url = {
    users: `${baseUrl}/dashboard/leaderboard/users`,
    codewars: `${baseUrl}/dashboard/leaderboard/codewars`
  };

  return (
    <div className='hidden items-center gap-0 px-4 text-sm lg:px-6 @4xl/main:flex'>
      <Link
        href={url.users}
        className={`flex cursor-pointer items-center gap-1 rounded-ss-lg rounded-bl-lg px-3 py-1 ${
          selectedRoute === url.users
            ? 'text-foreground font-semibold'
            : 'text-muted-foreground hover:bg-muted-foreground/20'
        }`}
      >
        Users <Badge variant='secondary'>20</Badge>
      </Link>
      <Link
        href={url.codewars}
        className={`flex cursor-pointer items-center gap-1 rounded-se-lg rounded-ee-lg px-3 py-1 ${
          selectedRoute === url.codewars
            ? 'text-foreground font-semibold'
            : 'text-muted-foreground hover:bg-muted-foreground/20'
        }`}
      >
        Codewars <Badge variant='secondary'>10</Badge>
      </Link>
    </div>
  );
}
