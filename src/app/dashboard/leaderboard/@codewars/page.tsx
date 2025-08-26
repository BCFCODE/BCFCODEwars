// import { delay } from '@/constants/mock-api';
import codewarsData from './data.json';
import CodewarsDataTable from './components/DataTable';

export default async function CodewarsLeaderboardPage() {
  // await await delay(2000);
  return <CodewarsDataTable data={codewarsData} />;
}
