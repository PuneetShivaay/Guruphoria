/**
 * Next.js instrumentation hook.
 *
 * Runs once, before any other server-side module is evaluated - which is the
 * only place early enough to fix the issue below.
 *
 * Node 22+ exposes an experimental global `localStorage`. When the process is
 * started without a valid `--localstorage-file` path, the global still exists
 * but its methods are unusable. Firebase Auth sniffs for `localStorage` to
 * decide whether it is running in a browser, so during SSR it finds this broken
 * global and throws:
 *
 *   TypeError: localStorage.getItem is not a function
 *
 * Deleting the global on the server restores correct Node detection.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const g = globalThis as Record<string, unknown>;
  const ls = g.localStorage as { getItem?: unknown } | undefined;

  if (ls && typeof ls.getItem !== 'function') {
    try {
      delete g.localStorage;
    } catch {
      Object.defineProperty(globalThis, 'localStorage', {
        value: undefined,
        configurable: true,
        writable: true,
      });
    }
  }
}
