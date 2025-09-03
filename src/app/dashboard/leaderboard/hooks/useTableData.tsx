import React from 'react';

import {
  ColumnDef,
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
import codewarsColumns from '../[tab]/tables/codewars/columns';
import usersColumns from '../[tab]/tables/users/columns';
import { TableTab } from '../components/DataTableTabs';
import { CodewarsTableData, UsersTableData } from '../types';

interface TableData<Data> {
  initialData: {
    users: Data[];
    codewars: Data[];
  };
  tab: TableTab;
}

export function useTableData<Data extends UsersTableData | CodewarsTableData>({
  initialData,
  tab
}: TableData<Data>) {
  const [data, setData] = React.useState(() => {
    switch (tab) {
      case 'users':
        return initialData.users;
      case 'codewars':
        return initialData.codewars;
    }
  });

  const selectedColumns = (
    tab: TableTab
  ): ColumnDef<UsersTableData | CodewarsTableData>[] => {
    switch (tab) {
      case 'users':
        return usersColumns;
      case 'codewars':
        return codewarsColumns;
    }
  };

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
    columns: selectedColumns(tab),
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
    getFacetedUniqueValues: getFacetedUniqueValues()
  });

  return { setData, data, table };
}
