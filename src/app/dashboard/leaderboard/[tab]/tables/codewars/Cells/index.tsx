import { Row, Table } from '@tanstack/react-table';
import { LimitHeader } from '../Headers/LimitHeader';
import { SelectHeader } from '../Headers/SelectHeader';
import { TargetHeader } from '../Headers/TargetHeader';
import { ActionsCell } from './ActionsCell';
import { AvatarCell } from './AvatarCell';
import { DragHandleCell } from './DragHandleCell';
import { LastActivityCell } from './LastActivityCell';
import { LimitCell } from './LimitCell';
import { MemberSinceCell } from './MemberSinceCell';
import { ReviewerCell } from './ReviewerCell';
import { SelectCell } from './SelectCell';
import { StatusCell } from './StatusCell';
import { TargetCell } from './TargetCell';
import { UserCell } from './UserCell';
import { CodewarsTableCells } from '../../../../types/CodewarsTable';

export const dragHandle = {
  id: 'drag',
  header: () => null,
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <DragHandleCell id={row.original.id} />
  )
};

export const avatar = {
  accessorKey: 'image',
  header: () => null,
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <AvatarCell {...{ row }} />
  )
};

export const user = {
  accessorKey: 'user',
  header: 'User',
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <UserCell {...{ row }} />
  ),
  enableHiding: false
};

export const lastActivity = {
  accessorKey: 'lastActivity',
  header: 'Last Activity',
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <LastActivityCell {...{ row }} />
  ),
  enableHiding: true
};

export const status = {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <StatusCell {...{ row }} />
  )
};

export const target = {
  accessorKey: 'target',
  header: () => <TargetHeader />,
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <TargetCell {...{ row }} />
  )
};

export const limit = {
  accessorKey: 'limit',
  header: () => <LimitHeader />,
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <LimitCell {...{ row }} />
  )
};

export const reviewer = {
  accessorKey: 'reviewer',
  header: 'Reviewer',
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <ReviewerCell {...{ row }} />
  )
};

export const memberSince = {
  accessorKey: 'since',
  header: 'Member since',
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <MemberSinceCell {...{ row }} />
  ),
  enableHiding: true
};

export const select = {
  id: 'select',
  header: ({ table }: { table: Table<CodewarsTableCells> }) => (
    <SelectHeader {...{ table }} />
  ),
  cell: ({ row }: { row: Row<CodewarsTableCells> }) => (
    <SelectCell {...{ row }} />
  ),
  enableSorting: false,
  enableHiding: false
};

export const actions = {
  id: 'actions',
  header: () => null,
  cell: () => <ActionsCell />
};
