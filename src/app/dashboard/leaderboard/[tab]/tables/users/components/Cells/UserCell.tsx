import { Row } from '@tanstack/react-table';
import { UsersTableCells } from '../../../../../types';
import { TableCellViewer } from '../TableCellViewer';

export function UserCell({ row }: { row: Row<UsersTableCells> }) {
  return <TableCellViewer item={row.original} />;
}
