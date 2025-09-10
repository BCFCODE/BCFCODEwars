import { baseUrl } from '@/lib/constants';
import { headers } from 'next/headers';
import { PropsWithChildren } from 'react';
import ServerTabs from './components/ServerTabs';

interface Props extends PropsWithChildren {}

export default async function Layout({ children }: Props) {
  // Get current route from headers
  const headersList = await headers();
  const pathname =
    headersList.get('x-invoke-path') ||
    headersList.get('referer')?.split('?')[0] ||
    '';
  const currentRoute = pathname.replace(/^\/dashboard\/?/, ''); // Normalize: e.g., "leaderboard/users"

  const url = {
    users: `${baseUrl}/dashboard/leaderboard/users`,
    codewars: `${baseUrl}/dashboard/leaderboard/codewars`
  };
  console.log(
    'currentRoute',
    currentRoute,
    currentRoute === url.users,
    url.users
  );

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>
          <ServerTabs selectedRoute={currentRoute} />
          {children}
        </div>
      </div>
    </div>
  );
}
