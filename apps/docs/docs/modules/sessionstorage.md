---
title: sessionstorage
sidebar_label: sessionstorage
---

# sessionstorage

Read and write JSON-serialized values via the sessionStorage API.

**Import:** `@rtorcato/browser-common/sessionstorage`

📖 [MDN: Window: sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) · 📊 [caniuse: namevalue-storage](https://caniuse.com/namevalue-storage)

## Example

```ts
import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  clearSessionStorage,
} from '@rtorcato/browser-common/sessionstorage'

setSessionStorage('cart', { items: 3 })
const cart = getSessionStorage('cart') as { items: number } | null
removeSessionStorage('cart')
clearSessionStorage()
```

## Exports

- `isSessionStorageAvailable()` — feature check
- `setSessionStorage(key, value)` — stores a value, stringifying it as JSON
- `getSessionStorage(key)` — reads and parses a value as `unknown`, or `null`
- `removeSessionStorage(key)` — removes a single key
- `clearSessionStorage()` — clears all keys

See the [API reference](/docs/api/sessionstorage) for full signatures.
