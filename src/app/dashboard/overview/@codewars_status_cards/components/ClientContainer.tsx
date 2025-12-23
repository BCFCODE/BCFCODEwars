'use client';

import { Badge } from '@/components/ui/badge';
import { Award, Medal, Trophy } from 'lucide-react';
import { StatCardContainer } from '../../components/StatCardContainer';
import { DiamondsCollectCard } from './StatusCard';
import { CodewarsProfileDataSafeParseReturnType } from '@/types/codewars-profile';
import { use } from 'react';
import { NotConnectedGrid } from '../../components/NotConnectedGrid';

interface Props {
  promise: Promise<CodewarsProfileDataSafeParseReturnType>;
}

const ClientStatusCardsContainer = ({ promise }: Props) => {
  const { data } = use(promise);
  const totalCompleted = data?.codeChallenges?.totalCompleted ?? null;
  const leaderboardPosition = data?.leaderboardPosition ?? null;
  const overall = data?.ranks?.overall ?? null;

  const formatNumber = (n: number | null | undefined) =>
    typeof n === 'number' ? n.toLocaleString() : '—';

  if (!data?.isConnected) return <NotConnectedGrid />;

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
      {/* Static cards unchanged */}
      <StatCardContainer
        title='Leaderboard Position'
        primary={
          leaderboardPosition ? (
            <span className='text-2xl font-semibold'>
              #{leaderboardPosition}
            </span>
          ) : (
            <span className='text-2xl font-semibold'>—</span>
          )
        }
        badge={
          <Badge variant='outline' className='flex items-center gap-1'>
            <Medal className='h-4 w-4 text-[var(--kyu-4)]' /> Global Rank
          </Badge>
        }
        meta='Where you rank globally across Codewars users.'
        hint={
          leaderboardPosition
            ? 'Lower rank is better — solve more high-value kata to climb.'
            : 'No leaderboard data available.'
        }
      />
      <StatCardContainer
        title='Total Katas Completed'
        primary={
          <span className='text-2xl font-semibold'>
            {formatNumber(totalCompleted)}
          </span>
        }
        badge={
          <Badge variant='outline' className='flex items-center gap-1'>
            <Trophy className='h-4 w-4 text-[var(--royal-gold)]' />
            Katas
          </Badge>
        }
        meta='Total number of katas completed on Codewars.'
        hint='Higher completion counts reflect dedication to solving coding challenges.'
      />
      <StatCardContainer
        title='Overall Rank'
        primary={
          overall ? (
            <div className='flex items-baseline gap-2'>
              <span className='text-xl font-semibold'>{overall.name}</span>
              <span className='text-muted-foreground text-sm'>
                ({formatNumber(overall.score)} pts)
              </span>
            </div>
          ) : (
            <span className='text-lg font-semibold'>Unranked</span>
          )
        }
        badge={
          overall ? (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Award className='h-4 w-4' /> Rank Score
            </Badge>
          ) : null
        }
        meta='Your current kyū/dan rank on Codewars.'
        hint={
          overall
            ? 'Progress your rank by solving higher-kyū kata.'
            : 'Solve kata to obtain a rank.'
        }
      />
      <DiamondsCollectCard
        isConnected={data.isConnected}
        codewarsUsername={data.username}
        totalDiamonds={data.totalDiamonds}
      />
    </div>
  );
};

export default ClientStatusCardsContainer;
