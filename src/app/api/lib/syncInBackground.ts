const syncCodewarsInBackground = () => {
  // Use non-blocking request to sync
  fetch('/api/codewars/sync-background', {
    method: 'POST',
    // Don't wait for response
    keepalive: true // Continues even if tab closes
  }).catch(() => {
    // Silently fail - this is background work
  });
};

export default syncCodewarsInBackground;
