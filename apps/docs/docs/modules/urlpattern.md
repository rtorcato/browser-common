---
title: urlpattern
sidebar_label: urlpattern
---

# urlpattern

Match and parse URLs against a pattern via the URLPattern API.

**Import:** `@rtorcato/browser-common/urlpattern`

📖 [MDN: URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)

`createURLPattern` **throws** where URLPattern is unsupported (Chrome/Edge + Safari 18.4+; Firefox behind a flag) — guard with `isURLPatternAvailable()` first.

## Example

```ts
import {
  isURLPatternAvailable,
  createURLPattern,
  matchURLPattern,
} from '@rtorcato/browser-common/urlpattern'

if (isURLPatternAvailable()) {
  const pattern = createURLPattern({ pathname: '/users/:id' })
  const match = pattern.exec('https://example.com/users/42')

  const result = matchURLPattern({ pathname: '/users/:id' }, 'https://example.com/users/42')
  result?.pathname.groups.id // '42'
}
```

## Exports

- `isURLPatternAvailable()` — feature check
- `createURLPattern(input, baseURL?)` — returns a `URLPattern` instance
- `matchURLPattern(pattern, input)` — tests a URL against a pattern, returns the match result or `null`

See the [API reference](/docs/api/urlpattern) for full signatures.
