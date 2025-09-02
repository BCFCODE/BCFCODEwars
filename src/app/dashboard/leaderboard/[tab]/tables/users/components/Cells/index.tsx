import { Row, Table } from '@tanstack/react-table';
import { UsersTable } from '../../../types';
import { DragHandleCell } from './DragHandleCell';
import { AvatarCell } from './AvatarCell';
import { UserCell } from './UserCell';
import { LastActivityCell } from './LastActivityCell';
import { StatusCell } from './StatusCell';
import { TargetCell } from './TargetCell';
import { LimitCell } from './LimitCell';
import { ReviewerCell } from './ReviewerCell';
import { MemberSinceCell } from './MemberSinceCell';
import { SelectCell } from './SelectCell';
import { SelectHeader } from '../Headers/SelectHeader';
import ActionsCell from './ActionsCell';
import { LimitHeader } from '../Headers/LimitHeader';
import { TargetHeader } from '../Headers/TargetHeader';

export const dragHandle = {
  id: 'drag',
  header: () => null,
  cell: ({ row }: { row: Row<UsersTable> }) => (
    <DragHandleCell id={row.original.id} />
  )
};

export const avatar = {
  accessorKey: 'image',
  header: () => null,
  cell: ({ row }: { row: Row<UsersTable> }) => <AvatarCell {...{ row }} />
};

export const user = {
  accessorKey: 'user',
  header: 'User',
  cell: ({ row }: { row: Row<UsersTable> }) => <UserCell {...{ row }} />,
  enableHiding: false
};

export const lastActivity = {
  accessorKey: 'lastActivity',
  header: 'Last Activity',
  cell: ({ row }: { row: Row<UsersTable> }) => (
    <LastActivityCell {...{ row }} />
  ),
  enableHiding: true
};

export const status = {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }: { row: Row<UsersTable> }) => <StatusCell {...{ row }} />
};

export const target = {
  accessorKey: 'target',
  header: () => <TargetHeader />,
  cell: ({ row }: { row: Row<UsersTable> }) => <TargetCell {...{ row }} />
};

export const limit = {
  accessorKey: 'limit',
  header: () => <LimitHeader />,
  cell: ({ row }: { row: Row<UsersTable> }) => <LimitCell {...{ row }} />
};

export const reviewer = {
  accessorKey: 'reviewer',
  header: 'Reviewer',
  cell: ({ row }: { row: Row<UsersTable> }) => <ReviewerCell {...{ row }} />
};

export const memberSince = {
  accessorKey: 'since',
  header: 'Member since',
  cell: ({ row }: { row: Row<UsersTable> }) => <MemberSinceCell {...{ row }} />,
  enableHiding: true
};

export const select = {
  id: 'select',
  header: ({ table }: { table: Table<UsersTable> }) => (
    <SelectHeader {...{ table }} />
  ),
  cell: ({ row }: { row: Row<UsersTable> }) => <SelectCell {...{ row }} />,
  enableSorting: false,
  enableHiding: false
};

export const actions = {
  id: 'actions',
  cell: () => <ActionsCell />
};
