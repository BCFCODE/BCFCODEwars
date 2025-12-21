// app/dashboard/overview/@kata_champions/page.tsx

import { CodewarsChampions } from '@/features/overview/components/codewars-champions';
import { cn } from '@/lib/utils';
import { getCachedChampions } from '@/app/api/codewars/champions/route';

const LIMIT = 3;

export default async function CodewarsChampionsCard() {
  const cachedChampionsPromise = getCachedChampions(LIMIT, 0);

  return (
    <CodewarsChampions
      limit={LIMIT}
      cachedChampionsPromise={cachedChampionsPromise}
      className={{
        kataNameStyles: cn('max-w-80')
      }}
    />
  );
}
