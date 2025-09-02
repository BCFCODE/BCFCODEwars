import { Row } from '@tanstack/react-table';
import React from 'react';
import { UsersTable } from '../../../types';
import { TableCellViewer } from '../TableCellViewer';

export function UserCell({ row }: { row: Row<UsersTable> }) {
  return <TableCellViewer item={row.original} />;
}
