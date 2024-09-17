const ANKICONNECT_URL = 'http://127.0.0.1:8765';

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

export default async function AnkiDecks() {
  const decks: string[] = await fetchAnkiData('deckNames');

  return (
    <div>
      <h1>Anki Decks</h1>
      <ul>
        {decks.map((deck) => (
          <li key={deck}>{deck}</li>
        ))}
      </ul>
    </div>
  );
}
