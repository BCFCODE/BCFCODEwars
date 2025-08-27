import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { z } from 'zod';
import { usersTableSchema } from '../../../schemas';

const columns: ColumnDef<z.infer<typeof usersTableSchema>>[] = [
  {
    accessorKey: 'image',
    header: '',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.original.image} referrerPolicy='no-referrer' />
          <AvatarFallback>{row.original.name[0]}</AvatarFallback>
        </Avatar>
      );
    },
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: 'User',
    cell: ({ row }) => {
      return <p>{row.original.name}</p>;
    },
    enableHiding: false
  }
];

export default columns;
