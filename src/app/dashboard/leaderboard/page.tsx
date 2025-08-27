import { redirect } from 'next/navigation';

const LeaderboardPage = () => {
  redirect('/dashboard/leaderboard/users');
};

export default LeaderboardPage;
