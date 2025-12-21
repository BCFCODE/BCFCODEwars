import { getCachedChampions } from '@/app/api/codewars/champions/route';
import { CodewarsChampions } from '@/features/overview/components/codewars-champions';
import { isConnectedToCodewars } from '@/services/codewarsService';
import ChampionsPageHeader from '../../components/ChampionsPageHeader';

const LIMIT = 25;

export default async function CodewarsChampionsPage() {
  // Fetch champions from cache immediately - sync happens in background from overview
  const cachedChampionsPromise = getCachedChampions(LIMIT, 0);
  const promise = isConnectedToCodewars();

  // let championsData: recentlySolvedKata[] = [];
  // if (championsResult) {
  //   championsData = championsResult?.data ?? [];
  // } else {
  //   console.error('getCachedChampions failed');
  // }

  return (
    <div className='flex flex-1 flex-col space-y-6'>
      <ChampionsPageHeader codewarsDataPromise={promise} />
      <CodewarsChampions
        limit={LIMIT}
        showPagination
        cachedChampionsPromise={cachedChampionsPromise}
        className={{
          avatarStyles: 'h-10 w-10'
        }}
      />
    </div>
  );
}
