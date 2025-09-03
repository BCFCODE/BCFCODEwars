import { TableCell, TableRow } from '@/components/ui/new-york-v4/table';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Row } from '@tanstack/react-table';
import { z } from 'zod';
import { schema } from '../../../../schemas/usersTableSchema';

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className='relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80'
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export { DraggableRow };

// import { Button } from '@/components/ui/new-york-v4/button';
// import { TableCell, TableRow } from '@/components/ui/new-york-v4/table';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { flexRender, Row } from '@tanstack/react-table';
// import { IconGripVertical } from '@tabler/icons-react';
// import { z } from 'zod';
// import { schema } from '../../../schemas/codewarsTableSchema';

// function DragHandle({ id }: { id: number }) {
//   const { attributes, listeners } = useSortable({
//     id
//   });

//   return (
//     <Button
//       {...attributes}
//       {...listeners}
//       variant='ghost'
//       size='icon'
//       className='text-muted-foreground size-7 hover:bg-transparent'
//     >
//       <IconGripVertical className='text-muted-foreground size-3' />
//       <span className='sr-only'>Drag to reorder</span>
//     </Button>
//   );
// }

// function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
//   const { transform, transition, setNodeRef, isDragging } = useSortable({
//     id: row.original.id
//   });

//   return (
//     <TableRow
//       data-state={row.getIsSelected() && 'selected'}
//       data-dragging={isDragging}
//       ref={setNodeRef}
//       className='relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80'
//       style={{
//         transform: CSS.Transform.toString(transform),
//         transition: transition
//       }}
//     >
//       {row.getVisibleCells().map((cell) => (
//         <TableCell key={cell.id}>
//           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//         </TableCell>
//       ))}
//     </TableRow>
//   );
// }

// export { DraggableRow, DragHandle };
