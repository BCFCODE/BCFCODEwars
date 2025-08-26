// import { delay } from '@/constants/mock-api';
import usersData from '../../../../../data/BCFCODEwars.users.json';
import UsersDataTable from './components/DataTable';

export default async function UsersLeaderboardPage() {
  // await await delay(2000);
  return <UsersDataTable data={usersData} />;
}
