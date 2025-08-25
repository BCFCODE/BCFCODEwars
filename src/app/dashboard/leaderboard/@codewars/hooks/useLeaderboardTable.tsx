// // useLeaderboardTable.ts
// import { useState, useMemo } from 'react';
// import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
// import { z } from 'zod';
// import { arrayMove } from '@dnd-kit/sortable';

// export function useLeaderboardTable(initialData: z.infer<typeof schema>[]) {
//   const [data, setData] = useState(initialData);
//   const [rowSelection, setRowSelection] = useState({});
//   const [sorting, setSorting] = useState([]);
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
//   const dataIds = useMemo(() => data.map((d) => d.id), [data]);

//   const table = useReactTable({
//     data,
//     columns, // import columns from a separate module
//     state: { rowSelection, sorting, pagination },
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     ...
//   });

//   function handleDragEnd(activeId: number, overId: number) {
//     if (activeId !== overId) {
//       setData((data) => {
//         const oldIndex = dataIds.indexOf(activeId);
//         const newIndex = dataIds.indexOf(overId);
//         return arrayMove(data, oldIndex, newIndex);
//       });
//     }
//   }

//   return { table, handleDragEnd, data, setData };
// }
