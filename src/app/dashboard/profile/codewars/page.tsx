import { getCodewarsProfileData } from '@/services/codewarsService';
import { NotConnectedGrid } from './components/NotConnectedGrid';
import { StatCards } from './components/StatCards';

export default async function CodewarsProfilePage() {
  let { data: profileData } = await getCodewarsProfileData();
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {profileData?.isConnected ? (
        <StatCards data={profileData} />
      ) : (
        <NotConnectedGrid />
      )}
    </div>
  );
}
