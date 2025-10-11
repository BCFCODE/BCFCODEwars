import { getKataData } from '@/app/repositories/codewarsRepository';
import { RecentKatas } from '@/features/overview/components/kata-champions';
import { cn } from '@/lib/utils';
import {
  getRecentlySolvedData,
  isConnectedToCodewars
} from '@/services/codewarsService';

export default async function RecentlySolved() {
  const { data: codewars } = await isConnectedToCodewars();

  if (codewars?.isConnected)
    await getKataData({
      codewarsUserId: codewars.id,
      codewarsUsername: codewars.username,
      codewarsName: codewars.name
    });

  const { data, success } = await getRecentlySolvedData({ limit: 3 });

  return (
    <RecentKatas
      data={success ? data : []}
      className={{
        kataNameStyles: cn('max-w-80')
      }}
    />
  );
}
