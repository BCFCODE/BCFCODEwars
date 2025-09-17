import { delay } from '@/constants/mock-api';
import { CodewarsRadarOverViewPage } from '@/features/overview/components/codewars-radar-overview-page';

export default async function CodewarsRadarChart() {
  await delay(2000);
  return <CodewarsRadarOverViewPage />;
}
