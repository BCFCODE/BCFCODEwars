'use client';

import CodewarsTabContent from '../[tab]/tables/codewars';
import UsersTabContent from '../[tab]/tables/users';
import { useCodewarsTable } from '../hooks/useCodewarsTable';
import { useUsersTable } from '../hooks/useUsersTable';
import { CodewarsTableData, UsersTableData } from '../types';
import CustomizeColumnsMenu from './CustomizeColumns';
import TabSwitcher from './TabSwitcher';

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
  const { setUsersData, usersData, usersTable } =
    useUsersTable(usersInitialData);

  const { codewarsData, codewarsTable, setCodewarsData } =
    useCodewarsTable(codewarsInitialData);

  return (
    <TabSwitcher
      tab={currentTab}
      customizeColumnsMenu={
        <CustomizeColumnsMenu
          tab={currentTab}
          tables={{
            users: usersTable,
            codewars: codewarsTable
          }}
        />
      }
    >
      <UsersTabContent
        setData={setUsersData}
        data={usersData}
        table={usersTable}
      />
      <CodewarsTabContent
        setData={setCodewarsData}
        data={codewarsData}
        table={codewarsTable}
      />
    </TabSwitcher>
  );
}

export default DataTableTabs;
