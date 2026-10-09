'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Route-level error boundary. Catches errors thrown by any page/segment
 * under this layout without discarding the root <Header>/<Footer> shell,
 * so a crash on one page (e.g. a Firestore permission error on /live)
 * doesn't take down the whole site's chrome.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error boundary caught:', error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center gap-4 px-6 text-center">
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
        <Link
          href="/"
          className="rounded-md border border-border px-4 py-2 font-medium hover:bg-muted"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
