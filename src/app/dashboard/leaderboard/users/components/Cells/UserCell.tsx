import { Row } from '@tanstack/react-table';
import { TableCellViewer } from '../TableCellViewer';
import { UsersTableData } from '../../../types';

export function UserCell({ row }: { row: Row<UsersTableData> }) {
  return <TableCellViewer item={row.original} />;
}
