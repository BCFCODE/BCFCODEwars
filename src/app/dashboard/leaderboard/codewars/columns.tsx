import { ColumnDef } from '@tanstack/react-table';

import {
  actions,
  avatar,
  diamonds,
  dragHandle,
  limit,
  reviewer,
  select,
  status,
  target,
  warrior
} from './components/Cells';
import { Badge } from '@/components/ui/badge';
import { CodewarsTableData } from '@/types';

const columns: ColumnDef<CodewarsTableData>[] = [
  dragHandle,
  avatar,
  warrior,
  diamonds,
  {
    accessorKey: 'type',
    header: 'Section Type',
    cell: ({ row }) => (
      <div className='w-32'>
        <Badge variant='outline' className='text-muted-foreground px-1.5'>
          {row.original.type}
        </Badge>
      </div>
    )
  },
  status,
  target,
  limit,
  reviewer,
  select,
  actions
];

export default columns;
