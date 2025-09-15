import { Label } from '@/components/UI/Label';

import { Row } from '@tanstack/react-table';
import { CodewarsTableData } from '../../../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/UI/select';

export function ReviewerCell({ row }: { row: Row<CodewarsTableData> }) {
  const isAssigned = row.original.reviewer !== 'Assign reviewer';

  if (isAssigned) {
    return row.original.reviewer;
  }

  return (
    <>
      <Label htmlFor={`${row.original.id}-reviewer`} className='sr-only'>
        Reviewer
      </Label>
      <Select>
        <SelectTrigger
          className='w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate'
          size='sm'
          id={`${row.original.id}-reviewer`}
        >
          <SelectValue placeholder='Assign reviewer' />
        </SelectTrigger>
        <SelectContent align='end'>
          <SelectItem value='Eddie Lake'>Eddie Lake</SelectItem>
          <SelectItem value='Jamik Tashpulatov'>Jamik Tashpulatov</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
