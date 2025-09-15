// \src\app\dashboard\leaderboard\codewars\components\Tabs.tsx

'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { tableTabUrls } from '@/lib/constants';
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
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { CodewarsTableData } from '../../types';
import columns from '../columns';
import { CustomizeColumnsMenu } from './CustomizeColumnsMenu';
import CodewarsTabContent from './TabContent';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function CodewarsDataTableTabs({
  initialData
}: {
  initialData: CodewarsTableData[];
}) {
  const router = useRouter();
  const pathname = usePathname();
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
      defaultValue={tableTabUrls.codewars}
      value={pathname}
      onValueChange={(value) => router.push(value)}
      className='w-full flex-col justify-start gap-6'
    >
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          View
        </Label>
        <Select onValueChange={(value) => router.push(value)}>
          <SelectTrigger
            className='flex w-fit @4xl/main:hidden'
            size='sm'
            id='view-selector'
          >
            <SelectValue placeholder='Select a table' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={tableTabUrls.users}>Users</SelectItem>
            <SelectItem value={tableTabUrls.codewars}>Codewars</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className='**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex'>
          <TabsTrigger value={tableTabUrls.users} className='cursor-pointer'>
            Users{' '}
            {/* <Badge variant='secondary'>
              {table.getCoreRowModel().rows.length}
            </Badge> */}
          </TabsTrigger>
          <TabsTrigger value={tableTabUrls.codewars} className='cursor-pointer'>
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
