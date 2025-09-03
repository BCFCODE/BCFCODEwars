import { Badge } from '@/components/ui/new-york-v4/badge';
import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { schema } from '../../../schemas/codewarsTableSchema';
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
} from './Cells';

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  dragHandle,
  select,
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
  actions
];

export default columns;
