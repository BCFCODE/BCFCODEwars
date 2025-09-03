'use client';

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
import { useRouter } from 'next/navigation';
import CodewarsTabContent from '../[tab]/tables/codewars';
import UsersTabContent from '../[tab]/tables/users';
import { useTableData } from '../hooks/useTableData';
import { CodewarsTableData, UsersTableData } from '../types';
import { CustomizeColumnsMenu } from './CustomizeColumnsMenu';

export type TableTab = 'users' | 'codewars';

function DataTableTabs({
  currentTab,
  usersData: usersInitialData,
  codewarsData: codewarsInitialData
}: {
  usersData: UsersTableData[];
  codewarsData: CodewarsTableData[];
  currentTab: TableTab;
}) {
  const router = useRouter();

  const { table, data, setData } = useTableData({
    tab: currentTab,
    initialData: { users: usersInitialData, codewars: codewarsInitialData }
  });

  return (
    <Tabs
      value={currentTab}
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
          value={currentTab}
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
        <CustomizeColumnsMenu {...{ table }} />
      </div>
      <UsersTabContent {...{ table, data, setData }} />
      <CodewarsTabContent {...{ table, data, setData }} />
    </Tabs>
  );
}

export default DataTableTabs;
