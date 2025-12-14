import syncWithCodewars from '@/app/api/lib/syncWithCodewars';
import { isConnectedToCodewars } from '@/services/codewarsService';
import { CodewarsStatusCard } from './StatusCard';

// Don't await sync - trigger it in the background without blocking render
// This function starts the sync but doesn't wait for it to complete
async function triggerBackgroundSync() {
  try {
    // Fire and forget - sync happens asynchronously
    syncWithCodewars().catch((err) =>
      console.error('Background sync failed:', err)
    );
  } catch (err) {
    // Silently fail - don't block the page render
    console.error('Sync trigger error:', err);
  }
}

export default async function StatusCard() {
  // Trigger sync in background but don't await it
  triggerBackgroundSync();

  const isConnected = await isConnectedToCodewars();

  if (isConnected.success)
    return <CodewarsStatusCard codewarsUser={isConnected.data} />;
}
