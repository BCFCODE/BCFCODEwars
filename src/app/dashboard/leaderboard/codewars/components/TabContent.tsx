'use client';

import {
  Table as ShadCNTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/new-york-v4/table';
import { TabsContent } from '@/components/ui/new-york-v4/tabs';
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
import { CodewarsTableData } from '../../types';
import columns from '../columns';
import { DraggableRow } from './DraggableRow';
import { Pagination } from './Pagination';

interface Props {
  table: Table<CodewarsTableData>;
  data: CodewarsTableData[];
  setData: React.Dispatch<React.SetStateAction<CodewarsTableData[]>>;
}

const CodewarsTabContent = ({ table, data, setData }: Props) => {
  const codewarsSortableId = React.useId();
  const codewarsSensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const codewarsDataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  function codewarsHandleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = codewarsDataIds.indexOf(active.id);
        const newIndex = codewarsDataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }
  return (
    <TabsContent
      value='codewars'
      className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'
    >
      {/* ShadCNTable container */}
      <div className='max-h-[70vh] overflow-auto rounded-lg border'>
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={codewarsHandleDragEnd}
          sensors={codewarsSensors}
          id={codewarsSortableId}
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
                  items={codewarsDataIds}
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

export default CodewarsTabContent;
