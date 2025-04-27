export const MILLISECONDS_PER_DAY = 1 * 24 * 60 * 60 * 1000;

export const getMillisecondsDaysAgo = (days: 1 | 7 | 30 | 365): number => {
  return Date.now() - days * MILLISECONDS_PER_DAY;
};
