import { getPublicCodewarsUsers } from '@/services/userService';
import dummyData from '../dummyData.json';
import CodewarsDataTableTabs from './components/Tabs';

export default async function CodewarsTablePage() {
  const codewarsData = (await getPublicCodewarsUsers()) ?? [];

  const codewarsTemporaryDummyData = dummyData
    .map((data, i) =>
      codewarsData[i] ? { ...data, ...codewarsData[i] } : data
    )
    .slice(0, codewarsData.length);

  return <CodewarsDataTableTabs initialData={codewarsTemporaryDummyData} />;
}
