'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { Kata } from '@/types';
import { DaysAgo } from './DaysAgo';

export const columns: ColumnDef<Kata>[] = [
  {
    accessorKey: 'completedAt',
    header: 'Times Ago',
    cell: ({ row }: { row: Row<Kata> }) => (
      <DaysAgo date={row.original.completedAt} />
    )
  },
  {
    accessorKey: 'name',
    header: 'Kata',
    cell: ({ row }: { row: Row<Kata> }) => <p>{row.original.name}</p>
  }
];
