import { getCodewarsProfileData } from '@/services/codewarsService';
import { NotConnectedGrid } from './components/NotConnectedGrid';
import { StatCards } from './components/StatCards';

export default async function CodewarsProfilePage() {
  let { data: profileData } = await getCodewarsProfileData();

  if (profileData?.isConnected) return <StatCards data={profileData} />;

  return <NotConnectedGrid />;
}
