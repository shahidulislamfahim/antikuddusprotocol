import { useEffect, useState } from "react";

/* =========================================================================
   PERSISTENT STORAGE
   Note to the requester: true browser localStorage is not available inside
   this artifact sandbox, so "store locally" is implemented with Claude's
   equivalent — per-user (non-shared) persistent key/value storage. It
   behaves the same way from the user's perspective: data survives refresh
   and is private to this device/account, without being visible to anyone
   else. Swap the two window.storage calls below for window.localStorage
   verbatim if you move this file into a normal browser environment.
   ========================================================================= */
export function usePersistentState(key, initialValue) {
  const [state, setState] = useState(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await window.storage.get(key, false);
        if (!cancelled && res && res.value) setState(JSON.parse(res.value));
      } catch {
        /* no record yet */
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    (async () => {
      try {
        await window.storage.set(key, JSON.stringify(state), false);
      } catch {
        /* best effort */
      }
    })();
  }, [state, hydrated, key]);

  return [state, setState, hydrated];
}

export async function loadKey(key) {
  try {
    const res = await window.storage.get(key, false);
    return res ? JSON.parse(res.value) : null;
  } catch {
    return null;
  }
}
export async function saveKey(key, val) {
  try {
    await window.storage.set(key, JSON.stringify(val), false);
  } catch {
    /* best effort */
  }
}
export async function clearKey(key) {
  try {
    await window.storage.delete(key, false);
  } catch {
    /* nothing to clear */
  }
}
