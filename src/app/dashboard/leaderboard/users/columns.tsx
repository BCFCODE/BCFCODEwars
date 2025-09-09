import { ColumnDef } from '@tanstack/react-table';
import { UsersTableData } from '../../../types';
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
