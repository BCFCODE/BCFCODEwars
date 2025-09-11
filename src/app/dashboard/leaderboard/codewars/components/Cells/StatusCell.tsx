import { Badge } from '@/components/ui/new-york-v4/badge';
import { IconCircleCheckFilled, IconLoader } from '@tabler/icons-react';
import { Row } from '@tanstack/react-table';
import { CodewarsTableData } from '../../../types';

export function StatusCell({ row }: { row: Row<CodewarsTableData> }) {
  return (
    <Badge variant='outline' className='text-muted-foreground px-1.5'>
      {row.original.status === 'Done' ? (
        <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />
      ) : (
        <IconLoader />
      )}
      {row.original.status}
    </Badge>
  );
}
