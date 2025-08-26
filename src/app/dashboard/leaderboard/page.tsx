import DataTableTabs from './components/DataTableTabs';
import codewarsDummyData from '../../../../data/codewarsDummyData.json';
import usersData from '../../../../data/BCFCODEwars.users.json';

const LeaderboardPage = () => {
  return (
    <DataTableTabs codewarsData={codewarsDummyData} usersData={usersData} />
  );
};

export default LeaderboardPage;
