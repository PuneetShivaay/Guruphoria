
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * @fileOverview Universal Firebase initialization.
 * Robust implementation for both Client and Server environments.
 */

/**
 * Node 22+ exposes an experimental global `localStorage` that is non-functional
 * unless `--localstorage-file` is given a valid path. Firebase Auth sniffs for
 * `localStorage` to detect a browser, so during SSR it picks up this broken
 * global and throws "localStorage.getItem is not a function". Remove it.
 */
function removeBrokenNodeLocalStorage() {
  if (typeof window !== 'undefined') return;
  try {
    const ls = (globalThis as any).localStorage;
    if (ls && typeof ls.getItem !== 'function') {
      delete (globalThis as any).localStorage;
    }
  } catch {
    // Accessing/deleting may throw in some Node builds - safe to ignore.
    try {
      Object.defineProperty(globalThis, 'localStorage', { value: undefined, configurable: true });
    } catch {
      /* noop */
    }
  }
}

export function initializeFirebase() {
  removeBrokenNodeLocalStorage();

  let app: FirebaseApp;
  
  const apps = getApps();
  if (!apps.length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = apps[0];
  }

  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
