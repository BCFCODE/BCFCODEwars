'use client';

import { ColumnDef, Row } from '@tanstack/react-table';
import { Kata } from '@/types';
import { DaysAgo } from './DaysAgo';
import { SolvedOn } from './SolvedOn';
import { KataName } from './KataName';

export const columns: ColumnDef<Kata>[] = [
  {
    accessorKey: 'completedAt',
    header: () => <p className='pl-3 text-left'>Times Ago</p>,
    cell: ({ row }: { row: Row<Kata> }) => (
      <DaysAgo date={row.original.completedAt} />
    )
  },
  {
    accessorKey: 'name',
    header: () => <p className='pl-10 text-left'>Kata&apos;s Name</p>,
    cell: ({ row }: { row: Row<Kata> }) => (
      <KataName date={row.original.completedAt} name={row.original.name} />
    )
  },
  {
    accessorKey: 'solved-on',
    header: () => <p className='pl-5 text-left'>Solved On</p>,
    cell: ({ row }: { row: Row<Kata> }) => (
      <SolvedOn date={row.original.completedAt} />
    )
  }
];
