import { getKataData } from '@/app/repositories/codewarsRepository';
import { RecentKatas } from '@/features/overview/components/recent-katas';
import {
  getRecentlySolvedData,
  isConnectedToCodewars
} from '@/services/codewarsService';

export default async function RecentlySolved() {
  const { data: codewars } = await isConnectedToCodewars();

  if (codewars?.isConnected)
    await getKataData({
      userId: codewars?.id ?? '',
      username: codewars?.username ?? ''
    });

  const { data, success } = await getRecentlySolvedData();

  return <RecentKatas data={success ? data : []} />;
}
