import DataTableTabs, { TableTab } from './tables/components/DataTableTabs';
import dummyData from '../../../../../data/dummyData.json';
import { getPublicUsers } from '@/services/userService';

export default async function LeaderboardTabPage({
  params
}: {
  params: Promise<{ tab: TableTab }>;
}) {
  const { tab } = await params;

  let usersData = (await getPublicUsers()) ?? [];

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>
          <DataTableTabs
            productsData={dummyData}
            codewarsData={dummyData}
            usersData={usersData}
            currentTab={tab}
          />
        </div>
      </div>
    </div>
  );
}
