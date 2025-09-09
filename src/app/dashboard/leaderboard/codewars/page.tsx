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

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>
          <CodewarsDataTableTabs initialData={codewarsTemporaryDummyData} />
        </div>
      </div>
    </div>
  );
}
