import DataTableTabs, { TableTab } from './tables/components/DataTableTabs';
import dummyData from './tables/dummyData.json';
import { getPublicCodewarsUsers, getPublicUsers } from '@/services/userService';

export default async function LeaderboardTabPage({
  params
}: {
  params: Promise<{ tab: TableTab }>;
}) {
  const { tab } = await params;

  const usersData = (await getPublicUsers()) ?? [];
  const codewarsUsers = await getPublicCodewarsUsers();

  const codewarsTemporaryDummyData = dummyData.map((data, i) =>
    codewarsUsers[i] ? { ...data, ...codewarsUsers[i] } : data
  );

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>
          <DataTableTabs
            productsData={dummyData}
            codewarsData={codewarsTemporaryDummyData}
            usersData={usersData}
            currentTab={tab}
          />
        </div>
      </div>
    </div>
  );
}
