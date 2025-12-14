'use client';

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
    fetch('/api/codewars/sync-background', {
      method: 'POST',
      // Don't wait for response
      keepalive: true // Continues even if tab closes
    }).catch(() => {
      // Silently fail - this is background work
    });
  }, []);

  // This component renders nothing
  return null;
}
