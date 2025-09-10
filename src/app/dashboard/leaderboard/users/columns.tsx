import { ColumnDef } from '@tanstack/react-table';

import {
  actions,
  avatar,
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
import { UsersTableData } from '../types';

const columns: ColumnDef<UsersTableData>[] = [
  dragHandle,
  avatar,
  user,
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
