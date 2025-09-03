'use client';

import { Button } from '@/components/ui/new-york-v4/button';
import { Label } from '@/components/ui/new-york-v4/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/new-york-v4/select';
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
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconPlus
} from '@tabler/icons-react';
import { flexRender, Table } from '@tanstack/react-table';
import columns from './columns';
import { DraggableRow } from './components/RowComponents';
import { usersTableSchema } from '../../../schemas';
import { z } from 'zod';
import React from 'react';

interface Props {
  table: Table<z.infer<typeof usersTableSchema>>;
  data: z.infer<typeof usersTableSchema>[];
  setData: React.Dispatch<
    React.SetStateAction<z.infer<typeof usersTableSchema>[]>
  >;
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
      value='users'
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
      <div className='bg-background sticky bottom-0 z-20 flex items-center justify-between border-t px-4 py-3'>
        <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='flex w-full items-center gap-8 lg:w-fit'>
          <div className='hidden items-center gap-2 lg:flex'>
            <Label htmlFor='rows-per-page' className='text-sm font-medium'>
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
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
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <div className='ml-auto flex items-center gap-2 lg:ml-0'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant='outline'
              className='size-8'
              size='icon'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant='outline'
              className='size-8'
              size='icon'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant='outline'
              className='hidden size-8 lg:flex'
              size='icon'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to last page</span>
              <IconChevronsRight />
            </Button>
            <Button variant='outline' size='sm'>
              <IconPlus />
              <span className='hidden lg:inline'>Add Section</span>
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default UsersTabContent;

// 'use client';

// import { Button } from '@/components/ui/new-york-v4/button';
// import { Label } from '@/components/ui/new-york-v4/label';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/new-york-v4/select';
// import {
//   Table as ShadCNTable,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/new-york-v4/table';
// import { TabsContent } from '@/components/ui/new-york-v4/tabs';
// import {
//   IconChevronLeft,
//   IconChevronRight,
//   IconChevronsLeft,
//   IconChevronsRight
// } from '@tabler/icons-react';
// import { flexRender, Table } from '@tanstack/react-table';
// import { z } from 'zod';
// import { usersTableSchema } from '../../schemas';
// import columns from './columns';

// interface Props {
//   table: Table<z.infer<typeof usersTableSchema>>;
// }

// const UsersTabContent = ({ table }: Props) => {
//   return (
//     <TabsContent
//       value='users'
//       className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'
//     >
//       {/* ShadCNTable container */}
//       <div className='max-h-[70vh] overflow-auto rounded-lg border'>
//         <ShadCNTable>
//           <TableHeader className='bg-muted sticky top-0 z-10'>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id} colSpan={header.colSpan}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody className='**:data-[slot=table-cell]:first:w-8'>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.original.email}
//                   data-state={row.getIsSelected() && 'selected'}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className='h-24 text-center'
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </ShadCNTable>
//       </div>

//       {/* Pagination controls pinned OUTSIDE of scroll area */}
//       <div className='bg-background sticky bottom-0 z-20 flex items-center justify-between border-t px-4 py-3'>
//         <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
//           {table.getFilteredSelectedRowModel().rows.length} of{' '}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className='flex w-full items-center gap-8 lg:w-fit'>
//           <div className='hidden items-center gap-2 lg:flex'>
//             <Label htmlFor='rows-per-page' className='text-sm font-medium'>
//               Rows per page
//             </Label>
//             <Select
//               value={`${table.getState().pagination.pageSize}`}
//               onValueChange={(value) => {
//                 table.setPageSize(Number(value));
//               }}
//             >
//               <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
//                 <SelectValue
//                   placeholder={table.getState().pagination.pageSize}
//                 />
//               </SelectTrigger>
//               <SelectContent side='top'>
//                 {[10, 20, 30, 40, 50].map((pageSize) => (
//                   <SelectItem key={pageSize} value={`${pageSize}`}>
//                     {pageSize}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className='flex w-fit items-center justify-center text-sm font-medium'>
//             Page {table.getState().pagination.pageIndex + 1} of{' '}
//             {table.getPageCount()}
//           </div>
//           <div className='ml-auto flex items-center gap-2 lg:ml-0'>
//             <Button
//               variant='outline'
//               className='hidden h-8 w-8 p-0 lg:flex'
//               onClick={() => table.setPageIndex(0)}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <span className='sr-only'>Go to first page</span>
//               <IconChevronsLeft />
//             </Button>
//             <Button
//               variant='outline'
//               className='size-8'
//               size='icon'
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <span className='sr-only'>Go to previous page</span>
//               <IconChevronLeft />
//             </Button>
//             <Button
//               variant='outline'
//               className='size-8'
//               size='icon'
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               <span className='sr-only'>Go to next page</span>
//               <IconChevronRight />
//             </Button>
//             <Button
//               variant='outline'
//               className='hidden size-8 lg:flex'
//               size='icon'
//               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//               disabled={!table.getCanNextPage()}
//             >
//               <span className='sr-only'>Go to last page</span>
//               <IconChevronsRight />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </TabsContent>
//   );
// };

// export default UsersTabContent;
