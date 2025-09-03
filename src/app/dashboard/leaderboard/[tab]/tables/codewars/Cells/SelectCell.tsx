import { Checkbox } from '@/components/ui/new-york-v4/checkbox';
import { Row } from '@tanstack/react-table';
import { CodewarsTableCells } from '../../types';

export function SelectCell({ row }: { row: Row<CodewarsTableCells> }) {
  return (
    <div className='flex items-center justify-center'>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    </div>
  );
}
