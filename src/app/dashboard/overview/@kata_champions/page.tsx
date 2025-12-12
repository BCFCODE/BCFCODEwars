// app/dashboard/overview/@kata_champions/page.tsx

// import { getKataData } from '@/app/repositories/codewarsRepository';
import { CodewarsChampions } from '@/features/overview/components/codewars-champions';
import { baseUrl } from '@/lib/constants';
import { cn } from '@/lib/utils';
// import {
//   getRecentlySolvedData,
//   isConnectedToCodewars
// } from '@/services/codewarsService';

const LIMIT = 3;

async function getInitialChampions() {
  const res = await fetch(`${baseUrl}/api/codewars/champions?limit=${LIMIT}`, {
    next: { revalidate: 300 },
    cache: 'force-cache'
  });

  if (!res.ok) {
    return { data: [], totalCount: 0 };
  }

  const json = await res.json();
  return {
    data: json.data
    // totalCount: json.totalCount ?? 0
  };
}

export default async function CodewarsChampionsCard() {
  // const { data: codewars } = await isConnectedToCodewars();

  // if (codewars?.isConnected)
  //   await getKataData({
  //     codewarsUserId: codewars.id,
  //     codewarsUsername: codewars.username,
  //     codewarsName: codewars.name
  //   });

  // const { data, success } = await getRecentlySolvedData({ limit });

  const { data: championsData } = await getInitialChampions();

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
