import { Row } from '@tanstack/react-table';
import { TableCellViewer } from '../TableCellViewer';
import { CodewarsTableData } from '../../../types';

export function UserCell({ row }: { row: Row<CodewarsTableData> }) {
  return <TableCellViewer codewarsUser={row.original} />;
}
