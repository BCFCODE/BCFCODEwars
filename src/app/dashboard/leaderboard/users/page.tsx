import { getPublicUsers } from '@/services/userService';
import dummyData from '../dummyData.json';
import UsersDataTableTabs from './components/Tabs';

export default async function UsersTablePage() {
  const usersData = (await getPublicUsers()) ?? [];
  const usersTemporaryDummyData = dummyData
    .map((data, i) => (usersData[i] ? { ...data, ...usersData[i] } : data))
    .slice(0, usersData.length);

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>
          <UsersDataTableTabs initialData={usersTemporaryDummyData} />
        </div>
      </div>
    </div>
  );
}
