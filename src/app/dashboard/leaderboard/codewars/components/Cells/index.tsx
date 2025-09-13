import { Row, Table } from '@tanstack/react-table';
import { SelectHeader } from '../Headers/SelectHeader';
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
import { CodewarsTableData } from '../../../types';
import { TargetHeader } from '../../../components/TargetHeader';
import { LimitHeader } from '../../../components/LimitHeader';
import { DiamondsHeader } from '../../../components/DiamondsHeader';
import { DiamondsCell } from './DiamondsCell';

export const dragHandle = {
  id: 'drag',
  header: () => null,
  cell: ({ row }: { row: Row<CodewarsTableData> }) => (
    <DragHandleCell id={row.original.id} />
  )
};

export const avatar = {
  accessorKey: 'image',
  header: () => null,
  cell: ({ row }: { row: Row<CodewarsTableData> }) => (
    <AvatarCell {...{ row }} />
  )
};

export const user = {
  accessorKey: 'user',
  header: 'User',
  cell: ({ row }: { row: Row<CodewarsTableData> }) => <UserCell {...{ row }} />,
  enableHiding: false
};

export const diamonds = {
  accessorKey: 'diamonds',
  header: () => <DiamondsHeader />,
  cell: ({ row }: { row: Row<CodewarsTableData> }) => (
    <DiamondsCell {...{ row }} />
  ),
  enableHiding: true
};

export const lastActivity = {
  accessorKey: 'lastActivity',
  header: 'Last Activity',
  cell: ({ row }: { row: Row<CodewarsTableData> }) => (
    <LastActivityCell {...{ row }} />
  ),
  enableHiding: true
};

export const status = {
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }: { row: Row<CodewarsTableData> }) => (
    <StatusCell {...{ row }} />
  )
};

export const target = {
  accessorKey: 'target',
  header: () => <TargetHeader />,
  cell: ({ row }: { row: Row<CodewarsTableData> }) => (
    <TargetCell {...{ row }} />
  )
};

export const limit = {
  accessorKey: 'limit',
  header: () => <LimitHeader />,
  cell: ({ row }: { row: Row<CodewarsTableData> }) => <LimitCell {...{ row }} />
};

export const reviewer = {
  accessorKey: 'reviewer',
  header: 'Reviewer',
  cell: ({ row }: { row: Row<CodewarsTableData> }) => (
    <ReviewerCell {...{ row }} />
  )
};

export const memberSince = {
  accessorKey: 'since',
  header: 'Member since',
  cell: ({ row }: { row: Row<CodewarsTableData> }) => (
    <MemberSinceCell {...{ row }} />
  ),
  enableHiding: true
};

export const select = {
  id: 'select',
  header: ({ table }: { table: Table<CodewarsTableData> }) => (
    <SelectHeader {...{ table }} />
  ),
  cell: ({ row }: { row: Row<CodewarsTableData> }) => (
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
