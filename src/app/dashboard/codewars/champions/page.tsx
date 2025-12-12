import {
  getKataData,
  getChampionsKataData
} from '@/app/repositories/codewarsRepository';
import { LinkButton } from '@/components/ui/LinkButton';
import { CodewarsChampions } from '@/features/overview/components/codewars-champions';
import { isConnectedToCodewars } from '@/services/codewarsService';

export default async function CodewarsChampionsPage() {
  const { data: codewars } = await isConnectedToCodewars();

  if (codewars?.isConnected) {
    await getKataData({
      codewarsUserId: codewars.id,
      codewarsUsername: codewars.username,
      codewarsName: codewars.name
    });
  }

  const limit = 25;

  // const { data, success } = await getChampionsKataData({ limit, skip: 0 });

  return (
    <div className='flex flex-1 flex-col space-y-6'>
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
        <div className='flex flex-wrap items-center gap-3'>
          <LinkButton
            href='/dashboard/leaderboard/codewars'
            label='View Leaderboard'
            gradient='bg-gradient-to-r from-[#e94560]/30 to-[#f4a261]/10'
            hoverGradient='from-[#e94560]/90 to-[#f4a261]/90'
            focusRing='focus:ring-[#e94560]/50'
          />
          <LinkButton
            href='/dashboard/codewars'
            label='View Profile'
            gradient='bg-gradient-to-r from-[#f4a261]/30 to-[#e94560]/10'
            hoverGradient='from-[#f4a261]/90 to-[#e94560]/90'
            focusRing='focus:ring-[#f4a261]/50'
          />
        </div>
      </div>
      <CodewarsChampions
        limit={limit}
        showPagination
        // data={success ? data : []}
        className={{
          avatarStyles: 'h-10 w-10'
        }}
      />
    </div>
  );
}
