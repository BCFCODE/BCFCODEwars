import { delay } from '@/constants/mock-api';
import { RecentKatas } from '@/features/overview/components/recent-katas';

export default async function RecentlySolved() {
  await delay(3000);
  return <RecentKatas />;
}
