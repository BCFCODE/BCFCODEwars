import { getPublicCodewarsUsers, getPublicUsers } from '@/services/userService';
import DataTableTabs, { TableTab } from './tables/components/DataTableTabs';
import dummyData from './tables/dummyData.json';

export default async function LeaderboardTabPage({
  params
}: {
  params: Promise<{ tab: TableTab }>;
}) {
  const { tab } = await params;

  const usersData = (await getPublicUsers()) ?? [];
  const usersTemporaryDummyData = dummyData.map((data, i) =>
    usersData[i] ? { ...data, ...usersData[i] } : data
  );

  const codewarsData = (await getPublicCodewarsUsers()) ?? [];
  const codewarsTemporaryDummyData = dummyData.map((data, i) =>
    codewarsData[i] ? { ...data, ...codewarsData[i] } : data
  );

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>
          <DataTableTabs
            codewarsData={codewarsTemporaryDummyData.slice(
              0,
              codewarsData.length
            )}
            usersData={usersTemporaryDummyData.slice(0, usersData.length)}
            productsData={dummyData}
            currentTab={tab}
          />
        </div>
      </div>
    </div>
  );
}
