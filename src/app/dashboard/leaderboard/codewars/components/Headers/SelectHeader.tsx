import { Checkbox } from '@/components/ui/checkbox';
import { CodewarsTableData } from '@/types';
import { Table } from '@tanstack/react-table';

export function SelectHeader({ table }: { table: Table<CodewarsTableData> }) {
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
