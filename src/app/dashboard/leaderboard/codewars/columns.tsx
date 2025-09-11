import { ColumnDef } from '@tanstack/react-table';
import { CodewarsTableData } from '../types';
import {
  actions,
  avatar,
  dragHandle,
  limit,
  reviewer,
  select,
  status,
  target,
  user
} from './components/Cells';
import { Badge } from '@/components/ui/badge';

const columns: ColumnDef<CodewarsTableData>[] = [
  dragHandle,
  avatar,
  user,
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
