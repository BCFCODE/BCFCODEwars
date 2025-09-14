import { isConnectedToCodewars } from '@/services/codewarsService';
import { currentUser } from '@clerk/nextjs/server';
import { CodewarsStatusCard } from '../(cards)/@codewars/StatusCard';

export default async function StatusCard() {
  const user = await currentUser();
  const { emailAddress } = user?.emailAddresses[0]!;

  const isConnected = await isConnectedToCodewars(emailAddress);

  if (isConnected.success)
    return <CodewarsStatusCard codewarsUser={isConnected.data} />;
}
