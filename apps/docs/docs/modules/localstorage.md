---
title: localstorage
sidebar_label: localstorage
---

# localstorage

JSON-aware wrappers around `localStorage`, with an availability check and
safe no-ops when storage is unavailable (private browsing, quota, etc.).

**Import:** `@rtorcato/browser-common/localstorage`

📖 [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) · 📊 [caniuse: namevalue-storage](https://caniuse.com/namevalue-storage)

## Example

```ts
import {
  isLocalStorageAvailable,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '@rtorcato/browser-common/localstorage'

if (isLocalStorageAvailable()) {
  setLocalStorage('prefs', { theme: 'dark' })
  const prefs = getLocalStorage('prefs') as { theme: string } | null
  removeLocalStorage('prefs')
}
```

## Exports

- `isLocalStorageAvailable()` — feature check, verified with a write/remove probe
- `setLocalStorage(key, value)` — JSON-stringifies and stores `value`
- `getLocalStorage(key)` — parses and returns the stored value, or `null` (caller must narrow the type)
- `removeLocalStorage(key)` — removes a single key
- `clearLocalStorage()` — clears all keys

See the [API reference](/docs/api/localstorage) for full signatures.
