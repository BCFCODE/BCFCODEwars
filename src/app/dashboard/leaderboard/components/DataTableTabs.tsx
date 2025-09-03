'use client';

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
import usersColumns from '../[tab]/tables/users/columns';
import codewarsColumns from '../[tab]/tables/codewars/columns';
import CodewarsTabContent from '../[tab]/tables/codewars';
import UsersTabContent from '../[tab]/tables/users';
import { usersTableSchema, codewarsTableSchema } from '../schemas';
import CustomizeColumnsMenu from './CustomizeColumns';
import TabSwitcher from './TabSwitcher';

export type TableTab = 'users' | 'codewars';

function DataTableTabs({
  currentTab,
  usersData: usersInitialData,
  codewarsData: codewarsInitialData
}: {
  usersData: z.infer<typeof usersTableSchema>[];
  codewarsData: z.infer<typeof codewarsTableSchema>[];
  currentTab: TableTab;
}) {
  // Users Tab
  const [usersData, setUsersData] = React.useState(() => usersInitialData);
  const [usersRowSelection, setUsersRowSelection] = React.useState({});
  const [usersColumnVisibility, setUsersColumnVisibility] =
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
      columnVisibility: usersColumnVisibility,
      rowSelection: usersRowSelection,
      columnFilters: usersColumnFilters,
      pagination: usersPagination
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setUsersRowSelection,
    onSortingChange: setUsersSorting,
    onColumnFiltersChange: setUsersColumnFilters,
    onColumnVisibilityChange: setUsersColumnVisibility,
    onPaginationChange: setUsersPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

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

  return (
    <TabSwitcher
      tab={currentTab}
      customizeColumnsMenu={
        <CustomizeColumnsMenu
          tab={currentTab}
          tables={{
            users: usersTable,
            codewars: codewarsTable
          }}
        />
      }
    >
      <UsersTabContent
        setData={setUsersData}
        data={usersData}
        table={usersTable}
      />
      <CodewarsTabContent
        setData={setCodewarsData}
        data={codewarsData}
        table={codewarsTable}
      />
    </TabSwitcher>
  );
}

export default DataTableTabs;
