import { Badge } from '@/components/ui/badge';
import { Award, Code, Medal, Trophy } from 'lucide-react';
import { StatCard } from './StatCard';
import { getCodewarsProfileData } from '@/services/codewarsService';

export async function StatCards() {
  // Fetch and validate profile
  let { data: profileData } = await getCodewarsProfileData();

  const honor = profileData?.honor ?? null;
  const leaderboardPosition = profileData?.leaderboardPosition ?? null;
  const overall = profileData?.ranks?.overall ?? null;
  const languages = profileData?.ranks?.languages ?? {};
  const languageEntries = Object.entries(languages);
  const topLanguage =
    languageEntries.length > 0
      ? languageEntries.sort((a, b) => b[1].score - a[1].score)[0] // [lang, {name,color,score}]
      : null;
  const skillsCount = (profileData?.skills ?? []).length;

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

      <StatCard
        title='Top Language'
        primary={
          topLanguage ? (
            <div className='flex items-baseline gap-2'>
              <span className='text-lg font-semibold'>{topLanguage[0]}</span>
              <span className='text-muted-foreground text-sm'>
                • {topLanguage[1].name}
              </span>
            </div>
          ) : (
            <span className='text-lg font-semibold'>—</span>
          )
        }
        badge={
          topLanguage ? (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Code className='h-4 w-4' />
              {formatNumber(topLanguage[1].score)}
            </Badge>
          ) : (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Code className='h-4 w-4' /> Languages
            </Badge>
          )
        }
        meta='Your best-performing language on Codewars.'
        hint={`${languageEntries.length} language${languageEntries.length === 1 ? '' : 's'} tracked • ${skillsCount} skill${skillsCount === 1 ? '' : 's'}`}
      />
    </>
  );
}
