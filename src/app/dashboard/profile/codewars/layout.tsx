import PageContainer from '@/components/layout/page-container';
import { isConnectedToCodewars } from '@/services/codewarsService';
import { IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { UserAvatar } from './components/UserAvatar';
import { KatasTable } from './components/KatasTable';
import { ColumnDef } from '@tanstack/react-table';

export const metadata = {
  title: 'Codewars Profile | BCFCODE Dashboard',
  description:
    'Your Codewars profile on BCFCODE — honor, ranks, leaderboard position and language stats.',
  robots: { index: false, follow: false }
};

interface Props extends PropsWithChildren {}

export type Payment = {
  id: string;
  amount: number;
  solvedAt: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'solvedAt',
    header: 'SolvedAt'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  }
];

export default async function Layout({ children }: Props) {
  const { data: codewarsUser } = await isConnectedToCodewars();

  async function getKataData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: '728ed52f',
        amount: 100,
        solvedAt: 'pending',
        email: 'm@example.com'
      }
      // ...
    ];
  }

  const kataData = await getKataData();

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          {/* left: avatar + greeting */}
          <div className='flex items-start gap-4'>
            <UserAvatar
              isConnected={codewarsUser?.isConnected ?? false}
              size={55}
              showPresence
            />

            <div className='min-w-0'>
              <h2 className='text-lg leading-tight font-extrabold tracking-tight sm:text-2xl'>
                Welcome back,{' '}
                <span className='bg-gradient-to-r from-[var(--royal-gold)] to-[var(--kyu-2)] bg-clip-text text-transparent'>
                  {codewarsUser?.name ?? 'Guest'}
                </span>
                <span className='text-muted-foreground ml-1 font-normal'>
                  — Codewars profile
                </span>
              </h2>

              <p className='text-muted-foreground mt-1 text-xs sm:text-sm'>
                {codewarsUser?.isConnected ? (
                  <>
                    <span className='inline-flex items-center gap-2 rounded-full bg-[var(--kyu-3)]/10 px-2 py-0.5 text-[11px] font-medium text-[var(--kyu-3)]'>
                      • Connected to Codewars
                    </span>
                    <span className='ml-3'>
                      Live honor, ranks & language stats
                    </span>
                  </>
                ) : (
                  <>
                    <span className='border-muted/20 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-[11px] font-medium'>
                      • Not connected
                    </span>
                    <span className='ml-3'>
                      Connect to surface your Codewars metrics
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* right: actions / shortcuts */}
          <div className='flex flex-wrap items-center gap-3'>
            <Link
              href='/dashboard/leaderboard/codewars'
              className='inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--kyu-3)] to-[var(--kyu-2)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] focus:ring-2 focus:ring-[var(--kyu-2)] focus:outline-none'
            >
              View Leaderboard
              <IconTrendingUp className='h-4 w-4' />
            </Link>

            <Link
              href='/dashboard/profile'
              className='text-muted-foreground hover:bg-muted/10 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition'
            >
              Profile settings
            </Link>

            {/* compact status pill for small screens */}
            <div className='bg-card/50 text-muted-foreground hidden items-center gap-2 rounded-full px-3 py-1 text-xs font-medium sm:inline-flex'>
              {codewarsUser?.isConnected ? (
                <span className='inline-flex items-center gap-2 text-[var(--kyu-4)]'>
                  <svg
                    className='h-3 w-3'
                    viewBox='0 0 24 24'
                    fill='none'
                    aria-hidden
                  >
                    <circle
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeOpacity='0.15'
                    />
                    <path
                      d='M7 13l3 3 7-7'
                      stroke='currentColor'
                      strokeWidth='1.6'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  Connected
                </span>
              ) : (
                <Link
                  href='/dashboard/profile/codewars/connect'
                  className='bg-accent text-accent-foreground inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold shadow-sm'
                >
                  Connect
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {children}
        </div>
        <div className='grid grid-cols-1'>
          <KatasTable columns={columns} data={kataData} />
        </div>
      </div>
    </PageContainer>
  );
}
