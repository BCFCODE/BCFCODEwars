import { Row, Table } from '@tanstack/react-table';
import { LimitHeader } from '../../../components/LimitHeader';
import { SelectHeader } from '../Headers/SelectHeader';
import { TargetHeader } from '../../../components/TargetHeader';
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
import { UsersTableData } from '../../../types';
import { IconDiamond } from '@tabler/icons-react';
import { DiamondsCell } from './DiamondsCell';
import { DiamondsHeader } from '../../../components/DiamondsHeader';

export const dragHandle = {
  id: 'drag',
  header: () => null,
  cell: ({ row }: { row: Row<UsersTableData> }) => (
    <DragHandleCell id={row.original.id} />
  )
};

export const avatar = {
  accessorKey: 'image',
  header: () => null,
  cell: ({ row }: { row: Row<UsersTableData> }) => <AvatarCell {...{ row }} />
};

export const user = {
  accessorKey: 'user',
  header: 'User',
  cell: ({ row }: { row: Row<UsersTableData> }) => <UserCell {...{ row }} />,
  enableHiding: false
};

export const diamonds = {
  accessorKey: 'diamonds',
  header: () => <DiamondsHeader />,
  cell: ({ row }: { row: Row<UsersTableData> }) => (
    <DiamondsCell {...{ row }} />
  ),
  enableHiding: true
};

export const lastActivity = {
  accessorKey: 'lastActivity',
  header: 'Last Activity',
  cell: ({ row }: { row: Row<UsersTableData> }) => (
    <LastActivityCell {...{ row }} />
  ),
  enableHiding: true
};

export const status = {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }: { row: Row<UsersTableData> }) => <StatusCell {...{ row }} />
};

export const target = {
  accessorKey: 'target',
  header: () => <TargetHeader />,
  cell: ({ row }: { row: Row<UsersTableData> }) => <TargetCell {...{ row }} />
};

export const limit = {
  accessorKey: 'limit',
  header: () => <LimitHeader />,
  cell: ({ row }: { row: Row<UsersTableData> }) => <LimitCell {...{ row }} />
};

export const reviewer = {
  accessorKey: 'reviewer',
  header: 'Reviewer',
  cell: ({ row }: { row: Row<UsersTableData> }) => <ReviewerCell {...{ row }} />
};

export const memberSince = {
  accessorKey: 'since',
  header: 'Member since',
  cell: ({ row }: { row: Row<UsersTableData> }) => (
    <MemberSinceCell {...{ row }} />
  ),
  enableHiding: true
};

export const select = {
  id: 'select',
  header: ({ table }: { table: Table<UsersTableData> }) => (
    <SelectHeader {...{ table }} />
  ),
  cell: ({ row }: { row: Row<UsersTableData> }) => <SelectCell {...{ row }} />,
  enableSorting: false,
  enableHiding: false
};

export const actions = {
  id: 'actions',
  cell: () => <ActionsCell />
};
