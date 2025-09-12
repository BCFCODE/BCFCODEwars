import { Checkbox } from '@/components/UI/checkbox';
import { Row } from '@tanstack/react-table';
import { UsersTableData } from '../../../types';

export function SelectCell({ row }: { row: Row<UsersTableData> }) {
  return (
    <div className='flex items-center justify-center'>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    </div>
  );
}
