export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export const tableTabUrls = {
  users: `/dashboard/leaderboard/users`,
  codewars: `/dashboard/leaderboard/codewars`
};
