import { Row } from '@tanstack/react-table';
import { CodewarsTableData } from '../../../types';
import { Badge } from '@/components/UI/badge';

export function LastActivityCell({ row }: { row: Row<CodewarsTableData> }) {
  return (
    <div className='w-32'>
      <Badge variant='outline' className='text-muted-foreground px-1.5'>
        {new Intl.DateTimeFormat('en-US', {
          dateStyle: 'short',
          timeStyle: 'medium'
        }).format(row.original.lastActiveTime ?? row.original.firstLogin)}
      </Badge>
    </div>
  );
}
