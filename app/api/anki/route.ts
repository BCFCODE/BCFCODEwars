import { NextRequest, NextResponse } from 'next/server';

const ANKICONNECT_URL = 'http://127.0.0.1:8765'; // AnkiConnect's default address

export async function POST(req: NextRequest) {
  const { action, params } = await req.json();

  const body = {
    action,
    version: 6,
    params: params || {}
  };

  try {
    const res = await fetch(ANKICONNECT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error connecting to Anki:', error);
    return NextResponse.json({ error: 'Failed to connect to Anki' }, { status: 500 });
  }
}


/* 
  To connect your Next.js project to your Anki database and access the cards and decks using TypeScript and the App Router approach, you'll likely need to use AnkiConnect. AnkiConnect is an API that allows external programs to interact with Anki.

  Steps to connect:
  Install AnkiConnect: Install the AnkiConnect add-on in your Anki desktop app if you haven't already. This will allow your Next.js project to communicate with Anki over HTTP.

  Allow AnkiConnect on your Anki desktop app: Ensure Anki is running when you want to access the data.

  Set up your Next.js project to make HTTP requests to the AnkiConnect API.

  Next.js Project Setup (TypeScript & App Router)
  1. Create API Routes:
  In the App Router approach, API routes can be defined in the /app/api folder.

  Create a file /app/api/anki/route.ts to handle communication with AnkiConnect.
  ts
  Copy code
  import { NextRequest, NextResponse } from 'next/server';

  const ANKICONNECT_URL = 'http://127.0.0.1:8765'; // AnkiConnect's default address

  export async function POST(req: NextRequest) {
    const { action, params } = await req.json();

    const body = {
      action,
      version: 6,
      params: params || {}
    };

    try {
      const res = await fetch(ANKICONNECT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error connecting to Anki:', error);
      return NextResponse.json({ error: 'Failed to connect to Anki' }, { status: 500 });
    }
  }
  2. app/components/AnkiDecks.tsx (Server Component for fetching and displaying Anki decks)
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

  3. Example AnkiConnect Actions:
  You can send different actions to AnkiConnect to retrieve specific data. Here are a few common ones:

  deckNames: Retrieves all deck names.
  findCards: Finds cards based on a query.
  cardsInfo: Retrieves detailed information about specific cards.
  
  To use these, modify the action in your API request. For example, to get information about cards from a specific deck:

  const getCardsInDeck = async (deckName: string) => {
    const data = await fetchAnkiData('findCards', { query: `deck:"${deckName}"` });
    return data.result;
  };
  Testing:
  Ensure Anki is running with the AnkiConnect add-on active, and make sure that your Next.js app can communicate with Anki's local API.
*/