import { getKataData } from '@/app/repositories/codewarsRepository';
import { isConnectedToCodewarsSafe } from '@/services/codewarsService';

const syncWithCodewars = async () => {
  const { data: codewarsData } = await isConnectedToCodewarsSafe();

  if (codewarsData?.isConnected) {
    await getKataData({
      codewarsUserId: codewarsData.id,
      codewarsUsername: codewarsData.username,
      codewarsName: codewarsData.name
    });
  }

  return { codewarsData };
};

export default syncWithCodewars;
