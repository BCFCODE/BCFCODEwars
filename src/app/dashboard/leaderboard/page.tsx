'use client';

import data from './data.json';
import DataTable from './components/DataTable';

export default function LeaderboardPage() {
  return (
    <div className='@container/main flex flex-1 flex-col gap-2'>
      <div className='flex flex-col'>
        {/* <SectionCards />
        <div className='px-4 lg:px-6'>
          <ChartAreaInteractive />
        </div> */}
        <DataTable data={data} />
      </div>
    </div>
  );
}
