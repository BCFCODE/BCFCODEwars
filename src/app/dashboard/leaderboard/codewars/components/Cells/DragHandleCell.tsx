import { Button } from '@/components/UI/button';
import { useSortable } from '@dnd-kit/sortable';
import { IconGripVertical } from '@tabler/icons-react';

export function DragHandleCell({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant='ghost'
      size='icon'
      className='text-muted-foreground size-7 hover:bg-transparent'
    >
      <IconGripVertical className='text-muted-foreground size-3' />
      <span className='sr-only'>Drag to reorder</span>
    </Button>
  );
}
