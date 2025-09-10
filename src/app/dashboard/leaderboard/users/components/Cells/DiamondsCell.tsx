import { Row } from '@tanstack/react-table';
import { UsersTableData } from '../../../types';

export function DiamondsCell({ row }: { row: Row<UsersTableData> }) {
  return (
    <div className='flex items-center justify-center'>
      {row.original.totalDiamonds}
    </div>
  );
}
