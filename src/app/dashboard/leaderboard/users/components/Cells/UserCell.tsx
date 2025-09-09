import { Row } from '@tanstack/react-table';
import { UsersTableData } from '../../../../../types';
import { TableCellViewer } from '../TableCellViewer';

export function UserCell({ row }: { row: Row<UsersTableData> }) {
  return <TableCellViewer item={row.original} />;
}
