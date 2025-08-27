'use client';

import { Badge } from '@/components/ui/new-york-v4/badge';
import { Button } from '@/components/ui/new-york-v4/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/new-york-v4/dropdown-menu';
import { Label } from '@/components/ui/new-york-v4/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/new-york-v4/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/new-york-v4/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/new-york-v4/tabs';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconLayoutColumns
  // IconPlus
} from '@tabler/icons-react';
import {
  ColumnFiltersState,
  flexRender,
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

import codewarsColumns from './codewars/columns';
import { DraggableRow as CodewarsDraggableRow } from './codewars/components/RowComponents';
// import { DraggableRow as UsersDraggableRow } from './users/components/RowComponents';
import { codewarsTableSchema, usersTableSchema } from '../../schemas';
import usersColumns from './users/columns';
import { useRouter } from 'next/navigation';

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
  // const [tableView, setTableView] = React.useState(TableTab.Users);
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
  const codewarsSortableId = React.useId();
  const codewarsSensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const codewarsDataIds = React.useMemo<UniqueIdentifier[]>(
    () => codewarsData?.map(({ id }) => id) || [],
    [codewarsData]
  );

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

  function codewarsHandleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setCodewarsData((data) => {
        const oldIndex = codewarsDataIds.indexOf(active.id);
        const newIndex = codewarsDataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  // const [usersData, setUsersData] = React.useState(() => usersInitialData);
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
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                <IconLayoutColumns />
                <span className='hidden lg:inline'>Customize Columns</span>
                <span className='lg:hidden'>Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              {(currentTab === 'users' ? usersTable : codewarsTable)
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== 'undefined' &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button variant='outline' size='sm'>
            <IconPlus />
            <span className='hidden lg:inline'>Add Section</span>
          </Button> */}
        </div>
      </div>
      <TabsContent
        value='users'
        className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'
      >
        {/* Table container */}
        <div className='max-h-[70vh] overflow-auto rounded-lg border'>
          <Table>
            <TableHeader className='bg-muted sticky top-0 z-10'>
              {usersTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className='**:data-[slot=table-cell]:first:w-8'>
              {usersTable.getRowModel().rows?.length ? (
                usersTable.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.original.email}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={usersColumns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination controls pinned OUTSIDE of scroll area */}
        <div className='bg-background sticky bottom-0 z-20 flex items-center justify-between border-t px-4 py-3'>
          <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
            {usersTable.getFilteredSelectedRowModel().rows.length} of{' '}
            {usersTable.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='flex w-full items-center gap-8 lg:w-fit'>
            <div className='hidden items-center gap-2 lg:flex'>
              <Label htmlFor='rows-per-page' className='text-sm font-medium'>
                Rows per page
              </Label>
              <Select
                value={`${usersTable.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  usersTable.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
                  <SelectValue
                    placeholder={usersTable.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-fit items-center justify-center text-sm font-medium'>
              Page {usersTable.getState().pagination.pageIndex + 1} of{' '}
              {usersTable.getPageCount()}
            </div>
            <div className='ml-auto flex items-center gap-2 lg:ml-0'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => usersTable.setPageIndex(0)}
                disabled={!usersTable.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => usersTable.previousPage()}
                disabled={!usersTable.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => usersTable.nextPage()}
                disabled={!usersTable.getCanNextPage()}
              >
                <span className='sr-only'>Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant='outline'
                className='hidden size-8 lg:flex'
                size='icon'
                onClick={() =>
                  usersTable.setPageIndex(usersTable.getPageCount() - 1)
                }
                disabled={!usersTable.getCanNextPage()}
              >
                <span className='sr-only'>Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value='codewars'
        className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'
      >
        {/* Table container */}
        <div className='max-h-[70vh] overflow-auto rounded-lg border'>
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={codewarsHandleDragEnd}
            sensors={codewarsSensors}
            id={codewarsSortableId}
          >
            <Table>
              <TableHeader className='bg-muted sticky top-0 z-10'>
                {codewarsTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className='**:data-[slot=table-cell]:first:w-8'>
                {codewarsTable.getRowModel().rows?.length ? (
                  <SortableContext
                    items={codewarsDataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {codewarsTable.getRowModel().rows.map((row) => (
                      <CodewarsDraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={codewarsColumns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        {/* Pagination controls pinned OUTSIDE of scroll area */}
        <div className='bg-background sticky bottom-0 z-20 flex items-center justify-between border-t px-4 py-3'>
          <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
            {codewarsTable.getFilteredSelectedRowModel().rows.length} of{' '}
            {codewarsTable.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='flex w-full items-center gap-8 lg:w-fit'>
            <div className='hidden items-center gap-2 lg:flex'>
              <Label htmlFor='rows-per-page' className='text-sm font-medium'>
                Rows per page
              </Label>
              <Select
                value={`${codewarsTable.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  codewarsTable.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
                  <SelectValue
                    placeholder={codewarsTable.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-fit items-center justify-center text-sm font-medium'>
              Page {codewarsTable.getState().pagination.pageIndex + 1} of{' '}
              {codewarsTable.getPageCount()}
            </div>
            <div className='ml-auto flex items-center gap-2 lg:ml-0'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => codewarsTable.setPageIndex(0)}
                disabled={!codewarsTable.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => codewarsTable.previousPage()}
                disabled={!codewarsTable.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => codewarsTable.nextPage()}
                disabled={!codewarsTable.getCanNextPage()}
              >
                <span className='sr-only'>Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant='outline'
                className='hidden size-8 lg:flex'
                size='icon'
                onClick={() =>
                  codewarsTable.setPageIndex(codewarsTable.getPageCount() - 1)
                }
                disabled={!codewarsTable.getCanNextPage()}
              >
                <span className='sr-only'>Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default DataTableTabs;
