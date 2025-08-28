'use client';

import { Badge } from '@/components/ui/new-york-v4/badge';
import { Label } from '@/components/ui/new-york-v4/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/new-york-v4/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/new-york-v4/tabs';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';
import * as React from 'react';
import { z } from 'zod';

import { useRouter } from 'next/navigation';
import { codewarsTableSchema, usersTableSchema } from '../../schemas';
import CodewarsTabContent from '../codewars';
import codewarsColumns from '../codewars/columns';
import DropDownMenus from './DropDownMenus';
import UsersTabContent from '../users';
import usersColumns from '../users/columns';

export type TableTab = 'users' | 'codewars';

function DataTableTabs({
  codewarsData: codewarsInitialData,
  usersData,
  currentTab
}: {
  codewarsData: z.infer<typeof codewarsTableSchema>[];
  usersData: z.infer<typeof usersTableSchema>[];
  currentTab: TableTab;
}) {
  const router = useRouter();
  // Codewars Tab
  const [codewarsData, setCodewarsData] = React.useState(
    () => codewarsInitialData
  );
  const [codewarsRowSelection, setCodewarsRowSelection] = React.useState({});
  const [codewarsColumnVisibility, setCodewarsColumnVisibility] =
    React.useState<VisibilityState>({});
  const [codewarsColumnFilters, setCodewarsColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [codewarsSorting, setCodewarsSorting] = React.useState<SortingState>(
    []
  );
  const [codewarsPagination, setCodewarsPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });

  const codewarsTable = useReactTable({
    data: codewarsData,
    columns: codewarsColumns,
    state: {
      sorting: codewarsSorting,
      columnVisibility: codewarsColumnVisibility,
      rowSelection: codewarsRowSelection,
      columnFilters: codewarsColumnFilters,
      pagination: codewarsPagination
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setCodewarsRowSelection,
    onSortingChange: setCodewarsSorting,
    onColumnFiltersChange: setCodewarsColumnFilters,
    onColumnVisibilityChange: setCodewarsColumnVisibility,
    onPaginationChange: setCodewarsPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  // Users Tab
  const [usersRowSelection, setUsersRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [usersColumnFilters, setUsersColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [usersSorting, setUsersSorting] = React.useState<SortingState>([]);
  const [usersPagination, setUsersPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });

  const usersTable = useReactTable({
    data: usersData,
    columns: usersColumns,
    state: {
      sorting: usersSorting,
      columnVisibility,
      rowSelection: usersRowSelection,
      columnFilters: usersColumnFilters,
      pagination: usersPagination
    },
    getRowId: (row) => row.email,
    enableRowSelection: true,
    onRowSelectionChange: setUsersRowSelection,
    onSortingChange: setUsersSorting,
    onColumnFiltersChange: setUsersColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setUsersPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  return (
    <Tabs
      value={currentTab}
      onValueChange={(val) =>
        router.push(`/dashboard/leaderboard/${val as TableTab}`)
      }
      className='w-full flex-col justify-start gap-6'
    >
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          View
        </Label>
        <Select
          value={currentTab}
          onValueChange={(val) =>
            router.push(`/dashboard/leaderboard/${val as TableTab}`)
          }
        >
          <SelectTrigger
            className='flex w-fit @4xl/main:hidden'
            size='sm'
            id='view-selector'
          >
            <SelectValue placeholder='Select a view' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='users'>Users</SelectItem>
            <SelectItem value='codewars'>Codewars</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className='**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex'>
          <TabsTrigger value='users' className='cursor-pointer'>
            Users
          </TabsTrigger>
          <TabsTrigger value='codewars' className='cursor-pointer'>
            Codewars <Badge variant='secondary'>3</Badge>
          </TabsTrigger>
        </TabsList>
        <DropDownMenus
          tab={currentTab}
          tables={{ users: usersTable, codewars: codewarsTable }}
        />
      </div>
      <UsersTabContent table={usersTable} />
      <CodewarsTabContent
        setData={setCodewarsData}
        data={codewarsData}
        table={codewarsTable}
      />
    </Tabs>
  );
}

export default DataTableTabs;
