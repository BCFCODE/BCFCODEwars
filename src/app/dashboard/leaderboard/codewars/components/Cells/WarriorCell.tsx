import { Row } from '@tanstack/react-table';
import { TableCellViewer } from '../TableCellViewer';
import { CodewarsTableData } from '../../../types';

export function WarriorCell({ row }: { row: Row<CodewarsTableData> }) {
  return <TableCellViewer codewarsUser={row.original} />;
}
