// import { useSelectedLayoutSegment } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  users: React.ReactNode;
  codewars: React.ReactNode;
}

const LeaderboardLayout = ({ users, codewars }: Props) => {
  //   const leaderBoardType = checkUserRole()
  // console.log(usersSegment)
  return (
    <div className='flex flex-1 flex-col'>
      {' '}
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col'>
          {/* <SectionCards />
        <div className='px-4 lg:px-6'>
          <ChartAreaInteractive />
        </div> */}
          {/* <CodewarsDataTable data={codewarsData} /> */}
          {users}
          {codewars}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardLayout;
