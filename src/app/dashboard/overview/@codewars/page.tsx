import { isConnectedToCodewars } from '@/services/codewarsService';
import { CodewarsStatusCard } from './StatusCard';

export default async function StatusCard() {
  // Just show connection status - NO SYNC during render
  // Sync is removed to improve FCP (3.17s → target <1.8s)
  // Consider syncing via cron job or user action instead
  const isConnected = await isConnectedToCodewars();

  if (isConnected.success)
    return <CodewarsStatusCard codewarsUser={isConnected.data} />;
}
