import { Avatar, AvatarFallback, AvatarImage } from '@/components/UI/avatar';
import { Row } from '@tanstack/react-table';
import { UsersTableData } from '../../../types';

export function AvatarCell({ row }: { row: Row<UsersTableData> }) {
  return (
    <Avatar>
      <AvatarImage src={row.original.image} referrerPolicy='no-referrer' />
      <AvatarFallback>
        {row.original.name ? row.original.name[0] : ''}
      </AvatarFallback>
    </Avatar>
  );
}
