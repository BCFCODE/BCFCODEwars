'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: { digest: error.digest }
    });
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
