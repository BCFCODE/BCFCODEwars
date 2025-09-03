import { Row, Table } from '@tanstack/react-table';
import { UsersTableCells } from '../../../../../types';
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

export const dragHandle = {
  id: 'drag',
  header: () => null,
  cell: ({ row }: { row: Row<UsersTableCells> }) => (
    <DragHandleCell id={row.original.id} />
  )
};

export const avatar = {
  accessorKey: 'image',
  header: () => null,
  cell: ({ row }: { row: Row<UsersTableCells> }) => <AvatarCell {...{ row }} />
};

export const user = {
  accessorKey: 'user',
  header: 'User',
  cell: ({ row }: { row: Row<UsersTableCells> }) => <UserCell {...{ row }} />,
  enableHiding: false
};

export const lastActivity = {
  accessorKey: 'lastActivity',
  header: 'Last Activity',
  cell: ({ row }: { row: Row<UsersTableCells> }) => (
    <LastActivityCell {...{ row }} />
  ),
  enableHiding: true
};

export const status = {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }: { row: Row<UsersTableCells> }) => <StatusCell {...{ row }} />
};

export const target = {
  accessorKey: 'target',
  header: () => <TargetHeader />,
  cell: ({ row }: { row: Row<UsersTableCells> }) => <TargetCell {...{ row }} />
};

export const limit = {
  accessorKey: 'limit',
  header: () => <LimitHeader />,
  cell: ({ row }: { row: Row<UsersTableCells> }) => <LimitCell {...{ row }} />
};

export const reviewer = {
  accessorKey: 'reviewer',
  header: 'Reviewer',
  cell: ({ row }: { row: Row<UsersTableCells> }) => (
    <ReviewerCell {...{ row }} />
  )
};

export const memberSince = {
  accessorKey: 'since',
  header: 'Member since',
  cell: ({ row }: { row: Row<UsersTableCells> }) => (
    <MemberSinceCell {...{ row }} />
  ),
  enableHiding: true
};

export const select = {
  id: 'select',
  header: ({ table }: { table: Table<UsersTableCells> }) => (
    <SelectHeader {...{ table }} />
  ),
  cell: ({ row }: { row: Row<UsersTableCells> }) => <SelectCell {...{ row }} />,
  enableSorting: false,
  enableHiding: false
};

export const actions = {
  id: 'actions',
  cell: () => <ActionsCell />
};
