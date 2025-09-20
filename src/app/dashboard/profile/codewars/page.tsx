import CodewarsProfile from './CodewarsProfile';
import data from './data.json';

export default async function CodewarsProfilePage() {
  return <CodewarsProfile profileData={data} />;
}
