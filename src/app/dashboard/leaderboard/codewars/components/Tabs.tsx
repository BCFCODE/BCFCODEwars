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
import React from 'react';
import { CodewarsTableData } from '../../types';
import columns from '../columns';
import { CustomizeColumnsMenu } from './CustomizeColumnsMenu';
import CodewarsTabContent from './TabContent';

export default function CodewarsDataTableTabs({
  initialData
}: {
  initialData: CodewarsTableData[];
}) {
  const [data, setData] = React.useState<CodewarsTableData[]>(
    () => initialData
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data,
    columns,
    // initialState: {
    //   pagination: {
    //     pageIndex: 0,
    //     pageSize: 10
    //   }
    // },
    state: {
      sorting: sorting,
      columnVisibility: columnVisibility,
      rowSelection: rowSelection,
      columnFilters: columnFilters,
      pagination: pagination
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetAll: false
  });

  return (
    <Tabs
      defaultValue='codewars'
      // value={currentTab}
      // onValueChange={(val) =>
      //   router.push(`/dashboard/leaderboard/${val as TableTab}`)
      // }
      className='w-full flex-col justify-start gap-6'
    >
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          View
        </Label>
        <Select
        // value={currentTab}
        // onValueChange={(val) =>
        //   router.push(`/dashboard/leaderboard/${val as TableTab}`)
        // }
        >
          <SelectTrigger
            className='flex w-fit @4xl/main:hidden'
            size='sm'
            id='view-selector'
          >
            <SelectValue placeholder='Select a view' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='users'>CodewarsUsers</SelectItem>
            <SelectItem value='codewars'>Codewars</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className='**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex'>
          <TabsTrigger value='users' className='cursor-pointer'>
            Users{' '}
            {/* <Badge variant='secondary'>
              {table.getCoreRowModel().rows.length}
            </Badge> */}
          </TabsTrigger>
          <TabsTrigger value='codewars' className='cursor-pointer'>
            Codewars{' '}
            <Badge variant='secondary'>
              {table.getCoreRowModel().rows.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <CustomizeColumnsMenu {...{ table }} />
      </div>
      <CodewarsTabContent {...{ table, data, setData }} />
    </Tabs>
  );
}
