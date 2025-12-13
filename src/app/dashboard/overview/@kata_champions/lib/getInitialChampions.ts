import { baseUrl } from '@/lib/constants';

export async function getInitialChampions(LIMIT: number) {
  const res = await fetch(`${baseUrl}/api/codewars/champions?limit=${LIMIT}`, {
    next: { revalidate: 300 },
    cache: 'force-cache'
  });

  if (!res.ok) {
    return { data: [], totalCount: 0 };
  }

  const json = await res.json();
  return {
    data: json.data,
    totalCount: json.totalCount || json.data?.length || 0
  };
}
