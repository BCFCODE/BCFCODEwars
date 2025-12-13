// app/dashboard/overview/@kata_champions/page.tsx

// import { getKataData } from '@/app/repositories/codewarsRepository';
import { CodewarsChampions } from '@/features/overview/components/codewars-champions';
import { baseUrl } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { getInitialChampions } from './lib/getInitialChampions';
import { isConnectedToCodewars } from '@/services/codewarsService';
import { getKataData } from '@/app/repositories/codewarsRepository';
import syncWithCodewars from '@/app/api/lib/syncWithCodewars';
import { getCachedChampions } from '@/app/api/codewars/champions/route';

// import {
//   getRecentlySolvedData,
//   isConnectedToCodewars
// } from '@/services/codewarsService';

const LIMIT = 3;

// async function getInitialChampions() {
//   const res = await fetch(`${baseUrl}/api/codewars/champions?limit=${LIMIT}`, {
//     next: { revalidate: 300 },
//     cache: 'force-cache'
//   });

//   if (!res.ok) {
//     return { data: [], totalCount: 0 };
//   }

//   const json = await res.json();
//   return {
//     data: json.data
//     // totalCount: json.totalCount ?? 0
//   };
// }

export default async function CodewarsChampionsCard() {
  // I don't want the result of  syn, I just want the result of cWithCodewars()  getInitialChampions(LIMIT)
  const [, championsResult] = await Promise.allSettled([
    syncWithCodewars(),
    getCachedChampions(LIMIT, 0)
  ]);

  let championsData: any[] = [];
  if (championsResult.status === 'fulfilled') {
    championsData = championsResult.value?.data ?? [];
  } else {
    console.error('getCachedChampions failed:', championsResult.reason);
  }

  return (
    <CodewarsChampions
      limit={LIMIT}
      data={championsData}
      // totalCount={totalCount}
      className={{
        kataNameStyles: cn('max-w-80')
      }}
    />
  );
}
