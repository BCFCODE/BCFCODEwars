import { Badge } from '@/components/ui/badge';
import { CodewarsProfileData } from '@/types';
import { Award, Medal, Trophy } from 'lucide-react';
import { DiamondsCollectButtonCard } from './DiamondsCollectButtonCard';
import { StatCard } from './StatCard';

interface Props {
  data: CodewarsProfileData;
}

export async function StatCards({ data }: Props) {
  const honor = data?.honor ?? null;
  const leaderboardPosition = data?.leaderboardPosition ?? null;
  const overall = data?.ranks?.overall ?? null;

  const formatNumber = (n: number | null | undefined) =>
    typeof n === 'number' ? n.toLocaleString() : '—';

  return (
    <>
      <StatCard
        title='Total Honor'
        primary={
          <span className='text-2xl font-semibold'>{formatNumber(honor)}</span>
        }
        badge={
          <Badge variant='outline' className='flex items-center gap-1'>
            <Trophy className='h-4 w-4 text-[var(--royal-gold)]' />
            Honor
          </Badge>
        }
        meta='Community reputation points earned on Codewars.'
        hint='Higher honor indicates consistent contributions & kata solving.'
      />

      <StatCard
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

      <StatCard
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

      <DiamondsCollectButtonCard count={data.totalDiamonds} />
    </>
  );
}
