'use client';

import { useEffect } from 'react';

/**
 * Catches errors thrown anywhere in the app, including the root layout
 * itself. Without this file, Next.js falls back to its own blank,
 * title-less error page — which is what search engines were indexing.
 *
 * global-error.tsx must render its own <html>/<body> because it replaces
 * the root layout entirely when it activates.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('GlobalError boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Something went wrong | Guruphoria</title>
        <meta name="robots" content="noindex" />
      </head>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center font-sans text-foreground">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="max-w-md text-muted-foreground">
          We hit an unexpected error loading this page. Please try again, or
          head back to the homepage.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="rounded-md bg-brand-700 px-4 py-2 font-medium text-white hover:bg-brand-800"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-md border border-border px-4 py-2 font-medium hover:bg-muted"
          >
            Go home
          </a>
        </div>
      </body>
    </html>
  );
}
