// Simple in-memory rate limiter (good enough for 99% of apps)
const requests = new Map<string, number[]>();

export default function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60_000; // 1 minute
  const maxRequests = 60;

  const timestamps = requests.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < window);

  if (valid.length >= maxRequests) return true;

  valid.push(now);
  requests.set(ip, valid);
  return false;
}
