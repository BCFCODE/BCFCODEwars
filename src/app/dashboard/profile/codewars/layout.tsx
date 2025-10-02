import PageContainer from '@/components/layout/page-container';
import { isConnectedToCodewars } from '@/services/codewarsService';
import { IconTrendingUp } from '@tabler/icons-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { UserAvatar } from './components/UserAvatar';
import { KatasTable } from './components/Table/KatasTable';
import { getKataData } from '@/app/repositories/codewarsRepository';
import { columns } from './components/Table/columns';

export const metadata = {
  title: 'Codewars Profile | BCFCODE Dashboard',
  description:
    'Your Codewars profile on BCFCODE — honor, ranks, leaderboard position and language stats.',
  robots: { index: false, follow: false }
};

interface Props extends PropsWithChildren {}

export default async function Layout({ children }: Props) {
  const { data: codewars } = await isConnectedToCodewars();

  let kataData;

  if (codewars?.isConnected)
    kataData = await getKataData({
      codewarsUserId: codewars.id,
      codewarsUsername: codewars.username,
      codewarsName: codewars.name
    });

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          {/* left: avatar + greeting */}
          <div className='flex items-start gap-4'>
            <UserAvatar
              isConnected={codewars?.isConnected ?? false}
              size={55}
              showPresence
            />

            <div className='min-w-0'>
              <h2 className='text-lg leading-tight font-extrabold tracking-tight sm:text-2xl'>
                Welcome back,{' '}
                <span className='bg-gradient-to-r from-[var(--royal-gold)] to-[var(--kyu-2)] bg-clip-text text-transparent'>
                  {codewars?.name ?? 'Guest'}
                </span>
                <div className='flex items-center align-baseline'>
                  <span className='text-muted-foreground ml-1 font-normal'>
                    — Codewars profile
                  </span>
                </div>
              </h2>

              <p className='text-muted-foreground mt-1 text-xs sm:text-sm'>
                {codewars?.isConnected ? (
                  <span className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-0'>
                    <span className='inline-flex w-40 items-center gap-2 rounded-full bg-[var(--chart-1)]/5 px-2 py-0.5 text-[11px] font-medium text-[var(--chart-1)]/80'>
                      • Connected to Codewars
                    </span>
                    <span className='ml-3'>
                      Live honor, ranks & language stats
                    </span>
                  </span>
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

          <div className='flex flex-wrap items-center gap-4'>
            {/* Leaderboard Button */}
            <Link
              href='/dashboard/leaderboard/codewars'
              className='group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[var(--kyu-3)]/60 to-[var(--kyu-2)]/30 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 ease-out hover:scale-[1.05] hover:text-black hover:shadow-xl focus:ring-4 focus:ring-[var(--kyu-2)]/50 focus:outline-none'
            >
              <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--kyu-3)]/80 to-[var(--kyu-2)]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <span className='relative flex items-center gap-2'>
                View Leaderboard
                <IconTrendingUp className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </span>
            </Link>

            {/* Dashboard Button */}
            <Link
              href='/dashboard/overview'
              className='group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[var(--kyu-2)]/60 to-[var(--kyu-1)]/30 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 ease-out hover:scale-[1.05] hover:text-black hover:shadow-xl focus:ring-4 focus:ring-[var(--kyu-1)]/50 focus:outline-none'
            >
              <span className='absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--kyu-2)]/80 to-[var(--kyu-1)]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <span className='relative flex items-center gap-2'>
                View Dashboard
                <IconTrendingUp className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
              </span>
            </Link>
          </div>
        </div>

        {codewars?.isConnected ? (
          <>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {children}
            </div>
            <div className='grid grid-cols-1'>
              <KatasTable columns={columns} data={kataData ?? []} />
            </div>
          </>
        ) : (
          <> {children}</>
        )}
      </div>
    </PageContainer>
  );
}
