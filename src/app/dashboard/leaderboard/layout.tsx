import React, { PropsWithChildren } from 'react';
import DataTableTabs from './components/DataTableTabs';

interface Props extends PropsWithChildren {
  users: React.ReactNode;
  codewars: React.ReactNode;
}

const LeaderboardLayout = ({ users, codewars }: Props) => {
  return (
    <div className='flex flex-1 flex-col'>
      {' '}
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>
          {/* <SectionCards />
        <div className='px-4 lg:px-6'>
          <ChartAreaInteractive />
        </div> */}
          <DataTableTabs slots={{ users, codewars }} />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardLayout;
