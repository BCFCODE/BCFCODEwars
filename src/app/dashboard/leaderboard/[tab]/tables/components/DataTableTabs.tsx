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

import {
  codewarsTableSchema,
  productsTableSchema,
  usersTableSchema
} from '../../schemas';
import CodewarsTabContent from '../codewars';
import codewarsColumns from '../codewars/columns';
import productsColumns from '../products/columns';
import UsersTabContent from '../users';
import usersColumns from '../users/columns';
import TabSwitcher from './TabSwitcher';
import CustomizeColumnsMenu from './CustomizeColumnsMenu';
import ProductsTabContent from '../products';

export type TableTab = 'users' | 'codewars' | 'products';

function DataTableTabs({
  usersData,
  codewarsData: codewarsInitialData,
  productsData: productsInitialData,
  currentTab
}: {
  usersData: z.infer<typeof usersTableSchema>[];
  codewarsData: z.infer<typeof codewarsTableSchema>[];
  productsData: z.infer<typeof productsTableSchema>[];
  currentTab: TableTab;
}) {
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

  // Products Tab
  const [productsData, setProductsData] = React.useState(
    () => productsInitialData
  );
  const [productsRowSelection, setProductsRowSelection] = React.useState({});
  const [productsColumnVisibility, setProductsColumnVisibility] =
    React.useState<VisibilityState>({});
  const [productsColumnFilters, setProductsColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [productsSorting, setProductsSorting] = React.useState<SortingState>(
    []
  );
  const [productsPagination, setProductsPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10
  });

  const productsTable = useReactTable({
    data: productsData,
    columns: productsColumns,
    state: {
      sorting: productsSorting,
      columnVisibility: productsColumnVisibility,
      rowSelection: productsRowSelection,
      columnFilters: productsColumnFilters,
      pagination: productsPagination
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setProductsRowSelection,
    onSortingChange: setProductsSorting,
    onColumnFiltersChange: setProductsColumnFilters,
    onColumnVisibilityChange: setProductsColumnVisibility,
    onPaginationChange: setProductsPagination,
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
            codewars: codewarsTable,
            products: productsTable
          }}
        />
      }
    >
      <UsersTabContent table={usersTable} />
      <CodewarsTabContent
        setData={setCodewarsData}
        data={codewarsData}
        table={codewarsTable}
      />
      <ProductsTabContent
        setData={setProductsData}
        data={productsData}
        table={productsTable}
      />
    </TabSwitcher>
  );
}

export default DataTableTabs;
