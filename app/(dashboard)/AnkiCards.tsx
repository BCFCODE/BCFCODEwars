const ANKICONNECT_URL = 'http://127.0.0.1:8765';

// Function to make requests to AnkiConnect
async function fetchAnkiData(action: string, params = {}) {
  const body = {
    action,
    version: 6,
    params,
  };

  const res = await fetch(ANKICONNECT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data from AnkiConnect');
  }

  const data = await res.json();
  return data.result;
}

// Fetch cards from a specific deck
export default async function AnkiCards({ deckName }: { deckName: string }) {
  // First, find the card IDs in the specified deck
  const cardIds: number[] = await fetchAnkiData('findCards', {
    query: `deck:"${deckName}"`,
  });

  // Next, get detailed info for each card
  const cardsInfo = await fetchAnkiData('cardsInfo', {
    cards: cardIds,
  });

  return (
    <div>
      <h1>Cards in {deckName}</h1>
      <ul>
        {cardsInfo.map((card: any) => (
          <li key={card.cardId}>
            <div dangerouslySetInnerHTML={{ __html: card.question }} />
            <div dangerouslySetInnerHTML={{ __html: card.answer }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
