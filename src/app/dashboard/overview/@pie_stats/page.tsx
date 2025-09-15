import { delay } from '@/constants/mock-api';
import { PieGraph } from '@/features/overview/components/pie-graph';

export default async function Stats() {
  await delay(2000);
  return <PieGraph />;
}
