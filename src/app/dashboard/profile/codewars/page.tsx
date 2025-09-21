import { getCodewarsProfile } from '@/app/repositories/codewarsRepository';
import { currentUser } from '@clerk/nextjs/server';
import CodewarsProfile from './components/CodewarsProfile';

export default async function CodewarsProfilePage() {
  const user = await currentUser();
  const { emailAddress } = user?.emailAddresses[0]!;
  const data = await getCodewarsProfile(emailAddress);
  // console.log(data)
  if (data) return <CodewarsProfile profileData={data} />;
}
