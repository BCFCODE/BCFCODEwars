import { getKataData } from '@/app/repositories/codewarsRepository';
import PageContainer from '@/components/layout/page-container';
import { RecentKatas } from '@/features/overview/components/recent-katas';
import {
  getRecentlySolvedData,
  isConnectedToCodewars
} from '@/services/codewarsService';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Constants for better maintainability
const LINK_STYLES = {
  base: 'group relative inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg focus:ring-4 focus:outline-none',
  leaderboard: {
    gradient: 'bg-gradient-to-r from-[#e94560]/70 to-[#f4a261]/40',
    hoverGradient: 'from-[#e94560]/90 to-[#f4a261]/90',
    focusRing: 'focus:ring-[#e94560]/50'
  },
  profile: {
    gradient: 'bg-gradient-to-r from-[#f4a261]/70 to-[#e94560]/40',
    hoverGradient: 'from-[#f4a261]/90 to-[#e94560]/90',
    focusRing: 'focus:ring-[#f4a261]/50'
  }
};

// Reusable LinkButton component for DRY code
const LinkButton = ({
  href,
  label,
  gradient,
  hoverGradient,
  focusRing
}: {
  href: string;
  label: string;
  gradient: string;
  hoverGradient: string;
  focusRing: string;
}) => (
  <Link
    href={href}
    className={`${LINK_STYLES.base} ${gradient} ${focusRing}`}
    aria-label={label}
  >
    <span
      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${hoverGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
    />
    <span className='relative flex items-center gap-2'>
      {label}
      <ArrowRightIcon className='h-5 w-5 transition-transform duration-300 group-hover:translate-x-1' />
    </span>
  </Link>
);

export default async function RecentlySolvedHistoryPage() {
  // Fetch connection status
  const { data: codewars } = await isConnectedToCodewars();

  // Fetch kata data if connected
  if (codewars?.isConnected) {
    await getKataData({
      userId: codewars?.id ?? '',
      username: codewars?.username ?? ''
    });
  }

  // Fetch recently solved data
  const { data, success } = await getRecentlySolvedData();

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        {/* Header Section */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='min-w-0 space-y-2'>
            <h2 className='text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white'>
              Recently Solved Katas
              <span className='ml-2 text-base font-normal text-gray-500 dark:text-gray-400'>
                — Codewars History
              </span>
            </h2>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              {codewars?.isConnected ? (
                'Explore the live history of solved katas from the BCFCODE community.'
              ) : (
                <span className='flex flex-col gap-2 sm:flex-row sm:items-center'>
                  <span className='inline-flex items-center gap-2 rounded-full border border-gray-300/30 px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400'>
                    <span className='h-2 w-2 rounded-full bg-red-500' />
                    Not connected
                  </span>
                  <span className='ml-0 sm:ml-2'>
                    Connect your Codewars account to view your history.
                  </span>
                </span>
              )}
            </p>
          </div>
          {/* Action Buttons */}
          <div className='flex flex-wrap items-center gap-3'>
            <LinkButton
              href='/dashboard/leaderboard/codewars'
              label='View Leaderboard'
              {...LINK_STYLES.leaderboard}
            />
            <LinkButton
              href='/dashboard/profile/codewars'
              label='View Profile'
              {...LINK_STYLES.profile}
            />
          </div>
        </div>
        {/* Katas List */}
        <RecentKatas
          data={success ? data : []}
          className={{
            avatarStyles: 'h-20 w-20'
          }}
        />
      </div>
    </PageContainer>
  );
}
