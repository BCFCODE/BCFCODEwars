import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Row } from '@tanstack/react-table';
import { UsersTableCells } from '../../../../../types';

export function AvatarCell({ row }: { row: Row<UsersTableCells> }) {
  return (
    <Avatar>
      <AvatarImage src={row.original.image} referrerPolicy='no-referrer' />
      <AvatarFallback>
        {row.original.name ? row.original.name[0] : ''}
      </AvatarFallback>
    </Avatar>
  );
}
