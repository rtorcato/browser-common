---
title: weblocks
sidebar_label: weblocks
---

# weblocks

Coordinate work across tabs and workers with a named, async lock via the Web
Locks API.

**Import:** `@rtorcato/browser-common/weblocks`

📖 [MDN: Web Locks API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API) · 📊 [caniuse: weblocks](https://caniuse.com/mdn-api_navigator_locks)

Web Locks API needs a **secure context**. `withLock` **throws** where unsupported — guard with `isWebLocksAvailable()` first.

## Example

```ts
import { isWebLocksAvailable, withLock } from '@rtorcato/browser-common/weblocks'

if (isWebLocksAvailable()) {
  const result = await withLock('sync', async () => fetchAndStore())
}
```

## Exports

- `isWebLocksAvailable()` — feature check
- `withLock(name, callback)` — runs `callback` while holding the named lock; returns the callback's result

See the [API reference](/docs/api/weblocks) for full signatures.
