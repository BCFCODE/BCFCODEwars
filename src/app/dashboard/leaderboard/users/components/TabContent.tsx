// \src\app\dashboard\leaderboard\users\components\TabContent.tsx

'use client';

import {
  Table as ShadCNTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/UI/table';
import { TabsContent } from '@/components/UI/tabs';
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
import { flexRender, Table } from '@tanstack/react-table';
import React from 'react';
import columns from '../columns';
import { DraggableRow } from './DraggableRow';
import { Pagination } from './Pagination';
import { UsersTableData } from '../../types';
import { tableTabUrls } from '@/lib/constants';

interface Props {
  table: Table<UsersTableData>;
  data: UsersTableData[];
  setData: React.Dispatch<React.SetStateAction<UsersTableData[]>>;
}

const UsersTabContent = ({ table, data, setData }: Props) => {
  const usersSortableId = React.useId();
  const usersSensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const usersDataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  function usersHandleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = usersDataIds.indexOf(active.id);
        const newIndex = usersDataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <TabsContent
      value={tableTabUrls.users}
      className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'
    >
      {/* ShadCNTable container */}
      <div className='max-h-[70vh] overflow-auto rounded-lg border'>
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={usersHandleDragEnd}
          sensors={usersSensors}
          id={usersSortableId}
        >
          <ShadCNTable>
            <TableHeader className='bg-muted sticky top-0 z-10'>
              {table.getHeaderGroups().map((headerGroup) => (
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
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={usersDataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </ShadCNTable>
        </DndContext>
      </div>
      {/* Pagination controls pinned OUTSIDE of scroll area */}
      <Pagination {...{ table }} />
    </TabsContent>
  );
};

export default UsersTabContent;
