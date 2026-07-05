---
title: performance
sidebar_label: performance
---

# performance

Timestamps, marks, and measures via the Performance API, with a `Date.now()` fallback.

**Import:** `@rtorcato/browser-common/performance`

📖 [MDN: Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API) · 📊 [caniuse: user-timing](https://caniuse.com/user-timing)

## Example

```ts
import { isPerformanceApiAvailable, now, mark, measure } from '@rtorcato/browser-common/performance'

if (isPerformanceApiAvailable()) {
  mark('boot-start')
  const start = now()
  doWork()
  mark('boot-end')
  measure('boot', 'boot-start', 'boot-end')
}
```

## Exports

- `isPerformanceApiAvailable()` — feature check
- `now()` — high-resolution timestamp in ms, falls back to `Date.now()`
- `getPerformanceEntriesByType(type)` — entries of a given type (e.g. `'resource'`, `'mark'`)
- `mark(name)` — records a named timestamp
- `measure(name, startMark, endMark)` — records the duration between two marks

See the [API reference](/docs/api/performance) for full signatures.
