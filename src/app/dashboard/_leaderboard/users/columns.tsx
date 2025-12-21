import { ColumnDef } from '@tanstack/react-table';

import {
  actions,
  avatar,
  diamonds,
  dragHandle,
  lastActivity,
  limit,
  memberSince,
  reviewer,
  select,
  status,
  target,
  user
} from './components/Cells';
import { UsersTableData } from '@/types';

const columns: ColumnDef<UsersTableData>[] = [
  dragHandle,
  avatar,
  user,
  diamonds,
  lastActivity,
  status,
  target,
  limit,
  reviewer,
  memberSince,
  select,
  actions
];

export default columns;
