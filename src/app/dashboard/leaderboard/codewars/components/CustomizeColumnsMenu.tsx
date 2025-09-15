import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { IconChevronDown, IconLayoutColumns } from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';
import { CodewarsTableData } from '../../types';

export function CustomizeColumnsMenu({
  table
}: {
  table: Table<CodewarsTableData>;
}) {
  return (
    <div className='flex items-center gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm'>
            <IconLayoutColumns />
            <span className='hidden lg:inline'>Customize Columns</span>
            <span className='lg:hidden'>Columns</span>
            <IconChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide()
            )
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
