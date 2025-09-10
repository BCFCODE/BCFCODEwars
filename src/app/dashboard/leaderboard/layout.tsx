import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export default async function Layout({ children }: Props) {
  /* 
  // Get current route from headers
  const headersList = await headers();
  const pathname =
    headersList.get('x-invoke-path') ||
    headersList.get('referer')?.split('?')[0] ||
    '';
  const currentRoute = pathname.replace(/^\/dashboard\/?/, ''); // Normalize: e.g., "leaderboard/users"
 */
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>{children}</div>
      </div>
    </div>
  );
}
