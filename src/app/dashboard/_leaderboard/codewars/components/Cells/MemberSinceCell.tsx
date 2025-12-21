import { Row } from '@tanstack/react-table';
import { CodewarsTableData } from '@/types';
import { Badge } from '@/components/ui/badge';

export function MemberSinceCell({ row }: { row: Row<CodewarsTableData> }) {
  return (
    <div className='w-32'>
      <Badge variant='outline' className='text-muted-foreground px-1.5'>
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        }).format(row.original.firstLogin ?? new Date())}
      </Badge>
    </div>
  );
}
