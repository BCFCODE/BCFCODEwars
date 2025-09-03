import { PropsWithChildren } from 'react';
import { Badge } from '@/components/ui/new-york-v4/badge';
import { Label } from '@/components/ui/new-york-v4/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/new-york-v4/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/new-york-v4/tabs';
import { TableTab } from './DataTableTabs';
import { useRouter } from 'next/navigation';

interface Props extends PropsWithChildren {
  tab: TableTab;
  customizeColumnsMenu: React.ReactNode;
}

const TabSwitcher = ({ children, tab, customizeColumnsMenu }: Props) => {
  const router = useRouter();
  return (
    <Tabs
      value={tab}
      onValueChange={(val) =>
        router.push(`/dashboard/leaderboard/${val as TableTab}`)
      }
      className='w-full flex-col justify-start gap-6'
    >
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          View
        </Label>
        <Select
          value={tab}
          onValueChange={(val) =>
            router.push(`/dashboard/leaderboard/${val as TableTab}`)
          }
        >
          <SelectTrigger
            className='flex w-fit @4xl/main:hidden'
            size='sm'
            id='view-selector'
          >
            <SelectValue placeholder='Select a view' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='users'>Users</SelectItem>
            <SelectItem value='codewars'>Codewars</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className='**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex'>
          <TabsTrigger value='users' className='cursor-pointer'>
            Users
          </TabsTrigger>
          <TabsTrigger value='codewars' className='cursor-pointer'>
            Codewars <Badge variant='secondary'>3</Badge>
          </TabsTrigger>
        </TabsList>
        {customizeColumnsMenu}
      </div>
      {children}
    </Tabs>
  );
};

export default TabSwitcher;
