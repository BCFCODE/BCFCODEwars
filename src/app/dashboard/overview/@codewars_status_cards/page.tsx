import { getCodewarsProfileSafe } from '@/services/codewarsService';
import ClientContainer from './components/ClientContainer';

export default async function CodewarsStatusCardsSlot() {
  const codewarsProfilePromise = getCodewarsProfileSafe();

  return <ClientContainer promise={codewarsProfilePromise} />;
}
