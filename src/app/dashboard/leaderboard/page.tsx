import DataTableTabs from './components/DataTableTabs';
import codewarsDummyData from '../../../../data/codewarsDummyData.json';
import usersData from '../../../../data/BCFCODEwars.users.json';

const LeaderboardPage = () => {
  return (
    <div className='flex flex-1 flex-col'>
      {' '}
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>
          {/* <SectionCards />
        <div className='px-4 lg:px-6'>
          <ChartAreaInteractive />
        </div> */}
          <DataTableTabs
            codewarsData={codewarsDummyData}
            usersData={usersData}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
