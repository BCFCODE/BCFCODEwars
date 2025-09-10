import { Input } from '@/components/ui/new-york-v4/input';
import { Label } from '@/components/ui/new-york-v4/label';
import { Row } from '@tanstack/react-table';
import { toast } from 'sonner';
import { UsersTableData } from '../../../types';

export function LimitCell({ row }: { row: Row<UsersTableData> }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
          loading: `Saving ${row.original.header}`,
          success: 'Done',
          error: 'Error'
        });
      }}
    >
      <Label htmlFor={`${row.original.id}-limit`} className='sr-only'>
        Limit
      </Label>
      <Input
        className='hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent'
        defaultValue={row.original.limit}
        id={`${row.original.id}-limit`}
      />
    </form>
  );
}
