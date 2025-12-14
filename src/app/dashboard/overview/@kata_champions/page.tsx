// app/dashboard/overview/@kata_champions/page.tsx

import { CodewarsChampions } from '@/features/overview/components/codewars-champions';
import { cn } from '@/lib/utils';
import { getCachedChampions } from '@/app/api/codewars/champions/route';

const LIMIT = 3;

export default async function CodewarsChampionsCard() {
  // Sync happens in the @codewars slot which runs in parallel
  // This slot just fetches the freshly synced cached data
  const championsResult = await getCachedChampions(LIMIT, 0);

  let championsData: any[] = [];
  if (championsResult) {
    championsData = championsResult?.data ?? [];
  } else {
    console.error('getCachedChampions failed');
  }

  return (
    <CodewarsChampions
      limit={LIMIT}
      data={championsData}
      className={{
        kataNameStyles: cn('max-w-80')
      }}
    />
  );
}
