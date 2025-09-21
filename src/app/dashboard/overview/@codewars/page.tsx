import { isConnectedToCodewars } from '@/services/codewarsService';
import { CodewarsStatusCard } from '../(cards)/@codewars/StatusCard';

export default async function StatusCard() {
  const isConnected = await isConnectedToCodewars();

  if (isConnected.success)
    return <CodewarsStatusCard codewarsUser={isConnected.data} />;
}
