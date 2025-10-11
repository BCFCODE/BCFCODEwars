import { getKataData } from '@/app/repositories/codewarsRepository';
import { CodewarsChampions } from '@/features/overview/components/codewars-champions';
import { cn } from '@/lib/utils';
import {
  getRecentlySolvedData,
  isConnectedToCodewars
} from '@/services/codewarsService';

export default async function CodewarsChampionsCard() {
  const { data: codewars } = await isConnectedToCodewars();

  if (codewars?.isConnected)
    await getKataData({
      codewarsUserId: codewars.id,
      codewarsUsername: codewars.username,
      codewarsName: codewars.name
    });

  const { data, success } = await getRecentlySolvedData({ limit: 3 });

  return (
    <CodewarsChampions
      data={success ? data : []}
      className={{
        kataNameStyles: cn('max-w-80')
      }}
    />
  );
}
