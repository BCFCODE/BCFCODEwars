import { Checkbox } from '@/components/ui/new-york-v4/checkbox';
import { Table } from '@tanstack/react-table';
import { UsersTable } from '../../../types';

export function SelectHeader({ table }: { table: Table<UsersTable> }) {
  return (
    <div className='flex items-center justify-center'>
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    </div>
  );
}
