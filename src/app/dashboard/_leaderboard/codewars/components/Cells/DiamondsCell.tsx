import { Row } from '@tanstack/react-table';
import { CodewarsTableData } from '@/types';

export function DiamondsCell({ row }: { row: Row<CodewarsTableData> }) {
  return (
    <div className='flex items-center justify-center'>
      {row.original.totalDiamonds}
    </div>
  );
}
