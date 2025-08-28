import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { z } from 'zod';
import { usersTableSchema } from '../../schemas';

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
  },
  {
    accessorKey: 'lastActivity',
    header: 'Last Activity',
    cell: ({ row }) => {
      return (
        <p>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'medium'
          }).format(row.original.lastActiveTime ?? row.original.firstLogin)}
        </p>
      );
    },
    enableHiding: true
  },
  {
    accessorKey: 'since',
    header: 'Since',
    cell: ({ row }) => {
      return (
        <p>
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          }).format(row.original.firstLogin)}
        </p>
      );
    },
    enableHiding: true
  }
];

export default columns;
