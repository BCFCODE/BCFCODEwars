import { Row } from '@tanstack/react-table';
import { CodewarsTableData } from '../../../../../types';
import { TableCellViewer } from '../TableCellViewer';

export function UserCell({ row }: { row: Row<CodewarsTableData> }) {
  return <TableCellViewer item={row.original} />;
}
