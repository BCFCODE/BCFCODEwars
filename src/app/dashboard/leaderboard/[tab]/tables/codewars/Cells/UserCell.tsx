import { Row } from '@tanstack/react-table';
import { CodewarsTableCells } from '../../types';
import { TableCellViewer } from '../components/TableCellViewer';

export function UserCell({ row }: { row: Row<CodewarsTableCells> }) {
  return <TableCellViewer item={row.original} />;
}
