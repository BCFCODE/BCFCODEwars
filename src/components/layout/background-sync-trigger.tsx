'use client';

import syncCodewarsInBackground from '@/app/api/lib/syncInBackground';
import { useEffect } from 'react';

/**
 * Client-side sync trigger component
 * - Fires after page is fully loaded
 * - Doesn't block anything
 * - Silently fails if sync has issues
 */
export function BackgroundSyncTrigger() {
  useEffect(() => {
    // Use non-blocking request to sync
    syncCodewarsInBackground();
  }, []);

  // This component renders nothing
  return null;
}
